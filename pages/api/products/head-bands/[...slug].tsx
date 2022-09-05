import { NextApiRequest, NextApiResponse } from 'next'

import connect from 'mongo';
import { Product, IProduct } from 'mongo/models/Product';

// return head band matching the slug sent
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const slug = req.query.slug?.toString();
    if (req.method !== 'GET') return res.status(405).end();
    if (!slug) return res.status(404).end();
    
    let headBands: IProduct[] = [];

    await connect().then(() => {
        return Product.find({ 
            name: { $regex: new RegExp('head band', 'i') }, 
            size: { $regex: new RegExp(slug, 'i') }
        });
    }).then((data: IProduct[] | []) => {
        headBands = data;
    }).catch((error) => {
        res.status(500).json({ error });
    });

    console.log(headBands)

    res.status(200).json(headBands);
};

export default handler;