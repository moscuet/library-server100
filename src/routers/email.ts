import express from 'express'
import { sendEmail } from '../controllers/email'

const router = express.Router()

router.post('/', sendEmail)

export default router
