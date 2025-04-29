
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Operation } from "@/types";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface OperationAnomalyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  operation?: Operation;
}

const OperationAnomalyModal: React.FC<OperationAnomalyModalProps> = ({ 
  open, 
  onOpenChange, 
  operation 
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [responsible, setResponsible] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Anomalie signalée",
      description: `Anomalie signalée pour l'opération ${operation?.name}`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Signaler une anomalie</DialogTitle>
          <DialogDescription>
            {operation ? `Pour l'opération: ${operation.name}` : "Veuillez remplir les détails de l'anomalie"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Nom de l'opération */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="operation_name" className="text-right">
                Nom d'opération
              </Label>
              <Input 
                id="operation_name" 
                value={operation?.name || ""} 
                className="col-span-3" 
                readOnly 
              />
            </div>
            
            {/* Équipement */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="equipment" className="text-right">
                Équipement
              </Label>
              <Input 
                id="equipment" 
                value={operation?.equipmentName || ""} 
                className="col-span-3" 
                readOnly 
              />
            </div>
            
            {/* Cause */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cause" className="text-right">
                Cause
              </Label>
              <Textarea id="cause" className="col-span-3" placeholder="Décrivez la cause de l'anomalie" />
            </div>
            
            {/* Date signalée */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date signalée
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
          </div>
          
          <DialogFooter>
            <Button type="submit">Signaler l'anomalie</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OperationAnomalyModal;
