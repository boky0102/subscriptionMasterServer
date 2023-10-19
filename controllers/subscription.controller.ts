import {Request, Response, NextFunction} from "express";
import { MarkSubscriptionNotification, deleteOneSubscription, getAllSubscriptions, subscriptionStopped } from "../srevices/subscription.service";
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

export async function deleteSubscription(req: Request, res: Response, next: NextFunction){
    try{
        if(req.userId){
            const userId = req.userId as JwtPayload;
            const subscriptionDeleted = await deleteOneSubscription(userId, req.params.subscriptionId);
            if(subscriptionDeleted){
                res.status(200).send();
            } else {
                throw new AppError(500, "Couldnt delete subscription");
            }
        } else{
            throw new AppError(400, "JWT COOKIE ISN't SET UP");
        }
    } catch(error){
        next(error);
    }
}

export async function subscriptionStop(req: Request, res: Response, next: NextFunction){
    try{
        if(req.userId){
            const userId = req.userId as JwtPayload;
            const subscriptionUpdated = await subscriptionStopped(userId, req.body.subscriptionId);
            if(subscriptionUpdated){
                console.log("Updated succesfully")
                res.status(200).send();
            } else {
                throw new AppError(500, "Internal server error - failed update");
            }
        } else {
            throw new AppError(400, "JWT COOKIE ISN'T SET UP")
        }
    } catch(error){
        next(error);
    }
}