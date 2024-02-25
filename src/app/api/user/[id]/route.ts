import { getUserById } from "@/repositories/user";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

    console.log("USER ID!!!!!!!", params.id)
    const data = await getUserById(params.id)
    console.log("DATAAA", data);
    return NextResponse.json(data)
}