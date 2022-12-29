import { NextApiRequest, NextApiResponse } from 'next';

import { Address, IAddress } from '@/mongo/models/Address';
import connect from 'mongo';
import { withAuth } from 'util/hooks/helpers';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const userId = req.user.uid;

    if (req.method === 'DELETE') {
        const { id } = req.query;
        if (!id) return res.status(422).end();
        
        await deleteAddress(id.toString())
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json(err));
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const { address } = req.body;
        const { address1, city,  state, zip }: IAddress = address;

        if (!id || !address1 || !city || !state || !zip) return res.status(422).end();

        await updateAddress(userId, address)
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

export default withAuth(handler);