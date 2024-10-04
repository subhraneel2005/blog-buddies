'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Image, Tags as TagsIcon } from 'lucide-react';
import BlogCard from './BlogCard';
import { useFormStatus } from 'react-dom';

interface CreateBlogProps {
  userId: string; 
}

interface Blog {
  id: string;
  title: string;
  body: string;
  thumbnail?: string;
  tags: string[];
  authorName: string;  // New field for author name
  authorImage?: string; // New field for author image
}

export default function CreateBlog({ userId }: CreateBlogProps) {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>(''); 
  const [thumbnail, setThumbnail] = useState<string>('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [existingBlogs, setExistingBlogs] = useState<Blog[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]); // Adjusted Blog[] type

  const { pending } = useFormStatus();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs');
        setExistingBlogs(response.data); // Data will include authorName and authorImage
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateBlog = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('userId', userId);
    formData.append('tags', tags.join(','));

    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile);
    }

    try {
      const response = await axios.post('/api/blogs', formData);
      if (response.status === 201) {
        setExistingBlogs((prev) => [...prev, response.data]);
        setTitle('');
        setBody('');
        setThumbnail('');
        setThumbnailFile(null);
        setTags([]);
        alert("Blog published successfully!");
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const handleTitleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    setTitle(target.value);
    target.style.height = 'auto'; 
    target.style.height = `${target.scrollHeight}px`; 
  };

  const handleBodyInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    setBody(target.value);
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
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleAddCoverClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className='min-h-screen w-full flex flex-col justify-center items-center p-4'>
        <div className='h-full w-full flex flex-col justify-center items-center mb-24'>
          <div className='flex gap-4 justify-center items-center w-full mb-10'>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="hidden" 
              ref={fileInputRef}
            />
            <Button variant='outline' size="sm" onClick={handleAddCoverClick}>
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
            <Button size="sm" disabled={pending} onClick={handleCreateBlog}>
                {pending ? "Publishing..." : "Publish"} 
            </Button>
          </div>

          {thumbnail && <img src={thumbnail} alt="Thumbnail preview" className="w-40 h-40 object-cover mb-4" />}

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
            value={title}
            onInput={handleTitleInput}
            placeholder='Blog Title...' 
            className='text-5xl mt-6 md:text-7xl text-center resize-none outline-none bg-transparent border-none w-full placeholder-gray-500' 
            rows={1}
            style={{ 
              overflow: 'hidden', 
              wordWrap: 'break-word', 
              height: 'auto'
            }} 
          />

          <textarea 
            value={body} 
            onInput={handleBodyInput} 
            placeholder='Write something interesting😉...' 
            className=' md:mt-8 px-6 outline-none bg-transparent border-none text-[14px] md:text-[16px] text-center w-full placeholder-gray-400' 
            rows={1} 
          />

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
      </div>

      {existingBlogs.length > 0 && (
        <div className='min-h-screen w-full flex justify-center items-center flex-col py-3'>
          <Badge>Your Blogs</Badge>
          <div className='grid grid-cols-1 px-4 md:grid-cols-2 gap-5 mt-8'>
            {existingBlogs.map(blog => (
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
        </div>)}
    </div>
  );
};
    