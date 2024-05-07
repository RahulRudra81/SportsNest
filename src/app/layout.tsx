import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { EdgeStoreProvider } from '../lib/edgestore';
import { Toaster } from "react-hot-toast";
import React from 'react';
import RecoidContextProvider from "./recoilContextProvider";

import Appbar from "../components/Appbar"
import Footer from "../components/Footer";
import { InitBlogs } from "@/components/InitBlogs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Nest",
  description: "Read and Create Blogs over Blog Nest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
        <RecoidContextProvider>
          <div className="flex flex-col h-screen">
            <InitBlogs/>
          <div  ><Appbar/></div>
          <div className="bg-[#EEEEEE] flex-1">
           
          <EdgeStoreProvider>
            <Toaster position="bottom-center" />
            {children}
          </EdgeStoreProvider>
          </div>
          <div ><Footer/></div>
          </div>
          </RecoidContextProvider>
        </body>
      </html>
    </ClerkProvider>
   
  );
}
