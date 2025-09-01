
interface IDbManager {
    
    executeQuery(query:string, params?:object): Promise<any>;
    getEntity<T>(entity: T): T | undefined;
}

export default IDbManager;
