import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const schema = new Schema({
    dateStarted: {
        type: Date,
        required: true
    },
    renewalDate: {
        type: Date,
        required: true
    },
    subscriptionName: {
        type: String,
        required: true
    },
    subscriptionCost: {
        type: Number,
        required: true
    }
})

type Subscription = InferSchemaType<typeof schema>

const subscriptionModel = mongoose.model('Subscription', schema);

export default subscriptionModel;
