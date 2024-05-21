'use client';
import React from 'react'
import Image from 'next/image'
import { Typography } from '@mui/material';
import BlogCard from '@/components/BlogCard';
import { useRecoilValue } from 'recoil';
import { blogsArrayState } from '../app/recoilContextProvider'
import Loader from '../../public/page-loader/loader.gif'
import Logo from '../../public/MainPageLogo.png'

type Blog = {
    blogid: number;
    title: string;
    shortdescription: string;
    description: string;
    imageurl: string;
    category: string;
    username: string;
    publishtime : string;
    userimageurl : string;
  }

const BlogGrid = () => {
const blogs: Blog[] = useRecoilValue(blogsArrayState);

    if (!blogs.length) return (
    <>
        <div className='flex h-screen justify-center items-center'>
        <Image src={Loader} alt='Loading...' width={50} height={50}/>
        </div>
    </>
    )

  return (
    <div>
        <main className="container mx-auto px-4 py-16">
        <div className='w-full flex flex-col  justify-center items-center my-10'>
        <Image src={Logo} alt='Loading...' className='max-sm:w-52 md:w-80'/>
        <Typography className="max-sm:text-sm md:text-xl text-center mb-12 text-back my-7">Welcome to Your Blog - Where Ideas Come to Life</Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.blogid}
              id={blog.blogid}
              title={blog.title}
              shortDescription={blog.shortdescription}
              description={blog.description}
              imageUrl={blog.imageurl}
              category={blog.category}
              username={blog.username}
              publishtime={blog.publishtime}
              userimageurl={blog.userimageurl}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default BlogGrid