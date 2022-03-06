import {Router} from 'express'
import * as controllers from '../../controllers/users.controller'

const routes = Router()

routes.route('/')
    .get(controllers.getAllUsers)
    .post(controllers.createUser)
routes.route('/:id')
    .get(controllers.getUser)
    .patch(controllers.updateUser)
    .delete(controllers.deleteUser)
// auth
routes.route('/authenticate')
    .post(controllers.authenticate)
export default routes
