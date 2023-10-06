import { ObjectId } from "mongodb";

type subscriptionCategories = "Streaming service" | "Gaming" | "Clothing" | "Food" | "Utility" | "Education" | "Software" | "Other"

export default class Subscription{
    constructor(
        public subscriptionName: string,
        public dateAdded: Date,
        public renewalDate: Date,
        public chargeAmount: number,
        public category?: subscriptionCategories,
        public id?: ObjectId,
        public emailNotification?: boolean
    ){}
}