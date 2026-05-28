#!/usr/bin/env node
const path = require('path');
const { Umzug, SequelizeStorage } = require('umzug');
const { Sequelize } = require('sequelize');
const fs = require('fs');

// Load DB config from env (same logic as index.js)
const defaultSQLiteStorage = process.env.SQLITE_STORAGE || 'dev.sqlite';

function createSqliteSequelize(storage = defaultSQLiteStorage) {
  return new Sequelize({ dialect: 'sqlite', storage, logging: false });
}

function createPostgresSequelize(databaseUrl) {
  return new Sequelize(databaseUrl, { dialect: 'postgres', logging: false });
}

async function resolveSequelize() {
  if (process.env.DATABASE_URL || (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME)) {
    const pgUrl = process.env.DATABASE_URL
      ? process.env.DATABASE_URL
      : `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}`;
    try {
      const pg = createPostgresSequelize(pgUrl);
      await pg.authenticate();
      console.log('Connected to Postgres');
      return pg;
    } catch (e) {
      console.warn('Postgres connection failed, falling back to SQLite:', e && e.message ? e.message : e);
      return createSqliteSequelize();
    }
  }
  return createSqliteSequelize();
}

async function run() {
  const sequelize = await resolveSequelize();
  const umzug = new Umzug({
    migrations: { glob: path.join(__dirname, '..', 'migrations', '*.js') },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  const cmd = process.argv[2] || 'status';
  try {
    if (cmd === 'up') {
      const pending = await umzug.pending();
      if (!pending || !pending.length) {
        console.log('No pending migrations');
        process.exit(0);
      }
      await umzug.up();
      console.log('Migrations applied');
      process.exit(0);
    } else if (cmd === 'down') {
      const executed = await umzug.executed();
      if (!executed || !executed.length) {
        console.log('No executed migrations to revert');
        process.exit(0);
      }
      await umzug.down();
      console.log('Reverted last migration');
      process.exit(0);
    } else {
      const pending = await umzug.pending();
      const executed = await umzug.executed();
      console.log('Executed migrations:');
      executed.forEach(m => console.log('  ', m.name));
      console.log('\nPending migrations:');
      pending.forEach(m => console.log('  ', m.name));
      process.exit(0);
    }
  } catch (e) {
    console.error('Migration error', e && e.stack ? e.stack : e);
    process.exit(1);
  }
}

run();
