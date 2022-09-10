import { Schema, models, model, ObjectId } from "mongoose";

export interface ITestimonial {
    _id?: ObjectId;
    rating: number;
    message: string;
    author: string;
    created_at?: Date;
    updated_at?: Date;
}

const testimonialSchema = new Schema({
    rating: { type: Number, required: true},
    message: { type: String, required: true },
    author: { type: String, required: true },
    created_at: { type: Date },
    updated_at: { type: Date }
});

export const Testimonial = models.Testimonial || model('Testimonial', testimonialSchema, 'testimonials');