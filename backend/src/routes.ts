import {Router} from 'express';
import {TodoController} from './controllers/TodoController';
import {ValidationMiddleware} from './middlewares/ValidationMiddleware';

const router = Router();

const todoController = new TodoController();

router.get('/todos', (req, res) => todoController.index(req, res));

router.get('/todos/:id', ValidationMiddleware.validateId, (req, res) =>
	todoController.show(req, res),
);

router.post('/todos', ValidationMiddleware.validateCreateTodo, (req, res) =>
	todoController.create(req, res),
);

router.put(
	'/todos/:id',
	ValidationMiddleware.validateId,
	ValidationMiddleware.validateUpdateTodo,
	(req, res) => todoController.update(req, res),
);

router.delete('/todos/:id', ValidationMiddleware.validateId, (req, res) =>
	todoController.delete(req, res),
);

export {router};
