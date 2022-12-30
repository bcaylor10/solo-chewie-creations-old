import { NextApiRequest, NextApiResponse } from 'next';

import { withAuth } from 'util/hooks/helpers';
import connect from '@/mongo/index';
import { Customer, ICustomer } from '@/mongo/models/Customer';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const userId = req.user.uid;
    if (req.method !== 'GET') return res.status(405).json('Method not allowed');

    await connect().then(() => {
        return Customer.find({ user_id: userId })
    })
    // @ts-ignore
    .then((data) => res.status(200).json(data?.cart_items))
    .catch((err) => res.status(404).json(err));
};

export default withAuth(handler);