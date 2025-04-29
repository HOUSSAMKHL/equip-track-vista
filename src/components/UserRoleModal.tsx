
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types";

interface UserRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
  onSave: (user: Partial<User>) => void;
}

const UserRoleModal: React.FC<UserRoleModalProps> = ({ 
  open, 
  onOpenChange, 
  user, 
  onSave 
}) => {
  const [role, setRole] = useState<User['role']>(
    user?.role || "formateur"
  );
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData: Partial<User> = {
      id: user.id,
      role
    };
    
    onSave(userData);
    
    toast({
      title: "Rôle mis à jour",
      description: `Le rôle de ${user.name} a été mis à jour à ${role}.`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gérer l'accès</DialogTitle>
          <DialogDescription>
            Modifier le rôle et les permissions pour {user.name}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Rôle */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Rôle
              </Label>
              <Select 
                value={role} 
                onValueChange={(value: User['role']) => setRole(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="directeur_regional">Directeur Régional</SelectItem>
                  <SelectItem value="directeur_complexe">Directeur de Complexe</SelectItem>
                  <SelectItem value="directeur_etablissement">Directeur d'Établissement</SelectItem>
                  <SelectItem value="formateur">Formateur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="col-span-4">
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Permissions</h4>
                <ul className="text-sm space-y-1">
                  {role === 'admin' && (
                    <>
                      <li>✓ Accès complet au système</li>
                      <li>✓ Gestion des utilisateurs</li>
                      <li>✓ Gestion des équipements</li>
                      <li>✓ Gestion des opérations</li>
                      <li>✓ Gestion des anomalies</li>
                      <li>✓ Accès aux rapports</li>
                    </>
                  )}
                  {role === 'directeur_regional' && (
                    <>
                      <li>✓ Supervision des complexes</li>
                      <li>✓ Accès aux statistiques régionales</li>
                      <li>✓ Gestion des équipements</li>
                      <li>✓ Accès aux rapports</li>
                      <li>✗ Gestion des utilisateurs système</li>
                    </>
                  )}
                  {role === 'directeur_complexe' && (
                    <>
                      <li>✓ Supervision des établissements</li>
                      <li>✓ Gestion des équipements du complexe</li>
                      <li>✓ Gestion des opérations</li>
                      <li>✓ Accès aux rapports du complexe</li>
                      <li>✗ Gestion des utilisateurs système</li>
                    </>
                  )}
                  {role === 'directeur_etablissement' && (
                    <>
                      <li>✓ Gestion des équipements de l'établissement</li>
                      <li>✓ Gestion des opérations locales</li>
                      <li>✓ Gestion des anomalies</li>
                      <li>✓ Accès aux rapports de l'établissement</li>
                      <li>✗ Gestion des utilisateurs système</li>
                    </>
                  )}
                  {role === 'formateur' && (
                    <>
                      <li>✓ Consultation des équipements</li>
                      <li>✓ Signalement des anomalies</li>
                      <li>✓ Suivi des opérations</li>
                      <li>✗ Modifier les données sensibles</li>
                      <li>✗ Accès aux rapports complets</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit">Mettre à jour le rôle</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserRoleModal;
