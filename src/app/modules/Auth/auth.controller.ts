import type { Context } from 'hono';
import { authServices } from './auth.services';

const loginUser = async (c: Context) => {
   const payload = await c.req.json();

   const result = await authServices.loginUser(payload);
   return c.json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
   });
};

export const authController = {
   loginUser,
};
