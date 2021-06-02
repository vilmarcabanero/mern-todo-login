import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import todosRoutes from './routes/todos.js';

const app = express();
env.config();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todosRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
