import express from 'express'
import cors from 'cors'
import { signup } from '../controllers/authentication'
import { signin } from '../controllers/authentication'
const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.post('/signup', signup)
router.post('/signin', signin)

export default router
