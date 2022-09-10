import { Schema, models, model, ObjectId } from "mongoose";

export interface ITestimonial {
    _id?: ObjectId;
    rating: number;
    message: string;
    author: string;
}

const testimonialSchema = new Schema({
    rating: { type: Number, required: true},
    message: { type: String, required: true },
    author: { type: String, required: true },
});

export const Testimonial = models.Testimonial || model('Testimonial', testimonialSchema, 'testimonials');