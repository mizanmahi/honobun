import type { Context } from 'hono';
import { blogServices } from './blog.services';

const createBlog = async (ctx: Context & { req: { user?: any } }) => {
   const result = await blogServices.createBlogIntoDB(ctx);
   return ctx.json({
      success: true,
      message: 'Blog created successfully!',
      data: result,
   });
};

const getBlog = async (ctx: Context) => {
   const result = await blogServices.getBlogFromDB();
   return ctx.json({
      success: true,
      message: 'Blog fetched successfully!',
      data: result,
   });
};

export const blogController = {
   createBlog,
   getBlog,
};
