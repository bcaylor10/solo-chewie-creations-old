import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

import connect from 'mongo';
import { Testimonial, ITestimonial } from 'mongo/models/Testimonial';

// return all hats
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).end();
    
    const { id } = req.query;

    await connect().then(() => {
        if (id) {
            return Testimonial.findById(id);
        } else {
            // @ts-ignore
            return Testimonial.find({ id: id }).sort({ updated_at: 'desc' });
        }
    })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
};

export default handler;