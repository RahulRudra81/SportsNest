'use client';
import { useRecoilValue } from 'recoil';
import { showblogvalState } from "../recoilContextProvider";

import React from 'react'
import { useSearchParams } from 'next/navigation'
function page() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id');
    const blog = useRecoilValue(showblogvalState);
    const desc = blog.description.replace(/<p>/g, '').replace(/<\/p>/g, '')
// console.log(blog)
    if (!blog) {
        return <div>Loading...</div>;
      }
    
    return (
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-md overflow-hidden">
        <img className="w-full h-64 object-cover" src={blog.imageUrl} alt={blog.title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{blog.title}</div>
          {/* Render description without <p> tags */}
          <div dangerouslySetInnerHTML={{ __html: desc }} />
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{blog.category}</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Author: {blog.username}</span>
        </div>
      </div>
    </div>
      );
}

export default page