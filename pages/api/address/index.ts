import { NextApiRequest, NextApiResponse } from 'next';

import { Address, IAddress } from '@/mongo/models/Address';
import connect from 'mongo';
import { verifyUserToken } from '@/helpers';
import { changeDefaultAddress } from './[...id]';

import { withAuth } from 'util/hooks/helpers';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const authToken = req.headers.authorization;

    if (!authToken) return res.status(401).end();

    if (req.method === 'POST') {
        const { userId, address } = req.body
        const { address1, city,  state, zip }: IAddress = address;
        const verified = await verifyUserToken(userId, authToken);

        if (!verified) return res.status(401).json('Unauthorized');
        if (!userId || !address1 || !city || !state || !zip) return res.status(422).end();
        
        await createAddress(userId, address)
            .then((data) => res.status(201).json(data))
            .catch((err) => res.status(500).json(err));
    } else if (req.method === 'GET') {
        const { userId } = req.query;
        if (!userId) return res.status(422).end();

        const verified = await verifyUserToken(userId.toString(), authToken);
        if (!verified) return res.status(401).json('Unauthorized');

        await getAddresses(userId.toString())
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json(err));
    } else {
        return res.status(405).end();
    }
};

const createAddress = (userId: string, address: IAddress) => new Promise(async (resolve, reject) => {
    let created: IAddress | null = null;

    await connect().then(() => {
        const now = new Date();
        // @ts-ignore
        return Address.create({
            userId: address.userId,
            address1: address.address1,
            address2: address?.address2 || '',
            city: address.city,
            state: address.state,
            zip: address.zip,
            default: address.default,
            created_at: now,
            updated_at: now
        });
    })
    .then((data) => {
        created = data;
        if (data.default) {
            return changeDefaultAddress(userId, data);
        }
    })
    .then(() => resolve(created))
    .catch((err) => reject(err));
});

const getAddresses = (userId: string) => new Promise(async (resolve, reject) => {
    await connect().then(() => {
        return Address.find({ userId }).sort({ updated_at: 'desc' })
    })
    .then((data: IAddress[]) => resolve(data))
    .catch((err) => reject(err));
});

export default withAuth(handler);