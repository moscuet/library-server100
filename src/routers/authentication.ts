import express from 'express'
import { signup } from '../controllers/authentication'
import { signin } from '../controllers/authentication'
const router = express.Router()

router.post('/signup', signup)

router.post('/signin', signin)

export default router
