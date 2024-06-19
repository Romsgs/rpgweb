import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { IAuthcontroller, loginDTO, registerUserDTO } from './AuthInterfaces';

const authService = new AuthService();

export class AuthController implements IAuthcontroller {

    // Register a new user
    async register(req: Request, res: Response): Promise<void> {
        const { email, name, password }: registerUserDTO = req.body;
        try {
            const user = await authService.register(email, name, password);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Login user and return JWT token
    async login(req: Request, res: Response): Promise<void> {
        const { email, password }: loginDTO = req.body;
        try {
            const token = await authService.login(email, password);
            if (token) {
                res.json({ token });
            } else {
                res.status(400).json({ message: 'Invalid credentials' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
