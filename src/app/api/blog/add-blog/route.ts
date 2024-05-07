import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function POST(request: Request) {
    noStore();
    const username = 'test'
    const data = await request.json();
    const { title, shortDescription, description, imageUrl, category } = data;

    try {
        // console.log(data);
        // console.log(username)
        await sql`INSERT INTO blogs (title, shortDescription, description, imageUrl, category, username) 
            VALUES 
            (${title}, ${shortDescription}, ${description}, ${imageUrl}, ${category}, ${username});`;

        return NextResponse.json({ message: "Blog posted successfully" }, { headers: { "Cache-Control": "no-store" }});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
