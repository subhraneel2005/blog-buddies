'use client'

import BlogCard from '@/components/ui/blogs/BlogCard'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

interface Blog {
    id: string;
    title: string;
    body: string;
    thumbnail?: string;
    tags: string[];
    authorName: string;
    authorImage?: string;
  }

export default function ExploreBlogs() {

  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchAllBlogs = async() => {
        try {
           const resp = await axios.get("/api/explore");
           setBlogs(resp.data) 
        } catch (error) {
            toast.error("Failed to fetch blogs...Please try again later");
        }
    };
    fetchAllBlogs();
  },[])
    
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
            {blogs.length === 0 && (
                <div className='min-h-screen w-full flex justify-center items-center'>
                    <p>Loading...</p>
                </div>
            )}
            {blogs.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                   {blogs.map((blog) => (
                        <BlogCard 
                        key={blog.id} 
                        title={blog.title} 
                        body={blog.body} 
                        thumbnail={blog.thumbnail!} 
                        tags={blog.tags} 
                        authorName={blog.authorName}    
                        authorImage={blog.authorImage!}
                        />
                   ))}
                </div>
            )}
    </div>
  )
}
