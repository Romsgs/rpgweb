import { User } from '@prisma/client';

export interface IAuthService {
    register(email: string, name: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<string | null>;
    generateToken(user: User): string;
    verifyToken(token: string): any;
    authenticateToken(req: any, res: any, next: any): void;
}
export interface IAuthcontroller {
    register(body: registerUserDTO): Promise<User>;
    login(body: loginDTO): Promise<string | null>;
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