import {useEffect, useState} from 'react';
import {useSnapshot} from 'valtio';
import {TodoComponent} from './components/Todo';
import {TodoForm} from './components/TodoForm';
import {store} from './state';
import {Todo} from './types/Todo';
import {fetcher} from './utils/fetcher';

function App() {
	const {todos} = useSnapshot(store);
	const [todoToUpdate, setTodoToUpdate] = useState<Todo>();

	const handleUpdateTodo = (todo?: Todo) => {
		setTodoToUpdate(todo);
	};

	useEffect(() => {
		(async () => {
			const todos = await fetcher<Todo[]>('/todos');
			if (todos) {
				store.todos = todos;
			}
		})();
	}, []);

	return (
		<div className='todo-app'>
			<TodoForm
				todoToUpdate={todoToUpdate}
				clearTodoToUpdate={() => setTodoToUpdate(undefined)}
			/>
			{todos.map(todo => (
				<TodoComponent
					key={todo.id}
					todo={todo}
					handleUpdate={handleUpdateTodo}
				/>
			))}
		</div>
	);
}

export default App;
