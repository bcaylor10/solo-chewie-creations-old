import { NextApiRequest, NextApiResponse } from 'next'

import connect from 'mongo';
import { Product, IProduct, productNames } from 'mongo/models/Product';

// return all hats matching the slug sent
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const slug = req.query.slug?.toString();
    if (req.method !== 'GET') return res.status(405);
    if (!slug) return res.status(404);
    
    let hats: IProduct[] = [];

    await connect().then(() => {
        return Product.find({ 
            name: { $regex: new RegExp('hat', 'i') }, 
            size: { $regex: new RegExp(slug, 'i') }
        });
    }).then((data: IProduct[] | []) => {
        hats = data;
    }).catch((error) => {
        res.status(500).json({ error });
    });

    res.status(200).json(hats)
};

export default handler;