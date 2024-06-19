import { UserRepository } from '../users/users.repository'
import * as jwt from 'jsonwebtoken'
import * as argon from 'argon2'
import { User } from '@prisma/client'

const authService = new AuthService()

import { IAuthService, IAuthcontroller, loginDTO, registerUserDTO } from './AuthInterfaces'
import { AuthService } from './auth.service'

export class AuthController implements IAuthcontroller {

    // Register a new user
    async register(body: registerUserDTO): Promise<User> {
        return await authService.register(body.email, body.name, body.password)
    }

    // Login user and return JWT token
    async login(body: loginDTO): Promise<string | null> {
        const { email, password } = body;
        return await authService.login(email, password)
    }
}
