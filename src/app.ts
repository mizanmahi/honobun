import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { userRoutes } from './app/modules/User/user.routes';
import { authRoutes } from './app/modules/Auth/auth.routes';
import { blogRoutes } from './app/modules/Blog/blog.routes';

const app = new Hono();

app.get('/', (ctx) => {
   return ctx.text('Hello Hono!');
});

app.route('/user', userRoutes);
app.route('/auth', authRoutes);
app.route('/blog', blogRoutes);

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
