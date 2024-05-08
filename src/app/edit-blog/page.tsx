
import EditPage from "@/components/EditPage";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit Blog',
  description: 'Edit your blog here',
}

const page = () => {
   return (
    <EditPage />
   )
};

export default page;