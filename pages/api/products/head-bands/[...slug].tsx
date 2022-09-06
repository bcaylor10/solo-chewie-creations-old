import { NextApiRequest, NextApiResponse } from 'next'

import connect from 'mongo';
import { Product, IProduct } from 'mongo/models/Product';
import { capitalizeFirstLetter } from '@/helpers';

// return head band matching the slug sent
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const slug = req.query.slug?.toString();
    if (req.method !== 'GET') return res.status(405).end();
    if (!slug) return res.status(404).end();
    
    let headBands: IProduct[] = [];

    await connect().then(() => {
        return Product.find({ 
            name: { $regex: new RegExp('head band', 'i') }, 
            size: { $regex: capitalizeFirstLetter(slug) }
        });
    }).then((data: IProduct[] | []) => {
        headBands = data;
    }).catch((error) => {
        res.status(500).json({ error });
    });

    res.status(200).json(headBands);
};

export default handler;