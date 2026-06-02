module.exports.up = async (queryInterface, Sequelize) => {
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

  const DT = Sequelize.DataTypes || Sequelize;

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
