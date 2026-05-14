import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { AuthLayout } from '../components/layout/AuthLayout';
import { RoleSelector } from '../components/common/RoleSelector';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'MEMBER'>('MEMBER');
  
  // Conditional fields
  const [companyName, setCompanyName] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/signup', { name, email, password, role });
      login(data.data.user, data.data.token);
      toast.success('Account created successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create your account" 
      subtitle="Join thousands of teams already building with Nexus."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <RoleSelector value={role} onChange={setRole} />

        <div className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
          />
          <Input
            label="Email address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
          />

          {role === 'ADMIN' && (
             <Input
               label="Company / Team Name (Optional)"
               type="text"
               value={companyName}
               onChange={(e) => setCompanyName(e.target.value)}
               placeholder="Acme Corp"
             />
          )}

          {role === 'MEMBER' && (
             <Input
               label="Invite Code (Optional)"
               type="text"
               value={inviteCode}
               onChange={(e) => setInviteCode(e.target.value)}
               placeholder="ABC-123-XYZ"
             />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <Input
              label="Confirm Password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>

        <Button type="submit" className="w-full h-11 text-base mt-4" isLoading={isLoading}>
          Create account
        </Button>
        
        <p className="text-center text-sm text-gray-600 mt-6 font-medium">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-indigo-600 hover:text-indigo-500 hover:underline transition-all"
          >
            Sign in instead
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
