import { HTTPException } from 'hono/http-exception';
import { jwtHelpers } from '../../helpers/jwtHelper';
import type { Context, Next } from 'hono';
import httpStatus from 'http-status';
import config from '../../config';
import type { Secret } from 'jsonwebtoken';

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

export default authGuard;
