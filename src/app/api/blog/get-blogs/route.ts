import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { atRule } from "postcss";
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(request:Request) {
    noStore();
    const category = request.headers.get('category');
    var value;
    if (category) value = category?.charAt(0).toUpperCase() + category?.slice(1);

    try {
        const res = await sql `SELECT * FROM blogs where category = ${value};`
        // console.log(res);
        return NextResponse.json({"blogs": res}, { headers: { "Cache-Control": "no-store" }})
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}