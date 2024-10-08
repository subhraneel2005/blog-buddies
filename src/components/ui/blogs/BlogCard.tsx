import React from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from '../badge';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '../avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Share2Icon } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { APP_URL } from '@/providers/Env';

interface BlogCardProps {
  blogId: string;
  title: string;
  body: string;
  thumbnail: string;
  tags: string[];
  authorName: string;
  authorImage: string;
  userId?: string;
  href?: string;
}

export default function BlogCard({ blogId, title, body, thumbnail, tags, authorName, authorImage, userId, href }: BlogCardProps) {
  
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const url = `${APP_URL}/explore/blogs/${blogId}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success('URL copied successfully!');
    }).catch(() => {
      toast.error('Failed to copy the URL');
    });
  };

  return (
    <Link href={href!} passHref>
    <Card className='w-[350px] flex flex-col justify-between shadow-lg'>
      {thumbnail && (
        <Image
          src={thumbnail}
          alt={title}
          width={350}
          height={350}
          className="object-contain rounded-tr-lg rounded-tl-lg"
        />
      )}

      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      {/* Card Content for tags */}
      <CardContent className="flex-grow">
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline">{tag}</Badge>
          ))}
        </div>
      </CardContent>

      {/* Fixed footer at the bottom */}
      <CardFooter className='flex justify-between items-center px-3 py-4 mt-auto'>
        <div className='flex gap-2 items-center'>
          <Avatar>
            <AvatarImage src={authorImage} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className='text-gray-500 text-[14px]'>{authorName}</p>
        </div>
        
        <Share2Icon 
          size={20} 
          className='text-gray-700 dark:text-gray-400 cursor-pointer' 
          onClick={handleShare} 
        />
      </CardFooter>
    </Card>
    </Link>
  );
}
