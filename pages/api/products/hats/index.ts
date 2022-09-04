import { NextApiRequest, NextApiResponse } from 'next'

import connect from 'mongo';
import { Product, IProduct } from 'mongo/models/Product';

// return all hats
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405);
    
    let hats: IProduct[] = [];

    await connect().then(() => {
        // @ts-ignore
        return Product.find({ name: { $regex: new RegExp('hat', 'i') } })
    }).then((data: IProduct[] | []) => {
        hats = data;
    }).catch((error) => {
        res.status(500).json({ error });
    });

    res.status(200).json(hats)
};

export default handler;