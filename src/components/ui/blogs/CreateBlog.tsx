import React from 'react';

interface CreateBlogProps {
  userId: string; 
}

export default function CreateBlog({ userId }: CreateBlogProps) {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
      <h2>Create a New Blog</h2>
     
      <p>User ID: {userId}</p>
     
    </div>
  );
}
