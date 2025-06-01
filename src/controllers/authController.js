import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const { User } = db;

export default {
  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) return res.status(400).json({ message: 'E-mail já cadastrado.' });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({ id: user.id, name: user.name, email: user.email });
    } catch (err) {
      return res.status(500).json({ error: 'Erro no cadastro', details: err.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ message: 'Senha inválida' });

      const token = jwt.sign(
        { id: user.id },
        process.env.APP_SECRET,
        { expiresIn: '1d' }
      );

      return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
      return res.status(500).json({ error: 'Erro no login', details: err.message });
    }
  }
};
