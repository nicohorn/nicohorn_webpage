import { createBlogEntry } from "@/repositories/blog_entry";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {


    const data = await req.json()
    console.log("post blog entry ROUTE", data)
    const res = await createBlogEntry(data);

    if (!res) return new Response("Error creating the blog entry", { status: 500, statusText: "Server error" })


    return NextResponse.json(data)

}