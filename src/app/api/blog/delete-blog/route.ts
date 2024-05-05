import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache';

export async function DELETE(request:Request) {
    noStore();
    const blogid = request.headers.get('blogid');

    try {
        await sql `DELETE FROM blogs where blogid = ${blogid};`
        // console.log(res);
        return NextResponse.json({"messaage" : "Deleted successfully"}, { headers: { "Cache-Control": "no-store" }})
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}