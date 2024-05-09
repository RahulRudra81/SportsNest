// components/BlogCard.js
'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Button } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { editblogState} from '@/app/recoilContextProvider';
import Link from 'next/link';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { useState } from 'react';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BlockCard({ title, shortDescription, description, imageUrl, id, category, username, publishtime } : 
        {
            title : string
            shortDescription : string
            description : string
            imageUrl : string
            id : number
            category : string
            username : string
            publishtime : string
        }){


      const setEditblog = useSetRecoilState(editblogState);
      const router = useRouter();
      const [like, setLike] = useState(false)
      const handleDelete = async () => {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
              if (result.isConfirmed) {
                  if (id) {
                  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-blog`, {
                  method : "DELETE",
                  headers : {"blogid" : id.toString(),"Cache-Control": "no-store"}
                  })
                  const data = await res.json();
                  if (!res.ok) toast.error(data.message || "INTERNAL ERROR");
                }
                else toast.error("Invalid Blog Id")
                await Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
                window.location.href = "/"
              }
            });
          }
      
    const handleEdit = () => {
    setEditblog({
      title,
      description,
      shortDescription,
      imageUrl,
      category
    })
    router.push(`/edit-blog?id=${id}`)
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link href={`show-blog/${id}`}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            
          </Avatar>
        }
        title={username}
        subheader={publishtime}
      />
      <CardMedia
        component="img"
        sx={{ height: 140 }}
        image={imageUrl}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
             {title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          {shortDescription}
        </Typography>
      </CardContent>
      </Link>
      <div className='p-2'><Button variant='outlined'  size="small">{category}</Button></div>
      <div className='flex justify-between items-center'>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => {setLike(!like)}}>
          <FavoriteIcon color={like ? 'error' : 'action'}/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
      </CardActions>
      <CardActions>
           <Button size="small" onClick={handleEdit}>Edit</Button>
           <Button size="small" onClick={handleDelete}>Delete</Button>
         </CardActions>
         </div>
        
    </Card>
  );
}

