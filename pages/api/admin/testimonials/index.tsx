import { NextApiRequest, NextApiResponse } from 'next';

import { verifyUser } from '@/helpers';
import connect from 'mongo';
import { Testimonial } from 'mongo/models/Testimonial';

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
        await connect().then(() => Testimonial.findByIdAndDelete(id))
        .then(() => res.status(200).end())
        .catch((err) => res.status(500).json(err));
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const { userId, testimonial } = req.body;

        if (!userId) return res.status(401).json('Unauthorized');
        if (!id) return res.status(404);

        await verifyUser(res, authToken, userId, adminEmails);

        const data = mapToModelData(testimonial, true);

        await connect().then(() => {
            return Testimonial.findByIdAndUpdate(id, data);
        })
        .then(({ data }) => res.status(200).json(data))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        });
    } else if (req.method === 'POST') {
        const { userId, testimonial } = req.body;

        if (!userId) return res.status(401).json('Unauthorized');

        await verifyUser(res, authToken, userId, adminEmails);

        const data = mapToModelData(testimonial);

        await connect().then(() => {
            return Testimonial.create(data);
        })
        .then((data) => res.status(201).json(data))
        .catch((err) => res.status(500).json(err));
    } else if (req.method === 'GET') {
        const { userId } = req.query;

        if (!userId) return res.status(401).json('Unauthorized');

        await verifyUser(res, authToken, userId, adminEmails);

        await connect().then(() => Testimonial.find({}))
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
        updated_at: isUpdate ? currentDate : null,
    }

    if (!isUpdate) mappedData.created_at = currentDate;

    return mappedData;
}

export default handler;