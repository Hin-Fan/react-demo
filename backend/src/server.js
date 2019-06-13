import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { router } from './lib/router'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(router)

export default app
