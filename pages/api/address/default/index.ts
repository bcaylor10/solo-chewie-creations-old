import { NextApiRequest, NextApiResponse } from 'next';

import { Address } from '@/mongo/models/Address';
import connect from 'mongo';
import { withAuth } from 'util/hooks/helpers';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const userId = req.user.uid;

    if (req.method !== 'GET') res.status(405).end();
    
    await connect().then(() => {
        return Address.find({ userId: userId, default: true });
    })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
};

export default withAuth(handler);