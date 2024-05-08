import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(request:Request) {
    noStore();
    const id = request.headers.get('id');
    try {
        const res = await sql `SELECT * FROM blogs where blogid = ${id};`
        // console.log(res);
        return NextResponse.json({"blogs": res}, { headers: { "Cache-Control": "no-store" }})
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}