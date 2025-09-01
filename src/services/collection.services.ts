import { Container } from "inversify";
import ILogger from "./interface/logger/i-logger";
import LoggerWinstonIntegration from "../integration/logger/Logger-winston.integration";
import SequelizeManagerIntegration from "../integration/database/sequilize-manenger.integration";
import IDbManager from "./interface/db/i-dbManager";

/**
 * Container
 * @description Container to register services
 */
const container = new Container();

/**
 * ServiceType
 * @description Enum to define service type
 */
const enum ServiceType{
    Logger = "ILogger",
    DbManager = "IDbManager"
}

/**
 * Register services in container
 */
container.bind<ILogger>("ILogger").to(LoggerWinstonIntegration).inSingletonScope();
container.bind<IDbManager>("IDbManager").to(SequelizeManagerIntegration).inSingletonScope();

/**
 * Singleton pattern to get service 
 * by any class required
 * @param serviceIdentifier 
 * @returns <T> Service instance request
 */
const getService = <T>(serviceType:ServiceType): T => {
    const nameOf = serviceType as string;
    return container.get<T>(nameOf);
}

export { getService, ServiceType };