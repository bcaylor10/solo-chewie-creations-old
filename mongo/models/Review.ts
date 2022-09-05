import { Schema, models, model, ObjectId } from "mongoose";

export interface IReview {
    _id?: ObjectId;
    rating: number;
    message: string;
    author: string;
}

const reviewSchema = new Schema({
    rating: { type: Number, required: true},
    message: { type: String, required: true },
    author: { type: String, required: true },
});

export const Review = models.Review || model('Review', reviewSchema, 'reviews');