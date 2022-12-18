import next from "next";
import { firebaseAdmin } from "util/firebase/backend";

export const withAuth = (handler) => async (req, res) => {
    await firebaseAdmin.auth().verifyIdToken(req.headers.authorization)
    .then(() => handler(req, res))
    .catch((err) => res.status(403).json('Unauthorized'));
}