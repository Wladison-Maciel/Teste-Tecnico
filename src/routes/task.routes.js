// src/routes/task.routes.js
import { Router } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { taskCreateSchema, taskUpdateSchema } from '../validations/taskValidation.js';

const router = Router();

// Todas as rotas de tasks são protegidas pelo middleware
router.use(authMiddleware);

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', validateRequest(taskCreateSchema), createTask);
router.patch('/:id', validateRequest(taskUpdateSchema), updateTask);
router.delete('/:id', deleteTask);

export default router;
