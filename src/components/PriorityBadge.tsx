
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PriorityBadgeProps {
  priority: 'low' | 'medium' | 'high' | 'critical';
  className?: string;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className }) => {
  let color;
  
  switch (priority) {
    case 'low':
      color = 'bg-blue-100 text-blue-800 border-blue-200';
      break;
    case 'medium':
      color = 'bg-yellow-100 text-yellow-800 border-yellow-200';
      break;
    case 'high':
      color = 'bg-orange-100 text-orange-800 border-orange-200';
      break;
    case 'critical':
      color = 'bg-red-100 text-red-800 border-red-200';
      break;
    default:
      color = 'bg-gray-100 text-gray-800 border-gray-200';
  }
  
  return (
    <Badge className={cn('font-medium', color, className)}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
};

export default PriorityBadge;
