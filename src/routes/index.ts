import {Router} from 'express'
// import errorMiddleware from '../middlewares/error.middleware'
import usersRoutes from './api/users.routes'

const routes = Router()

// routes.use(errorMiddleware)
routes.use('/users', usersRoutes)

export default routes
