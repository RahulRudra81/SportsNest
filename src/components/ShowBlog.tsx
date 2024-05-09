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
}

export const ShowBlog = ({id} : any) => {
    const [blog, setBlog] = useState<Blog>({
        "title" : "",
        "shortdescription" : "",
        "description" : "",
        "imageurl" : "",
        "category" : "",
    });

    useEffect (() => {
        const fun = async () => {
            try{
            const res = await fetch (`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-blog`, {
                method : "GET",
                headers : {
                    "Content-Type": "application/json",
                    "id" : id,
                }
            })
            const data = await res.json();
            console.log(data.blogs[0])
            setBlog(data.blogs[0]);
            }
            catch (err) {
                console.log(err);
            }
        }
        fun();
    }, [])

    console.log("Blog from ShowBlog Component  " + blog)

    
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
