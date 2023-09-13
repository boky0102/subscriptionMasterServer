import express ,{ NextFunction } from "express";

async function homeController(req: express.Request, res: express.Response, next: express.NextFunction){
    try{
        
        console.log("uso");
        res.status(200).send();


    } catch(error){
        next(error);
    }
}

export default homeController;