import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

import userModel from './User.js';
import taskModel from './Task.js';

const User = userModel(sequelize, DataTypes);
const Task = taskModel(sequelize, DataTypes);

User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const db = {
  sequelize,
  User,
  Task,
};

export default db;
