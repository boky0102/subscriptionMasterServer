import express from 'express';
import { AppError } from '../middleware/routesErrorHandler';

async function logoutController(req: express.Request, res: express.Response, next: express.NextFunction){
    try{
        res.clearCookie('jwt');
        res.send();
    } catch(error){
        throw new AppError(500, "Server error - can't clean up cookie");
    }
}

export default logoutController;