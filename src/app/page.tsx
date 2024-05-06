// pages/index.tsx

'use client';
import React from 'react';
import Head from 'next/head';
import BlogCard from '@/components/BlogCard';
import { useRecoilValue } from 'recoil';
import { blogsArrayState } from './recoilContextProvider';
import Image from 'next/image';
import Loader from '../../public/page-loader/loader.gif'

type Blog = {
  title: string;
  shortdescription: string;
  description: string;
  imageurl: string;
  blogid: number;
  category: string;
  username: string;
}

function HomePage() {
  const blogs: Blog[] = useRecoilValue(blogsArrayState);
  
  if (!blogs.length) return (
    <div className='flex h-screen justify-center items-center'>
      <Image src={Loader} alt='Loading...' width={50} height={50}/>
    </div>
  )

  return (
    <>
      <Head>
        <title>Blog Nest</title>
        <meta name="description" content="Welcome to Your Blog - Where Ideas Come to Life" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Blog Nest</h1>
        <p className="text-xl text-center mb-12 text-gray-600">Welcome to Your Blog - Where Ideas Come to Life</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.blogid}
              title={blog.title}
              shortDescription={blog.shortdescription}
              description={blog.description}
              imageUrl={blog.imageurl}
              id={blog.blogid}
              category={blog.category}
              username={blog.username}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default HomePage;
