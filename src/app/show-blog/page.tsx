'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRecoilValue } from 'recoil';
import { showblogvalState } from "../recoilContextProvider";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'

export default function MediaCard() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id');
    const [blog, setBlog] = useState(useRecoilValue(showblogvalState));
    const desc = blog.description.replace(/<p>/g, '').replace(/<\/p>/g, '')
// console.log(blog)
    useEffect(()=>{
      console.log(blog)
      if (blog.title !== ''){
        localStorage.setItem(`blog${id}.title`, blog.title);
        localStorage.setItem(`blog${id}.description`, blog.description);
        localStorage.setItem(`blog${id}.imageUrl`, blog.imageUrl);
        localStorage.setItem(`blog${id}.category`, blog.category);
        // localStorage.setItem(`blog${id}.username`, blog.username);
      }
      else {
        const title = localStorage.getItem(`blog${id}.title`) || '';
        const description = localStorage.getItem(`blog${id}.description`) || '';
        const imageUrl = localStorage.getItem(`blog${id}.imageUrl`) || '';
        const category = localStorage.getItem(`blog${id}.category`) || '';
        const username = localStorage.getItem(`blog${id}.username`) || '';
  
        setBlog({title, description, imageUrl, category});
      }
    }, [])
    
  return (
    <div className='w-screen p-10'>
    <Card sx={{ maxWidth: 14440 }}>
      <div className='flex justify-center items-center'>
      <img src = {blog.imageUrl} className='w-60 h-60 ' />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {blog.title}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: desc }}>
        </div>
      </CardContent>
      <CardActions>
        <Button variant='outlined' size="small">{blog.category}</Button>
      </CardActions>
    </Card>
    </div>
  );
}


// import { useRecoilValue } from 'recoil';
// import { showblogvalState } from "../recoilContextProvider";
// import { useEffect, useState } from 'react';

// import React from 'react'
// import { useSearchParams } from 'next/navigation'
// function page() {
//     const searchParams = useSearchParams()
//     const id = searchParams.get('id');
//     const [blog, setBlog] = useState(useRecoilValue(showblogvalState));
//     const desc = blog.description.replace(/<p>/g, '').replace(/<\/p>/g, '')
// // console.log(blog)
//     useEffect(()=>{
//       console.log(blog)
//       if (blog.title !== ''){
//         localStorage.setItem(`blog${id}.title`, blog.title);
//         localStorage.setItem(`blog${id}.description`, blog.description);
//         localStorage.setItem(`blog${id}.imageUrl`, blog.imageUrl);
//         localStorage.setItem(`blog${id}.category`, blog.category);
//         // localStorage.setItem(`blog${id}.username`, blog.username);
//       }
//       else {
//         const title = localStorage.getItem(`blog${id}.title`) || '';
//         const description = localStorage.getItem(`blog${id}.description`) || '';
//         const imageUrl = localStorage.getItem(`blog${id}.imageUrl`) || '';
//         const category = localStorage.getItem(`blog${id}.category`) || '';
//         const username = localStorage.getItem(`blog${id}.username`) || '';
  
//         setBlog({title, description, imageUrl, category});
//       }
//     }, [])
    

//     if (!blog) {
//         return <div>Loading...</div>;
//       }
    
//     return (
//       <div className="bg-gray-100 min-h-screen flex justify-center items-center p-5">
//       <div className="max-w-4xl w-full bg-white rounded-xl shadow-md overflow-hidden">
//         <img className="w-full h-64 object-cover" src={blog.imageUrl} alt={blog.title} />
//         <div className="px-6 py-4">
//           <div className="font-bold text-xl mb-2">{blog.title}</div>
//           {/* Render description without <p> tags */}
//           <div dangerouslySetInnerHTML={{ __html: desc }} />
//         </div>
//         <div className="px-6 py-4">
//           <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{blog.category}</span>
//           {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Author: {blog.username}</span> */}
//         </div>
//       </div>
//     </div>
//       );
// }

// export default page