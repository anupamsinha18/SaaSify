# SaaSify - Project & Task Management Platform

SaaSify is a production-ready, modern SaaS project management application built for high-performance teams. It features robust role-based access control, task management, real-time dashboard analytics, and a sleek user interface inspired by industry leaders like Linear and Notion.

## Features
- **Secure Authentication**: JWT-based auth with HttpOnly cookies, bcrypt hashing.
- **Role-Based Access Control**: Granular permissions for Admin and Member roles.
- **Project Management**: Create, track, and manage complex projects.
- **Task Tracking**: Assign tasks, update statuses, set priorities, and link to projects.
- **Dynamic Dashboard**: Real-time project metrics, task statistics, and activity feeds.
- **Modern UI/UX**: Built with Tailwind CSS v4, featuring a responsive, clean, and intuitive design.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite, React Router v6, TanStack Query (React Query), Zustand, Tailwind CSS, Axios.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, Zod Validation.
- **Database**: PostgreSQL
- **Deployment**: Configured for deployment on Railway.

## Local Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL database

### 1. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/saasify?schema=public"
JWT_SECRET="your_super_secret_key"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
```

Initialize the database:
```bash
npm run db:push
npm run postinstall
```

Start the backend development server:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL="http://localhost:5000/api"
```

Start the frontend development server:
```bash
npm run dev
```

## Deployment Instructions (Railway)
The application is fully prepared to be deployed on Railway.

1. **Database**: Provision a new PostgreSQL database on Railway.
2. **Backend**:
   - Create a new project from your GitHub repository targeting the `backend` folder.
   - Add environment variables (`DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`).
   - The start command is automatically inferred from `npm start`.
   - Ensure you run `npx prisma db push` during the build or pre-deploy step.
3. **Frontend**:
   - Create a new service targeting the `frontend` folder.
   - Set the build command to `npm run build`.
   - Add the `VITE_API_URL` environment variable pointing to your deployed backend URL.

## Demo Video Flow Suggestion
1. **Signup/Login**: Create a new user account (defaults to Admin for the first user if configured, or just Member).
2. **Dashboard**: Show the empty state of the dashboard analytics.
3. **Projects**: Navigate to the Projects tab, create a new project "Q3 Marketing Launch".
4. **Tasks**: Go to Tasks, create multiple tasks assigned to the project with varying priorities and statuses.
5. **Dashboard Walkthrough**: Return to the dashboard to see the updated metrics, completed tasks count, and recent activity.
6. **Task Update**: Change a task status to "Completed" and demonstrate the UI reactivity.
