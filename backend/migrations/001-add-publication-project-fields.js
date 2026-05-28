module.exports.up = async ({ queryInterface, Sequelize }) => {
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

  await ensureColumn(tablePub, 'impactFactor', { type: Sequelize.STRING, allowNull: true });
  await ensureColumn(tablePub, 'imageUrl', { type: Sequelize.STRING, allowNull: true });
  await ensureColumn(tablePub, 'featured', { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false });

  await ensureColumn(tableProj, 'imageUrl', { type: Sequelize.STRING, allowNull: true });
  await ensureColumn(tableProj, 'featured', { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false });
};
