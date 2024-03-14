
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'




export async function middleware(req: NextRequest) {


    const token = await getToken({ req })
    let lang;
    const locales = ["es-AR", "en-US"]
    const headerLang = req.headers.get("Accept-Language")?.split(",")[0]


    if (locales.includes(headerLang!)) lang = headerLang;

    //Defaults language to english if it detects any language that's not in the locales supported.
    else {
        lang = "en-US"
    }




    /* 
       401 response code: server says hey you're not authenticated
       403 response code: server says hey you're authenticated but you're not supposed to do/see that
     */

    //This if doesn't let anyone to use the api endpoints unless they're trying to authenticate or get the blog posts. I'm "liberating" the use of the blog_entry so that the next build can create the RSS feed.
    if (req.nextUrl.pathname.includes("api") && !req.nextUrl.pathname.includes("auth") && !req.nextUrl.pathname.includes("blog_entry") && !req.nextUrl.pathname.includes("cron")) {
        if (!token) return new Response("Falta autenticarse loco", { status: 401, statusText: "Not authenticated" })
        if (token?.user.role !== "admin") {
            return new Response("No sos admin wachin, rajá de acá", { status: 403, statusText: "Forbidden" })
        }
    } else if (req.nextUrl.pathname.includes("dashboard")) {
        if (token?.user.role !== "admin") {
            return NextResponse.redirect(new URL(`/${lang}/blog`, req.url))
        }
    }

    else if (req.nextUrl.pathname == "/") {
        console.log(req.nextUrl.pathname)
        return NextResponse.redirect(new URL(`/${lang}/blog`, req.url))
    }


    return NextResponse.next()


}

