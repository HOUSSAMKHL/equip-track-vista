
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Equipment } from "@/types";
import { useAuth } from '@/context/AuthContext';
import ProtectedElement from './ProtectedElement';

interface AnomalyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipment?: Equipment;
}

const AnomalyModal: React.FC<AnomalyModalProps> = ({ open, onOpenChange, equipment }) => {
  const { user } = useAuth();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Signaler une anomalie</DialogTitle>
          <DialogDescription>
            {equipment ? `Pour l'équipement: ${equipment.name}` : "Veuillez remplir les détails de l'anomalie"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!equipment && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="equipment" className="text-right">
                Équipement
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un équipement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EQ001">Pompe Hydraulique PH-2000</SelectItem>
                  <SelectItem value="EQ002">Compresseur d'Air CA-500</SelectItem>
                  <SelectItem value="EQ003">Four Industriel FI-300</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cause" className="text-right">
              Cause
            </Label>
            <Input id="cause" className="col-span-3" placeholder="Décrivez la cause de l'anomalie" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priorité
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner une priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Basse</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="high">Haute</SelectItem>
                <SelectItem value="critical">Critique</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="action" className="text-right">
              Action corrective
            </Label>
            <Textarea id="action" className="col-span-3" placeholder="Actions correctives suggérées" />
          </div>
        </div>
        <DialogFooter>
          <ProtectedElement 
            permission="canAddAnomaly"
            fallback={<p className="text-sm text-muted-foreground">Vous n'avez pas les permissions nécessaires</p>}
          >
            <Button type="submit">Signaler l'anomalie</Button>
          </ProtectedElement>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AnomalyModal;
