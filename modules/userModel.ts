import { Schema, InferSchemaType } from 'mongoose';
import mongoose from 'mongoose';
import subscriptionModel from './subscriptionModel';

const schema = new Schema({
    username: {
        type: String,
        minLength: 4,
        maxLength: 20,
        required: true,
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 30,
        required: true
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
    },
    subscriptions: [subscriptionModel]
});

type User = InferSchemaType<typeof schema>

const UserModel = mongoose.model('User', schema);

export default UserModel;