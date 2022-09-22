import { NextApiRequest, NextApiResponse } from 'next';

import { Address } from '@/mongo/models/Address';
import connect from 'mongo';
import { verifyUserToken } from '@/helpers';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') res.status(405).end();
    const authToken = req.headers.authorization;
    const { userId } = req.query;

    if (!authToken || !userId) return res.status(401).end();
    
    const verified = await verifyUserToken(userId.toString(), authToken);
    if (!verified) return res.status(401).json('Unauthorized');

    await connect().then(() => {
        return Address.find({ userId: userId, default: true });
    })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
};

export default handler;