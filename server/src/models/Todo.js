import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
	userId: String,
	todos: [
		{
			checked: Boolean,
			text: String,
		},
	],
});

export default mongoose.model('Todo', TodoSchema);
