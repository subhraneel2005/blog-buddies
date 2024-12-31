'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Image, Tags as TagsIcon } from 'lucide-react';
import BlogCard from './BlogCard';
import { toast } from 'sonner';
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import Link from 'next/link';
import SlashCommandMenu from './SlashCommandMenu';

interface CreateBlogProps {
  userId: string;
}

interface Blog {
  id: string;
  title: string;
  body: string;
  thumbnail?: string;
  tags: string[];
  authorName: string;
  authorImage?: string;
}

export default function CreateBlog({ userId }: CreateBlogProps) {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState(''); 
  const [thumbnail, setThumbnail] = useState<string>('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [existingBlogs, setExistingBlogs] = useState<Blog[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { theme } = useTheme();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs');
        setExistingBlogs(response.data); 
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
    setLoading(true); 
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
        setBody('');  // Resetting body here
        setThumbnail('');
        setThumbnailFile(null);
        setTags([]);
        toast.success("Blog published successfully");
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    } finally {
      setLoading(false);
    }
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

  const handleEditorChange = (value?: string) => {
    setBody(value || '');
  };

  const handleTitleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    setTitle(target.value);
    target.style.height = 'auto'; 
    target.style.height = `${target.scrollHeight}px`; 
  };

  type CommandType = 'h1' | 'h2' | 'h3' | 'bullet' | 'number' | 'code' | 'quote' | 'image' | 'table';

  const handleCommandSelect = (command: CommandType) => {
    switch (command) {
      case 'h1':
        setBody(body + '\n# ');
        break;
      case 'h2':
        setBody(body + '\n## ');
        break;
      case 'h3':
        setBody(body + '\n### ');
        break;
      case 'bullet':
        setBody(body + '\n- ');
        break;
      case 'number':
        setBody(body + '\n1. ');
        break;
      case 'code':
        setBody(body + '\n```\n\n```');
        break;
      case 'quote':
        setBody(body + '\n> ');
        break;
      case 'image':
        setBody(body + '\n![Alt text](image-url)');
        break;
      case 'table':
        setBody(body + '\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1 | Cell 2 |');
        break;
    }
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
            <Button size="sm" disabled={loading} onClick={handleCreateBlog}>
              {loading ? "Publishing..." : "Publish"} 
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
            className='text-5xl mt-6 md:text-7xl text-center py-4 resize-none outline-none bg-transparent border-none w-full placeholder-gray-500' 
            rows={1}
            style={{ 
              overflow: 'hidden', 
              wordWrap: 'break-word', 
              height: 'auto'
            }} 
          />

          <div className="md:mt-8 mt-5 px-6 w-full max-w-5xl">
            <p className='text-center p-4'>Press '/' for commands</p>
          <SlashCommandMenu onCommandSelect={handleCommandSelect} />
          </div>

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

      {existingBlogs.length===0 && (
        <div className="flex justify-center items-center">
          Loading...
        </div>
      )}

      {existingBlogs.length > 0 && (
        <div className='min-h-screen w-full flex justify-center items-center flex-col py3'>
          <Badge>Your Blogs</Badge>
          <div className='grid grid-cols-1 px-4 md:grid-cols-2 gap-5 mt-8'>
            {existingBlogs.map(blog => (
                <BlogCard
                href={`/user/${userId}/blogs/${blog.id}`}
                userId={userId}
                blogId={blog.id}
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
}
