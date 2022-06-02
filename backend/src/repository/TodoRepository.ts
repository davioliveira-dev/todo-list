import {Prisma, PrismaClient} from '@prisma/client';

export default class TodoRepository {
	private readonly client: PrismaClient;
	private readonly todo;

	constructor() {
		this.client = new PrismaClient();
		this.todo = this.client.todo;
	}

	async getAll() {
		const todos = await this.todo.findMany();
		return todos;
	}

	async getById(id: number) {
		const todo = await this.todo.findUnique({
			where: {
				id,
			},
		});

		return todo;
	}

	async create(todo: Prisma.TodoCreateInput) {
		const newTodo = await this.todo.create({
			data: {
				...todo,
			},
		});
		return newTodo;
	}

	async update(id: number, todo: Prisma.TodoUpdateInput) {
		const updatedTodo = await this.todo.update({
			where: {
				id,
			},
			data: {
				...todo,
			},
		});
		return updatedTodo;
	}

	async delete(id: number) {
		const deletedTodo = await this.todo.delete({
			where: {
				id,
			},
		});
		return deletedTodo;
	}
}
