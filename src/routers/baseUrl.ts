import express from 'express'
const router = express.Router()
import { Request, Response, NextFunction } from 'express'

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'ok',
    statusCode: 200,
    message: 'Welcome To Library Api',
  })
  return
})

export default router
