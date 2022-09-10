import { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';

import connect from 'mongo';
import { Product, IProduct } from 'mongo/models/Product';

// return all hats
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).end();
    
    let featured: IProduct[] = [];

    await connect().then(() => {
        // @ts-ignore
        return Product.find({ 'extras.featured': true }).sort({ updated_at: 'desc' })
    }).then((data: IProduct[] | []) => {
        featured = data;
    }).catch((error) => {
        res.status(500).json({ error });
    })
    // .finally(() => mongoose.connection.close());

    res.status(200).json(featured);
};

export default handler;