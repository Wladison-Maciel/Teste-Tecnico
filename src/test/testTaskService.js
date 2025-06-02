// src/test/testTaskService.js
import 'dotenv/config';
import db from '../models/index.js';
import { findTaskByIdForUser } from '../services/taskService.js';

const test = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Conectado ao banco com sucesso.');

    const userId = 4; // ID de um usuário real do banco de dados para Teste
    const taskId = 5; // ID de uma task real do banco de dados para Teste

    const task = await findTaskByIdForUser(taskId, userId);
    console.log('Tarefa encontrada:', task.toJSON());
  } catch (error) {
    console.error('Erro:', error.message);
  } finally {
    await db.sequelize.close();
  }
};

test();
