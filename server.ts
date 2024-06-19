import express, { Express } from 'express'
import { createServer } from 'node:http'
import socketRouter from './src/routes/main.router'
import cors from 'cors'
import dotenv from 'dotenv'

//creation section
dotenv.config()
const PORT = process.env.PORT || 3001
const app: Express = express()
const server = createServer(app)

// config section
app.options('*', cors())
app.use(express.json())

// routes section
app.use('/socket', socketRouter)

server.listen(PORT, () => { console.log(`server running on ${PORT}`) })

