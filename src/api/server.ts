import express from 'express';
import { initRestRoutes } from './routes';

export const app = express();

initRestRoutes(app);
