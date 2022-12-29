import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from "util/firebase/backend";
import { get } from 'lodash';

export const withAuth = (handler: any, checkAdmin = false) => async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = get(req, [ 'headers', 'authorization' ]);

    if (!authHeader) res.status(401).json('Unauthorized');

    await firebaseAdmin.auth().verifyIdToken(authHeader)
    .then((data) => req.user = data)
    .then(() => {
        if (checkAdmin) {
            const isAdmin = verifyAdmin(req.user.email);

            if (isAdmin) {
                return handler(req, res);
            } else {
                throw new Error('User not an admin');
            }
        } else {
            return handler(req, res);
        }
    })
    .catch((err) => {
        console.log(err)
        return res.status(401).json('Unauthorized')
    });
}

const verifyAdmin = (email: string): boolean => {
    const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',');

    if (!adminEmails || adminEmails.length === 0) return false;

    return adminEmails.includes(email);
}