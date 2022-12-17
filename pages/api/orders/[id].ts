import { NextApiRequest, NextApiResponse } from 'next'

import connect from 'mongo';
import { Order } from '@/mongo/models/Order';

// return all products of a certain type
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        const id = req.query.id;
        const { order } = req.body;
        
        const data = mapToModelData(order);

        await connect().then(() => Order.findByIdAndUpdate(id, data))
        .then((data) => res.status(201).json(data))
        .catch((err) => res.status(500).json(err));
    } else {
        res.status(405).json('Method not allowed');
    }
};

const mapToModelData = (data: any) => {
    const mappedData: any = {
        ...data,
        status: data.status,
        delivery: data.delivery,
        payment_id: data.payment_id,
        address: data.address,
        updated_at: new Date().toISOString()
    };

    return mappedData;
};

export default handler;