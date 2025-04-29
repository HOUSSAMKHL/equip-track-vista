
import React from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { UserCircle2 } from 'lucide-react';
import UserSwitcher from './UserSwitcher';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
  
  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="flex justify-end items-center p-4 bg-white border-b gap-4">
          <UserSwitcher />
          {user && (
            <div className="flex items-center gap-2">
              <UserCircle2 className="h-6 w-6 text-gray-500" />
              <div className="text-sm">
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
              <Badge className="ml-2 capitalize">
                {user.role.replace(/_/g, ' ')}
              </Badge>
            </div>
          )}
        </div>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
