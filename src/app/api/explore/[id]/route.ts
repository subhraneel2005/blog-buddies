import prisma from "@/providers/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, {params}:{params:{id:string}}){
    const {id} = params;

    try {
        const blog = await prisma.blog.findUnique({
            where:{
                id: id,
            },
            include:{
                user:{
                    select:{
                        name: true,
                        image: true
                    }
                },
            },
        });

        if(!blog){
            return NextResponse.json({message: "Explore Blog not found..Please try again later"},{status: 404});
        }
        return NextResponse.json(blog, {status: 200});

    } catch (error) {
        return NextResponse.json({message: "Single Explore api errror check backend"}, {status: 500})
    }
}