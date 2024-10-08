'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';
import { useTheme } from "next-themes";
import Link from "next/link";
import axios from "axios";

// Dynamically import MDEditor
const MDEditor = dynamic(() => import("@uiw/react-md-editor").then(mod => mod.default.Markdown), { ssr: false });

interface Blog {
  id: string;
  title: string;
  body: string;
  thumbnail?: string;
  tags: string[];
  user: {
    name: string;
    image?: string;
    id: string;
  };
}

export default function ExploreSingleBlog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { theme } = useTheme();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/explore/${blogId}`);
        if (!res) {
          throw new Error("Failed to fetch blog");
        }
        setBlog(res.data);
      } catch (error) {
        setError("Unable to load the blog post.");
      } finally {
        setIsLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  if (isLoading) {
    return (
        <div className="min-h-screen w-full flex justify-center items-center">
            <Skeleton className="h-[500px] w-[350px] rounded-lg" />
        </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!blog) {
    return <p>Blog not found.</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{blog.title}</CardTitle>
          <CardDescription className="text-muted-foreground">
            <div className="flex items-center space-x-4 mt-2">
              <Avatar>
                <AvatarImage src={blog.user.image} alt={blog.user.name} />
                <AvatarFallback>{blog.user.name}</AvatarFallback>
              </Avatar>
              <p className="font-semibold">{blog.user.name}</p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {blog.thumbnail && (
            <img
              loading="lazy"
              src={blog.thumbnail}
              alt={blog.title}
              width={800}
              height={400}
              className="w-full h-auto rounded-lg"
            />
          )}
          <div className="mt-4 text-lg">
            {/* Wrap MDEditor inside a div with data-color-mode */}
            <div data-color-mode={theme === 'dark' ? 'dark' : 'light'}>
              <MDEditor 
                source={blog.body} 
                className="p-4 rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-wrap mt-4 gap-2">
            {blog.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      <Link href={`/explore/blogs`}>
        <Button variant="link" className="mt-4">
            Go back to Blogs
        </Button>
      </Link>
    </div>
  );
}
