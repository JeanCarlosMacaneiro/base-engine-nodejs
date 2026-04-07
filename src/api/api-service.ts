import express, { Express, Router } from 'express';
import http from 'http';
import cors from 'cors';
import compression from "compression";
import helmet from "helmet";
import ILogger from '../services/interface/logger/i-logger';
import { getService, ServiceType } from '../services/collection.services';
import UserRoute from './routes/user/user.route';
/**
 * ApiService
 * @description Class to initialize the express app and start the server
 */
class ApiService{

    private _app:Express;
    private _server:any;
    private readonly _apiPort = process.env.API_PORT || 3002;
    private _logger?:ILogger;
    
    //TODO: Modificar para un array de RouterBase para poder agregar mas rutas por una matrix
    private _userRoute?:UserRoute;

    constructor(){
        this._logger = getService<ILogger>(ServiceType.Logger);
        // init express
        this._app = express();
        // create server http
        this._server = http.createServer(this._app);
        // additional security security-related HTTP
        this._app.use(helmet());
        // cors origin enable need configuration to release
        this._app.use(cors());
        // compress body response
        this._app.use(compression());
        // for parsing application/json
        this._app.use(express.json({ limit: '50mb' })) 
        // for parsing application/x-www-form-urlencoded
        this._app.use(express.urlencoded({ limit: '50mb', extended: true })) 
        // additional routes business Rules
        this._addRoutes();
        // start server
        this._server.listen(this._apiPort).on('listening', () => {
            this._logger?.info(`📡  Rest listener http on port: ${this._apiPort} \n`);
        });
    }
    /**
     * Add routes to the express app
     */
    private _addRoutes(){
        this._userRoute = new UserRoute();
        for(const [index, route] of this._userRoute.router.entries()){
            this._app.use(`/api/v${index+1}`, route);
        }
    } 
}
export default ApiService;