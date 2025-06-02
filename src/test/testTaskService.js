// src/test/testTaskService.js
import 'dotenv/config';
import db from '../models/index.js';
import { findTaskByIdForUser } from '../services/taskService.js';

const test = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Conectado ao banco com sucesso.');

    const userId = 4;
    const taskId = 5;

    const task = await findTaskByIdForUser(taskId, userId);
    console.log('🎯 Tarefa encontrada:', task.toJSON());
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await db.sequelize.close();
  }
};

test();
