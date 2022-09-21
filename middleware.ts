import { NextResponse } from "next/server";

const middleware = (req: any) => {
    // const user = window.localStorage.getItem('user');
    const url = req.url;
    const home = req.nextUrl.origin;
    const authed = req.cookies.get('authed');

    // TODO: handle admins in the future
    if (url.includes('/account')) {
        if (authed === undefined) {
            return NextResponse.redirect(home);
        }
    }

    return NextResponse.next();
};

export default middleware;