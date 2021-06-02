import Todo from '../models/Todo.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

export const addTodo = async (req, res) => {
	// res.send({message: 'Todo added.'})
	try {
		const { auth } = req.body.header;
		const [, token] = auth.split(' ');
		const [email, password] = token.split(':');
		const todosItems = req.body.todos;
		console.log(todosItems);
		User.findOne({ email: email })
			.then(async user => {
				if (!user) {
					return res.status(401).send({
						message: `${user.email} is not yet registered.`,
					});
				}

				// if (user.password !== password) {
				// 	return res.status(401).send({
				// 		message: `Passwords is incorrect.`,
				// 	});
				// }

				const todos = await Todo.findOne({ userId: user._id });
				console.log(todos);

				if (!todos) {
					await Todo.create({
						userId: user._id,
						todos: todosItems,
					});
				} else {
					todos.todos = todosItems;
					await todos.save();
				}

				res.json(todosItems);
			})
			.catch(err => {
				res.send(err);
			});
	} catch (err) {
		console.log(`Error: ${err.message}`);
	}
};
