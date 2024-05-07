// // components/BlogCard.js
'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSetRecoilState } from 'recoil';
import { editblogState, showblogState } from '@/app/recoilContextProvider';
import Link from 'next/link';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'

export default function BlockCard({ title, shortDescription, description, imageUrl, id, category } : 
      {
          title : string
          shortDescription : string
          description : string
          imageUrl : string
          id : number
          category : string
      }) {

    const  setEditblog = useSetRecoilState(editblogState);
    const  setShowblog = useSetRecoilState(showblogState);
    const router = useRouter();

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
                const res = await fetch('/api/blog/delete-blog', {
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
      <Link href={`show-blog?id=${id}`} onClick={() => {setShowblog({
      title,
      description,
      imageUrl,
      category,
    })}}>
      <CardMedia
        sx={{ height: 140 }}
        image={imageUrl}
        title="green iguana"
      />
      </Link>
      <Link href={`show-blog?id=${id}`} onClick={() => {setShowblog({
      title,
      description,
      imageUrl,
      category,
    })}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shortDescription}
        </Typography>
      </CardContent>
      </Link>
      <CardActions>
        <Button size="small" onClick={handleEdit}>Edit</Button>
        <Button size="small" onClick={handleDelete}>Delete</Button>
      </CardActions>
    </Card>
  );
}


// import Link from 'next/link';
// // import { useUser } from '@clerk/clerk-react';
// import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation'
// import { useSetRecoilState } from 'recoil';
// import { editblogState, showblogState } from '@/app/recoilContextProvider';
// import Swal from 'sweetalert2'
// import 'sweetalert2/src/sweetalert2.scss'

// const BlogCard = ({ title, shortDescription, description, imageUrl, id, category } : 
//     {
//         title : string
//         shortDescription : string
//         description : string
//         imageUrl : string
//         id : number
//         category : string
//         // username: string
//     }
// ) => {

//   const router = useRouter();
//   // const { user } = useUser();
//   // const currentUser = user?.username;

//   const  setEditblog = useSetRecoilState(editblogState);
//   const  setShowblog = useSetRecoilState(showblogState)

//   const handleDelete = async () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//           if (id) {
//           const res = await fetch('/api/blog/delete-blog', {
//           method : "DELETE",
//           headers : {"blogid" : id.toString(),"Cache-Control": "no-store"}
//           })
//           const data = await res.json();
//           if (!res.ok) toast.error(data.message || "INTERNAL ERROR");
//         }
//         else toast.error("Invalid Blog Id")
//         await Swal.fire({
//           title: "Deleted!",
//           text: "Your file has been deleted.",
//           icon: "success"
//         });
//         window.location.href = "/"
//       }
//     });
//     // console.log(id)
    
//     // console.log("Delete button clicked for blog with ID:", id);
//   };

//   const handleEdit = () => {
//     setEditblog({
//       title,
//       description,
//       shortDescription,
//       imageUrl,
//       category
//     })
//     router.push(`/edit-blog?id=${id}`)
//   };

//   return (
//     <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
//       <div className="relative h-48">
//         <img className="absolute inset-0 w-full h-full object-cover" src={imageUrl} alt={title} />
//       </div>
//       <div className="px-6 py-4">
//         <div className="font-bold text-xl mb-2">{title}</div>
//         <p className="text-gray-700 text-base">{shortDescription}</p>
//         <p className="text-gray-600 text-sm mt-2">Category: {category}</p>
//         {/* <p className="text-gray-600 text-sm mt-2">Author: {username}</p> Display username */}
//       </div>
//       <Link href={`/show-blog/?id=${id}`} onClick={() => {setShowblog({
//       title,
//       description,
//       imageUrl,
//       category,
//     })}}>
//           <span className=" hover:underline text-blue-500 font mx-6  rounded">
//             Read More
//           </span>
//       </Link>
//       <div className="px-6 py-4 flex justify-between items-center">
//         <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
//         <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button>
        
//       </div>
      
//     </div>
//   );
// };

// export default BlogCard;
