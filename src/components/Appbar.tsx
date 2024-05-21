'use client';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { useSetRecoilState } from "recoil";
import { blogsState } from "@/app/recoilContextProvider";
import Logo from "../../public/Logo.png"
import Image from "next/image";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from 'react';
import { UserButton } from "@clerk/nextjs";
import { useUser } from '@clerk/clerk-react';
import { useAuth } from "@clerk/nextjs";
import { useEffect } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: "#393E46"
    }
  }
});


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const { user } = useUser();
  const {userId} = useAuth();
  const username = user?.username;
  const userImageUrl = user?.imageUrl;
  const setBlogs = useSetRecoilState(blogsState);
  const [category, setCategory] = useState<string>();
  const [showMenu, setShowMenu] = useState<boolean>(false)

  // useEffect(() => {
  //   const fun = async () => {
  //     if (username)
  //     {
  //         const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/add-user`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body : JSON.stringify( {
  //           username,
  //           userImageUrl
  //         }
  //         )
  //       });
  //       // console.log(res)
  //     }
  //   }

  //   fun();

  // }, [username])


  return (
    <div className='fixed top-0 left-0 right-0 z-50 shadow-md'>
      {showMenu && <div className='bg-[#393E46] py-5 absolute top-14'>
      
      { userId ? <>
                   <div className="mx-5 flex flex-col justify-between items-center gap-5">
                   <Link href="/"  onClick={async () => {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/all-blogs`, {
            method : "GET",
          })
          const data = await res.json();
          setBlogs(data.blogs.rows)
          setShowMenu(false)
          // setBlogs(res.);
        }}>
          <p className='text-gray-300 text-sm'>Home</p>
        </Link>
                   <Link href="/" onClick={async () => {
                  
                  if (username){
                  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/my-blogs`, {
                    method : "GET",
                    headers : {"username" : username}
                  })
                  const data = await res.json();
                  // console.log(data.blogs.rows)
                  setBlogs(data.blogs.rows)
                  setShowMenu(false)
                }
                // setBlogs(res.);
              }}><p className="text-gray-300 text-sm cursor-pointer">My Blogs</p></Link>
                <UserButton/>
                </div>
            </> : <div className='mx-5 flex flex-col justify-between items-center gap-5'>
            <Link href="/"  onClick={async () => {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/all-blogs`, {
            method : "GET",
          })
          const data = await res.json();
          setBlogs(data.blogs.rows)
          setShowMenu(false)
          // setBlogs(res.);
        }}>
          <p className='text-gray-300 text-sm -translate-x-2'>Home</p>
        </Link>
                <Link href="/sign-in" onClick={() => {setShowMenu(false)}}>
                    <p className="text-gray-300 mr-4">Sign In</p>
                </Link>
                <Link href="/sign-up" onClick={() => {setShowMenu(false)}}>
                    <p className="text-gray-300 border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-800">
                    Sign Up
                    </p>
                </Link>
          </div>
        }


        </div>}
      <ThemeProvider theme={theme}>
      <AppBar position="static" color='primary'>
        <Toolbar className='flex md:justify-between max-sm:justify-normal items-center '>
        <div className='flex flex-row justify-center items-center'>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setShowMenu(!showMenu)}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" className="max-sm:hidden" onClick={async () => {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/all-blogs`, {
            method : "GET",
          })
          const data = await res.json();
          setBlogs(data.blogs.rows)
          // setBlogs(res.);
        }}>
          <Image src = {Logo} alt = {'loading'} width={200} />
        </Link>
        </div>
        <form onSubmit={async (e) => {
                          e.preventDefault();
                          if (category) {
                            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/get-blogs`, {
                              method : "GET",
                              headers : {"category" : category}
                            })
                            const data = await res.json();
                            console.log(data.blogs.rows)
                            setBlogs(data.blogs.rows) 
                          }
                          setCategory('')
                        }}>
          <Search 
              >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value = {category}
              onChange={(e) => setCategory(e.target.value)}
              className='text-sm'
              placeholder="Search blogs by category..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
             
        
          </form>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
      </div>
  );
}



// "use client";
// import React, { useEffect } from "react";
// import Link from "next/link";
// // import { UserButton } from "@clerk/nextjs";
// // import { useUser } from '@clerk/clerk-react';
// // import { useAuth } from "@clerk/nextjs";
// import { useSetRecoilState } from "recoil";
// import { blogsState } from "@/app/recoilContextProvider";
// import { useState } from "react";
// import Logo from "../../public/Logo.png"
// import Image from "next/image";


// const AppBar = () => {
//   // const { user } = useUser();
//   // const {userId} = useAuth();
//   // const username = user?.username;
//   // console.log(userId)

//   const [category, setCategory] = useState<string>();
//   const setBlogs = useSetRecoilState(blogsState);

//   // useEffect(() => {
//   //   const fun = async () => {
//   //     if (username)
//   //     {
//   //         const res = await fetch("/api/user/add-user", {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           "username": username
//   //         },
//   //       });
//   //       // console.log(res)
//   //     }
//   //   }

//   //   fun();

//   // }, [username])

//   return (
//     <header className="bg-gray-800 py-4 lg:px-10">
//       <div className="container mx-auto flex items-center max-sm:justify-start  justify-between">
//         <div className="flex justify-between items-center space-x-3 mx-3 lg:space-x-20">
//         <Link href="/" className="max-sm:hidden" onClick={async () => {
//           const res = await fetch('/api/blog/all-blogs', {
//             method : "GET",
//           })
//           const data = await res.json();
//           setBlogs(data.blogs.rows)
//           // setBlogs(res.);
//         }}>
//           <Image src = {Logo} alt = {'loading'} width={200} />
//         </Link>
//         {/* <Link href={"/create-blog"}><p className="text-gray-300 text-sm cursor-pointer">Create Blog</p></Link> */}
//         </div>
//         <form className="flex items-center">
//           <input
//             value={category}
//             type="text"
//             placeholder="Search blogs by category"
//             className="px-4 py-2 rounded-lg mr-2 bg-white text-gray-800 max-sm:w-52 max-sm:text-sm"
//             onChange={(e) => setCategory(e.target.value)}
//           />
//           <button
//             type="submit"
//             className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 max-sm:text-sm"
//             onClick={async (e) => {
//               e.preventDefault();
//               if (category) {
//                 const res = await fetch('/api/blog/get-blogs', {
//                   method : "GET",
//                   headers : {"category" : category}
//                 })
//                 const data = await res.json();
//                 console.log(data.blogs.rows)
//                 setBlogs(data.blogs.rows) 
//               }
//               setCategory('')
//             }}
//           >
//             Search
//           </button>
//         </form>
//         {/* <div className="flex items-center">
//           { userId ? <>
//                 <div className="flex justify-between items-center space-x-3 mx-3 lg:space-x-20">
//                 <Link href="/" onClick={async () => {
                  
//                   if (username){
//                   const res = await fetch('/api/blog/my-blogs', {
//                     method : "GET",
//                     headers : {"username" : username}
//                   })
//                   const data = await res.json();
//                   // console.log(data.blogs.rows)
//                   setBlogs(data.blogs.rows)
//                 }
//                 // setBlogs(res.);
//               }}><p className="text-gray-300 text-sm cursor-pointer">My Blogs</p></Link>
//                 <UserButton/>
//                 </div>
//             </> : <>
//                 <Link href="/sign-in">
//                     <button className="text-white mr-4">Sign In</button>
//                 </Link>
//                 <Link href="/sign-up">
//                     <button className="text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-800">
//                     Sign Up
//                     </button>
//                 </Link>
//           </>
//         }
//         </div> */}
//       </div>
//     </header>
//   );
// };


// export default AppBar;