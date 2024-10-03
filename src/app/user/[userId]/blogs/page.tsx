import CreateBlog from '@/components/ui/blogs/CreateBlog';
import prisma from '@/providers/prisma';
import { getCurrentUser } from "@/providers/session";

export default async function BlogPage() {
 
  const user = await getCurrentUser();

  
  if (!user) {
    return <p>You need to sign in to write a blog.</p>; 
  }

  const userEmail = user.email;

  const dbUser = await prisma.user.findUnique({
    where: { email: userEmail! },
  });

  
  if (!dbUser) {
    return <p>User not found.</p>; 
  }

  const userId = dbUser.id; 

  return (
    <div>
      <CreateBlog userId={userId} />
    </div>
  );
}
