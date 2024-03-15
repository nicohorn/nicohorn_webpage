import { createBlogEntry, getAllBlogEntriesWithTags } from "@/repositories/blog_entry";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {


    const data = await req.json()
    const res = await createBlogEntry(data);

    if (!res) return new Response("Error creating the blog entry", { status: 500, statusText: "Server error wachin" })


    return NextResponse.json(data)

}

export async function GET() {

    const res = await getAllBlogEntriesWithTags("", "en-US");
    return NextResponse.json(res);
}