import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import Error from '../interfaces/error.interface'


const handleUnauthorizedError = (next: NextFunction) => {
  const error:Error = new Error('Access denied')
  error.status = 401
  next(error)
}

const validateTokenMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    // get auth header
    const authHeader = req.get('Authorization')
    if (authHeader) {
      const isBearer = authHeader.split(' ')[0].toLocaleLowerCase() === 'bearer'
      const token = authHeader.split(' ')[1]
      if (token && isBearer) {
        const isTokenVerified = jwt.verify(
            token,
            config.jwtSecret as unknown as string,
        )
        if (isTokenVerified) {
          next()
        } else {
          handleUnauthorizedError(next)
        }
      } else {
        handleUnauthorizedError(next)
      }
    } else {
      handleUnauthorizedError(next)
    }
  } catch (error) {
    handleUnauthorizedError(next)
  }
}

export default validateTokenMiddleware
