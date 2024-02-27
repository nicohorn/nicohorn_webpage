import { newTag } from "@/repositories/blog_tag";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {

    const data = await req.json()
    const res = await newTag(data)

    return NextResponse.json(res)

}