import { Schema, models, model, ObjectId } from "mongoose";

export interface IProduct {
    _id?: ObjectId;
    name: String,
    description: String,
    size: String,
    labor_hours: String
}

export const productNames: string[] = [ 'scarf', 'hat', 'headband' ];

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: String, required: true },
    labor_hours: { type: String, required: true }
});

export const Product = models.Product || model('Product', productSchema, 'products');