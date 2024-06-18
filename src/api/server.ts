import express from 'express';
import { initRestRoutes } from './routes';
import { NextFunction, Request, Response, Router } from 'express';


export const app = express();

initRestRoutes(app);

