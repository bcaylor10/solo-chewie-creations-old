import { NextApiRequest, NextApiResponse } from 'next'
import qs from 'qs';

import connect from 'mongo';
import { Product, IProduct } from 'mongo/models/Product';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).end();

    if (!req.query.ids || req.query.ids.length === 0) return res.status(404).end();
    // @ts-ignore
    const ids = Object.values(qs.parse(req.query.ids));

    await connect().then(() => Product.find({ _id: { $in: ids } }))
    .then((data: IProduct[] | []) => res.status(200).json(data))
    .catch((error) => res.status(500).json(error));
};

export default handler;