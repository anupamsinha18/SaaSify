import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { AuthLayout } from '../components/layout/AuthLayout';
import { RoleSelector } from '../components/common/RoleSelector';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'MEMBER'>('MEMBER');
  const [isLoading, setIsLoading] = useState(false);
  
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.data.user, data.data.token);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to your account to continue."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <RoleSelector value={role} onChange={setRole} />

        <div className="space-y-4">
          <Input
            label="Email address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
          />
          
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <Link to="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition-all">
                Forgot password?
              </Link>
            </div>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full h-11 text-base mb-4" isLoading={isLoading}>
            Sign in
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6 font-medium">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="text-indigo-600 hover:text-indigo-500 hover:underline transition-all"
          >
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
