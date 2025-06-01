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
import { validateRequest } from '../middlewares/validateRequest.js';
import { taskUpdateSchema } from '../validations/taskValidation.js';

const router = Router();

// Todas as rotas de tasks são protegidas pelo middleware
router.use(authMiddleware);

router.get('/', getTasks);
router.get('/tasks/:id', getTaskById);
router.patch('/tasks/:id', validateRequest(taskUpdateSchema), updateTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
