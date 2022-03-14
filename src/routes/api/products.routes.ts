import {Router} from 'express'
import * as controllers from '../../controllers/product.controller'
import authMiddleware from '../../middlewares/authentication.middleware'

const routes = Router()

routes.route('/')
    .get(authMiddleware, controllers.getAllProducts)
    .post(controllers.createProduct)
routes.route('/:id')
    .get(controllers.getProduct)
    .patch(controllers.updateProduct)
    .delete(controllers.deleteProduct)
// auth
// routes.route('/authenticate')
//     .post(controllers.authenticate)
export default routes
