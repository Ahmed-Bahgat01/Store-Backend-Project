import {Router} from 'express'
import * as controllers from '../../controllers/product.controller'
import authMiddleware from '../../middlewares/authentication.middleware'

const routes = Router()

routes.route('/')
    .get(controllers.getAllProducts)
    .post(authMiddleware, controllers.createProduct)
routes.route('/:id')
    .get(controllers.getProduct)
    .patch(authMiddleware, controllers.updateProduct)
    .delete(authMiddleware, controllers.deleteProduct)

export default routes
