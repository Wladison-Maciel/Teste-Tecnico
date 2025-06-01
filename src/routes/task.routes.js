// src/routes/task.routes.js
import { Router } from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} from '../controllers/taskController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Todas as rotas de tasks são protegidas pelo middleware
router.use(authMiddleware);

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
