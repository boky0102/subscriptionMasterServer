import { ObjectId } from "mongodb";

export default class User{
    constructor(
        public username: string,
        public password: string,
        public id?: ObjectId,
        public confirmPassword?: string,
    ) {}
}