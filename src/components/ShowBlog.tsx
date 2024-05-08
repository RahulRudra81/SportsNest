'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


 

export const ShowBlog = ({blog} : any) => {
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
