import { Hono } from 'hono';
import { authController } from './auth.controller';

const auth = new Hono();

auth.post('/login', authController.loginUser);

export const authRoutes = auth;
