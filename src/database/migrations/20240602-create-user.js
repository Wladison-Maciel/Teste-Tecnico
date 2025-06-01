export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(100), // nome até 100 caracteres
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(255), // e-mail até 255 caracteres
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(255), // hash da senha
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("NOW()"),
      allowNull: false,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("users");
}
