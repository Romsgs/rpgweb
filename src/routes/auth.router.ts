import { Router, Request, Response } from 'express'
import { AuthController } from '../auth/authController'

const authController = new AuthController()

const authRouter = Router()

authRouter.post('/user', (req: Request, res: Response) => authController.register(req.body))
authRouter.post('/login', (req: Request, res: Response) => authController.login(req.body))


export default authRouter
