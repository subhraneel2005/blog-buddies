'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BlogCard from './BlogCard';
import { Image, Tags } from 'lucide-react';

interface CreateBlogProps {
  userId: string; 
}

interface Blog {
  id: string;
  title: string;
  body: string;
  thumbnail?: string;
  author: string;
  tags: string[];
}

export default function CreateBlog({ userId }: CreateBlogProps) {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [existingBlogs, setExistingBlogs] = useState<Blog[]>([]);

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     const response = await fetch(`/api/blogs?userId=${userId}`);
  //     const data = await response.json();
  //     setExistingBlogs(data);
  //   };

  //   fetchBlogs();
  // }, [userId]);

  const handleCreateBlog = async () => {
    const newBlog = {
      title,
      body,
      thumbnail,
      tags,
      userId,
    };

    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBlog),
    });

    if (response.ok) {
      const createdBlog = await response.json();
      setExistingBlogs((prev) => [...prev, createdBlog]);
      setTitle('');
      setBody('');
      setThumbnail('');
      setTags([]);
    }
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = 'auto'; 
    target.style.height = `${target.scrollHeight}px`; 
  };

  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center p-4'>
      
      <div className='h-full w-full flex flex-col justify-center items-center mb-24'>
        
        <div className='flex gap-4 justify-center items-center w-full mb-10'>
        <Button variant='outline' size="sm">
          <Image className='text-gray-500'/>
          <span className='text-gray-500 ml-2'>Add cover</span>
        </Button>
        <Button variant='outline' size="sm">
          <Tags className='text-gray-500'/>
          <span className='text-gray-500 ml-2'>Add tags</span>
        </Button>
        </div>

        <input 
          type="text" 
          placeholder='Blog Title...' 
          className='text-5xl md:text-7xl text-center outline-none bg-transparent border-none w-full max-w-md placeholder-gray-500' 
        />
        <textarea 
          ref={textAreaRef}
          onInput={handleInput}
          placeholder='Write something interesting😉...' 
          className='text-center mt-8 px-6 outline-none bg-transparent border-none text-[15px] md:text-xl w-full max-w-md placeholder-gray-400' 
        />
      </div>


      {existingBlogs && <div>
        <Badge className='mt-12'>Your blogs</Badge>
      <div className='w-full max-w-md mt-6'>
        {/* {existingBlogs.map((blog) => (
          <BlogCard key={blog.id} title={blog.title} body={blog.body} thumbnail={blog.thumbnail!} author={blog.author} tags={blog.tags} />
        ))} */}
      </div></div>}
    </div>
  );
}
