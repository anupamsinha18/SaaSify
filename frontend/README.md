# Nexus Frontend

The frontend for Nexus, a modern project management platform. Built with React 19, Vite 8, and Tailwind CSS 4.

## 🚀 Key Technologies

- **React 19**: Modern UI development with hooks and concurrent features.
- **Vite 8**: Lightning-fast build tool and dev server.
- **Tailwind CSS 4**: Next-generation utility-first CSS framework.
- **TanStack Query (React Query)**: Powerful asynchronous state management for data fetching.
- **Zustand**: Lightweight, fast, and scalable state management for client-side state.
- **React Router 7**: Declarative routing for React applications.
- **Lucide React**: Beautiful and consistent icons.

## 🛠️ Development

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```env
VITE_API_URL="http://localhost:5000/api"
```

3. Start the development server:
```bash
npm run dev
```

### Scripts

- `npm run dev`: Start Vite development server.
- `npm run build`: Build for production.
- `npm run lint`: Run ESLint to check for code quality.
- `npm run preview`: Locally preview the production build.

## 📁 Structure

- `/src/components`: UI components (Layouts, Modals, Buttons, etc.)
- `/src/hooks`: Custom React hooks for logic reuse.
- `/src/pages`: Application views (Dashboard, Auth, Project details).
- `/src/services`: API service layers using Axios.
- `/src/store`: Zustand stores for global state.
- `/src/types`: TypeScript interfaces and types.
