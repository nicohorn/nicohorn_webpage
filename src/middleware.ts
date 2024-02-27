
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';
import { redirect } from 'next/dist/server/api-utils';


export async function middleware(req: NextRequest) {

    const res = NextResponse.next();
    const token = await getToken({ req })

    if (req.nextUrl.pathname.includes("api") && !req.nextUrl.pathname.includes("auth")) {
        if (token?.user.role !== "admin") {
            return new Response("No sos admin wachin, rajá de acá", { status: 403 })
        }
    } else if (req.nextUrl.pathname.includes("dashboard")) {
        if (token?.user.role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url))
        }
    }

    return NextResponse.next()


}

