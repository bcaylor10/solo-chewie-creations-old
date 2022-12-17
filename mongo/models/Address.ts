import { Schema, models, model, ObjectId } from "mongoose";

export interface IAddress {
    _id?: ObjectId;
    userId: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: number | string;
    default?: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export const addressSchema = new Schema({
    userId: { type: String, required: true},
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true },
    default: { type: Boolean, default: false },
    created_at: { type: Date },
    updated_at: { type: Date }
});

export const Address = models.Address || model('Address', addressSchema, 'addresses');