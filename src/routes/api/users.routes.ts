import {Router} from 'express'
import * as controllers from '../../controllers/users.controller'
import authMiddleware from '../../middlewares/authentication.middleware'

const routes = Router()

routes.route('/')
    .get(authMiddleware, controllers.getAllUsers)
    .post(controllers.createUser)
routes.route('/:id')
    .get(authMiddleware, controllers.getUser)
    .patch(authMiddleware, controllers.updateUser)
    .delete(authMiddleware, controllers.deleteUser)

// current order by user
routes.route('/:id/orders')
    .get(authMiddleware, controllers.getUserOrders)
// auth
routes.route('/authenticate')
    .post(controllers.authenticate)
export default routes
