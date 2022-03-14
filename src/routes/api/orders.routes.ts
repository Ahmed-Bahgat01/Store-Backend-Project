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
// auth
// routes.route('/authenticate')
//     .post(controllers.authenticate)
export default routes
