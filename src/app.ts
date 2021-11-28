import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'
import compression from 'compression'

import movieRouter from './routers/book'
import authorRouter from './routers/author'
import customerRouter from './routers/customer'
import borrowRouter from './routers/borrow'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(compression())
app.use(express.json())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

// Use movie router
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/customers', customerRouter)
app.use('/api/v1/borrows', borrowRouter)
app.use('/api/v1/authors', authorRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
