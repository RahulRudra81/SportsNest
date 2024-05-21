'use client'
import { blogsState } from '@/app/recoilContextProvider'
import { env } from 'process'
import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export const InitBlogs = () => {
    const setBlogs = useSetRecoilState(blogsState)
    const blogs = useRecoilValue(blogsState)
    const fun = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/all-blogs`, {
        method : "GET"
    })
    const data = await res.json();
    setBlogs(data.blogs.rows)
    // console.log(data.blogs)
    }

    useEffect(() => {
        fun();
    }, [])

  return (
    <></>
  )
}
