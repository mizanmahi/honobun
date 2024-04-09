export default {
   env: process.env.NODE_ENV,
   port: process.env.PORT,
   database_url: process.env.DATABASE_URL,
   jwt: {
      secret: process.env.JWT_SECRET,
      expires_in: process.env.EXPIRES_IN,
   },
   bycrypt_salt_rounds: process.env.SALT_ROUND,
};
