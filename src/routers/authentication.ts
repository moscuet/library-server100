import express from 'express'
import { signup } from '../controllers/authentication'
import { signin } from '../controllers/authentication'
const router = express.Router()

// Every path we define here will get /api/users prefix
router.post('/signup', signup)
router.post('/signin', signin)

export default router
