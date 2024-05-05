import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache';

export async function PUT(request:Request) {
    noStore();
    // console.log('route hit')
    // const username = request.headers.get('username');
    const data = await request.json();
    const {id, title, shortDescription, description, imageUrl, category} = data;
    try {
        const res = await sql `UPDATE blogs SET title = ${title}, shortdescription= ${shortDescription}, description = ${description}, imageurl = ${imageUrl}, category = ${category} WHERE blogid = ${id};`;
        // console.log(res);
        return NextResponse.json({"blogs": res}, { headers: { "Cache-Control": "no-store" }})
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}