# BBIT R&D Cell - Fullstack Starter

This repository contains:

- `frontend/`: Next.js app
- `backend/`: Express API using Sequelize
- `docker-compose.yml`: local stack for app + database

## Local development

Frontend:

```bash
cd frontend
npm install
set NEXT_PUBLIC_API_URL=http://localhost:4005
npm run dev
```

Backend:

```bash
cd backend
npm install
set JWT_SECRET=devsecret
set REFRESH_TOKEN_SECRET=refreshsecret
set FRONTEND_URL=http://localhost:3000
set PORT=4005
npm start
```

The frontend expects the backend at `http://localhost:4005` by default. The backend serves uploaded files from `/uploads` when using the local upload driver.

## Upload drivers

Local uploads are the default. To enable S3 uploads, set:

```bash
set UPLOAD_DRIVER=s3
set AWS_REGION=us-east-1
set S3_BUCKET=your-bucket-name
```

Optional S3 settings:

- `S3_PUBLIC_URL`: override the returned public URL base
- `S3_ACL`: defaults to `public-read`
- `S3_REGION`: alternate region variable if you do not want to use `AWS_REGION`

## Authentication

The backend uses access tokens plus refresh tokens stored in an httpOnly cookie. Admin login returns an access token and the browser keeps the refresh cookie for silent rotation.

## Docker

To run the full stack with Docker Compose:

```bash
docker-compose up --build
```

## Notes

- The backend seeds demo publications on first startup in development.
- `PUT /api/site-settings/:key` saves a draft by default.
- `POST /api/site-settings/:key/publish` copies the draft to the published value used by the public site.
- For production use, replace `sequelize.sync({ alter: true })` with migrations and set real secrets.
