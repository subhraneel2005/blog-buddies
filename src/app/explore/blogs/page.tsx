'use client';

import BlogCard from '@/components/ui/blogs/BlogCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Blog {
  id: string;
  title: string;
  body: string;
  thumbnail?: string;
  tags: string[];
  authorName: string;
  authorImage?: string;
}

const predefinedTags = ['Nextjs', 'Mern', 'React', 'Gsoc', 'Opensource'];

export default function ExploreBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const resp = await axios.get(`/api/explore?timestamp=${new Date().getTime()}`);
        setBlogs(resp.data);
        setFilteredBlogs(resp.data); // Initially show all blogs
      } catch (error) {
        toast.error('Failed to fetch blogs...Please try again later');
      }
    };
    fetchAllBlogs();
  }, []);


  // Function to handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredBlogs(blogs); // If search is empty, show all blogs
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = blogs.filter((blog) =>
        blog.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
      setFilteredBlogs(filtered);
    }
  };

  // Function to handle predefined tag click
  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    const lowerTag = tag.toLowerCase();
    const filtered = blogs.filter((blog) =>
      blog.tags.some((blogTag) => blogTag.toLowerCase().includes(lowerTag))
    );
    setFilteredBlogs(filtered);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-6">
      {/* Search Bar */}
      <div className="w-full max-w-3xl flex flex-col items-center mb-6">
        <Input
          type="text"
          placeholder="Search by tags (e.g., Nextjs, React, Mern)"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full mb-4"
        />

        {/* Predefined Tags */}
        <div className="flex gap-3 flex-wrap justify-center mb-4">
          {predefinedTags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Blog Cards */}
      {filteredBlogs.length === 0 && (
        <div className="w-full flex justify-center items-center">
          <p>No blogs found for "{searchQuery}"</p>
        </div>
      )}

      {filteredBlogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBlogs.map((blog) => (
            <BlogCard
              href={`/explore/blogs/${blog.id}`}
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
      )}
    </div>
  );
}
