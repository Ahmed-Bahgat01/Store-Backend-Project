import {Router} from 'express'
import * as controllers from '../../controllers/order.controller'
import authMiddleware from '../../middlewares/authentication.middleware'

const routes = Router()

routes.route('/')
    .get(controllers.getAllOrders) // deleted auth
    .post(authMiddleware, controllers.createOrder) // added auth
routes.route('/:id')
    .get(controllers.getOrder)
    .patch(authMiddleware, controllers.updateOrder) // added auth
    .delete(authMiddleware, controllers.deleteOrder) // added auth
routes.route('/:id/products')
    .post(authMiddleware, controllers.addProduct) // added auth
    .get(controllers.getOrderProducts)
routes.route('/:id/products/:pid')
    .delete(authMiddleware, controllers.deleteProduct) // added auth
export default routes
