import {Request, Response, NextFunction} from "express";
import { getAllSubscriptions } from "../srevices/subscription.service";
import { AppError } from "../middleware/routesErrorHandler";
import { JwtPayload } from "jsonwebtoken";


export async function getSubscriptionsController(req: Request, res: Response, next: NextFunction){
    try{
        if(req.userId){
            const userId= req.userId as JwtPayload;
            const subscriptions = await getAllSubscriptions(userId.userId);
            if(subscriptions){
                res.send(subscriptions);
            } else {
                res.send([]);
            }
            
        }else{
            throw new AppError(400, "JWT COOKIE ISN'T SET UP");
        }

    } catch(error){
        next(error);
    }
    
}