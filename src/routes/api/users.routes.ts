import {Router} from 'express'
import * as controllers from '../../controllers/users.controller'
import authMiddleware from '../../middlewares/authentication.middleware'

const routes = Router()

routes.route('/')
    .get(authMiddleware, controllers.getAllUsers)
    .post(controllers.createUser)
routes.route('/:id')
    .get(controllers.getUser)
    .patch(controllers.updateUser)
    .delete(controllers.deleteUser)
routes.route('/:id/orders')
    .get(controllers.getUserOrders)
// auth
routes.route('/authenticate')
    .post(controllers.authenticate)
export default routes
