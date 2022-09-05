import { Schema, models, model, ObjectId } from "mongoose";

export interface IProduct {
    _id?: ObjectId;
    name: String,
    description: String,
    size: String,
    labor_hours: String
    price: number;
    featured: boolean;
    img_urls?: string[];
}

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: String, required: true },
    labor_hours: { type: String, required: true },
    price: { type: Number, required: true},
    featured: { type: Boolean, required: false },
    img_urls: { type: Array }
});

export const Product = models.Product || model('Product', productSchema, 'products');