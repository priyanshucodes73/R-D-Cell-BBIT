BBIT R&D Cell - Fullstack Starter
=================================

This is a minimal starter that connects:
- Next.js frontend (Tailwind) -> served on port 3000
- Express backend (Sequelize + Postgres) -> served on port 4000
- Postgres DB -> port 5432

Run with Docker Compose (recommended for local dev):

    docker-compose up --build

Files of interest:
- frontend/: Next.js app
- backend/: Express API using Sequelize
- docker-compose.yml

Notes:
- The backend seeds two publications on first startup (development).
- For production use, replace sync() with proper migrations and secure environment variables.
