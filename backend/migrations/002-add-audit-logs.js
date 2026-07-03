module.exports.up = async (queryInterface, Sequelize) => {
  const tableName = "AuditLogs";
  // Prefer using queryInterface.createTable which is available across dialects
  if (queryInterface && typeof queryInterface.createTable === 'function') {
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
    return;
  }

  // Fallback: attempt raw SQL using the underlying sequelize instance if available
  const sequelize = queryInterface && queryInterface.sequelize ? queryInterface.sequelize : null;
  if (sequelize && typeof sequelize.query === 'function') {
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

  throw new Error('Cannot create AuditLogs table: queryInterface.createTable and sequelize.query are both unavailable');
};

module.exports.down = async (queryInterface /*, Sequelize */) => {
  if (queryInterface && typeof queryInterface.dropTable === 'function') {
    await queryInterface.dropTable("AuditLogs");
    return;
  }
  const sequelize = queryInterface && queryInterface.sequelize ? queryInterface.sequelize : null;
  if (sequelize && typeof sequelize.query === 'function') {
    await sequelize.query('DROP TABLE IF EXISTS AuditLogs;');
    return;
  }
  throw new Error('Cannot drop AuditLogs table: neither queryInterface.dropTable nor sequelize.query available');
};
