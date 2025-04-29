
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Operation } from "@/types";
import OperationForm from "./OperationForm";

interface OperationFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  operation?: Operation;
  equipmentId?: string;
  equipmentName?: string;
  onSave: (operation: Partial<Operation>) => void;
}

const OperationFormModal: React.FC<OperationFormModalProps> = ({ 
  open, 
  onOpenChange, 
  operation,
  equipmentId,
  equipmentName,
  onSave 
}) => {
  const { toast } = useToast();

  const handleSubmit = (operationData: Partial<Operation>) => {
    onSave(operationData);
    
    toast({
      title: operation ? "Opération modifiée" : "Opération effectuée",
      description: `${operationData.name} a été ${operation ? "modifiée" : "effectuée"} avec succès.`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{operation ? "Modifier l'opération" : "Effectuer une opération"}</DialogTitle>
          <DialogDescription>
            {operation 
              ? "Modifier les détails de l'opération" 
              : "Remplissez les informations pour effectuer une nouvelle opération"}
          </DialogDescription>
        </DialogHeader>
        
        <OperationForm 
          operation={operation}
          equipmentId={equipmentId}
          equipmentName={equipmentName}
          onSubmit={handleSubmit}
          isEditing={!!operation}
        />
      </DialogContent>
    </Dialog>
  );
};

export default OperationFormModal;
