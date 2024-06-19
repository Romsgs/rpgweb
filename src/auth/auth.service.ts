import { UserRepository } from '../users/users.repository';
import * as jwt from 'jsonwebtoken';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const userRepository = new UserRepository();
const JWT_SECRET = process.env.JWT_SECRET as string;

import { IAuthService } from './AuthInterfaces';

export class AuthService implements IAuthService {

  // Register a new user
  async register(email: string, name: string, password: string): Promise<User> {
    return await userRepository.create(email, name, password);
  }

  // Login user and return JWT token
  async login(email: string, password: string): Promise<string | null> {
    try {
      const user = await userRepository.get_user_by_email(email);
      if (!user) {
        throw new Error("User not found");
      }
      const valid = await argon.verify(user.password, password);
      if (!valid) {
        throw new Error("Invalid password");
      }
      return this.generateToken(user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Generate JWT token
  generateToken(user: User): string {
    const payload = { id: user.id, email: user.email, createdAt: Date.now() };
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET not set");
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  }

  // Verify JWT token
  verifyToken(token: string): any {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET not set");
    }
    return jwt.verify(token, JWT_SECRET);
  }

  // Middleware to protect routes
  authenticateToken = (req: any, res: any, next: any) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send("Access Denied");
    }
    try {
      const verified = this.verifyToken(token);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).send("Invalid Token");
    }
  };
}
