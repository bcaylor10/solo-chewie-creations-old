import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

import connect from 'mongo';
import { Testimonial, ITestimonial } from 'mongo/models/Testimonial';

// return all hats
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).end();
    
    let testimonials: ITestimonial[] = [];

    await connect().then(() => {
        // @ts-ignore
        return Testimonial.find().sort({ updated_at: 'desc' });
    }).then((data: ITestimonial[] | []) => {
        testimonials = data;
    }).catch((error) => {
        res.status(500).json({ error });
    });
    // .finally(() => mongoose.connection.close());

    res.status(200).json(testimonials)
};

export default handler;