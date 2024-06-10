import { Request, Response, Router } from 'express';
import { registerMiddleware } from './middleware';

export function initRestRoutes(router: Router): void {
	const prefix: string = '/api/v1';

	router.get(prefix, (req: Request, res: Response) => res.send('PING'));

	registerMiddleware(router);

}