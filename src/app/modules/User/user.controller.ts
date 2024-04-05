import type { Context } from 'hono';
import { userServices } from './user.service';

const createUser = async (c: Context) => {
   const user = await c.req.json();
   const result = await userServices.createUserIntoDB(user);

   return c.json({
      success: true,
      message: 'User created successfully!',
      data: result,
   });
};

export const userController = {
   createUser,
};
