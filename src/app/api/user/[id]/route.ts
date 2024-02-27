import { getUserById } from "@/repositories/user";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, { params }: { params: { id: string } }) {


    const data = await getUserById(params.id)

    return NextResponse.json(data)
}