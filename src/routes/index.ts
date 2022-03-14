import {Router} from 'express'
// import errorMiddleware from '../middlewares/error.middleware'
import usersRoutes from './api/users.routes'
import ordersRoutes from './api/orders.routes'
import productsRoutes from './api/products.routes'

const routes = Router()

// routes.use(errorMiddleware)
routes.use('/users', usersRoutes)
routes.use('/orders', ordersRoutes)
routes.use('/products', productsRoutes)

export default routes
