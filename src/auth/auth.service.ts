import { UserRepository } from '../users/users.repository'
import * as jwt from 'jsonwebtoken'
import * as argon from 'argon2'
import { User } from '@prisma/client'

const userRepository = new UserRepository()
const JWT_SECRET = process.env.JWT_SECRET

import { IAuthService, registerUserDTO } from './AuthServiceInterfaces'

export class AuthService implements IAuthService {

    // Register a new user
    async register(body: registerUserDTO): Promise<User> {
        return await userRepository.create(body.email, body.name, body.password)
    }

    // Login user and return JWT token
    async login(email: string, password: string): Promise<string | null> {
        const user = await userRepository.get_users_by_email(email)
        if (!user) {
            throw new Error('User not found')
        }
        const valid = await argon.verify(user.password, password)
        if (!valid) {
            throw new Error('Invalid password')
        }
        return this.generateToken(user)
    }

    // Generate JWT token
    generateToken(user: User): string {
        const payload = { id: user.id, email: user.email }
        if (!JWT_SECRET) {
            throw Error("Internal Server Error, code: 500, subject token")
        }
        return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
    }

    // Verify JWT token
    verifyToken(token: string): any {
        try {
            if (!JWT_SECRET) {
                throw Error("Internal Server Error, code: 500, subject token")
            }
            return jwt.verify(token, JWT_SECRET)
        } catch (error: any) {
            console.log(error)
            throw new Error('Invalid token')

        }
    }

    // Middleware to protect routes
    authenticateToken = (req: any, res: any, next: any) => {
        const token = req.headers['authorization']
        if (!token) {
            return res.status(401).send('Access Denied')
        }
        try {
            const verified = this.verifyToken(token)
            req.user = verified
            next()
        } catch (error) {
            console.log(error)
            res.status(400).send('Invalid Token')
        }
    }
}
