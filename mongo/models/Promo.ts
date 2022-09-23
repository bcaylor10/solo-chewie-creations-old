import { Schema, models, model, ObjectId } from "mongoose";

export interface IPromo {
    _id?: ObjectId;
    name: string;
    code: string;
    type: number;
    discount_amount: number;
    start_date: Date;
    expiration_date?: Date;
    created_at?: Date;
    updated_at?: Date;
}

export const PROMO_TYPES = {
    fixed: 0,
    percentage: 1
}

const promoSchema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    type: { type: Number, required: true },
    discount_amount: { type: Number, required: true },
    start_date: { type: Date, required: true },
    expiration_date: { type: Date },
    created_at: { type: Date },
    updated_at: { type: Date }
});

export const Promo = models.Promo || model('Promo', promoSchema, 'promos');