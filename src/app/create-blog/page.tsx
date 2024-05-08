import CreateBlog from "@/components/CreateBlog";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Blog',
  description: 'Write your own blog here',
}

const page = () => {
  return (
  <CreateBlog/>
  )
};

export default page;
