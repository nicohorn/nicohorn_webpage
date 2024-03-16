import { createBlogEntry, getAllBlogEntriesWithTags, updateBlogEntry } from "@/repositories/blog_entry";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {


    const data = await req.json()
    const res = await createBlogEntry(data);

    console.log("CREATED BLOG ENTRY", data)

    if (!res) return new Response("Error creating the blog entry", { status: 500, statusText: "Server error wachin" })


    return NextResponse.json(data)

}

export async function GET() {

    const res = await getAllBlogEntriesWithTags("", "en-US");
    return NextResponse.json(res);
}

export async function PUT(req: NextRequest) {

    const data = await req.json()
    const res = await updateBlogEntry(data.id, data.blog_entry);

    console.log("UPDATED BLOG ENTRY: ", data.blog_entry)

    if (!res) return new Response("Error updating the blog entry", { status: 500, statusText: "Server error wachin" })
    return NextResponse.json(data.blog_entry)

}
