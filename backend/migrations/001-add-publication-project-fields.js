const { DataTypes } = require("sequelize");

module.exports.up = async ({ queryInterface }) => {
  // Publications table
  const tablePub = 'Publications';
  const tableProj = 'ResearchProjects';

  const ensureColumn = async (tableName, columnName, definition) => {
    const tableDesc = await queryInterface.describeTable(tableName).catch(() => null);
    if (!tableDesc) {
      console.warn(`Table ${tableName} does not exist yet; skipping column ${columnName}`);
      return;
    }
    if (!tableDesc[columnName]) {
      console.log(`Adding column ${columnName} to ${tableName}`);
      await queryInterface.addColumn(tableName, columnName, definition);
    } else {
      console.log(`Column ${columnName} already exists on ${tableName}; skipping`);
    }
  };

  await ensureColumn(tablePub, 'impactFactor', { type: DataTypes.STRING, allowNull: true });
  await ensureColumn(tablePub, 'imageUrl', { type: DataTypes.STRING, allowNull: true });
  await ensureColumn(tablePub, 'featured', { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false });

  await ensureColumn(tableProj, 'imageUrl', { type: DataTypes.STRING, allowNull: true });
  await ensureColumn(tableProj, 'featured', { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false });
};

module.exports.down = async ({ queryInterface }) => {
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
