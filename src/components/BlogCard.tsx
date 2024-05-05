// components/BlogCard.js
'use client';
import Link from 'next/link';
import { useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { useSetRecoilState } from 'recoil';
import { editblogState, showblogState } from '@/app/recoilContextProvider';

const BlogCard = ({ title, shortDescription, description, imageUrl, id, category, username } : 
    {
        title : string
        shortDescription : string
        description : string
        imageUrl : string
        id : number
        category : string
        username: string
    }
) => {

  const router = useRouter();
  const { user } = useUser();
  const currentUser = user?.username;

  const  setEditblog = useSetRecoilState(editblogState);
  const  setShowblog = useSetRecoilState(showblogState)

  const handleDelete = async () => {
    console.log(id)
      if (id) {
        const res = await fetch('/api/blog/delete-blog', {
        method : "DELETE",
        headers : {"blogid" : id.toString(),"Cache-Control": "no-store"}
      })
      const data = await res.json();
      if (res.ok) toast.success("Blog Deleted successfully");
      else toast.error(data.message || "INTERNAL ERROR");
    }
    else toast.error("Invalid Blog Id")
    // console.log("Delete button clicked for blog with ID:", id);
  };

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
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="relative h-48">
        <img className="absolute inset-0 w-full h-full object-cover" src={imageUrl} alt={title} />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{shortDescription}</p>
        <p className="text-gray-600 text-sm mt-2">Category: {category}</p>
        <p className="text-gray-600 text-sm mt-2">Author: {username}</p> {/* Display username */}
      </div>
      <Link href={`/show-blog/?id=${id}`} onClick={() => {setShowblog({
      title,
      description,
      imageUrl,
      category,
      username
    })}}>
          <span className=" hover:underline text-blue-500 font mx-6  rounded">
            Read More
          </span>
      </Link>
      {username == currentUser && <div className="px-6 py-4 flex justify-between items-center">
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
        <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button>
        
      </div>}
      
    </div>
  );
};

export default BlogCard;
