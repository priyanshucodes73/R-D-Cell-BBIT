module.exports.up = async (queryInterface, Sequelize) => {
  const tableName = "AuditLogs";
  const SequelizeLib = Sequelize || require("sequelize");
  const DataTypes = SequelizeLib.DataTypes || SequelizeLib;
  try {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      scope: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Content",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      entityType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      entityId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      actorEmail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      actorRole: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      metadata: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  } catch (error) {
    if (!/already exists/i.test(error.message || "")) {
      throw error;
    }
  }
};

module.exports.down = async (queryInterface /*, Sequelize */) => {
  await queryInterface.dropTable("AuditLogs");
};
