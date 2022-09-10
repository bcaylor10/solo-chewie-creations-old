import { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';

import connect from 'mongo';
import { Product } from 'mongo/models/Product';

interface ISize {
    _id: string;
    size: string;
}

// return all products of a certain type
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const type = req?.query?.type;
    if (req.method !== 'GET') return res.status(405).end();
    
    if (!type) return res.status(404).end();

    const query = {
        product_type: type,
    }
    
    let sizes: string[] = [];

    await connect().then(() => {
        // @ts-ignore
        return Product.find(query).select('size');
    }).then((data: ISize[] | []) => {
        if (data.length > 0) sizes = data.map((s: ISize) => s.size);
    }).catch((error) => {
        res.status(500).json({ error });
    })
    // .finally(() => mongoose.connection.close());

    res.status(200).json(sizes);
};

export default handler;