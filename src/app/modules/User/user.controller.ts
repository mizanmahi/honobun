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

const getUser = async (c: Context) => {
   const result = await userServices.getUserFromDB();
   return c.json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
   });
};
const deleteUser = async (c: Context) => {
   const { userId } = c.req.param();
   const result = await userServices.deleteUser(userId);
   return c.json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
   });
};

export const userController = {
   createUser,
   getUser,
   deleteUser,
};
