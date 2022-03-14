import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import Error from '../interfaces/error.interface'

// const handleUnauthError = (next: NextFunction){
//   const error: Error = new Error()
// }
// const handleUnauthorizedError = (next: NextFunction) => {
//   const error: Error = new Error('Login Error, Please login again')
//   error.status = 401
//   next(error)
// }
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
          // throw new Error(
          //     `cannot authenticate user from user validation middleware:`,
          // )
        }
      } else {
        handleUnauthorizedError(next)
        // throw new Error(
        //     `cannot authenticate user from user validation middleware:`,
        // )
      }
    } else {
      handleUnauthorizedError(next)
      // throw new Error(
      //     `cannot validate user from user validation middleware:`,
      // )
    }
    // check auth header validate
    // check token value
    // check if it bearer token or not
    // verify token (decode using jwtsecret)
    // next
    // failed to auth user
    // token type not bearer
    // if not validate auth header
  } catch (error) {
    handleUnauthorizedError(next)
    // throw new Error(
    //     `cannot authenticate user from user validation middleware:
    //     ${error}`)
  }
}

export default validateTokenMiddleware
