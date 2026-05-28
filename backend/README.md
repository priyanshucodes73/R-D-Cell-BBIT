Database migration guide

This project uses Umzug + SequelizeStorage to manage schema migrations.

Files:

- backend/migrations/\*.js — migration files. Each migration should export `up` (and optionally `down`):

  module.exports.up = async ({ queryInterface, Sequelize }) => {
  await queryInterface.addColumn('TableName', 'newCol', { type: Sequelize.STRING });
  };

  module.exports.down = async ({ queryInterface }) => {
  await queryInterface.removeColumn('TableName', 'newCol');
  };

Commands:

- Run migrations (applies pending):
  cd backend
  npm run migrate:up

- Revert last migration:
  npm run migrate:down

- List migration status:
  npm run migrate:status

CI / Deployment recommendation:

- Prefer running migrations as a single pre-deploy step (CI job) using `npm run migrate:up` before starting new server processes.
- Keep backups and test migrations on a staging DB before applying to production.

Notes:

- The server also runs migrations automatically at startup (index.js), but for production we recommend running migrations explicitly in CI to avoid race conditions during rolling deploys.
- Use descriptive, atomic migrations that are reversible when possible.
