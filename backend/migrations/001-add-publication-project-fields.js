module.exports.up = async (queryInterface, Sequelize) => {
  // Publications table
  const tablePub = 'Publications';
  const tableProj = 'ResearchProjects';

  const ensureColumn = async (tableName, columnName, definition) => {
    // Try to get table description in several ways because describeTable
    // may not be available in some Umzug contexts. Fallback to raw queries
    // for common dialects (sqlite, postgres).
    let tableDesc = null;
    try {
      if (typeof queryInterface.describeTable === "function") {
        tableDesc = await queryInterface.describeTable(tableName).catch(() => null);
      }
    } catch (e) {
      tableDesc = null;
    }

    if (!tableDesc) {
      // Fallback: attempt a dialect-specific query
      try {
        const sequelize = queryInterface.sequelize;
        const dialect = (sequelize && typeof sequelize.getDialect === 'function') ? sequelize.getDialect() : (Sequelize && Sequelize.getDialect && Sequelize.getDialect()) || 'sqlite';
        if (dialect === 'sqlite') {
          const res = await queryInterface.sequelize.query(`PRAGMA table_info('${tableName}');`);
          const rows = res && res[0] ? res[0] : [];
          tableDesc = {};
          rows.forEach((r) => { if (r && r.name) tableDesc[r.name] = r; });
        } else {
          // postgres / mysql generic information_schema fallback
          const query = `SELECT column_name FROM information_schema.columns WHERE table_name = '${tableName.toLowerCase()}'`;
          const out = await queryInterface.sequelize.query(query);
          const rows = out && out[0] ? out[0] : [];
          tableDesc = {};
          rows.forEach((r) => { if (r && (r.column_name || r.COLUMN_NAME)) tableDesc[r.column_name || r.COLUMN_NAME] = r; });
        }
      } catch (err) {
        // give up gracefully
        tableDesc = null;
      }
    }

    if (!tableDesc) {
      console.warn(`Table ${tableName} does not exist or cannot be inspected; skipping column ${columnName}`);
      return;
    }

    if (!tableDesc[columnName]) {
      console.log(`Adding column ${columnName} to ${tableName}`);
      await queryInterface.addColumn(tableName, columnName, definition);
    } else {
      console.log(`Column ${columnName} already exists on ${tableName}; skipping`);
    }
  };

  // Umzug may call migrations with different signatures. Prefer the passed-in
  // Sequelize, but fall back to the queryInterface sequelize constructor or
  // require('sequelize') so this migration works in different environments.
  let DT;
  try {
    const SeqLib = Sequelize || (queryInterface && queryInterface.sequelize && queryInterface.sequelize.constructor) || require('sequelize');
    DT = SeqLib.DataTypes || SeqLib;
  } catch (e) {
    // As a last resort, assume standard names
    DT = (Sequelize && Sequelize.DataTypes) || (queryInterface && queryInterface.sequelize && queryInterface.sequelize.constructor && queryInterface.sequelize.constructor.DataTypes) || require('sequelize');
  }

  await ensureColumn(tablePub, 'impactFactor', { type: DT.STRING, allowNull: true });
  await ensureColumn(tablePub, 'imageUrl', { type: DT.STRING, allowNull: true });
  await ensureColumn(tablePub, 'featured', { type: DT.BOOLEAN, allowNull: false, defaultValue: false });

  await ensureColumn(tableProj, 'imageUrl', { type: DT.STRING, allowNull: true });
  await ensureColumn(tableProj, 'featured', { type: DT.BOOLEAN, allowNull: false, defaultValue: false });
};

module.exports.down = async (queryInterface /*, Sequelize */) => {
  const tablePub = 'Publications';
  const tableProj = 'ResearchProjects';

  const removeColumn = async (tableName, columnName) => {
    const tableDesc = await queryInterface.describeTable(tableName).catch(() => null);
    if (tableDesc && tableDesc[columnName]) {
      await queryInterface.removeColumn(tableName, columnName);
    }
  };

  await removeColumn(tablePub, 'impactFactor');
  await removeColumn(tablePub, 'imageUrl');
  await removeColumn(tablePub, 'featured');
  await removeColumn(tableProj, 'imageUrl');
  await removeColumn(tableProj, 'featured');
};
