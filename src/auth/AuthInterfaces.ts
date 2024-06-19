import { User } from '@prisma/client';
import { Request, Response } from 'express';

export interface IAuthService {
    register(email: string, name: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<string | null | undefined>;
    generateToken(user: User): string;
    verifyToken(token: string): any;
    authenticateToken(req: any, res: any, next: any): void;
}
export interface IAuthcontroller {
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
}
export interface registerUserDTO {
    name: string
    email: string
    password: string
}

export interface loginDTO {
    email: string
    password: string
}