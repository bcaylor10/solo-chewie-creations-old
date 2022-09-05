import { NextApiRequest, NextApiResponse } from 'next'

import connect from 'mongo';
import { Product, IProduct } from 'mongo/models/Product';

// return all scarves
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).end();
    
    let scarves: IProduct[] = [];

    await connect().then(() => {
        // @ts-ignore
        return Product.find({ name: { $regex: new RegExp('scarf', 'i') } })
    }).then((data: IProduct[] | []) => {
        scarves = data;
    }).catch((error) => {
        res.status(500).json({ error });
    });

    res.status(200).json(scarves);
};

export default handler;