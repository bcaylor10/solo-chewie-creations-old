import { NextApiRequest, NextApiResponse } from 'next';

import { verifyUserToken } from '@/helpers';
import connect from 'mongo';
import { Product } from 'mongo/models/Product';

export const config = {
    api: {
      bodyParser: false,
    },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET' || req.method === 'POST' || req.method === 'PATCH') {
        return res.status(405).json('Method not allowed');
    }

    const authToken = req.headers.authorization;
    const { userId, id } = req.query;
    const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',');

    if (!authToken || !userId || !adminEmails || adminEmails.length === 0) {
        return res.status(401).json('Unauthorized');
    }

    if (!id) return res.status(404);


    const verified = await verifyUserToken(userId.toString(), authToken);

    if (!verified) return res.status(401).json('Unauthorized');
    // @ts-ignore
    if (!adminEmails.includes(verified.email)) return res.status(401).json('Unauthorized');

    if (req.method === 'DELETE') {
        // @ts-ignore
        await connect().then(() => Product.findByIdAndDelete(id))
        .then(() => res.status(200).end())
        .catch((err) => res.status(500).json(err));
    } else if (req.method === 'PUT') {

    } else {
        return res.status(405).end();
    }
};

export default handler;