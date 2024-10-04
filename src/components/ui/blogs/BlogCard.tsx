import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '../badge';

interface BlogCardProps {
  title: string;
  body: string;
  thumbnail: string; 
  author: string; 
  tags: string[];
}

export default function BlogCard({ title, body, thumbnail, author, tags }: BlogCardProps) {
  return (
    <Card>
      {thumbnail && <img src={thumbnail} alt={title} className="object-cover w-full h-48 rounded-tr-lg rounded-tl-lg" />} 
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{body.substring(0, 100)}...</CardDescription> {/* Show a preview of the body */}
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
      <CardFooter>
        {author && <p>Written by: {author}</p>}
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline">{tag}</Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
