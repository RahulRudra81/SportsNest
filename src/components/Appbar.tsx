"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useUser } from '@clerk/clerk-react';
import { useAuth } from "@clerk/nextjs";
import { useSetRecoilState } from "recoil";
import { blogsState } from "@/app/recoilContextProvider";
import { useState } from "react";


const AppBar = () => {
  const { user } = useUser();
  const {userId} = useAuth();
  const username = user?.username;
  // console.log(userId)

  const [category, setCategory] = useState<string>();
  const setBlogs = useSetRecoilState(blogsState);

  useEffect(() => {
    const fun = async () => {
      if (username)
      {
          const res = await fetch("/api/user/add-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "username": username
          },
        });
        // console.log(res)
      }
    }

    fun();

  }, [username])

  return (
    <header className="bg-gray-800 py-4 lg:px-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex justify-between items-center space-x-3 mx-3 lg:space-x-20">
        <Link href="/" onClick={async () => {
          const res = await fetch('/api/blog/all-blogs', {
            method : "GET",
          })
          const data = await res.json();
          setBlogs(data.blogs.rows)
          // setBlogs(res.);
        }}>
          <h1 className="text-white text-2xl font-bold">BlogNest</h1>
        </Link>
        <Link href={userId ? "/create-blog" : '/sign-in'}><p className="text-gray-300 text-sm cursor-pointer">Create Blog</p></Link>
        </div>
        <form className="flex items-center">
          <input
            value={category}
            type="text"
            placeholder="Search blogs by category"
            className="px-4  py-2 rounded-lg mr-2 bg-white text-gray-800"
            onChange={(e) => setCategory(e.target.value)}
          />
          <button
            type="submit"
            className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200"
            onClick={async (e) => {
              e.preventDefault();
              if (category) {
                const res = await fetch('/api/blog/get-blogs', {
                  method : "GET",
                  headers : {"category" : category}
                })
                const data = await res.json();
                console.log(data.blogs.rows)
                setBlogs(data.blogs.rows) 
              }
              setCategory('')
            }}
          >
            Search
          </button>
        </form>
        <div className="flex items-center">
          { userId ? <>
                <div className="flex justify-between items-center space-x-3 mx-3 lg:space-x-20">
                <Link href="/" onClick={async () => {
                  
                  if (username){
                  const res = await fetch('/api/blog/my-blogs', {
                    method : "GET",
                    headers : {"username" : username}
                  })
                  const data = await res.json();
                  // console.log(data.blogs.rows)
                  setBlogs(data.blogs.rows)
                }
                // setBlogs(res.);
              }}><p className="text-gray-300 text-sm cursor-pointer">My Blogs</p></Link>
                <UserButton/>
                </div>
            </> : <>
                <Link href="/sign-in">
                    <button className="text-white mr-4">Sign In</button>
                </Link>
                <Link href="/sign-up">
                    <button className="text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-800">
                    Sign Up
                    </button>
                </Link>
          </>
        }
        </div>
      </div>
    </header>
  );
};


export default AppBar;
