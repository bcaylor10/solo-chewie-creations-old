import { NextResponse } from "next/server";
import * as admin from 'firebase-admin/app';
import { getAuth as adminAuth } from 'firebase-admin/auth';

const middleware = (req: any) => {
    const url = req.url;
    const home = req.nextUrl.origin;
    const authed = req.cookies.get('authed');

    // console.log(req.headers)

    // firebaseAdmin.verifyIdToken()

    if (url.includes('/account') || url.includes('/admin')) {
        if (authed === undefined) {
            return NextResponse.redirect(home);
        }
    }

    return NextResponse.next();
};

export default middleware;