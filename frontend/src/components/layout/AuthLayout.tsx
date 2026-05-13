import type { ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const features = [
  "Manage projects and tasks effortlessly",
  "Role-based access control out of the box",
  "Real-time collaboration with your team",
  "Detailed analytics and progress tracking"
];

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Branding & Features (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 bg-[#F8FAFC] flex-col justify-between p-12 xl:p-16 border-r border-gray-100 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-3xl" />
          <div className="absolute top-[60%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-blue-100/40 to-indigo-100/40 blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-gray-900/20">
              <span className="text-white font-bold text-2xl tracking-tighter">S</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">SaaSify</span>
          </div>
          
          <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 tracking-tight mb-6 leading-[1.15]">
            The modern way to <br/> build and collaborate.
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-md leading-relaxed font-medium">
            Streamline your workflow with our powerful, intuitive project management platform designed for ambitious teams.
          </p>

          <div className="space-y-6">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-4 text-gray-700">
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="font-medium text-[15px]">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-sm text-gray-500 font-medium mt-12">
          © {new Date().getFullYear()} SaaSify Inc. All rights reserved.
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-[55%] xl:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-[440px] mx-auto">
           {/* Mobile Branding */}
           <div className="flex lg:hidden items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-gray-900/20">
              <span className="text-white font-bold text-2xl tracking-tighter">S</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">SaaSify</span>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mb-2.5">{title}</h2>
            <p className="text-gray-500 font-medium text-sm lg:text-[15px]">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};
