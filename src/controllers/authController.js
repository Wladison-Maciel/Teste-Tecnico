import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
import logger from '../config/logger.js';

const { User } = db;

export default {
  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      logger.info({ email }, 'Tentativa de registro');

      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        logger.warn({ email }, 'E-mail já cadastrado');
        return res.status(400).json({ message: 'E-mail já cadastrado.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      logger.info({ userId: user.id, email }, 'Usuário registrado com sucesso');
      return res.status(201).json({ id: user.id, name: user.name, email: user.email });
    } catch (err) {
      logger.error({ error: err, email }, 'Erro ao registrar usuário');
      return res.status(500).json({ error: 'Erro no cadastro', details: err.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      logger.info({ email }, 'Tentativa de login');

      const user = await User.findOne({ where: { email } });
      if (!user) {
        logger.warn({ email }, 'Usuario não encontrado');
        return res.status(404).json({ message: 'Usuario não encontrado' });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        logger.warn({ email }, 'Senha invalida');
        return res.status(401).json({ message: 'Senha invalida' });
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.APP_SECRET,
        { expiresIn: '1d' }
      );

      logger.info({ userId: user.id, email }, 'Login realizado com sucesso');
      return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
      logger.error({ error: err, email }, 'Erro no login do usuario');
      return res.status(500).json({ error: 'Erro no login', details: err.message });
    }
  }
};
