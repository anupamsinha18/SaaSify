import { Shield, User as UserIcon } from 'lucide-react';
import { cn } from './Button';

interface RoleSelectorProps {
  value: 'ADMIN' | 'MEMBER';
  onChange: (role: 'ADMIN' | 'MEMBER') => void;
}

export const RoleSelector = ({ value, onChange }: RoleSelectorProps) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Continue As
      </label>
      <div className="grid grid-cols-2 gap-4">
        {/* Admin Card */}
        <button
          type="button"
          onClick={() => onChange('ADMIN')}
          className={cn(
            "relative flex flex-col items-start p-4 rounded-2xl border-2 text-left transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]",
            value === 'ADMIN' 
              ? "border-gray-900 bg-gray-900 shadow-md shadow-gray-900/10" 
              : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
          )}
        >
          <div className={cn(
            "p-2 rounded-xl mb-3 transition-colors",
            value === 'ADMIN' ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
          )}>
            <Shield className="w-5 h-5" />
          </div>
          <span className={cn(
            "font-semibold mb-1 text-[15px]",
            value === 'ADMIN' ? "text-white" : "text-gray-900"
          )}>Administrator</span>
          <span className={cn(
            "text-[13px] leading-relaxed",
             value === 'ADMIN' ? "text-gray-300" : "text-gray-500"
          )}>
            Manage teams & permissions
          </span>
        </button>

        {/* Member Card */}
        <button
          type="button"
          onClick={() => onChange('MEMBER')}
          className={cn(
            "relative flex flex-col items-start p-4 rounded-2xl border-2 text-left transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]",
            value === 'MEMBER' 
              ? "border-gray-900 bg-gray-900 shadow-md shadow-gray-900/10" 
              : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
          )}
        >
          <div className={cn(
            "p-2 rounded-xl mb-3 transition-colors",
            value === 'MEMBER' ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
          )}>
            <UserIcon className="w-5 h-5" />
          </div>
          <span className={cn(
            "font-semibold mb-1 text-[15px]",
            value === 'MEMBER' ? "text-white" : "text-gray-900"
          )}>Team Member</span>
          <span className={cn(
             "text-[13px] leading-relaxed",
             value === 'MEMBER' ? "text-gray-300" : "text-gray-500"
          )}>
            Track assigned tasks & collaborate
          </span>
        </button>
      </div>
    </div>
  );
};
