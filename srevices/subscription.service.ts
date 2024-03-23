import { Collection, ObjectId } from "mongodb";
import { AppError } from "../middleware/routesErrorHandler";
import Subscription from "../modules/subscription";
import User from "../modules/user";
import { collections } from "./database.service";
import { JwtPayload } from "jsonwebtoken";
import { sendEmailTo } from "../utility/email.utilities";
import { EmailInterface } from "../utility/email.utilities";

export async function validateSubscriptionData(subscription: Subscription){
    if(subscription.dateAdded !== undefined && subscription.renewalDate !== undefined && subscription.subscriptionName !== undefined && subscription.chargeAmount !== undefined && subscription.currency !== undefined){
        if(subscription.dateAdded instanceof Date && subscription.renewalDate instanceof Date){
            return subscription
        } else{
            throw new Error("Date fields must be in correct date format");
        }
    } else {
        
        throw new AppError(400, "All fields must be filled");
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
                let userColorData;
                if(Array.isArray(userDocument.userCategoryColors)){
                    userColorData = userDocument.userCategoryColors?.reduce((acc, curr) => ({
                        ...acc,
                        [curr.category]: curr.color
                    }), {});
                } else{
                    userColorData = userDocument.userCategoryColors;
                }
                

                return {
                    subscriptions: userDocument.subscriptions,
                    username: userDocument.username,
                    email: userDocument.email,
                    userCategoryColor: userColorData,
                    preferredCurrency: userDocument.preferredCurrency
                };
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
        const cursor = await collections.user.find({});
        for await (const doc of cursor){
            if(doc.email && doc.subscriptions){
                doc.subscriptions.forEach((subscription: Subscription) => {
                    const subscriptionRenewalDate = new Date(subscription.renewalDate);
                    const subscriptionRenewalDay = subscriptionRenewalDate.getDate();
                    console.log(`${subscription.subscriptionName} ----- renewal: ${subscriptionRenewalDay} ----- alertDay: ${currentDay + 1} --- notify: ${subscription.emailNotification}`);
                    if(subscriptionRenewalDay === currentDay + 1 && subscription.emailNotification === true){
                        const emailData: EmailInterface = {
                            subscriptionName: subscription.subscriptionName,
                            chargeAmount: subscription.chargeAmount,
                            email: doc.email,
                            username: doc.username
                        }
                        sendEmailTo(emailData);
                    }
                })
            } else {
                console.log("USER :", doc.username, " NO EMAIL");
            }
            
        }
    } else {
        throw new AppError(500, "Internal server errror");
    }
    
}

export async function MarkSubscriptionNotification(userId: JwtPayload, subscriptionId: string){
    const userIdDB = new ObjectId(userId.userId);
    const user = await collections.user?.findOne<User>({_id: userIdDB});
    const updatedSubscriptions = user?.subscriptions?.map((subscription) => {
        if(subscription.id?.toString() === subscriptionId){
            if(subscription.emailNotification === undefined || subscription.emailNotification === false){
                subscription.emailNotification = true;
            } else{
                subscription.emailNotification = false;
            }
            return subscription
        } else {
            return subscription
        }
    })

    const subscriptionUpdated = await collections.user?.updateOne({
        _id: userIdDB
    }, {
        "$set" : {
            subscriptions: updatedSubscriptions
        }
    })
    if(subscriptionUpdated){
        return true
    } else {
        throw new AppError(500, "Internal server error - couldn't update subscriptions");
    }
}

export async function deleteOneSubscription(userId: JwtPayload, subscriptionId: string){
    const userIdDB = new ObjectId(userId.userId);
    const user = await collections.user?.findOne<User>({_id: userIdDB});
    let foundFlag = false;
    const filteredSubscriptionsArray = user?.subscriptions?.filter((subscription) => {
        if(subscription.id?.toString() !== subscriptionId){
            return subscription
        } else{
            foundFlag = true;
        }
    })
    const userUpdated = await collections.user?.updateOne({_id: userIdDB},{
        "$set" : {
            subscriptions: filteredSubscriptionsArray
        }
    });
    if(!foundFlag){
        throw new AppError(404, "Subscription not found");
    }
    if(userUpdated){
        return true
    } else {
        return false
    }  
}

export async function subscriptionStopped(userId: JwtPayload, subscriptionId: string){
    const userIDDB = new ObjectId(userId.userId);
    const user = await collections.user?.findOne<User>({_id: userIDDB});
    const updatedSubscriptions = user?.subscriptions?.map((subscription) => {
        if(subscription.id?.toString() === subscriptionId){
            subscription.subscriptionStopped = new Date(2023, 5, 20);
            return subscription
        } else return subscription
    });

    const userUpdated = await collections.user?.updateOne({_id: userIDDB}, {
        "$set" : {
            subscriptions: updatedSubscriptions
        }
    })
    if(!userUpdated){
        throw new AppError(500, "Internal server error - can't update subscription");
    } else {
        return true
    }
}
