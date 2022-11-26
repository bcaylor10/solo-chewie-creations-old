import { NextApiRequest, NextApiResponse } from 'next';

import { verifyUserToken } from '@/helpers';
import connect from 'mongo';
import { Promo } from 'mongo/models/Promo';

export const config = {
    api: {
      bodyParser: false,
    },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).json('Method not allowed');

    const authToken = req.headers.authorization;
    const { userId } = req.query;
    const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',');

    if (!authToken || !userId || !adminEmails || adminEmails.length === 0) {
        return res.status(401).json('Unauthorized');
    }

    const verified = await verifyUserToken(userId.toString(), authToken);

    if (!verified) return res.status(401).json('Unauthorized');
    // @ts-ignore
    if (!adminEmails.includes(verified.email)) return res.status(401).json('Unauthorized');

    await connect().then(() => Promo.find())
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
};

export default handler;