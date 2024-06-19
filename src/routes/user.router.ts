import { Router, Request, Response } from 'express'
import { UserController } from '../users/user.controller'

const userController = new UserController()

const userRouter = Router()

userRouter.get('/many', (req: Request, res: Response) => userController.getAllUsers())
userRouter.get('/id', (req: Request, res: Response) => userController.getUserById(req.body))
userRouter.get('/email', (req: Request, res: Response) => userController.getUserByEmail(req.body))
userRouter.delete('/:id', (req: Request, res: Response) => userController.deleteUserById(req.params.id))
userRouter.patch('/password', (req: Request, res: Response) => userController.updateUserPassword(req.body))


export default userRouter