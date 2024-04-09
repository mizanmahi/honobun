import { Hono } from 'hono';
import { userController } from './user.controller';

const user = new Hono();

user.post('/', userController.createUser);
user.get('/', userController.getUser);
user.post('/:userId', userController.updateUser);
user.delete('/:userId', userController.deleteUser);

export const userRoutes = user;
