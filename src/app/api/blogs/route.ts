// app/api/blogs/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/providers/prisma';
import cloudinary from '@/lib/cloudinary';
import { Readable } from 'stream';
import { getCurrentUser } from '@/providers/session';

export async function POST(request: Request) {
  const formData = await request.formData();

  const title = formData.get('title');
  const body = formData.get('body');
  const userId = formData.get('userId');
  const tags = formData.get('tags');
  const thumbnail = formData.get('thumbnail');

  // Validations
  if (!title || !body || !userId) {
    return NextResponse.json({ error: 'Title, body, and userId are required' }, { status: 400 });
  }

  try {
    let tagsArray: string[] | undefined;

    // Convert tags to an array if they exist
    if (tags) {
      // Split the tags string by commas and trim whitespace
      tagsArray = (tags as string).split(',').map(tag => tag.trim());
    }

    if (thumbnail && thumbnail instanceof File) {
      const buffer = await thumbnail.arrayBuffer();
      const stream = Readable.from(Buffer.from(buffer));

      const uploadPromise = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: 'thumbnails' },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );

        stream.pipe(uploadStream);
      });

      const uploadResult = await uploadPromise;
      const thumbnailUrl = (uploadResult as { secure_url: string }).secure_url;

      const newBlog = await prisma.blog.create({
        data: {
          title: title as string,
          body: body as string,
          thumbnail: thumbnailUrl,
          tags: tagsArray,
          userId: userId as string,
        },
      });

      return NextResponse.json(newBlog, { status: 201 });
    } else {
      return NextResponse.json({ error: 'Thumbnail is required' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}


export async function GET(request: Request) {
  const user = await getCurrentUser();

  try {
    if (!user?.email) {
      return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 });
    }

    
    const dbUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!dbUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    
    const blogs = await prisma.blog.findMany({
      where: {
        userId: dbUser.id, 
      },
      include: {
        user: {  
          select: {
            name: true,
            image: true, 
          },
        },
      },
      orderBy:{
        createdAt: 'desc'
      },
    });

    const blogsWithAuthor = blogs.map(blog => ({
      ...blog,
      authorName: blog.user?.name,
      authorImage: blog.user?.image,
    }));

    return NextResponse.json(blogsWithAuthor, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
