import { Collection, ObjectId } from "mongodb";
import { AppError } from "../middleware/routesErrorHandler";
import Subscription from "../modules/subscription";
import User from "../modules/user";
import { collections } from "./database.service";
import { JwtPayload } from "jsonwebtoken";

export async function validateSubscriptionData(subscription: Subscription){
    if(subscription.dateAdded === undefined || subscription.renewalDate === undefined || subscription.subscriptionName === undefined || subscription.chargeAmount === undefined){
        throw new AppError(400, "All fields must be filled");
    } else {
        if(subscription.dateAdded instanceof Date && subscription.renewalDate instanceof Date){
            return subscription
        } else{
            throw new Error("Date fields must be in correct date format");
        }
    }
}

export async function insertNewSubscription(subscription: Subscription, userId: JwtPayload){

    const currentUserId = new ObjectId(userId.toString());
    subscription.id = new ObjectId
    
    await collections.user?.updateOne({_id: currentUserId}, {
        $push: {subscriptions: subscription}
    });
}

export async function getAllSubscriptions(userId: JwtPayload){
    
    const currentUserId = new ObjectId(userId.toString());
    if(currentUserId){
        if(collections.user){

            const userDocument = await collections.user.findOne<User>({_id: currentUserId})
            
            if(userDocument){
                return userDocument.subscriptions;
            } else {
                throw new AppError(400, "Bad request");
            }
            
        } else{
            throw new AppError(500, "INTERNAL SERVER ERROR - DATABASE");
        }
        
    } else{
        throw new AppError(400, "JWT NOT SET UP ON SERVER");
    }
    

}

