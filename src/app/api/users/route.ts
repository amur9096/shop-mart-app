import { NextResponse } from "next/server";



export async function GET() {

    const users = [ {id:1 , name:"Amr"},{id:2 , name:"Khaled"}];

    return NextResponse.json(users)
}
