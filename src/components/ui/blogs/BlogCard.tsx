import React from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '../badge';
import Image from 'next/image';

interface BlogCardProps {
  title: string;
  body: string;
  thumbnail: string;
  tags: string[];
}

export default function BlogCard({ title, body, thumbnail, tags }: BlogCardProps) {
  return (
    <Card className='w-[340px] md:w-[400px] h-[450px] md:h-[450px]'>
      {thumbnail && (
        <Image
          src={thumbnail}
          alt={title}
          width={500}
          height={350}
          className="object-contain rounded-tr-lg rounded-tl-lg"
        />
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {/* <CardDescription className="overflow-hidden h-6" title={body}>
          {body.split('\n')[0]}
        </CardDescription> */}
      </CardHeader>
      {/* <CardContent>
        <p>{body}</p>
      </CardContent> */}
      <CardFooter>
        
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline">{tag}</Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
