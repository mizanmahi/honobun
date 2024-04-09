export default {
   env: process.env.NODE_ENV,
   port: process.env.PORT,
   database_url: process.env.DATABASE_URL,
   jwt: {
      secret: process.env.JWT_SECRET,
      expires_in: process.env.EXPIRES_IN,
      refresh_secret: process.env.REFRESH_SECRET,
      refresh_expires_in: process.env.REFRESH_EXPIRES_IN,
      passwordResetTokenExpirationTime: process.env.PASS_RESET_EXPIRATION_TIME,
   },
   bycrypt_salt_rounds: process.env.SALT_ROUND,
};
