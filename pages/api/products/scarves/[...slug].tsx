import { NextApiRequest, NextApiResponse } from 'next'

import connect from 'mongo';
import { Product, IProduct } from 'mongo/models/Product';

// return scarf matching the slug sent
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const slug = req.query.slug?.toString();
    if (req.method !== 'GET') return res.status(405).end();
    if (!slug) return res.status(404).end();
    
    let scarves: IProduct[] = [];

    await connect().then(() => {
        return Product.find({ 
            name: { $regex: new RegExp('scarf', 'i') }, 
            size: { $regex: new RegExp(slug, 'i') }
        });
    }).then((data: IProduct[] | []) => {
        scarves = data;
    }).catch((error) => {
        res.status(500).json({ error });
    });

    res.status(200).json(scarves);
};

export default handler;