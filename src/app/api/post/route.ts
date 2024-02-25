import { createPost } from "@/repositories/post"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {



    const data = await req.json()
    const new_post = await createPost(data)

    return NextResponse.json(data)
}