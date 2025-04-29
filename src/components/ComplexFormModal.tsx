
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Complex, Establishment } from "@/types";

interface ComplexFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  complex?: Complex;
  onSave: (complex: Partial<Complex>) => void;
}

const ComplexFormModal: React.FC<ComplexFormModalProps> = ({ 
  open, 
  onOpenChange, 
  complex, 
  onSave 
}) => {
  const [name, setName] = useState(complex?.name || '');
  const [city, setCity] = useState(complex?.city || 'Casablanca');
  const [address, setAddress] = useState(complex?.address || '');
  const [description, setDescription] = useState(complex?.description || '');
  const [establishments, setEstablishments] = useState<Partial<Establishment>[]>(
    complex?.establishments || []
  );
  
  const { toast } = useToast();

  const addEstablishment = () => {
    setEstablishments([
      ...establishments, 
      { 
        id: `temp-${Date.now()}`, 
        name: '', 
        address: '', 
        equipmentCount: 0 
      }
    ]);
  };

  const removeEstablishment = (index: number) => {
    const newEstablishments = [...establishments];
    newEstablishments.splice(index, 1);
    setEstablishments(newEstablishments);
  };

  const updateEstablishment = (index: number, field: string, value: string) => {
    const newEstablishments = [...establishments];
    newEstablishments[index] = {
      ...newEstablishments[index],
      [field]: value
    };
    setEstablishments(newEstablishments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const complexData: Partial<Complex> = {
      name,
      city,
      address,
      description,
      establishments: establishments as Establishment[],
      ...(complex?.id ? { id: complex.id } : {})
    };
    
    onSave(complexData);
    
    toast({
      title: complex ? "Complexe modifié" : "Complexe ajouté",
      description: `${name} a été ${complex ? "modifié" : "ajouté"} avec succès.`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{complex ? "Modifier le complexe" : "Ajouter un complexe"}</DialogTitle>
          <DialogDescription>
            {complex 
              ? "Modifier les détails du complexe et de ses établissements" 
              : "Remplissez les informations pour ajouter un nouveau complexe"}
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
            
            {/* Ville */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                Ville
              </Label>
              <Input 
                id="city" 
                value={city} 
                onChange={(e) => setCity(e.target.value)}
                className="col-span-3" 
                required
              />
            </div>
            
            {/* Adresse */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Adresse
              </Label>
              <Input 
                id="address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                className="col-span-3" 
              />
            </div>
            
            {/* Description */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3 min-h-20" 
              />
            </div>
            
            {/* Établissements */}
            <div className="grid grid-cols-4 items-start gap-4">
              <div className="text-right pt-2">
                <Label>Établissements</Label>
              </div>
              <div className="col-span-3 space-y-4">
                {establishments.map((establishment, index) => (
                  <div key={establishment.id} className="p-4 border rounded-md relative">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-2 top-2"
                      onClick={() => removeEstablishment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    
                    <div className="grid gap-3">
                      <div>
                        <Label htmlFor={`establishment-name-${index}`} className="mb-1 block">
                          Nom de l'établissement
                        </Label>
                        <Input 
                          id={`establishment-name-${index}`} 
                          value={establishment.name} 
                          onChange={(e) => updateEstablishment(index, 'name', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`establishment-address-${index}`} className="mb-1 block">
                          Adresse
                        </Label>
                        <Input 
                          id={`establishment-address-${index}`} 
                          value={establishment.address} 
                          onChange={(e) => updateEstablishment(index, 'address', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor={`establishment-email-${index}`} className="mb-1 block">
                            Email
                          </Label>
                          <Input 
                            id={`establishment-email-${index}`} 
                            type="email"
                            value={establishment.email || ''} 
                            onChange={(e) => updateEstablishment(index, 'email', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`establishment-phone-${index}`} className="mb-1 block">
                            Téléphone
                          </Label>
                          <Input 
                            id={`establishment-phone-${index}`} 
                            value={establishment.phone || ''} 
                            onChange={(e) => updateEstablishment(index, 'phone', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  type="button"
                  variant="outline"
                  onClick={addEstablishment}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un établissement
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit">{complex ? "Modifier" : "Ajouter"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ComplexFormModal;
