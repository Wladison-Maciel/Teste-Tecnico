export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Tasks", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(100), // título com até 100 caracteres
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(200), // descrição opcional com até 500 caracteres
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM("PENDING", "COMPLETED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    dueDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("NOW()"),
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("NOW()"),
      allowNull: false,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("Tasks");
}
