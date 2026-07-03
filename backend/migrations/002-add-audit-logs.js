// Robust migration that works when Umzug passes different contexts/signatures.
module.exports.up = async function () {
    // Normalize arguments for multiple Umzug/Sequelize styles
    const args = Array.from(arguments);
    let queryInterface = args[0];
    let SequelizeLib = args[1];

    // If only a Sequelize instance was passed, derive the queryInterface
    if (args.length === 1 && queryInterface && typeof queryInterface.getQueryInterface === 'function') {
        SequelizeLib = queryInterface;
        queryInterface = queryInterface.getQueryInterface();
    }

    // If the first arg looks like a Sequelize instance (has define) but not a queryInterface
    if (queryInterface && typeof queryInterface.define === 'function' && !queryInterface.createTable) {
        SequelizeLib = queryInterface;
        queryInterface = SequelizeLib.getQueryInterface();
    }

    const tableName = 'AuditLogs';

    // Prefer the high-level createTable API when available
    if (queryInterface && typeof queryInterface.createTable === 'function') {
        const Sequelize = SequelizeLib || (queryInterface && queryInterface.sequelize && queryInterface.sequelize.constructor);
        await queryInterface.createTable(tableName, {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            action: { type: Sequelize.STRING, allowNull: false },
            scope: { type: Sequelize.STRING, allowNull: false, defaultValue: 'Content' },
            description: { type: Sequelize.TEXT, allowNull: false },
            entityType: { type: Sequelize.STRING, allowNull: true },
            entityId: { type: Sequelize.STRING, allowNull: true },
            actorEmail: { type: Sequelize.STRING, allowNull: true },
            actorRole: { type: Sequelize.STRING, allowNull: true },
            metadata: { type: Sequelize.TEXT, allowNull: true },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        });
        return;
    }

    // Fallback: look for a sequelize instance and run raw SQL
    const sequelize = (queryInterface && queryInterface.sequelize) || (SequelizeLib && SequelizeLib.sequelize) || SequelizeLib || null;
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

module.exports.down = async function () {
    const args = Array.from(arguments);
    let queryInterface = args[0];
    let SequelizeLib = args[1];

    if (args.length === 1 && queryInterface && typeof queryInterface.getQueryInterface === 'function') {
        SequelizeLib = queryInterface;
        queryInterface = queryInterface.getQueryInterface();
    }

    if (queryInterface && typeof queryInterface.dropTable === 'function') {
        await queryInterface.dropTable('AuditLogs');
        return;
    }

    const sequelize = (queryInterface && queryInterface.sequelize) || (SequelizeLib && SequelizeLib.sequelize) || SequelizeLib || null;
    if (sequelize && typeof sequelize.query === 'function') {
        await sequelize.query('DROP TABLE IF EXISTS AuditLogs;');
        return;
    }

    throw new Error('Cannot drop AuditLogs table: neither queryInterface.dropTable nor sequelize.query available');
};
