import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/providers/prisma';

export async function GET(req: NextRequest){
    try {
        const allBlogs = await prisma.blog.findMany({
            include:{
                user:{
                    select:{
                        name: true,
                        image: true,
                    },
                },
            },
        });

        const blogsWithAutorData = allBlogs.map(blog => ({
            ...blog,
            authorName: blog.user.name,
            authorImage: blog.user.image,
        }));

        return NextResponse.json(blogsWithAutorData, {status: 200});
        
    } catch (error) {
        return NextResponse.json({message:"Server error in explore api"}, {status: 500})
    }
}