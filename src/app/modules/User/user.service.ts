import type { Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import type { IUser } from './user.interfaces';
import { hashPassword } from './user.utils';
import { searchableFields } from './user.constant';

const createUserIntoDB = async (payload: IUser) => {
   const { password, ...otherUserData } = payload;
   const hashedPassword = await hashPassword(password);

   return await prisma.user.create({
      data: { ...otherUserData, password: hashedPassword },
   });
};

const getUserFromDB = async (queries: any) => {
   const { q, ...otherQueryParams } = queries;

   const conditions: Prisma.UserWhereInput[] = [];

   // for search query (q)
   if (q) {
      const searchFilters = searchableFields.map((field) => ({
         [field]: {
            contains: q,
            mode: 'insensitive',
         },
      }));

      conditions.push({ OR: searchFilters });
   }

   // filtering with exact field value
   //@ filtering with exact value
   if (Object.keys(otherQueryParams).length > 0) {
      const filterData = Object.keys(otherQueryParams).map((key) => ({
         [key]: (otherQueryParams as any)[key],
      }));
      conditions.push(...filterData);
   }

   return await prisma.user.findMany({
      where: {
         AND: conditions,
      },
      select: {
         id: true,
         name: true,
         email: true,
      },
   });
};

const updateUserIntoDB = async (id: string, payload: any) => {
   await prisma.user.findUniqueOrThrow({
      where: {
         id,
      },
   });

   return await prisma.user.update({
      where: {
         id,
      },
      data: payload,
      select: {
         id: true,
         name: true,
         email: true,
      },
   });
};

const deleteUser = async (id: string) => {
   await prisma.user.findUniqueOrThrow({
      where: {
         id,
      },
   });

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
   updateUserIntoDB,
};
