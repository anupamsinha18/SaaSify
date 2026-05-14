# Nexus Backend

The backend for Nexus, a modern project management platform. Built with Express 5, TypeScript, and Prisma (MongoDB).

## 🚀 Key Technologies

- **Express 5**: Fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: Typed superset of JavaScript for better developer experience and reliability.
- **Prisma**: Next-generation Node.js and TypeScript ORM for MongoDB.
- **Zod**: TypeScript-first schema declaration and validation library.
- **JWT**: JSON Web Token for secure authentication.
- **Bcryptjs**: Optimized bcrypt in JavaScript for password hashing.

## 🛠️ Development

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="mongodb+srv://..."
JWT_SECRET="your_secret_key"
FRONTEND_URL="http://localhost:5173"
```

3. Generate Prisma client and push schema to database:
```bash
npx prisma generate
npx prisma db push
```

4. Start the development server:
```bash
npm run dev
```

### Scripts

- `npm run dev`: Start backend in development mode with auto-reload.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm run start`: Start the production server from `dist/`.
- `npm run db:push`: Push Prisma schema to the database.
- `npm run db:studio`: Open Prisma Studio to explore your data.

## 📁 Structure

- `/src/config`: Environment and app configuration.
- `/src/controllers`: Request handlers and business logic.
- `/src/middlewares`: Custom Express middlewares (Auth, Validation, Error).
- `/src/routes`: API route definitions.
- `/src/utils`: Helper functions, custom errors, and constants.
- `/prisma`: Prisma schema and database configuration.

## 🔌 API Endpoints

- `POST /api/auth/register`: Create a new account.
- `POST /api/auth/login`: Authenticate a user.
- `GET /api/auth/me`: Get current user profile.
- `GET /api/projects`: List all projects.
- `POST /api/projects`: Create a new project.
- `GET /api/tasks`: List tasks for a project.
- `POST /api/tasks`: Create a new task.
