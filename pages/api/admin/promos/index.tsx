import { NextApiRequest, NextApiResponse } from 'next';

import { verifyUser } from '@/helpers';
import connect from 'mongo';
import { Promo } from 'mongo/models/Promo';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PATCH') return res.status(405).json('Method not allowed');

    const authToken = req.headers.authorization;
    const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',');

    if (!authToken || !adminEmails || adminEmails.length === 0) {
        return res.status(401).json('Unauthorized');
    }

    if (req.method === 'DELETE') {
        const { userId, id } = req.query;

        if (!userId) return res.status(401).json('Unauthorized');
        if (!id) return res.status(404);

        await verifyUser(res, authToken, userId, adminEmails);

        // @ts-ignore
        await connect().then(() => Promo.findByIdAndDelete(id))
        .then(() => res.status(200).end())
        .catch((err) => res.status(500).json(err));
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const { userId, promo } = req.body;

        if (!userId) return res.status(401).json('Unauthorized');
        if (!id) return res.status(404);

        await verifyUser(res, authToken, userId, adminEmails);

        const data = mapToModelData(promo, true);

        await connect().then(() => {
            return Promo.findByIdAndUpdate(id, data);
        })
        .then(({ data }) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
    } else if (req.method === 'POST') {
        
    } else if (req.method === 'GET') {
        const { userId } = req.query;

        if (!userId) return res.status(401).json('Unauthorized');

        await verifyUser(res, authToken, userId, adminEmails);

        await connect().then(() => Promo.find({}))
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
    } else {
        return res.status(405).end();
    }
};

const mapToModelData = (data: any, isUpdate = false) => {
    const currentDate = new Date().toISOString();

    const mappedData = {
        ...data,
        type: parseInt(data.type),
        start_date: new Date(data.start_date).toISOString(),
        expiration_date: data.expiration_date && new Date(data.expiration_date).toISOString(),
        updated_at: isUpdate ? currentDate : null,
    }

    if (!isUpdate) mappedData.created_at = currentDate;

    return mappedData;
}

export default handler;