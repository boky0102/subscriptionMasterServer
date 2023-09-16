import express ,{ NextFunction } from "express";

async function homeController(req: express.Request, res: express.Response, next: express.NextFunction){
    try{
        res.status(200).send();


    } catch(error){
        next(error);
    }
}

export default homeController;