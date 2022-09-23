import mongoose from "mongoose";
import * as dotenv from 'dotenv';

import connect from "..";
import { Product } from "../models/Product";
import { Testimonial } from "../models/Testimonial";
import { Promo } from "../models/Promo";

import productData from './products.json';
import testimonialData from './testimonials.json';
import promoData from './promos.json';

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

const seedPromos = async () => {
    await Promo.deleteMany({});
    await Promo.insertMany(promoData);
};

const seedDB = async () => {
    await seedProducts();
    await seedTestimonials();
    await seedPromos();
};

seedDB().then(() => mongoose.connection.close());