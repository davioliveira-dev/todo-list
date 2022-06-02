import { proxy } from "valtio";
import { Todo } from "../types/Todo";

export const store = proxy<{ todos: Todo[] }>({
  todos: [],
});
