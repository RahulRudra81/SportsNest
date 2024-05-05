'use client'
import { blogsState } from '@/app/recoilContextProvider'
import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export const InitBlogs = () => {
    const setBlogs = useSetRecoilState(blogsState)
    const blogs = useRecoilValue(blogsState)
    const fun = async () => {
        const res = await fetch('/api/blog/all-blogs', {
        method : "GET"
    })
    const data = await res.json();
    setBlogs(data.blogs.rows)
    console.log(data.blogs.rows)
    }

    useEffect(() => {
        fun();
    }, [])

  return (
    <></>
  )
}
