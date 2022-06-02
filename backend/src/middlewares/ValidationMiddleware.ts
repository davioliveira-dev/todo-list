import {NextFunction, Request, Response} from 'express';

export const ValidationMiddleware = {
	validateId(req: Request, res: Response, next: NextFunction) {
		const {id} = req.params;

		if (id === undefined) {
			return res.status(400).json({
				error: 'id is required on url params',
			});
		}

		next();
	},
	validateCreateTodo(req: Request, res: Response, next: NextFunction) {
		const {title, isDone} = req.body;

		if (title === undefined || isDone === undefined) {
			return res.status(400).json({
				error: 'title and isDone are required on request body as JSON',
			});
		}

		next();
	},
	validateUpdateTodo(req: Request, res: Response, next: NextFunction) {
		const {title, isDone} = req.body;

		if (title === undefined && isDone === undefined) {
			return res.status(400).json({
				error: 'title or isDone are required on request body as JSON',
			});
		}

		next();
	},
};
