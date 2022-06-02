import { store } from ".";
import { Todo } from "../types/Todo";

const addTodo = (title: string, newId: number) => {
  store.todos.push({
    id: newId,
    title,
    isDone: false,
  });
};

const removeTodo = (id: number) => {
  const todoIndex = store.todos.findIndex((todo) => todo.id === id);
  store.todos.splice(todoIndex, 1);
};

const updateTodo = (id: number, todo: Todo) => {
  const todoIndex = store.todos.findIndex((todo) => todo.id === id);
  store.todos[todoIndex].title = todo.title;
  store.todos[todoIndex].isDone = todo.isDone;
};

export { addTodo, removeTodo, updateTodo };
