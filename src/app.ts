import { Hono } from 'hono';
import { userRoutes } from './app/modules/User/user.routes';
import { authRoutes } from './app/modules/Auth/auth.routes';
import { HTTPException } from 'hono/http-exception';

const app = new Hono();

app.get('/', (ctx) => {
   return ctx.text('Hello Hono!');
});

app.route('/user', userRoutes);
app.route('/auth', authRoutes);

app.notFound((ctx) => {
   return ctx.text('Api Not Found', 404);
});

app.onError((err, ctx) => {
   console.error(`${err}`);

   if (err instanceof HTTPException) {
      // return err.getResponse();

      return ctx.json(
         {
            success: false,
            message: err.message,
         },
         err.status
      );
   }

   return ctx.json(
      {
         success: false,
         message: err.message || 'Internal server error',
      },
      500
   );
});

export default app;
