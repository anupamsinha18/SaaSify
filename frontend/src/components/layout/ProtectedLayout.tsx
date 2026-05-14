import { useState } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LayoutDashboard, FolderKanban, CheckSquare, Users as UsersIcon, LogOut, Menu, Shield } from 'lucide-react';
import { cn } from '../common/Button';

export const ProtectedLayout = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: FolderKanban },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Team', href: '/users', icon: UsersIcon },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col bg-white border-r border-gray-200 shadow-sm">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-indigo-200 shadow-lg">
              <span className="text-white font-bold text-2xl">N</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Nexus</span>
          </div>
          <nav className="flex-1 px-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                    'group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200'
                  )}
                >
                  <item.icon
                    className={cn(
                      isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                      'mr-3 flex-shrink-0 h-5 w-5 transition-colors'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-shrink-0 p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center w-full gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                {user?.role === 'ADMIN' && <Shield className="w-3 h-3 text-purple-600" />}
                <p className={`text-[10px] uppercase tracking-wider font-bold ${
                  user?.role === 'ADMIN' ? 'text-purple-600' : 'text-blue-600'
                }`}>
                  {user?.role}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 z-40 flex justify-end transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div 
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        <div 
          className={cn(
            "relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl h-full transition-transform duration-300 ease-in-out transform",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="absolute top-0 left-0 -ml-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-8">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-indigo-200 shadow-lg">
                <span className="text-white font-bold text-2xl">N</span>
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">Nexus</span>
            </div>
            <nav className="flex-1 px-3 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      isActive
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                      'group flex items-center px-3 py-2.5 text-base font-medium rounded-xl transition-all duration-200'
                    )}
                  >
                    <item.icon
                      className={cn(
                        isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                        'mr-4 flex-shrink-0 h-6 w-6 transition-colors'
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 p-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center w-full gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {user?.role === 'ADMIN' && <Shield className="w-3 h-3 text-purple-600" />}
                  <p className={`text-[10px] uppercase tracking-wider font-bold ${
                    user?.role === 'ADMIN' ? 'text-purple-600' : 'text-blue-600'
                  }`}>
                    {user?.role}
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-lg font-bold text-gray-900">Nexus</span>
          </div>
          <button 
            className="text-gray-500 hover:text-gray-900 p-1 -mr-1 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 md:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
