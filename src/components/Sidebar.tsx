
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Box, 
  AlertTriangle, 
  Activity, 
  Users, 
  Building2, 
  FileText,
  Package, 
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Tableau de bord', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Équipements', path: '/equipment', icon: Package },
    { name: 'Anomalies', path: '/anomalies', icon: AlertTriangle },
    { name: 'Opérations', path: '/operations', icon: Activity },
    { name: 'Utilisateurs', path: '/users', icon: Users },
    { name: 'Complexes', path: '/complexes', icon: Building2 },
    { name: 'Rapports', path: '/reports', icon: FileText },
  ];

  return (
    <div className="w-64 bg-equiptrack-blue text-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <img src="https://www.ofppt.ma/themes/custom/ofppt/favicon.ico" alt="OFPPT Logo" className="h-8 w-8 mr-2" />
            <Box className="h-6 w-6 text-equiptrack-teal" />
          </div>
          <span className="text-xl font-bold">
            Équip <span className="text-equiptrack-teal">Track</span>
          </span>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center p-3 rounded-md space-x-3 transition-colors",
                  location.pathname === item.path 
                    ? "bg-white/10 text-equiptrack-teal" 
                    : "hover:bg-white/5"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
        <p>EquipTrack v1.0</p>
      </div>
    </div>
  );
};

export default Sidebar;
