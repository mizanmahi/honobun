import { Hono } from 'hono';
import { userController } from './user.controller';

const user = new Hono();

user.post('/', userController.createUser);

export const userRoutes = user;
