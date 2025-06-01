// src/server.js
import app from './app.js';
import db from './models/index.js';

const PORT = process.env.PORT || 3000;

try {
  await db.sequelize.authenticate();
  console.log('Conexão com o banco de dados bem-sucedida');

  await db.sequelize.sync({ alter: true });
  console.log('Modelos sincronizados com o banco');

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('Erro ao iniciar o servidor:', error);
}
