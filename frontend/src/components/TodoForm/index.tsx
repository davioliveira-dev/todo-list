import {FormEvent, useEffect, useRef, useState} from 'react';
import {toast} from 'react-toastify';
import {addTodo, updateTodo} from '../../state/store';
import {Todo} from '../../types/Todo';
import {fetcher} from '../../utils/fetcher';
import './index.css';

type TodoFormProps = {
	todoToUpdate?: Todo;
	clearTodoToUpdate: () => void;
};

const TodoForm = ({todoToUpdate, clearTodoToUpdate}: TodoFormProps) => {
	const initialTodoValue = todoToUpdate?.title;
	const [value, setValue] = useState('');
	const ref = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (todoToUpdate && ref.current) {
			setValue(todoToUpdate.title);
			ref.current.select();
			ref.current.focus();
		} else {
			setValue('');
		}
	}, [todoToUpdate]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!value) {
			return toast.error('Please enter task');
		}

		setValue('');

		const todo = {title: value, isDone: false};

		const newTodo = await fetcher<Todo>('/todos', {
			method: 'POST',
			body: JSON.stringify(todo),
		});

		if (!newTodo) {
			return toast.error('Error creating todo');
		}

		addTodo(newTodo.title, newTodo.id);

		return toast.success('Task added');
	};

	const handleUpdate = (newValue: string) => {
		setValue(newValue);

		if (!newValue || !todoToUpdate) {
			return toast.error('Please enter task or different task');
		}

		updateTodo(todoToUpdate.id, {...todoToUpdate, title: newValue});
	};

	const handleFocus = async () => {
		if (!todoToUpdate) {
			return;
		}

		if (!value || value === todoToUpdate.title) {
			setValue('');

			if (initialTodoValue) {
				updateTodo(todoToUpdate.id, {...todoToUpdate, title: initialTodoValue});
			}

			clearTodoToUpdate();
		}

		await fetcher(`/todos/${todoToUpdate.id}`, {
			method: 'PUT',
			body: JSON.stringify({title: value}),
		}).catch(() => toast.error('Error updating todo'));

		updateTodo(todoToUpdate.id, {...todoToUpdate, title: value});

		clearTodoToUpdate();
		return toast.success('Task updated');
	};

	return (
		<form
			onSubmit={e => !todoToUpdate && handleSubmit(e)}
			className='todo-form'
		>
			<input
				type='text'
				className='todo-input'
				value={value}
				onChange={e =>
					todoToUpdate ? handleUpdate(e.target.value) : setValue(e.target.value)
				}
				ref={ref}
				placeholder='Enter a new todo'
				onBlur={handleFocus}
			/>
			{!todoToUpdate && (
				<button className='todo-button' type='submit'>
					Create todo
				</button>
			)}
		</form>
	);
};

export {TodoForm};
