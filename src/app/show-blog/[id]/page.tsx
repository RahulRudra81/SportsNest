import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import siteMetadata from "@/app/utils/siteMetadata";

export async function generateMetadata ({params} : any) {
   const blog  = await fetchBlog(params.id);
   if (!blog) return;
   
   let images = [ blog.imageurl, siteMetadata.siteUrl + siteMetadata.socialBanner]
   const ogImages = images.map(img => {
      return {url : img}
   })

   return {
      title : blog.title,
      description : blog.shortdescription,
      openGraph: {
         title: blog.title,
         description: blog.shortdescription,
         url: siteMetadata.siteUrl + `/show-blogs/${params.id}`,
         siteName: siteMetadata.title,
         locale: 'en_US',
         type: 'article',
         images: ogImages, 
       },
      twitter : {
         title: blog.title,
         description: blog.shortdescription,
         images : ogImages,
      }
   }
}

const fetchBlog = async (id : any) => {
   
   try{
   const res = await fetch ('http://localhost:3000/api/blog/get-blog', {
      method : "GET",
      headers : {
         "Content-Type": "application/json",
         "id" : id,
      }
   })
   const data = await res.json();
   // console.log(data.blogs.rows[0])
   return data.blogs.rows[0];
   }
   catch (err) {
      console.log(err);
   }
}

export default async function page ({params} : any) {
   console.log(siteMetadata.siteUrl + `/show-blog/${params.id}`)
   const id = params.id;
   // console.log('hit')
   const blog = await fetchBlog(id)
   // console.log(blog)
   return (
      <>
    <div className='w-screen p-10'>
    <Card sx={{ maxWidth: 14440 }}>
      <div className='flex justify-center items-center'>
      <img src = {blog.imageurl} className='w-60 h-60 ' />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {blog.title}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: blog.description }}>
        </div>
      </CardContent>
      <CardActions>
        <Button variant='outlined' size="small">{blog.category}</Button>
      </CardActions>
    </Card>
    </div>
    </>
   )
}

