// src/models/task.js
export default (sequelize, DataTypes) =>
  sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED'),
      defaultValue: 'PENDING',
    },
    dueDate: DataTypes.DATE,
    userId: DataTypes.INTEGER,
  }, {
    tableName: 'tasks',
    timestamps: true,
  });
