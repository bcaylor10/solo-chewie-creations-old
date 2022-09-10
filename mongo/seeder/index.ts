import mongoose from "mongoose";
import * as dotenv from 'dotenv';

import connect from "..";
import { Product } from "../models/Product";
import { Testimonial } from "../models/Testimonial";

import productData from './products.json';
import testimonialData from './testimonials.json';

dotenv.config();

connect();

const seedProducts = async () => {
    await Product.deleteMany({});
    await Product.insertMany(productData);
}

const seedTestimonials = async () => {
    await Testimonial.deleteMany({});
    await Testimonial.insertMany(testimonialData);
};

const seedDB = async () => {
    await seedProducts();
    await seedTestimonials();
};

seedDB().then(() => mongoose.connection.close());