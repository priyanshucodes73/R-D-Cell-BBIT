module.exports.up = async (queryInterface, Sequelize) => {
  const tableName = "AuditLogs";
  const sequelize = queryInterface.sequelize;
  const dialect = sequelize && typeof sequelize.getDialect === "function" ? sequelize.getDialect() : "sqlite";

  if (dialect === "sqlite") {
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action TEXT NOT NULL,
        scope TEXT NOT NULL DEFAULT 'Content',
        description TEXT NOT NULL,
        entityType TEXT,
        entityId TEXT,
        actorEmail TEXT,
        actorRole TEXT,
        metadata TEXT,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL
      );
    `);
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
  const sequelize = queryInterface.sequelize;
  const dialect = sequelize && typeof sequelize.getDialect === "function" ? sequelize.getDialect() : "sqlite";
  if (dialect === "sqlite") {
    await sequelize.query("DROP TABLE IF EXISTS AuditLogs;");
    return;
  }
  await queryInterface.dropTable("AuditLogs");
};
