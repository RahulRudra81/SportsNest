import HomeImg from '../../public/Home.png'
import { Typography, Button } from '@mui/material';

import Image
 from 'next/image';
export default function Home() {
  return (
    <div className="flex items-center justify-between h-screen text-black">
    <div className="text-container max-w-2xl mx-auto px-4">
      <p className="text-4xl font-mono md:text-6xl font-bold mb-5">Welcome to <br/> Blog Nest</p>
      <p className="text-lg font-mono md:text-xl mb-8">This is where you'll find amazing content to Dive in and explore!</p>
      <a href="/create-blog" className="bg-[#222831] hover:bg-[#393E46] text-white font-bold py-3 px-6 rounded-lg text-lg">Create Blog</a>
    </div>
    {/* Image on one side */}
    <div className="image-container hidden md:block w-1/2">
      <Image src={HomeImg} alt="Image description" className="w-full h-full object-cover" />
    </div>
  </div>
  );
}
