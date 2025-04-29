
import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Operation } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DialogFooter } from "@/components/ui/dialog";

// Predefined operation names
const OPERATION_NAMES = [
  "Nettoyage des filtres",
  "Changement de l'huile",
  "Inspection de routine",
  "Étalonnage des capteurs",
  "Remplacement des pièces usées",
  "Vérification électrique",
  "Maintenance préventive",
  "Mise à jour du logiciel",
  "Diagnostic général",
  "Lubrification des composants"
];

interface OperationFormProps {
  operation?: Operation;
  equipmentId?: string;
  equipmentName?: string;
  onSubmit: (operation: Partial<Operation>) => void;
  isEditing: boolean;
}

const OperationForm: React.FC<OperationFormProps> = ({ 
  operation,
  equipmentId,
  equipmentName,
  onSubmit,
  isEditing
}) => {
  const [name, setName] = useState(operation?.name || '');
  const [frequency, setFrequency] = useState<"quotidienne" | "hebdomadaire" | "mensuelle">(
    "hebdomadaire"
  );
  const [eqId, setEqId] = useState(operation?.equipmentId || equipmentId || '');
  const [eqName, setEqName] = useState(operation?.equipmentName || equipmentName || '');
  const [date, setDate] = useState<Date>(operation?.date ? new Date(operation.date) : new Date());
  const [duration, setDuration] = useState(operation?.duration?.toString() || "1");
  const [responsible, setResponsible] = useState(operation?.performedBy || '');
  const [status, setStatus] = useState<"planned" | "in-progress" | "completed">(
    operation?.status || "planned"
  );

  // Update form when operation prop changes
  useEffect(() => {
    if (operation) {
      setName(operation.name);
      setEqId(operation.equipmentId);
      setEqName(operation.equipmentName);
      setDate(operation.date ? new Date(operation.date) : new Date());
      setDuration(operation.duration.toString());
      setResponsible(operation.performedBy);
      setStatus(operation.status);
    } else {
      // Reset form for new operations
      setName('');
      setEqId(equipmentId || '');
      setEqName(equipmentName || '');
      setDate(new Date());
      setDuration('1');
      setResponsible('');
      setStatus('planned');
    }
  }, [operation, equipmentId, equipmentName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const operationData: Partial<Operation> = {
      name,
      type: 'maintenance', // Default type as we removed the type selection
      equipmentId: eqId,
      equipmentName: eqName,
      date: format(date, 'yyyy-MM-dd'),
      duration: parseInt(duration, 10),
      performedBy: responsible,
      status,
      ...(operation?.id ? { id: operation.id } : {})
    };
    
    onSubmit(operationData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        {/* Nom */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nom
          </Label>
          <Select 
            value={name} 
            onValueChange={setName}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Sélectionner une opération" />
            </SelectTrigger>
            <SelectContent>
              {OPERATION_NAMES.map((opName) => (
                <SelectItem key={opName} value={opName}>{opName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Fréquence */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="frequency" className="text-right">
            Fréquence
          </Label>
          <Select 
            value={frequency} 
            onValueChange={(value: "quotidienne" | "hebdomadaire" | "mensuelle") => setFrequency(value)}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Sélectionner une fréquence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quotidienne">Quotidienne</SelectItem>
              <SelectItem value="hebdomadaire">Hebdomadaire</SelectItem>
              <SelectItem value="mensuelle">Mensuelle</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Équipement */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="equipment" className="text-right">
            Équipement
          </Label>
          <Input 
            id="equipment" 
            value={eqName} 
            onChange={(e) => setEqName(e.target.value)}
            className="col-span-3" 
            required
            readOnly={!!equipmentName || !!operation}
          />
        </div>
        
        {/* Date */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="date" className="text-right">
            Date
          </Label>
          <div className="col-span-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Durée */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="duration" className="text-right">
            Durée (heures)
          </Label>
          <Input 
            id="duration" 
            type="number"
            min="0.5"
            step="0.5"
            value={duration} 
            onChange={(e) => setDuration(e.target.value)}
            className="col-span-3" 
            required
          />
        </div>
        
        {/* Responsable */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="responsible" className="text-right">
            Responsable
          </Label>
          <Select value={responsible} onValueChange={setResponsible}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Sélectionner un responsable" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ahmed Mansouri">Ahmed Mansouri</SelectItem>
              <SelectItem value="Fatima Zahra">Fatima Zahra</SelectItem>
              <SelectItem value="Mohamed Bouazizi">Mohamed Bouazizi</SelectItem>
              <SelectItem value="Sami Belghith">Sami Belghith</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Statut */}
        {isEditing && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Statut
            </Label>
            <Select 
              value={status} 
              onValueChange={(value: "planned" | "in-progress" | "completed") => setStatus(value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planned">Planifiée</SelectItem>
                <SelectItem value="in-progress">En cours</SelectItem>
                <SelectItem value="completed">Terminée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      <DialogFooter>
        <Button type="submit">{isEditing ? "Modifier" : "Effectuer"}</Button>
      </DialogFooter>
    </form>
  );
};

export default OperationForm;
