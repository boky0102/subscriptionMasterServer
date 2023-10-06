import express from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { insertNewSubscription, validateSubscriptionData } from '../srevices/subscription.service';
import Subscription from '../modules/subscription';
import { AppError } from '../middleware/routesErrorHandler';


async function addSubscription(req: express.Request, res: express.Response, next: express.NextFunction){
    try{
        
        
        const newSubscription: Subscription = {
            subscriptionName: req.body.subscriptionName,
            renewalDate: new Date(req.body.renewalDate),
            dateAdded: new Date(req.body.dateAdded),
            chargeAmount: req.body.chargeAmount,
            emailNotification: req.body.emailNotification,
            category: req.body.category
        }

        const isSubscriptionValid = await validateSubscriptionData(newSubscription);
        if(!isSubscriptionValid){
            throw new AppError(400, "Subscription form isn't valid");
        } else{
            if(req.userId){

                const userId = req.userId as JwtPayload;
                console.log("JWT payload",req.userId);
                await insertNewSubscription(newSubscription, userId.userId); // used toString because userId is of type jwtPayload
                res.status(200).send();
            } else{
                throw new AppError(500, "Internal server error - JWT payload isn't correctly set up");
            }
            
        }

    } catch(error){
        next(error);
    }
}

export default addSubscription;