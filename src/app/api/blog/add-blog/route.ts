import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function POST(request: Request) {
    noStore();
    const data = await request.json();
    const { title, username, shortDescription, description, imageUrl, category, userimageurl, publishtime } = data;

    try {
        // console.log(data);
        // console.log(username)
        await sql`INSERT INTO blogs (title, shortDescription, description, imageUrl, category, username, publishtime, userimageurl) 
            VALUES 
            (${title}, ${shortDescription}, ${description}, ${imageUrl}, ${category}, ${username}, ${publishtime}, ${userimageurl});`;

        return NextResponse.json({ message: "Blog posted successfully" }, { headers: { "Cache-Control": "no-store" }});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
