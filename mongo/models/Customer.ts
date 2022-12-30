import { Schema, models, model, ObjectId } from "mongoose";
import { ICartItem } from "@/redux/cart";

export interface ICustomer {
    _id?: ObjectId;
    customer_id: string;
    user_id: string;
    cart_items: ICartItem[];
}

const customerSchema = new Schema({
    customer_id: { type: String, required: true },
    user_id: { type: String, required: true },
    cart_items: { type: Array },
    created_at: { type: Date },
    updated_at: { type: Date }
});

export const Customer = models.Customer || model('Customer', customerSchema, 'customers');