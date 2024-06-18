import express, { Express } from 'express'
import { createServer } from 'node:http'
import socketRouter from './src/routes/main.router'


import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3001

const app: Express = express()
const server = createServer(app)

app.use(express.json())
app.use('/socket', socketRouter)

server.listen(PORT, () => { console.log(`server running on ${PORT}`) })

