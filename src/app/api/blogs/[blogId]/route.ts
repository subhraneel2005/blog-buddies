import prisma from "@/providers/prisma";
import {getCurrentUser} from "@/providers/session"
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { blogId: string } }) {

    const user = await getCurrentUser();
    const { blogId } = params;

    try {
        if(!user?.email){
            return NextResponse.json({message: "Not authenticated"}, {status: 401});
        }

        const dbUser = await prisma.user.findUnique({
            where: {
              email: user.email,
            },
          });

          if (!dbUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
          }

        const blog = await prisma.blog.findUnique({
            where:{
                id: blogId,
            },
            include:{
                user:{
                    select:{
                        name:true,
                        image: true,
                        id:true,
                    }
                }
            }
        });

       

        if(!blog){
            return NextResponse.json({message: "Blog not found..Please try again later"},{status: 404});
        }
        return NextResponse.json(blog, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Cannot get Single blog....Internal Server error"}, {status: 500});

    }
}