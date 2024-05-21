'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import siteMetadata from '@/app/utils/siteMetadata';

type Blog = {
    "title" : string,
    "shortdescription" : string,
    "description" : string,
    "imageurl" : string,
    "category" : string,
    "username" : string,
    "publishtime" : string,
}

export const ShowBlog = ({id} : any) => {
    const [blog, setBlog] = useState<Blog>({
        "title" : "",
        "shortdescription" : "",
        "description" : "",
        "imageurl" : "",
        "category" : "",
        "username" : "",
        "publishtime" : "",
    });

    useEffect (() => {
        const fun = async () => {
            try{
            const res = await fetch (`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/get-blog`, {
                method : "GET",
                headers : {
                    "Content-Type": "application/json",
                    "id" : id,
                }
            })
            const data = await res.json();
            console.log(data.blogs.rows[0])
            setBlog(data.blogs.rows[0]);
            }
            catch (err) {
                console.log(err);
            }
        }
        fun();
    }, [])

    console.log("Blog from ShowBlog Component  " + blog)

    
  return (
    <div className='w-screen p-10 mt-20'>
    <Card sx={{ maxWidth: 14440 }}>
      <div className='flex justify-center items-centerm p-5'>
      <img src = {blog.imageurl} className='w-60 h-60' />
      </div>
      <CardContent>
        <div className='mb-10'>
        <Typography gutterBottom variant="h5" component="div">
          {blog.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
            Author: {blog.username} | Published: {blog.publishtime}
        </Typography>
        </div>
        <div dangerouslySetInnerHTML={{ __html: blog.description }}>
        </div>
      </CardContent>
      <CardActions>
        <Button variant='outlined' size="small">{blog.category}</Button>
      </CardActions>
    </Card>
    </div>
  );
}
