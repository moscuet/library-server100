import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'
import compression from 'compression'
import cors from 'cors'
import bodyparser from 'body-parser'

import bookRouter from './routers/book'
import authorRouter from './routers/author'
import customerRouter from './routers/customer'
import borrowRouter from './routers/borrow'
import authRouter from './routers/authentication'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

dotenv.config({ path: '.env' })
const app = express()

app.use(cors())

// parse application/json
app.use(express.json())

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Express configuration
app.set('port', process.env.PORT || 3000)
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(compression())
app.use(express.json())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

// Use movie router
app.use('/api/customers', customerRouter)
app.use('/api/borrows', borrowRouter)
app.use('/api/books', bookRouter)
app.use('/api/auths', authRouter)
app.use('/api/authors', authorRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app

//API_URL + "signup", { firstName, lastName, email, phoneNumber, address, password }
