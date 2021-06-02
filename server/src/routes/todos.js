import express from 'express';
const router = express.Router();
import * as todos from '../controllers/todos.js';

router.post('/', todos.addTodo);

export default router;
