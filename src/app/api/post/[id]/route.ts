import { createPost, getPostsById } from "@/repositories/post"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

    console.log(params.id)
    const post = await getPostsById(params.id)

    return NextResponse.json(post)
}