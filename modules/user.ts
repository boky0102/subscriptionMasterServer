import { ObjectId } from "mongodb";
import Subscription from "./subscription";

export default class User{
    constructor(
        public username: string,
        public password: string,
        public id?: ObjectId,
        public confirmPassword?: string,
        public subscriptions?: [Subscription]
    ) {}
}