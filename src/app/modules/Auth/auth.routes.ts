import { Hono } from 'hono';
import { authController } from './auth.controller';

const user = new Hono();

user.post('/login', authController.loginUser);

export const authRoutes = user;
