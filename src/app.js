import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import logger from './config/logger.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/tasks', taskRoutes);

// Rotas públicas
app.use('/auth', authRoutes);

// Rota simples para teste
app.get('/', (req, res) => {
  logger.info('Rota raiz acessada'); 
  res.json({ message: 'API TODO List está no ar' });
});

export default app;
