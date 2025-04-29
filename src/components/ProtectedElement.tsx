
import React, { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { RolePermissions } from '@/types';

interface ProtectedElementProps {
  permission: keyof RolePermissions;
  children: ReactNode;
  fallback?: ReactNode;
}

const ProtectedElement: React.FC<ProtectedElementProps> = ({ 
  permission, 
  children,
  fallback = null
}) => {
  const { hasPermission } = useAuth();
  
  if (hasPermission(permission)) {
    return <>{children}</>;
  }
  
  return <>{fallback}</>;
};

export default ProtectedElement;
