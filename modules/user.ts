import { ObjectId } from "mongodb";
import Subscription from "./subscription";

type subscriptionCategories =
     | 'Streaming'
     | 'Gaming'
     | 'Clothing'
     | 'Food'
     | 'Utility'
     | 'Education'
     | 'Software'
     | 'Other';

type UserCategoryColors = {
    category: subscriptionCategories,
    color: string
}

export default class User{
    constructor(
        public username: string,
        public password: string,
        public userCategoryColors?: UserCategoryColors[],
        public email?: string,
        public emailVerified?: boolean,
        public verificationKey?: string,
        public id?: ObjectId,
        public confirmPassword?: string,
        public subscriptions?: [Subscription],
        public preferredCurrency?: currencies
    ) {}
}