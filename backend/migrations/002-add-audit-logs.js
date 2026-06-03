module.exports.up = async (queryInterface, Sequelize) => {
  const tableName = "AuditLogs";
  const tableDesc = await queryInterface.describeTable(tableName).catch(() => null);
  if (tableDesc) {
    return;
  }

  await queryInterface.createTable(tableName, {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    action: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    scope: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Content",
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    entityType: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    entityId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    actorEmail: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    actorRole: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    metadata: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
};

module.exports.down = async (queryInterface /*, Sequelize */) => {
  await queryInterface.dropTable("AuditLogs");
};
