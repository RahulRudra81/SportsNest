"use client";

import { RecoilRoot, atom, selector } from "recoil";

export const blogsState = atom({
  key: "blogsState",
  default: [],
});

export const blogsArrayState = selector({
    key : "blogsArrayState",
    get : ({get}) => {
        const blogs = get(blogsState);
        return blogs;
    }
})

export const editblogState = atom({
    key : "editblogState",
    default: {
        title : "",
        shortDescription : "",
        description : "",
        imageUrl : "",
        category : "",
    }
})


export const editblogvalState = selector({
    key : "editblogvalState",
    get : ({get}) => {
        const blog = get(editblogState);
        return blog;
    }
})

export const showblogState = atom({
    key : "editblogState",
    default: {
        title : "",
        description : "",
        imageUrl : "",
        category : "",
        username : ""
    }
})


export const showblogvalState = selector({
    key : "editblogvalState",
    get : ({get}) => {
        const blog = get(showblogState);
        return blog;
    }
})

export default function RecoidContextProvider({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}