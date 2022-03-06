import {Request, Response, NextFunction} from 'express'
import Error from '../interfaces/error.interface'

const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction) => {
  const status = error.errorStatus || 500
  const message = error.errorMessage || 'something went wrong'
  res.status(status).json({status, message})
}
export default errorMiddleware
