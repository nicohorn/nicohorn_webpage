import { newTag } from "@/repositories/tag";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {

    const data = await req.json()
    const res = await newTag(data)

    console.log("ROUTE RES", res)
    return NextResponse.json(res)

}