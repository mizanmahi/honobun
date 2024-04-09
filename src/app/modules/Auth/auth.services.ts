import { HTTPException } from 'hono/http-exception';
import prisma from '../../../shared/prisma';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import type { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../helpers/jwtHelper';

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
         message: 'incorrect Password',
      });
   }

   const accessToken = jwtHelpers.generateToken(
      {
         email: userData.email,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
   );

   return {
      accessToken,
   };
};

export const authServices = {
   loginUser,
};
