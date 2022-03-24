import {Router} from 'express'
import * as controllers from '../../controllers/product.controller'
import authMiddleware from '../../middlewares/authentication.middleware'

const routes = Router()

routes.route('/')
    .get(controllers.getAllProducts) // deleted auth
    .post(authMiddleware, controllers.createProduct) // added auth
routes.route('/:id')
    .get(controllers.getProduct)
    .patch(authMiddleware, controllers.updateProduct) // added auth
    .delete(authMiddleware, controllers.deleteProduct) // added auth

export default routes
