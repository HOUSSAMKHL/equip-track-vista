
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Activity, Calendar, Clock, User, MapPin, ClipboardCheck } from "lucide-react";
import { Operation } from "@/types";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import StatusBadge from './StatusBadge';

interface OperationDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  operation?: Operation;
}

const OperationDetailModal: React.FC<OperationDetailModalProps> = ({ 
  open, 
  onOpenChange, 
  operation 
}) => {
  if (!operation) return null;

  // Format the date if it exists
  const formattedDate = operation.date ? format(new Date(operation.date), 'PPP', { locale: fr }) : '';
  
  const getOperationTypeIcon = (type: string) => {
    switch(type) {
      case 'maintenance':
        return <Activity className="h-5 w-5 text-teal-500" />;
      case 'repair':
        return <ClipboardCheck className="h-5 w-5 text-blue-500" />;
      case 'inspection':
        return <ClipboardCheck className="h-5 w-5 text-purple-500" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{operation.name}</DialogTitle>
          <DialogDescription>
            Détails de l'opération
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getOperationTypeIcon(operation.type)}
              <span className="text-lg font-medium capitalize">{operation.type}</span>
            </div>
            <StatusBadge status={operation.status} type="operation" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Équipement</p>
                  <p className="font-medium">{operation.equipmentName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Date prévue</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Durée estimée</p>
                  <p className="font-medium">{operation.duration}h</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Technicien responsable</p>
                  <p className="font-medium">{operation.performedBy}</p>
                </div>
              </div>
            </div>
          </div>
          
          {operation.observations && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Observations</p>
              <p className="bg-gray-50 p-3 rounded-md">{operation.observations}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OperationDetailModal;
