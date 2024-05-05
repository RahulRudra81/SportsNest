import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";



export async function POST(request: Request) {
    const username = request.headers.get('username')
    if (username) {
        try{
            const res = await sql `SELECT * FROM users WHERE username = ${username};`;
            if(res.rows.length) {
                return NextResponse.json({"message" : "user already exits"})
            }
            else {
                try{
                    await sql`INSERT INTO users (username) VALUES (${username});`
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

    

