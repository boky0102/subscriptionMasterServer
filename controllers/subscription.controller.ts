import {Request, Response, NextFunction} from "express";
import { MarkSubscriptionNotification, getAllSubscriptions } from "../srevices/subscription.service";
import { AppError } from "../middleware/routesErrorHandler";
import { JwtPayload } from "jsonwebtoken";


export async function getSubscriptionsController(req: Request, res: Response, next: NextFunction){
    try{
        if(req.userId){
            const userId= req.userId as JwtPayload;
            const subscriptions = await getAllSubscriptions(userId.userId);
            console.log(subscriptions);
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

export async function putSubscriptionNotification(req: Request, res: Response, next: NextFunction){
    try{
        if(req.userId){
            const userId = req.userId as JwtPayload;
            const subscriptionMarked = await MarkSubscriptionNotification(userId, req.body.subscriptionId);
            if(subscriptionMarked){
                res.status(200).send();
            } else {
                throw new AppError(500, "Couldn't update subscription in database");
            }
        } else {
            throw new AppError(400, "JWT COOKIE ISN't SET UP");
        }
    } catch(error){
        next(error);
    }
}