import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth'
const JwtTokenAtuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]
    const accessTokenSecret = authConfig.secret
    jwt.verify(token, accessTokenSecret, (err: any, user: any) => {
      if (err) {
        res.status(403).json({
          status: 'failed authenticate',
          statusCode: 403,
          message: 'Failed to authenticate user.',
        })
      }

      req.user = user
      next()
    })
  } else {
    res.status(401).json({
      status: 'failed authenticate',
      statusCode: 403,
      message: 'No token provided',
    })
  }
}
export default JwtTokenAtuthenticate
