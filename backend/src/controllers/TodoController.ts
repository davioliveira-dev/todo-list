import {Request, Response} from 'express';
import TodoRepository from '../repository/TodoRepository';

export class TodoController {
	private readonly repository: TodoRepository;

	constructor() {
		this.repository = new TodoRepository();
	}

	async index(req: Request, res: Response) {
		const todos = await this.repository.getAll();

		if (todos.length === 0) {
			return res.sendStatus(204);
		}

		return res.json(todos);
	}

	async show(req: Request, res: Response) {
		const {id} = req.params;
		const todo = await this.repository.getById(Number(id));

		if (!todo) {
			return res.sendStatus(404);
		}

		return res.json(todo);
	}

	async create(req: Request, res: Response) {
		const {title, isDone} = req.body;
		const todo = {title, isDone};

		const newTodo = await this.repository.create(todo);

		return res.json(newTodo);
	}

	async update(req: Request, res: Response) {
		const {body} = req;
		const {id} = req.params;
		const todo = {title: body?.title, isDone: body?.isDone};

		const todoExists = await this.repository.getById(Number(id));

		if (!todoExists) {
			return res.sendStatus(404);
		}

		await this.repository.update(Number(id), todo);

		return res.sendStatus(204);
	}

	async delete(req: Request, res: Response) {
		const {id} = req.params;

		const todo = await this.repository.getById(Number(id));

		if (!todo) {
			return res.sendStatus(404);
		}

		await this.repository.delete(todo.id);

		return res.sendStatus(204);
	}
}
