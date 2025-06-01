import db from '../models/index.js';
const { Task } = db;

export const findTaskByIdForUser = async (id, userId) => {
  const task = await Task.findOne({ where: { id, userId } });
  if (!task) throw new Error('Tarefa não encontrada.');
  return task;
};
