'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BlogCard from './BlogCard';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'; // Importing the Dialog component
import { Input } from '@/components/ui/input'; // Importing the Input component
import { Image, Tags as TagsIcon, X } from 'lucide-react';

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
  const [tagInput, setTagInput] = useState<string>(''); // State for tag input
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // State for dialog visibility
  const [existingBlogs, setExistingBlogs] = useState<Blog[]>([]);

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

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const handleTitleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    setTitle(target.value);
    target.style.height = 'auto'; 
    target.style.height = `${target.scrollHeight}px`; 
  };

  const handleBodyInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = 'auto'; 
    target.style.height = `${target.scrollHeight}px`; 
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of the Enter key
      handleAddTag();
    }
  };

  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center p-4'>
      <div className='h-full w-full flex flex-col justify-center items-center mb-24'>
        

        <div className='flex gap-4 justify-center items-center w-full mb-10'>
          <Button variant='outline' size="sm">
            <Image className='text-gray-500' />
            <span className='text-gray-500 ml-2'>Add cover</span>
          </Button>
          <Button 
            variant='outline' 
            size="sm" 
            onClick={() => setDialogOpen(true)} 
          >
            <TagsIcon className='text-gray-500' />
            <span className='text-gray-500 ml-2'>Add Tags</span>
          </Button>
        </div>

        <div className='flex flex-wrap mb-4'>
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant='secondary' 
              className='mr-2 ml-2 mb-2 cursor-pointer text-[9px] md:text-[14px]'
              onClick={() => handleRemoveTag(tag)} 
            >
              {tag} &times; 
            </Badge>
          ))}
        </div>

        <textarea 
          ref={titleRef}
          value={title}
          onInput={handleTitleInput}
          placeholder='Blog Title...' 
          className='text-5xl mt-6 md:text-7xl text-center resize-none outline-none bg-transparent border-none w-full max-w-md placeholder-gray-500' 
          rows={1}
          style={{ 
            overflow: 'hidden', 
            wordWrap: 'break-word', 
            height: 'auto'
          }} 
        />

        <textarea 
          ref={bodyRef}
          value={body}
          onInput={handleBodyInput}
          placeholder='Write something interesting😉...' 
          className='text-center md:mt-8 px-6 outline-none bg-transparent border-none text-[15px] md:text-xl w-full max-w-md placeholder-gray-400' 
          rows={1} 
        />

        {/* Shadcn Dialog for adding tags */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogTitle>Add Tags</DialogTitle>
            <DialogDescription>
              <Input
                type='text'
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                placeholder='Add a tag and press Enter'
                className='border border-gray-300 rounded px-4 py-2 mb-4'
              />
              <div className='flex flex-wrap'>
                {tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant='outline' 
                    className='mr-2 mb-2 cursor-pointer'
                    onClick={() => handleRemoveTag(tag)} 
                  >
                    {tag} &times;
                  </Badge>
                ))}
              </div>
            </DialogDescription>
            <DialogClose asChild>
              <Button variant='secondary' size='sm' onClick={() => setDialogOpen(false)}>Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>

      {existingBlogs && <div>
        <Badge className='mt-12'>Your blogs</Badge>
        <div className='w-full max-w-md mt-6'>
          {/* {existingBlogs.map((blog) => (
            <BlogCard key={blog.id} title={blog.title} body={blog.body} thumbnail={blog.thumbnail!} author={blog.author} tags={blog.tags} />
          ))} */}
        </div>
      </div>}
    </div>
  );
}
