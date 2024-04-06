import { Hono } from 'hono';
import { userRoutes } from './app/modules/User/user.routes';
const app = new Hono();

app.get('/', (ctx) => {
   return ctx.text('Hello Hono!');
});

app.route('/user', userRoutes);

app.notFound((ctx) => {
   return ctx.text('Api Not Found', 404);
});

app.onError((err, ctx) => {
   console.error(`${err}`);
   return ctx.json(
      {
         success: false,
         message: err.message || 'Internal server error',
      },
      500
   );
});

export default {
   fetch: app.fetch,
   port: 5000,
};
