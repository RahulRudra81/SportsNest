import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

import { unstable_noStore as noStore } from 'next/cache';


export async function POST(request: Request) {
    noStore();
    const data = await request.json();
    const {username, userImageUrl } = data;
    if (username) {
        try{
            const res = await sql `SELECT * FROM users WHERE username = ${username};`;
            if(res.rows.length) {
                return NextResponse.json({"message" : "user already exits"})
            }
            else {
                try{
                    await sql`INSERT INTO users (username, userimageurl) VALUES (${username}, ${userImageUrl});`
                    return NextResponse.json({"message" : "user added"})
                } catch (err) {
                    console.log(err)
                    return NextResponse.json("Internal Server Error", { status: 500 });
                }
            }
        }catch (err)
        {
            console.log(err)
            return NextResponse.json("Internal Server Error", { status: 500 });
        }
        
    }
    else {
        return NextResponse.json({"message" : "userId is NULL"});
    }

}

    

