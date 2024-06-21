import express, { Express } from 'express'
import { createServer } from 'node:http'
import cors from 'cors'
import dotenv from 'dotenv'

import socketRouter from './src/routes/socket.router'
import userRouter from './src/routes/user.router'
import authRouter from './src/routes/auth.router'
import roomsRouter from './src/routes/rooms.router'
//creation section
dotenv.config()
const PORT = process.env.PORT || 3001
const app: Express = express()
const server = createServer(app)

// config section
app.use(cors())
app.use(express.json())

// routes section
app.use('/api/v1/socket', socketRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/room', roomsRouter)

server.listen(PORT, () => { console.log(`server running on ${PORT}`) })

