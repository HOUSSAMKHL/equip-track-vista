
export interface Anomaly {
  id: string;
  equipmentId: string;
  equipmentName: string;
  cause: string;
  reportDate: string;
  resolvedDate?: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'resolved';
  technician?: string;
  downtime?: number;
  repairCost?: number;
  description?: string;
  resolution?: string;
  reports?: string[];
  isResolved?: boolean;
  correctiveAction?: string;
  spareParts?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  role: 'admin' | 'directeur_regional' | 'directeur_complexe' | 'directeur_etablissement' | 'formateur';
  isActive: boolean;
}

export interface Equipment {
  id: string;
  name: string;
  reference: string;
  category: string;
  location: string;
  status: 'operational' | 'maintenance' | 'out-of-service';
  hasAnomaly: boolean;
  acquisitionYear: number;
  acquisitionValue: number;
  lastMaintenance?: string;
  nextMaintenance?: string;
}

export interface Operation {
  id: string;
  name: string;
  type: 'maintenance' | 'repair' | 'inspection';
  equipmentId: string;
  equipmentName: string;
  date: string;
  duration: number;
  performedBy: string;
  observations?: string;
  status: 'planned' | 'in-progress' | 'completed';
}

export interface Establishment {
  id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  equipmentCount: number;
}

export interface Complex {
  id: string;
  name: string;
  city: string;
  address: string;
  description?: string;
  establishments: Establishment[];
}

export interface Report {
  id: string;
  title: string;
  type: 'equipment' | 'anomaly' | 'maintenance' | 'complex';
  generatedDate: string;
  generatedBy: string;
  status: 'draft' | 'published';
  content: string;
  attachments?: number;
}

export interface DashboardStats {
  totalEquipment: number;
  activeAnomalies: number;
  operationsThisMonth: number;
  activeUsers: number;
  equipmentStatusData: {
    operational: number;
    maintenance: number;
    outOfService: number;
  };
  monthlyOperations: {
    month: string;
    maintenance: number;
    repair: number;
    inspection: number;
  }[];
}

export interface RolePermissions {
  canViewEquipment: boolean;
  canAddEquipment: boolean;
  canEditEquipment: boolean;
  canDeleteEquipment: boolean;
  canViewAnomalies: boolean;
  canAddAnomaly: boolean;
  canEditAnomaly: boolean;
  canDeleteAnomaly: boolean;
  canViewComplexes: boolean;
  canAddComplex: boolean;
  canEditComplex: boolean;
  canDeleteComplex: boolean;
  canViewEstablishments: boolean;
  canAddEstablishment: boolean;
  canEditEstablishment: boolean;
  canDeleteEstablishment: boolean;
  canViewUsers: boolean;
  canAddUser: boolean;
  canEditUser: boolean;
  canDeleteUser: boolean;
  canViewOperations: boolean;
  canAddOperation: boolean;
  canEditOperation: boolean;
  canDeleteOperation: boolean;
  canViewReports: boolean;
  canAddReport: boolean;
  canManageUsers?: boolean; // For backward compatibility
  canManageComplexes?: boolean; // For backward compatibility
  canGenerateReports?: boolean; // For backward compatibility
}
