'use client'
import React, { useState } from 'react'
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Toggle } from "@/components/ui/toggle"
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '../button'
import { FaGithub, FaStar } from 'react-icons/fa'
import Link from 'next/link'

export default function Navbar() {

    const { setTheme } = useTheme()
    const [isDark, setisDark] = useState(false);

    const themeToggle = () => {
        setisDark(!isDark);
        setTheme(isDark ? 'light' : 'dark');
    }

  return (
    <div className='flex justify-between items-center w-full px-6 py-4'>
        <div className='flex items-center space-x-4'>
        <h1 className='font-bold md:text-2xl text-xl bg-gradient-to-r from-indigo-600 to-purple-800 dark:bg-gradient-to-r dark:from-indigo-400 dark:to-purple-600 bg-clip-text text-transparent'>BlogBuddies</h1>
        <Link href='https://github.com/subhraneel2005/blog-buddies' target='_blank'>
          <Button variant="outline" className='hidden md:flex gap-2'>
            <FaGithub size={20}/>
            <p>Star on Github</p>
          </Button>
        </Link>
        </div>
        <div className='flex items-center gap-4'>
        <Button>Login</Button>
        <Toggle
            onPressedChange={themeToggle}
            className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-12 rounded-full",
            )}
            >
            {isDark ? (
            <SunIcon className="size-5" />
            ) : (
            <MoonIcon className="size-5" />
            )}
        </Toggle>
        </div>
    </div>
  )
}
