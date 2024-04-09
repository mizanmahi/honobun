import { Hono, type Next, type Context } from 'hono';
import { blogController } from './blog.controller';
import authGuard from '../../middlewares/authGuard';

const blog = new Hono();

blog.post('/', authGuard, blogController.createBlog);
blog.get('/', blogController.getBlog);

export const blogRoutes = blog;
