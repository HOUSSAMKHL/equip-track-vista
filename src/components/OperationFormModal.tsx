
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { fr } from "date-fns/locale";
import { Operation } from "@/types";

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
  const [name, setName] = useState(operation?.name || '');
  const [type, setType] = useState<"maintenance" | "repair" | "inspection">(
    operation?.type || "maintenance"
  );
  const [eqId, setEqId] = useState(operation?.equipmentId || equipmentId || '');
  const [eqName, setEqName] = useState(operation?.equipmentName || equipmentName || '');
  const [date, setDate] = useState<Date>(operation?.date ? new Date(operation.date) : new Date());
  const [duration, setDuration] = useState(operation?.duration?.toString() || "1");
  const [responsible, setResponsible] = useState(operation?.performedBy || '');
  const [status, setStatus] = useState<"planned" | "in-progress" | "completed">(
    operation?.status || "planned"
  );
  
  const { toast } = useToast();

  // Update form when operation prop changes
  useEffect(() => {
    if (operation) {
      setName(operation.name);
      setType(operation.type);
      setEqId(operation.equipmentId);
      setEqName(operation.equipmentName);
      setDate(operation.date ? new Date(operation.date) : new Date());
      setDuration(operation.duration.toString());
      setResponsible(operation.performedBy);
      setStatus(operation.status);
    } else {
      // Reset form for new operations
      setName('');
      setType('maintenance');
      setEqId(equipmentId || '');
      setEqName(equipmentName || '');
      setDate(new Date());
      setDuration('1');
      setResponsible('');
      setStatus('planned');
    }
  }, [operation, equipmentId, equipmentName, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const operationData: Partial<Operation> = {
      name,
      type,
      equipmentId: eqId,
      equipmentName: eqName,
      date: format(date, 'yyyy-MM-dd'),
      duration: parseInt(duration, 10),
      performedBy: responsible,
      status,
      ...(operation?.id ? { id: operation.id } : {})
    };
    
    onSave(operationData);
    
    toast({
      title: operation ? "Opération modifiée" : "Opération planifiée",
      description: `${name} a été ${operation ? "modifiée" : "planifiée"} avec succès.`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{operation ? "Modifier l'opération" : "Planifier une opération"}</DialogTitle>
          <DialogDescription>
            {operation 
              ? "Modifier les détails de l'opération" 
              : "Remplissez les informations pour planifier une nouvelle opération"}
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
            
            {/* Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select 
                value={type} 
                onValueChange={(value: "maintenance" | "repair" | "inspection") => setType(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="repair">Réparation</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
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
            {operation && (
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
            <Button type="submit">{operation ? "Modifier" : "Planifier"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OperationFormModal;
