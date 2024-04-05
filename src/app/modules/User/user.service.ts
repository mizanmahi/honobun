import type { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import type { IUser } from './user.interfaces';

const createUserIntoDB = async (payload: IUser) => {
   return await prisma.user.create({
      data: payload,
   });
};

export const userServices = {
   createUserIntoDB,
};
