import { Request, Response } from "express";
import IDbManager from "../../services/interface/db/i-dbManager";
import { getService, ServiceType } from "../../services/collection.services";
import UserEntity from "../../integration/database/models/user.entity";
import ILogger from "../../services/interface/logger/i-logger";

class UsersController{

    private _dbManager: IDbManager;
    private _logger: ILogger;
    private _userEntityModel:UserEntity | undefined;
    
    constructor(){
        this._dbManager = getService<IDbManager>(ServiceType.DbManager);
        this._logger = getService<ILogger>(ServiceType.Logger);

        this._userEntityModel = this._dbManager.getEntity(UserEntity) as UserEntity | undefined;
        if(!this._userEntityModel){
            this._logger.error("Error getting user entity model");
            throw new Error("Failed to initialize UserEntity model");
        }
    }
    /**
     * Get user by id
     * @param req 
     * @param res 
     */
    async getUser(req: Request, res: Response){
        const usr = await this._userEntityModel?.findOne({where: {id: 3}});
        res.send(usr); 
    }
}

export default UsersController;