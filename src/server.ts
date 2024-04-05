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
   return c.text('Internal Server Error', 500);
});

export default {
   fetch: app.fetch,
   port: 5000,
};
