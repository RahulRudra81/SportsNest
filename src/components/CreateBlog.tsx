'use client';
import React, { useState, useEffect, ChangeEvent } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import dynamic from "next/dynamic";
import categories from "@/lib/categories";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import loader from "../../public/create-blog-loader/Loader.gif";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
// import { useUser } from '@clerk/clerk-react';
// import { useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'
import { ClassNames } from "@emotion/react";

const CreateBlog = () => {
    const router = useRouter()
    // const { user } = useUser();
    // const username = user?.username;
    // const {userId} = useAuth();
    // useEffect(() => {
    //     setTimeout(()=>{
    //         if (!userId) {
    //             router.push('/', { scroll: false })
    //             }
    //     }, 3000)
        
        
    // }, [userId]);

  const [title, setTitle] = useState<string>();
  const [shortDescription, setShortDescription] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [file, setFile] = useState<File | null>();
  const [description, setDescription] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [progress, setProgress] = useState<number>(-1);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [remainingCharacters, setRemainingCharacters] = useState<number>(100);

  const { edgestore } = useEdgeStore();

  useEffect(() => {
    if (progress >= 0 && progress < 100) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [progress]);

  const handleChangeDescription = (value: string) => {
    setDescription(value);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleShortDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    const remaining = 100 - value.length;
    setRemainingCharacters(remaining);
    if (value.length <= 100) {
      setShortDescription(value);
    } else {
      setShortDescription(value.slice(0, 100));
    }
  };

  return (
    <div className="p-5">
      <div className="container mx-auto mt-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Create Blog</h1>
        <form
          className="w-full lg:px-60"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!title || !shortDescription || !description || !category) {
              toast.error("Please fill in all required fields");
              return;
            }
           
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/add-blog`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title,
                  shortDescription,
                  description,
                  "imageUrl" : imageUrl || "https://placehold.co/600x400/000000/FFF0",
                  category,
                }),
              });
            
            const data = await res.json();
            if (res.ok) toast.success("Blog posted successfully");
            else toast.error(data.message || "INTERNAL ERROR");
            
            setTitle("");
            setShortDescription("");
            setDescription("");
            setFile(null);
            setCategory("");
          }}
        >
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="shortDescription" className="block text-gray-700">
              Short Description <span className="text-red-500">*</span>
              <br></br>
              <span className="text-xs text-gray-500">count : {remainingCharacters}</span>
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              className="mt-1 p-2 border border-gray-300 rounded w-full h-40 "
              value={shortDescription}
              onChange={handleShortDescriptionChange}

            />
          </div>
          <div className="mb-4">
            <label htmlFor="coverImage" className="block text-gray-700">
              Cover Image
            </label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              className="mt-1 p-2 border border-[#EEEEEE] rounded w-full"
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files?.[0]);
                }
              }}
            />
            <div className="relative">
            {showLoader && (
              <div className="absolute top-1/2 left-36 transform -translate-x-1/2 -translate-y-1/2 ">
                <Image src={loader} alt="Loading..." width={90} height={70} />
              </div>
            )}
            <button
            className="ml-2 bg-[#222831] hover:bg-[#393E46] text-white px-2 py-1 rounded"
            onClick={async (e) => {
                e.preventDefault();
                if (file) {
                    const res = await edgestore.publicFiles.upload({
                      file,
                      onProgressChange: (progress) => {
                        setProgress(progress);
                      },
                    });
                    // console.log(res.url)
                    setImageUrl(res.url);
                  } else
                  {
                      setImageUrl("https://placehold.co/600x400/000000/FFF0");
                      
                  }
            }}
            disabled={showLoader}
            >
            Upload
            </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 ">
              Description <span className="text-red-500">*</span>
            </label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={handleChangeDescription}
              className="description-editor h-96 mb-14 "
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              className="mt-1 p-2 border border-gray-300 rounded w-full overflow-hidden"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="mb-4 relative">
            {showLoader && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-3 -translate-y-1/2 ">
                <Image src={loader} alt="Loading..." width={90} height={70} />
              </div>
            )} */}
            <button
              type="submit"
              className="bg-[#222831] hover:bg-[#393E46] text-white px-4 py-2 rounded "
            //   disabled={showLoader}
            >
              Create Blog
            </button>
          {/* </div> */}
        </form>

        {/* Custom Stylesheet for React Quill */}
        <style jsx global>{`
          .description-editor {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
        `}</style>
      </div>
    </div>
  );
  
}

export default CreateBlog


