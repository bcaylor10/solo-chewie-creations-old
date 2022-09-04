import { NextApiRequest, NextApiResponse } from 'next'

import connect from 'mongo';
import { Product, IProduct, productNames } from 'mongo/models/Product';

// return all products of a matching name: /hat, /scarf, etc
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405);
    
    const name = req.query.name?.toString();
    let products: IProduct[] = [];

    // @ts-ignore
    if (!productNames.includes(name)) res.status(404).json('Not a valid product');

    await connect().then(() => {
        // @ts-ignore
        return Product.find({ name: { $regex: new RegExp(name, 'i') } })
    }).then((data: IProduct[] | []) => {
        products = data;
    }).catch((err) => {
        res.status(500).json(err);
    });

    res.status(200).json({
        data: products
    })
};

export default handler;