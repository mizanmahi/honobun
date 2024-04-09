import { Hono, type Next, type Context } from 'hono';
import { blogController } from './blog.controller';
import { HTTPException } from 'hono/http-exception';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import config from '../../../config';
import type { Secret } from 'jsonwebtoken';

const blog = new Hono();

const authGuard = async (
   ctx: Context & { req: { user?: any } },
   next: Next
) => {
   const token = ctx.req.header('authorization');

   if (!token) {
      throw new HTTPException(httpStatus.FORBIDDEN, {
         message: 'Unauthorized',
      });
   }

   let decodedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

   ctx.req.user = decodedUser;

   await next();
};

blog.post('/', authGuard, blogController.createBlog);

export const blogRoutes = blog;
