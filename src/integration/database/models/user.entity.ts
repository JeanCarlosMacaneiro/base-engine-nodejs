import BaseModelEntity from "./base-entities/base-model.entity";

const { DataTypes } = require('sequelize');
/**
 * Definition model sequelize 
 * IntegrationAppEntity class with table sec_user 
 */
class UserEntity extends BaseModelEntity{

    /**
     * Create Model table relation IntegrationAppEntity linked Credentials
     * @param {*} sequelize 
     * @param {*} DataTypes 
     */
    constructor(sequelize:any){
        super();

        // Define model table             TableName
        this.instance = sequelize.define('sec_userole',{
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            company : {
                type: DataTypes.INTEGER
            },
            name : {
                type: DataTypes.STRING
            },
        }, 
        { 
            timestamps: false,
        });
    }
}

export default UserEntity;
