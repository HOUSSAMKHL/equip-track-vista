
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Anomaly } from "@/types";

interface AnomalyUpdateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anomaly: Anomaly;
  onSave: (anomaly: Partial<Anomaly>) => void;
}

const AnomalyUpdateModal: React.FC<AnomalyUpdateModalProps> = ({ 
  open, 
  onOpenChange, 
  anomaly, 
  onSave 
}) => {
  const [status, setStatus] = useState<"open" | "in-progress" | "resolved">(
    anomaly?.status || "open"
  );
  const [repairCost, setRepairCost] = useState(anomaly?.repairCost?.toString() || "");
  const [technician, setTechnician] = useState(anomaly?.technician || "");
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const anomalyData: Partial<Anomaly> = {
      id: anomaly.id,
      status,
      repairCost: repairCost ? parseFloat(repairCost) : undefined,
      technician
    };
    
    onSave(anomalyData);
    
    toast({
      title: "Anomalie mise à jour",
      description: `L'anomalie a été mise à jour avec succès.`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Mettre à jour l'anomalie</DialogTitle>
          <DialogDescription>
            Mettre à jour le statut et les détails de l'anomalie pour l'équipement {anomaly.equipmentName}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Équipement */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="equipment" className="text-right">
                Équipement
              </Label>
              <Input 
                id="equipment" 
                value={anomaly.equipmentName} 
                className="col-span-3" 
                readOnly 
              />
            </div>
            
            {/* Cause */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cause" className="text-right">
                Cause
              </Label>
              <Input 
                id="cause" 
                value={anomaly.cause} 
                className="col-span-3" 
                readOnly 
              />
            </div>
            
            {/* Statut */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Statut
              </Label>
              <Select 
                value={status} 
                onValueChange={(value: "open" | "in-progress" | "resolved") => setStatus(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Ouvert</SelectItem>
                  <SelectItem value="in-progress">En cours de traitement</SelectItem>
                  <SelectItem value="resolved">Résolu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Intervenant */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="technician" className="text-right">
                Intervenant
              </Label>
              <Select value={technician} onValueChange={setTechnician}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un intervenant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ahmed Mansouri">Ahmed Mansouri</SelectItem>
                  <SelectItem value="Fatima Zahra">Fatima Zahra</SelectItem>
                  <SelectItem value="Mohamed Bouazizi">Mohamed Bouazizi</SelectItem>
                  <SelectItem value="Sami Belghith">Sami Belghith</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Coût de réparation */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="repairCost" className="text-right">
                Coût de réparation
              </Label>
              <Input 
                id="repairCost" 
                type="number"
                min="0"
                step="0.01"
                value={repairCost} 
                onChange={(e) => setRepairCost(e.target.value)}
                className="col-span-3" 
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit">Mettre à jour</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AnomalyUpdateModal;
