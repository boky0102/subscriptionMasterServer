import { ObjectId } from "mongodb";
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
    
    await collections.user?.updateOne({_id: currentUserId}, {
        $push: {subscriptions: {subscription}}
    });
}

