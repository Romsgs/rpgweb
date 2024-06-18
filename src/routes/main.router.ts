import {Router, Request, Response} from 'express'

const socketRouter = Router()

socketRouter.get('/', (req:Request, res:Response)=>res.send('<h1>Hello, World</h1>'))

export default socketRouter
