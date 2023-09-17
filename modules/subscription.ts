import { ObjectId } from "mongodb";

export default class Subscription{
    constructor(
        public subscriptionName: string,
        public dateAdded: Date,
        public renewalDate: Date,
        public chargeAmount: number,
        public category?: string,
        public id?: ObjectId
    ){}
}