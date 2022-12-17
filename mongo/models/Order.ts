import mongoose, { Schema, models, model, ObjectId } from "mongoose";
import { IAddress } from "./Address";
import { ICartItem } from "@/redux/cart";

export interface IOrder {
    _id?: ObjectId;
    user_id: string;
    products: ICartItem[];
    total_cost: number;
    status: string;
    delivery: boolean;
    payment_id?: string;
    address?: any;
    created_at?: Date;
    updated_at?: Date;
}

// export const ORDER_STATUSES = {
//     awaiting_payment: 'awaiting payment',
//     pending: 'pending',
//     in_progress: 'in progress',
//     completed: 'completed',
//     shipped: 'shipped',
//     delivered: 'delivered',
//     cancelled: 'cancelled',
//     refunded: 'refunded', 
// }

const orderSchema = new Schema({
    user_id: { type: String, required: true},
    products: { type: Array, required: true },
    total_cost: { type: Number, required: true },
    status: { type: String, required: true },
    delivery: { type: Boolean, required: true },
    payment_id: { type: String },
    address: { type: Schema.Types.Mixed },
    created_at: { type: Date },
    updated_at: { type: Date }
});

export const Order = models.Order || model('Order', orderSchema, 'orders');