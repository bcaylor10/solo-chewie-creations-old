import { Schema, models, model, ObjectId } from "mongoose";

interface IPricing {
    price: number;
    sale_price?: number;
}

interface IRating {
    amount: number;
}
interface IExtras {
    rating: IRating[];
    care?: string;
    details?: string;
    featured: boolean;
}

export interface IProduct {
    _id?: ObjectId;
    product_type: number;
    name: string;
    description: string;
    size: string;
    labor_hours: number;
    pricing: IPricing;
    extras: IExtras;
    img_urls?: string[];
    created_at?: Date;
    updated_at?: Date;
}

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: String, required: true },
    labor_hours: { type: Number, required: true },
    product_type: { type: Number, required: true },
    pricing: {
        price: { type: Number, required: true},
        sale_price: { type: Number },
    },
    extras: {
        rating: { type: Array, required: true },
        care: { type: String },
        details: { type: String },
        featured: { type: Boolean, default: false },
    },
    img_urls: { type: Array },
    created_at: { type: Date },
    updated_at: { type: Date }
});

export const Product = models.Product || model('Product', productSchema, 'products');