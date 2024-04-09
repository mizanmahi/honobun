import { HTTPException } from 'hono/http-exception';
import prisma from '../../../shared/prisma';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';

const loginUser = async (userInfo: any) => {
   const userData = await prisma.user.findUniqueOrThrow({
      where: {
         email: userInfo.email,
      },
   });

   const isPasswordMatched = await bcrypt.compare(
      userInfo.password,
      userData.password
   );

   if (!isPasswordMatched) {
      throw new HTTPException(httpStatus.UNAUTHORIZED, {
         message: 'Unauthorized',
      });
   }

   const accessToken = 'sfsfsdfsfdf';

   return {
      accessToken,
   };
};

export const authServices = {
   loginUser,
};
