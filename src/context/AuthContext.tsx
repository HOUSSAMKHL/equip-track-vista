
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, RolePermissions } from '@/types';
import { userData } from '@/data/userMockData';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  hasPermission: (permission: keyof RolePermissions) => boolean;
}

// Properly fixing the type issues in userData would be done in mockData.ts,
// but since that's a read-only file, we'll cast to the correct type here
const defaultUser: User | null = null; // Start with no user logged in

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Définir les permissions pour chaque rôle
const rolePermissionsMap: Record<User['role'], RolePermissions> = {
  admin: {
    // Admin a toutes les permissions
    canViewEquipment: true,
    canAddEquipment: true,
    canEditEquipment: true,
    canDeleteEquipment: true,
    canViewAnomalies: true,
    canAddAnomaly: true,
    canEditAnomaly: true,
    canDeleteAnomaly: true,
    canViewComplexes: true,
    canAddComplex: true,
    canEditComplex: true,
    canDeleteComplex: true,
    canViewEstablishments: true,
    canAddEstablishment: true,
    canEditEstablishment: true,
    canDeleteEstablishment: true,
    canViewUsers: true,
    canAddUser: true,
    canEditUser: true,
    canDeleteUser: true,
    canViewOperations: true,
    canAddOperation: true,
    canEditOperation: true,
    canDeleteOperation: true,
    canViewReports: true,
    canAddReport: true,
  },
  directeur_regional: {
    // Peut tout voir, mais ne peut gérer que les directeurs de complexe
    canViewEquipment: true,
    canAddEquipment: false,
    canEditEquipment: false,
    canDeleteEquipment: false,
    canViewAnomalies: true,
    canAddAnomaly: false,
    canEditAnomaly: false,
    canDeleteAnomaly: false,
    canViewComplexes: true,
    canAddComplex: true,
    canEditComplex: true,
    canDeleteComplex: true,
    canViewEstablishments: true,
    canAddEstablishment: false,
    canEditEstablishment: false,
    canDeleteEstablishment: false,
    canViewUsers: true,
    canAddUser: true, // Peut ajouter des directeurs de complexe
    canEditUser: true, // Peut modifier des directeurs de complexe
    canDeleteUser: true, // Peut supprimer des directeurs de complexe
    canViewOperations: true,
    canAddOperation: false,
    canEditOperation: false,
    canDeleteOperation: false,
    canViewReports: true,
    canAddReport: true,
  },
  directeur_complexe: {
    // Peut tout voir, mais ne peut gérer que les directeurs d'établissement
    canViewEquipment: true,
    canAddEquipment: false,
    canEditEquipment: false,
    canDeleteEquipment: false,
    canViewAnomalies: true,
    canAddAnomaly: false,
    canEditAnomaly: false,
    canDeleteAnomaly: false,
    canViewComplexes: true,
    canAddComplex: false,
    canEditComplex: false,
    canDeleteComplex: false,
    canViewEstablishments: true,
    canAddEstablishment: true,
    canEditEstablishment: true,
    canDeleteEstablishment: true,
    canViewUsers: true,
    canAddUser: true, // Peut ajouter des directeurs d'établissement
    canEditUser: true, // Peut modifier des directeurs d'établissement
    canDeleteUser: true, // Peut supprimer des directeurs d'établissement
    canViewOperations: true,
    canAddOperation: false,
    canEditOperation: false,
    canDeleteOperation: false,
    canViewReports: true,
    canAddReport: true,
  },
  directeur_etablissement: {
    // Peut gérer les équipements, anomalies et formateurs
    canViewEquipment: true,
    canAddEquipment: true,
    canEditEquipment: true,
    canDeleteEquipment: true,
    canViewAnomalies: true,
    canAddAnomaly: true,
    canEditAnomaly: true,
    canDeleteAnomaly: true,
    canViewComplexes: true,
    canAddComplex: false,
    canEditComplex: false,
    canDeleteComplex: false,
    canViewEstablishments: true,
    canAddEstablishment: false,
    canEditEstablishment: false,
    canDeleteEstablishment: false,
    canViewUsers: true,
    canAddUser: true, // Peut ajouter des formateurs
    canEditUser: true, // Peut modifier des formateurs
    canDeleteUser: true, // Peut supprimer des formateurs
    canViewOperations: true,
    canAddOperation: true,
    canEditOperation: true,
    canDeleteOperation: true,
    canViewReports: true,
    canAddReport: true,
  },
  formateur: {
    // Peut signaler des anomalies et gérer les équipements
    canViewEquipment: true,
    canAddEquipment: true,
    canEditEquipment: true,
    canDeleteEquipment: true,
    canViewAnomalies: true,
    canAddAnomaly: true,
    canEditAnomaly: true,
    canDeleteAnomaly: true,
    canViewComplexes: true,
    canAddComplex: false,
    canEditComplex: false,
    canDeleteComplex: false,
    canViewEstablishments: true,
    canAddEstablishment: false,
    canEditEstablishment: false,
    canDeleteEstablishment: false,
    canViewUsers: false,
    canAddUser: false,
    canEditUser: false,
    canDeleteUser: false,
    canViewOperations: true,
    canAddOperation: true,
    canEditOperation: true,
    canDeleteOperation: true,
    canViewReports: true,
    canAddReport: false,
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check if we have a user in localStorage
    const savedUser = localStorage.getItem('equiptrackUser');
    return savedUser ? JSON.parse(savedUser) : defaultUser;
  });

  const login = (loggedInUser: User) => {
    // Save user to localStorage for persistence
    localStorage.setItem('equiptrackUser', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const logout = () => {
    localStorage.removeItem('equiptrackUser');
    setUser(null);
  };

  const hasPermission = (permission: keyof RolePermissions): boolean => {
    if (!user) return false;
    return rolePermissionsMap[user.role][permission];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
