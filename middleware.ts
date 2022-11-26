import { NextResponse } from "next/server";

export const config = {
    matcher: ['/account/:path*', '/admin/:path*'],
}

const middleware = (req: any) => {
    const url = req.url;
    const home = req.nextUrl.origin;
    const authed = req.cookies.get('authed');

    if (authed === undefined) return NextResponse.redirect(home);

    return NextResponse.next();
};

export default middleware;