import { Router } from "express";

/**
 * Base class router 
 * @description Base class router to be extended by other routers express
 */
class BaseRoutes{
    /**
     * routes is an array of routers version
     * @description each position of the array is a router version
     * @example this.router[0] is the default router ex:api/v1/**
     * @example this.router[1] is the second router ex:api/v2/**
     */
    public router: Router[];
    constructor(){
        this.router = [Router()];
    }
}
export default BaseRoutes;
