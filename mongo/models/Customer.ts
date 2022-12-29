import { Schema, models, model, ObjectId } from "mongoose";

export interface ICustomer {
    _id?: ObjectId;
    customer_id: string;
    user_id: string;
}

const customerSchema = new Schema({
    customer_id: { type: String, required: true },
    user_id: { type: String, required: true },
    created_at: { type: Date },
    updated_at: { type: Date }
});

export const Customer = models.Customer || model('Customer', customerSchema, 'customers');