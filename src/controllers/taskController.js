import db from '../models/index.js';
import { findTaskByIdForUser } from '../services/taskService.js';
import logger from '../config/logger.js';

const { Task } = db;

// Listar todas as tasks do usuário autenticado, com filtro opcional por status
export const getTasks = async (req, res) => {
  const { status } = req.query;
  const where = { userId: req.userId };

  if (status) {
    where.status = status.toUpperCase();
  }

  logger.info({ userId: req.userId, filter: where }, 'Buscando tarefas');

  try {
    const tasks = await Task.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    logger.info({ userId: req.userId, total: tasks.length }, 'Tarefas retornadas com sucesso');
    res.json(tasks);
  } catch (error) {
    logger.error({ userId: req.userId, error }, 'Erro ao buscar tarefas');
    res.status(500).json({ error: 'Erro ao buscar tarefas', details: error.message });
  }
};

// Buscar uma task específica por ID
export const getTaskById = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  logger.info({ userId: req.userId, taskId: id }, 'Buscando tarefa por ID');

  try {
    const task = await findTaskByIdForUser(id, req.userId);
    res.json(task);
  } catch (err) {
    logger.warn({ userId: req.userId, taskId: id, error: err.message }, 'Tarefa não encontrada');
    res.status(404).json({ error: err.message });
  }
};

// Criar uma nova task
export const createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  logger.info({ userId: req.userId, title }, 'Tentando criar nova tarefa');

  try {
    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      userId: req.userId,
    });

    logger.info({ userId: req.userId, taskId: task.id }, 'Tarefa criada com sucesso');
    return res.status(201).json(task);
  } catch (error) {
    logger.error({ userId: req.userId, error }, 'Erro ao criar tarefa');
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

// Atualizar uma task
export const updateTask = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  logger.info({ userId: req.userId, taskId: id }, 'Tentando atualizar tarefa');

  try {
    const task = await findTaskByIdForUser(id, req.userId);

    const { title, description, status, dueDate } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.dueDate = dueDate ?? task.dueDate;

    await task.save();

    logger.info({ userId: req.userId, taskId: id }, 'Tarefa atualizada com sucesso');
    res.json(task);
  } catch (error) {
    logger.error({ userId: req.userId, taskId: id, error }, 'Erro ao atualizar tarefa');
    res.status(500).json({ error: 'Erro ao atualizar tarefa.', details: error.message });
  }
};

// Deletar uma task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  logger.info({ userId: req.userId, taskId: id }, 'Tentando deletar tarefa');

  try {
    const task = await Task.findOne({ where: { id, userId: req.userId } });
    if (!task) {
      logger.warn({ userId: req.userId, taskId: id }, 'Tarefa não encontrada para exclusão');
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    await task.destroy();
    logger.info({ userId: req.userId, taskId: id }, 'Tarefa deletada com sucesso');
    return res.json({ message: 'Tarefa deletada com sucesso.' });
  } catch (error) {
    logger.error({ userId: req.userId, taskId: id, error }, 'Erro ao deletar tarefa');
    return res.status(500).json({ error: 'Erro ao deletar tarefa.' });
  }
};
