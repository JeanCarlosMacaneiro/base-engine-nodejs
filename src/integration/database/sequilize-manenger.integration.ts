import { BindOrReplacements, Sequelize } from "sequelize";
import { getService, ServiceType } from "../../services/collection.services";
import IDbManager from "../../services/interface/db/i-dbManager";
import ILogger from "../../services/interface/logger/i-logger";
import UserEntity from "./models/user.entity";
import BaseModelEntity from "./models/base-entities/base-model.entity";
/**
 * SequelizeManagerIntegration
 * @description Class to initialize the sequelize connection and define models
 */
class SequelizeManagerIntegration implements IDbManager{
    public userEntity?: UserEntity;
    private _connection:Sequelize;
    private _logger: ILogger;
    private _entities:Array<BaseModelEntity> = new Array<BaseModelEntity>();
    constructor(){
        
        this._logger = getService<ILogger>(ServiceType.Logger);

        this._connection = new Sequelize
        (
            process.env.DB_MYSQL_NAME_DB as string,
            process.env.DB_MYSQL_USER as string,
            process.env.DB_MYSQL_PASSW as string,
            {
                host:process.env.DB_MYSQL_HOST,
                dialect:'mysql',
                define: {
                    freezeTableName: true
                },
            }
        ); 
        
        this._connection.authenticate()
        .then(() => {
            this._logger.info("🗄️   Data base connection: Success");
        })
        .catch((err:any) => {
            this._logger.error("💥  Data base connection: Error: " + err);
        });
        
        this._initEntitiesRelation();
    }
    /**
     * 
     * @param {*} query 
     * @param {*} params is a object is { nmParam:ValueParam } 
     * @returns result query or undefined if not get extract result by db
     */
    async executeQuery(query:string, params?:BindOrReplacements): Promise<any>{
        try {
            if(params){
                return await this._connection.query(query, { replacements: params});
            }
            else{
                return await this._connection.query(query);
            }
        } catch (error) {
            this._logger.error('💥 On execute query error : ' + error);
            return undefined;
        }
    }
    /**
     * Get entity model
     * @param modelType 
     * @returns  T
     */
    getEntity<T>(entity:any): T | undefined {
        try {
            const entityModel = this._entities.find((item) => item instanceof entity);
            if(entityModel){
                return entityModel as T;
            }
        } catch (error) {
            this._logger.error(`Error getting model '${entity}': ${error}`);
            return undefined;   
        }
    }

    /**
     * Initialize Model Entities Sequelize
     */
    _initEntitiesRelation(){
        this._entities.push(new UserEntity(this._connection));
    }
}

export default SequelizeManagerIntegration;