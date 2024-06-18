import { User } from '@prisma/client';

export interface IAuthService {
    register(body: registerUserDTO): Promise<User>;
    login(email: string, password: string): Promise<string | null>;
    generateToken(user: User): string;
    verifyToken(token: string): any;
    authenticateToken(req: any, res: any, next: any): void;
}

export interface registerUserDTO {
    name: string
    email: string
    password: string
}