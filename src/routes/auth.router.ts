import { Router, Request, Response } from 'express'
import { AuthService } from '../auth/auth.service'

const authService = new AuthService()

const authRouter = Router()

authRouter.post('/', (req: Request, res: Response) => authService)

export default authRouter
