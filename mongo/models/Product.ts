import { Schema, models, model, ObjectId } from "mongoose";

export interface IProduct {
    _id?: ObjectId;
    product_type: number;
    name: string;
    description: string;
    size: string;
    labor_hours: number;
    price: number;
    sale_price?: number;
    featured: boolean;
    care?: string;
    details?: string;
    img_urls?: string[];
}

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: String, required: true },
    labor_hours: { type: Number, required: true },
    product_type: { type: Number, required: true },
    price: { type: Number, required: true},
    sale_price: { type: Number },
    featured: { type: Boolean, default: false },
    care: { type: String },
    details: { type: String },
    img_urls: { type: Array }
});

export const Product = models.Product || model('Product', productSchema, 'products');