import { NextApiRequest, NextApiResponse } from 'next'

import connect from 'mongo';
import { Product, IProduct } from 'mongo/models/Product';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).end();

    const id = req.query.id;

    await connect().then(() => Product.find({ _id: id }))
    .then((data: IProduct[] | []) => res.status(200).json(data))
    .catch((error) => res.status(500).json(error));
};

export default handler;