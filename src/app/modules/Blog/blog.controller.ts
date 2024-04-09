import type { Context } from 'hono';
import { blogServices } from './blog.services';

const createBlog = async (c: Context) => {
   const payload = await c.req.json();

   const result = await blogServices.createBlogIntoDB(payload);
   return c.json({
      success: true,
      message: 'Blog created successfully!',
      data: result,
   });
};

export const blogController = {
   createBlog,
};
