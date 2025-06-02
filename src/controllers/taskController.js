import db from '../models/index.js';
import { findTaskByIdForUser } from '../services/taskService.js';

const { Task } = db;

// Listar todas as tasks do usuário autenticado, com filtro opcional por status
export const getTasks = async (req, res) => {
  const { status } = req.query;

  // Monta o filtro base: sempre pelo userId
  const where = { userId: req.userId };

  // Se foi passado ?status=pending, adiciona ao filtro (em caixa alta)
  if (status) {
    where.status = status.toUpperCase();
  }

  try {
    const tasks = await Task.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas', details: error.message });
  }
};

// Buscar uma task específica por ID
export const getTaskById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const task = await findTaskByIdForUser(id, req.userId);
    res.json(task);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};


// Criar uma nova task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      userId: req.userId,
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

// Atualizar uma task
export const updateTask = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const task = await findTaskByIdForUser(id, req.userId);

    const { title, description, status, dueDate } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.dueDate = dueDate ?? task.dueDate;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa.', details: error.message });
  }
};

// Deletar uma task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ where: { id, userId: req.userId } });
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    await task.destroy();
    return res.json({ message: 'Tarefa deletada com sucesso.' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar tarefa.' });
  }
};
