import {RiCloseCircleLine} from 'react-icons/ri';
import {TiEdit} from 'react-icons/ti';
import {MdDone, MdRemoveDone} from 'react-icons/md';
import {MouseEvent} from 'react';
import {updateTodo, removeTodo} from '../../state/store';
import {Todo} from '../../types/Todo';
import {fetcher} from '../../utils/fetcher';
import './index.css';
import {toast} from 'react-toastify';

type TodoComponentProps = {
	todo: Todo;
	handleUpdate: (_?: Todo) => void;
};

export const TodoComponent = ({todo, handleUpdate}: TodoComponentProps) => {
	const handleIsDone = async (e: MouseEvent) => {
		e.preventDefault();

		const updatedTodo = {...todo, isDone: !todo.isDone};

		updateTodo(todo.id, updatedTodo);

		await fetcher(`/todos/${todo.id}`, {
			method: 'PUT',
			body: JSON.stringify(updatedTodo),
		});

		return toast.success(
			`Task marked as ${updatedTodo.isDone ? 'done' : 'undone'}`,
		);
	};

	const handleDelete = async (e: MouseEvent) => {
		e.preventDefault();

		removeTodo(todo.id);

		await fetcher(`/todos/${todo.id}`, {
			method: 'DELETE',
		});

		return toast.success('Task deleted');
	};

	return (
		<div className={todo.isDone ? 'todo-row complete' : 'todo-row'}>
			<h3>{todo.title}</h3>
			<div className='icons'>
				{todo.isDone ? (
					<MdRemoveDone className='edit-icon' onClick={handleIsDone} />
				) : (
					<MdDone className='edit-icon' onClick={handleIsDone} />
				)}
				<TiEdit onClick={() => handleUpdate(todo)} className='edit-icon' />
				<RiCloseCircleLine onClick={handleDelete} className='delete-icon' />
			</div>
		</div>
	);
};
