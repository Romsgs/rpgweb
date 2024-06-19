import { Router, Request, Response } from 'express';
import { AuthController } from '../auth/authController';

const authController = new AuthController();

const authRouter = Router();

// http://localhost:3001/api/v1/auth/register
authRouter.post('/register', (req: Request, res: Response) => authController.register(req, res));

// http://localhost:3001/api/v1/auth/login
authRouter.post('/login', (req: Request, res: Response) => authController.login(req, res));

export default authRouter;
