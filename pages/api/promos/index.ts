import { NextApiRequest, NextApiResponse } from 'next'

import connect from 'mongo';
import { Promo } from 'mongo/models/Promo';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const code = req?.query?.code;
    if (req.method !== 'GET') return res.status(405).end();

    // do not want to get all, need to only search for one
    if (!code || code.toString().length === 0) return res.status(404).end();

    await connect().then(() => {
        // @ts-ignore
        return Promo.find({ code: { $regex: new RegExp(code.toString(), 'i') } });
    })
    .then((data) => {
        if (data.length > 0) {
            return res.status(200).json(data)
        } else {
            return res.status(404).end();
        }
    })
    .catch((err) => res.status(500).json(err));
};

export default handler;