import UsersController from "../../controllers/users.controll";
import BaseRoutes from "../base-routes/base.router";
/**
 * Define business api user routes
 */
class UserRoute extends BaseRoutes{
    
    private _usersController: UsersController;
    constructor(){
        super();
        this._usersController = new UsersController();
        this._defineRoutes();
    }

    private _defineRoutes(){
        // this position 0 is the default router ex:api/v1/**
        this.router[0].get('/user', this._usersController.getUser.bind(this._usersController));
    }
}

export default UserRoute;
