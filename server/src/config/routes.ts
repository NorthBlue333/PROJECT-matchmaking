// import { Request, Response } from "express"
import { NodesController } from "../controllers/nodes.controller"
import { RolesController } from '../controllers/roles.controller'
import { UsersController } from '../controllers/users.controller'
import { ApiController } from '../controllers/api.controller'
export class Routes {
  public nodesController: NodesController = new NodesController()
  public rolesController: RolesController = new RolesController()
  public userController: UsersController = new UsersController()
  public routes(app): void {

    app.route('/')
    .get(new ApiController().find)
    // USERS Routes
    app.route('/users')
    .get(this.userController.find)
    .post(this.userController.create)

    app.route('/users/:id')
    .get(this.userController.findById)
    .put(this.userController.updateById)
    .delete(this.userController.delete)

    // ROLES Routes
    app.route('/roles')
    .get(this.rolesController.find)
    .post(this.rolesController.create)

    app.route('/roles/:id')
    .get(this.rolesController.findById)
    .put(this.rolesController.updateById)
    .delete(this.rolesController.delete)


  }
}