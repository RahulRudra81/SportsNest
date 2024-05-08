'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

const fetchBlog = async (id : any) => {
   
    try{
    const res = await fetch ('http://localhost:3000/api/blog/get-blog', {
       method : "GET",
       headers : {
          "Content-Type": "application/json",
          "id" : id,
       }
    })
    const data = await res.json();
    // console.log(data.blogs.rows[0])
    return data.blogs.rows[0];
    }
    catch (err) {
       console.log(err);
    }
 }
 

export const ShowBlog = ({id} : any) => {
    const [blog, setBlog] = useState({"title" : "", "description" : "", "shortdescription" : "", "imageurl" : "", "category" : ""});
    console.log(blog)
    useEffect(()=>{
        const fun = async () => {
            const res = await fetchBlog(id);
            setBlog(res);
        }
        
        fun()
    }, [])
    const desc = blog.description.replace(/<p>/g, '').replace(/<\/p>/g, '')
    
  return (
    <div className='w-screen p-10'>
    <Card sx={{ maxWidth: 14440 }}>
      <div className='flex justify-center items-center'>
      <img src = {blog.imageurl} className='w-60 h-60 ' />
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
