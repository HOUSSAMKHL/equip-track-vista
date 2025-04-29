
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Equipment } from "@/types";

interface EquipmentFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipment?: Equipment;
  onSave: (equipment: Partial<Equipment>) => void;
}

const EquipmentFormModal: React.FC<EquipmentFormModalProps> = ({ 
  open, 
  onOpenChange, 
  equipment, 
  onSave 
}) => {
  const [name, setName] = useState(equipment?.name || '');
  const [reference, setReference] = useState(equipment?.reference || '');
  const [category, setCategory] = useState(equipment?.category || '');
  const [location, setLocation] = useState(equipment?.location || '');
  const [status, setStatus] = useState<"operational" | "maintenance" | "out-of-service">(
    equipment?.status || "operational"
  );
  const [acquisitionYear, setAcquisitionYear] = useState<number>(equipment?.acquisitionYear || new Date().getFullYear());
  const [acquisitionValue, setAcquisitionValue] = useState<number>(equipment?.acquisitionValue || 0);
  const [hasAnomaly, setHasAnomaly] = useState(equipment?.hasAnomaly || false);
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const equipmentData: Partial<Equipment> = {
      name,
      reference,
      category,
      location,
      status,
      acquisitionYear,
      acquisitionValue,
      hasAnomaly,
      ...(equipment?.id ? { id: equipment.id } : {})
    };
    
    onSave(equipmentData);
    
    toast({
      title: equipment ? "Équipement modifié" : "Équipement ajouté",
      description: `${name} a été ${equipment ? "modifié" : "ajouté"} avec succès.`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{equipment ? "Modifier l'équipement" : "Ajouter un équipement"}</DialogTitle>
          <DialogDescription>
            {equipment 
              ? "Modifier les détails de l'équipement" 
              : "Remplissez les informations pour ajouter un nouvel équipement"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Nom */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="col-span-3" 
                required
              />
            </div>
            
            {/* Référence */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reference" className="text-right">
                Référence
              </Label>
              <Input 
                id="reference" 
                value={reference} 
                onChange={(e) => setReference(e.target.value)}
                className="col-span-3" 
                required
              />
            </div>
            
            {/* Catégorie */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Catégorie
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mechanical">Mécanique</SelectItem>
                  <SelectItem value="Electrical">Électrique</SelectItem>
                  <SelectItem value="Hydraulic">Hydraulique</SelectItem>
                  <SelectItem value="Pneumatic">Pneumatique</SelectItem>
                  <SelectItem value="Electronic">Électronique</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Emplacement */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Emplacement
              </Label>
              <Input 
                id="location" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="col-span-3" 
                required
              />
            </div>
            
            {/* Année d'acquisition */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="acquisitionYear" className="text-right">
                Année d'acquisition
              </Label>
              <Input 
                id="acquisitionYear" 
                type="number"
                value={acquisitionYear} 
                onChange={(e) => setAcquisitionYear(parseInt(e.target.value))}
                className="col-span-3" 
                required
              />
            </div>
            
            {/* Valeur d'acquisition */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="acquisitionValue" className="text-right">
                Valeur d'acquisition
              </Label>
              <Input 
                id="acquisitionValue" 
                type="number"
                value={acquisitionValue} 
                onChange={(e) => setAcquisitionValue(parseInt(e.target.value))}
                className="col-span-3" 
                required
              />
            </div>
            
            {/* Statut */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Statut
              </Label>
              <Select 
                value={status} 
                onValueChange={(value: "operational" | "maintenance" | "out-of-service") => setStatus(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operational">Opérationnel</SelectItem>
                  <SelectItem value="maintenance">En maintenance</SelectItem>
                  <SelectItem value="out-of-service">Hors service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* État */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state" className="text-right">
                État
              </Label>
              <Select 
                value={hasAnomaly ? "anomaly" : "normal"} 
                onValueChange={(value) => setHasAnomaly(value === "anomaly")}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un état" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="anomaly">Anomalie</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit">{equipment ? "Modifier" : "Ajouter"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EquipmentFormModal;
