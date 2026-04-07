
class BaseModelEntity{

    protected instance: any;

    /**
     * query find fist row query
     * @param {*}
     * @example { attributes: ['nmColumn', 'nmColumn2'], where: { authorId: 2 } }  
     * @example { where: { nmColumn: value } }
     * @example { where: { nmColumn: { [Op.eq | Op.eq]: 2 } }
     */
    public async findOne(params:object){
        return await this.instance.findOne(params);
    }
    /**
     * get all rows from table by definition columns
     * @param {*}
     * @example { attributes: ['nmColumn', 'nmColumn2'], where: { id: 2 } }  
     * @example { where: { nmColumn: value } }
     * @example { where: { nmColumn: { [Op.eq]: 2 }
     */
    public async findAll(params:object){
        return  await this.instance.findAll(params);
    }
    /**
     * Update entity 
     * @param {*} params 
     * @example {column: value}, {where: { nmColumn: value } }
     */
    public async update(columnsSet:object, whereParams:object){
        return await this.instance.update(columnsSet, whereParams);
    }
    /**
     * Create entity 
     * @param {*} params 
     * @example {column: value, column: value}
     */
    public async create(params:object){
        return await this.instance.create(params);
    }
}

export default BaseModelEntity;
