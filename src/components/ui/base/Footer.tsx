import Link from 'next/link'
import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <div className='w-full py-8 px-12 flex flex-wrap justify-between items-center border-t border-zinc-300 dark:border-zinc-700'>
        <h2 className='flex text-xl dark:text-gray-400 text-gray-600'>
            <span>Developed By</span>
            <Link href="https://subhraneel-portfolio.vercel.app/" target='_blank'>
                <span className='ml-2 text-blue-600'>Subhraneel</span>
            </Link>
        </h2>

        <div className='flex justify-center items-center gap-4 mt-4 md:mt-0'>
            <Link href='https://x.com/Subhraneel55545' target='_blank'>
                <FaTwitter size={20} className='cursor-pointer dark:text-gray-400 text-gray-600'/>
            </Link>
            <Link href='https://www.linkedin.com/in/subhraneel-goswami-599931282/' target='_blank'>
                <FaLinkedin size={20} className='cursor-pointer dark:text-gray-400 text-gray-600'/>
            </Link>
            <Link href='https://github.com/subhraneel2005' target='_blank'>
                <FaGithub size={20} className='cursor-pointer dark:text-gray-400 text-gray-600'/>
            </Link>
        </div>
    </div>
  )
}
