import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CredentialsContext } from '../../App';

const Todods = () => {
	const [todoText, setTodoText] = useState('');
	const [credentials] = useContext(CredentialsContext);
	const [todos, setTodos] = useState([]);

	const persist = newTodos => {
		const config = {
			header: {
				'Content-Type': 'application/json',
				auth: `Basic ${credentials.email}:${credentials.password}`,
			},
			todos: newTodos,
		};

		axios
			.post('http://localhost:4000/api/todos', config)
			.then(({ data }) => {
				console.log(data.message);
			})
			.catch(err => {
				console.log(err.message);
			});
	};

	const addTodo = e => {
		e.preventDefault();
		if (!todoText.trim('')) return;
		const newTodo = { checked: false, text: todoText };
		const newTodos = [...todos, newTodo];
		setTodos(newTodos);
		setTodoText('');
		persist(newTodos);
	};

	const toggleTodo = index => {
		const newTodoList = [...todos];
		newTodoList[index].checked = !newTodoList[index].checked;
		setTodos(newTodoList);
	};

	return (
		<div>
			<form onSubmit={addTodo}>
				<input
					type='text'
					value={todoText}
					onChange={e => setTodoText(e.target.value)}
				/>
				<button type='submit'>Add</button>
			</form>
			<br />
			{todos.map((todo, index) => (
				<div key={index}>
					<input onChange={() => toggleTodo(index)} type='checkbox' />
					<label>{todo.text}</label>
				</div>
			))}

			<br />
		</div>
	);
};

export default Todods;
