import { NextApiRequest, NextApiResponse } from 'next';

import { Address, IAddress } from '@/mongo/models/Address';
import connect from 'mongo';
import { verifyUserToken } from '@/helpers';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const authToken = req.headers.authorization;

    if (!authToken) return res.status(401).end();

    if (req.method === 'DELETE') {
        const { userId, id } = req.query;
        if (!userId || !id) return res.status(422).end();

        const verified = await verifyUserToken(userId.toString(), authToken);
        if (!verified) return res.status(401).json('Unauthorized');
        
        await deleteAddress(id.toString())
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json(err));
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const { userId, address } = req.body;
        const { address1, city,  state, zip }: IAddress = address;

        if (!userId || !id) return res.status(422).end();
        if (!userId || !address1 || !city || !state || !zip) return res.status(422).end();

        const verified = await verifyUserToken(userId.toString(), authToken);
        if (!verified) return res.status(401).json('Unauthorized');

        await updateAddress(userId.toString(), address)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json(err));
    } else {
        return res.status(405).end();
    }
};

const deleteAddress = (id: string) => new Promise((resolve, reject) => {
    connect().then(() => {
        return Address.deleteOne({ _id: id });
    })
    .then((data) => resolve(data))
    .catch((err) => reject(err));
});

const updateAddress = (userId: string, address: IAddress) => new Promise((resolve, reject) => {
    connect().then(() => {
        return Address.findById(address._id);
    }).then((data) => {
        if (address.default) { // if new data has address as default
            if (!data.default) { // if old data does not have address as default
                return changeDefaultAddress(userId, address);
            }
        }
    })
    .then(() => {
        const id = address._id;
        delete address._id;

        return Address.findOneAndUpdate({ _id: id }, { ...address });
    })
    .then((data) => resolve(data))
    .catch((err) => reject(err));
})

export const changeDefaultAddress = (userId: string, address: IAddress) => new Promise((resolve, reject) => {
    connect().then(() => {
        return Address.updateMany({ userId: userId }, { default: false });
    })
    .then(() => {
        const id = address._id;
        delete address._id;

        return Address.findOneAndUpdate({ _id: id }, { ...address });
    })
    .then((data) => resolve(data))
    .catch((err) => reject(err));
});

export default handler;