import { Collection, ObjectId } from "mongodb";
import { AppError } from "../middleware/routesErrorHandler";
import Subscription from "../modules/subscription";
import User from "../modules/user";
import { collections } from "./database.service";
import { JwtPayload } from "jsonwebtoken";
import { sendEmailTo } from "../controllers/Utilities/email.utilities";
import { EmailInterface } from "../controllers/Utilities/email.utilities";
import e from "cors";

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

export async function getAllSubscriptionsRenewalSoon(){  //TREBA DORADA DA BUDE DRUGACIJE ZA SVAKOG USERA I IMPLEMENTACIJA ZA EMAIL
    if(collections.user){
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        console.log("CURRENT DAY", currentDay);
        const cursor = await collections.user.find({});
        for await (const doc of cursor){
            doc.subscriptions.forEach((subscription: Subscription) => {
                console.log(subscription);
                const subscriptionRenewalDate = new Date(subscription.renewalDate);
                const subscriptionRenewalDay = subscriptionRenewalDate.getDate();
                if(subscriptionRenewalDay === currentDay + 1){
                    const emailData: EmailInterface = {
                        subscriptionName: subscription.subscriptionName,
                        chargeAmount: subscription.chargeAmount,
                        email: "boky.borna@gmail.com",
                        username: doc.username
                    }
                    sendEmailTo(emailData);
                }
            })
        }
    } else {
        throw new AppError(500, "Internal server errror");
    }
    
}

