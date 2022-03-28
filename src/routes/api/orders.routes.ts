import {Router} from 'express'
import * as controllers from '../../controllers/order.controller'
import authMiddleware from '../../middlewares/authentication.middleware'

const routes = Router()

routes.route('/')
    .get(authMiddleware, controllers.getAllOrders)
    .post(authMiddleware, controllers.createOrder)
routes.route('/:id')
    .get(authMiddleware, controllers.getOrder)
    .patch(authMiddleware, controllers.updateOrder)
    .delete(authMiddleware, controllers.deleteOrder)
routes.route('/:id/products')
    .post(authMiddleware, controllers.addProduct)
    .get(authMiddleware, controllers.getOrderProducts)
routes.route('/:id/products/:pid')
    .delete(authMiddleware, controllers.deleteProduct)
export default routes
