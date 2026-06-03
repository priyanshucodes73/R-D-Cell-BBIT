module.exports.up = async (queryInterface, Sequelize) => {
  const tableName = "AuditLogs";
  const sequelize = queryInterface.sequelize;
  const dialect = sequelize && typeof sequelize.getDialect === "function" ? sequelize.getDialect() : "sqlite";

  const tableExists = async () => {
    if (dialect === "sqlite") {
      const [rows] = await sequelize.query(
        "SELECT name FROM sqlite_master WHERE type='table' AND name=$tableName LIMIT 1",
        { bind: { tableName } }
      );
      return Array.isArray(rows) ? rows.length > 0 : !!rows;
    }

    const [rows] = await sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_name = $tableName LIMIT 1",
      { bind: { tableName: tableName.toLowerCase() } }
    );
    return Array.isArray(rows) ? rows.length > 0 : !!rows;
  };

  if (await tableExists()) {
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
