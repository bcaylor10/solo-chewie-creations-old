import { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';

import connect from 'mongo';
import { Product, IProduct } from 'mongo/models/Product';

interface IQuery {
    product_type: number;
    size?: any;
}

// return all products of a certain type
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const type = req?.query?.type;
    const size = req?.query?.size;
    if (req.method !== 'GET') return res.status(405).end();
    
    if (!type) return res.status(404).end();

    const query: IQuery = {
        product_type: parseInt(type.toString()),
    };

    if (size) query.size = { $regex: `^${size}$`, $options: 'i' };
    
    let products: IProduct[] = [];

    await connect().then(() => {
        // @ts-ignore
        return Product.find(query)
    }).then((data: IProduct[] | []) => {
        products = data;
    }).catch((error) => {
        res.status(500).json({ error });
    })
    // .finally(() => mongoose.connection.close());

    res.status(200).json(products);
};

export default handler;