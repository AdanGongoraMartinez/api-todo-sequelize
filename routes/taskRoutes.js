import express from 'express';
import { getAllTasks, getTaksById, getAllUserTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getAllTasks);
router.get('/:id', getTaksById);
router.get('/home/:user_id', getAllUserTasks);
router.post('/create', createTask);
router.post('/update/:id', updateTask);
router.post('/delete/:id', deleteTask);

export default router;
