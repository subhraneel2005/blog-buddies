import React from 'react'
import { Badge } from '../badge'
import { Button } from '../button'

export default function LandingPage() {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
      <Badge className='flex justify-center items-center text-[12px] md:text-[16px]' variant="outline">
        <span className='text-purple-500'>#1</span>
        <span className='ml-2'>Distraction Free Blogging Platform</span>
      </Badge>

      <h1 className='mt-6 text-5xl font-bold md:text-7xl text-center px-4'>
        <span className='text-gray-900 dark:text-gray-200'>Share Your Ideas in</span>
       <span className='ml-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-800 dark:bg-gradient-to-r dark:from-indigo-400 dark:to-purple-600'>Peace</span>
      </h1>

      <p className='text-[15px] mt-6 font-semibold md:text-lg max-w-3xl text-center px-4 text-gray-700 dark:text-gray-400'>
        Welcome to Blog Buddies—a distraction-free space for developers to share their ideas.
      </p>

      <div className='px-4 flex justify-center items-center gap-6 mt-16'>
        <Button>Start Writing</Button>
        <Button variant="outline">Explore</Button>
      </div>

      <div className='mb-32'></div>
    </div>
  )
}
