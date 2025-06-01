import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(express.json());

// Rotas públicas
app.use('/auth', authRoutes);

// Rota simples para teste
app.get('/', (req, res) => {
  res.json({ message: 'API TODO List está no ar' });
});

export default app;
