import { Hono } from 'hono';
import { userRoutes } from './app/modules/User/user.routes';
const app = new Hono();

app.get('/', (c) => {
   return c.text('Hello Hono!');
});

app.route('/user', userRoutes);

app.notFound((c) => {
   return c.text('Api Not Found', 404);
});

app.onError((err, c) => {
   console.error(`${err}`);
   return c.json(
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
