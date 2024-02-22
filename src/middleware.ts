
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'


export async function middleware(req: NextRequest) {

    const now = new Date();
    const cookieDate = new Date(req.cookies.get("lastVisited")?.value!)
    const visitedInTheLast24Hs = (now.getTime() - cookieDate.getTime()) < 86400000

    const res = NextResponse.next();

    const supabaseClient = createMiddlewareClient({ req, res });
    await supabaseClient.auth.getSession();

    if (!visitedInTheLast24Hs) {
        res.cookies.set("lastVisited", now.toISOString())
    }

    return res;

}

