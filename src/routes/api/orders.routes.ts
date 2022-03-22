import {Router} from 'express'
import * as controllers from '../../controllers/order.controller'
import authMiddleware from '../../middlewares/authentication.middleware'

const routes = Router()

routes.route('/')
    .get(authMiddleware, controllers.getAllOrders)
    .post(controllers.createOrder)
routes.route('/:id')
    .get(controllers.getOrder)
    .patch(controllers.updateOrder)
    .delete(controllers.deleteOrder)
routes.route('/:id/products')
    .post(controllers.addProduct)
    .get(controllers.getOrderProducts)
routes.route('/:id/products/:pid')
    .delete(controllers.deleteProduct)
export default routes
