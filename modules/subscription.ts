import { ObjectId } from "mongodb";

type subscriptionCategories = "Streaming service" | "Gaming" | "Clothing" | "Food" | "Utility" | "Education" | "Software" | "Other"

export default class Subscription{
    constructor(
        public subscriptionName: string,
        public dateAdded: Date,
        public renewalDate: Date,
        public chargeAmount: number,
        public currency: string,
        public category?: subscriptionCategories,
        public id?: ObjectId,
        public emailNotification?: boolean,
        public freeTrial?: boolean,
        public subscriptionStopped?: Date
    ){}
}