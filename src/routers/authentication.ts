import express from 'express'
import cors from 'cors'
import { createCustomer } from '../controllers/customer'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix

router.post('/signup', createCustomer)

export default router
