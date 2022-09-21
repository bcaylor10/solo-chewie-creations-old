import { Schema, models, model } from "mongoose";

export interface IAddress {
    userId: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: number;
    default?: boolean;
    deliveryInstructions?: string;
    created_at?: Date;
    updated_at?: Date;
}

const addressSchema = new Schema({
    userId: { type: String, required: true},
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true },
    default: { type: Boolean, default: false },
    deliveryInstructions: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date }
});

export const Address = models.Address || model('Address', addressSchema, 'addresses');