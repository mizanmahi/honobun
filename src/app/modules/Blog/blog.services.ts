import type { Context } from 'hono';
import prisma from '../../../shared/prisma';

const createBlogIntoDB = async (ctx: Context & { req: { user?: any } }) => {
   const { email } = ctx.req.user;
   const payload = await ctx.req.json();

   const user = await prisma.user.findUniqueOrThrow({
      where: {
         email,
      },
   });

   const blog = {
      ...payload,
      authorId: user.id,
   };

   let result = await prisma.blog.create({
      data: blog,
   });

   return result;
};

const getBlogFromDB = async () => {
   return await prisma.blog.findMany({
      include: {
         author: {
            select: {
               name: true,
               email: true,
            },
         },
      },
   });
};

export const blogServices = {
   createBlogIntoDB,
   getBlogFromDB,
};
