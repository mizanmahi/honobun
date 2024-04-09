import prisma from '../../../shared/prisma';
import type { IUser } from './user.interfaces';

const createUserIntoDB = async (payload: IUser) => {
   const { password, ...otherUserData } = payload;

   return await prisma.user.create({
      data: payload,
   });
};
const getUserFromDB = async () => {
   return await prisma.user.findMany();
};
const deleteUser = async (id: string) => {
   return await prisma.user.delete({
      where: {
         id,
      },
   });
};

export const userServices = {
   createUserIntoDB,
   getUserFromDB,
   deleteUser,
};
