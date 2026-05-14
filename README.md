# Nexus - Modern Project Management Platform

Nexus is a robust, full-stack Project Management application built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. It provides a seamless experience for teams to manage projects, track tasks, and collaborate effectively.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with cookie-based session management.
- **Project Management**: Create, update, and manage multiple projects with different statuses (Planning, Active, Completed, On Hold).
- **Task Tracking**: Granular task management with priorities (Low, Medium, High) and status tracking (Todo, In Progress, Review, Completed).
- **Team Collaboration**: Assign tasks to team members and manage project memberships.
- **Responsive Dashboard**: A modern, clean UI built with Tailwind CSS v4 and Lucide icons.
- **Type Safety**: End-to-end type safety using TypeScript and Zod validation.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query/latest)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express 5](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database ORM**: [Prisma](https://www.prisma.io/) (with MongoDB)
- **Validation**: [Zod](https://zod.dev/)
- **Security**: [Bcryptjs](https://github.com/dcodeIO/bcrypt.js) & [JWT](https://jwt.io/)

## 📁 Project Structure

```text
saasproject/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── store/          # Zustand state management
│   │   ├── services/       # API service layers (Axios)
│   │   └── pages/          # Main application pages
├── backend/                # Express backend application
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── middlewares/    # Custom Express middlewares
│   │   ├── models/         # (Prisma handles models)
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions and errors
│   │   └── config/         # Environment configuration
│   └── prisma/             # Prisma schema and migrations
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- npm or yarn

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd saasproject
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="mongodb+srv://..."
JWT_SECRET="your_super_secret_key"
FRONTEND_URL="http://localhost:5173"
```

Push the database schema:
```bash
npx prisma generate
npx prisma db push
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL="http://localhost:5000/api"
```

Start the frontend:
```bash
npm run dev
```

## 🔌 API Endpoints

- **Auth**: `/api/auth` (Register, Login, Logout, Me)
- **Projects**: `/api/projects` (CRUD projects)
- **Tasks**: `/api/tasks` (CRUD tasks)
- **Users**: `/api/users` (Manage user profiles)

## 📄 License

This project is licensed under the ISC License.
