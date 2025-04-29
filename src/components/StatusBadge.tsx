
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  type: 'equipment' | 'anomaly' | 'operation';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type }) => {
  let color;
  
  if (type === 'equipment') {
    switch (status) {
      case 'operational':
        color = 'bg-green-100 text-green-800 border-green-200';
        break;
      case 'maintenance':
        color = 'bg-yellow-100 text-yellow-800 border-yellow-200';
        break;
      case 'out-of-service':
        color = 'bg-red-100 text-red-800 border-red-200';
        break;
      default:
        color = 'bg-gray-100 text-gray-800 border-gray-200';
    }
  } else if (type === 'anomaly') {
    switch (status) {
      case 'open':
        color = 'bg-red-100 text-red-800 border-red-200';
        break;
      case 'in-progress':
        color = 'bg-yellow-100 text-yellow-800 border-yellow-200';
        break;
      case 'resolved':
        color = 'bg-green-100 text-green-800 border-green-200';
        break;
      default:
        color = 'bg-gray-100 text-gray-800 border-gray-200';
    }
  } else if (type === 'operation') {
    switch (status) {
      case 'planned':
        color = 'bg-blue-100 text-blue-800 border-blue-200';
        break;
      case 'in-progress':
        color = 'bg-yellow-100 text-yellow-800 border-yellow-200';
        break;
      case 'completed':
        color = 'bg-green-100 text-green-800 border-green-200';
        break;
      default:
        color = 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }
  
  return (
    <Badge className={cn('font-medium', color)}>
      {status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, ' ')}
    </Badge>
  );
};

export default StatusBadge;
