// src/models/user.js
export default (sequelize, DataTypes) =>
  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  }, {
    tableName: 'users',
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  });
