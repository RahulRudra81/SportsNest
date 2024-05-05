import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  
  // const categories = await sql`SELECT * FROM categories;`;
  return NextResponse.json({ "message" : "Hello" }, { status: 200 });
}