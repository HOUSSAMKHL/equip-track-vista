import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  Search, 
  Plus,
  Filter,
  MoreHorizontal, 
  CheckCircle,
  XCircle,
  Trash,
  Edit,
  Settings
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import { equipmentData } from '@/data/mockData';
import { Equipment as EquipmentType } from '@/types';
import { useToast } from '@/hooks/use-toast';
import EquipmentFormModal from '@/components/EquipmentFormModal';
import OperationAnomalyModal from '@/components/OperationAnomalyModal';
import OperationFormModal from '@/components/OperationFormModal';

const Equipment = () => {
  const [equipment, setEquipment] = useState<EquipmentType[]>(equipmentData);
  const [searchQuery, setSearchQuery] = useState('');
  const [workshopFilter, setWorkshopFilter] = useState<string | null>(null);
  const [establishmentFilter, setEstablishmentFilter] = useState<string | null>(null);

  const [equipmentFormOpen, setEquipmentFormOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentType | undefined>(undefined);
  
  const [anomalyModalOpen, setAnomalyModalOpen] = useState(false);
  const [operationFormOpen, setOperationFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const { toast } = useToast();
  
  const workshops = Array.from(new Set(equipmentData.map(item => item.location)));
  const establishments = [
    "OFPPT Ain Sebaa",
    "OFPPT Hay Hassani",
    "OFPPT Sidi Bernoussi",
    "OFPPT El Jadida",
    "OFPPT Sidi Moumen"
  ];

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesWorkshop = workshopFilter ? item.location === workshopFilter : true;
    
    const matchesEstablishment = establishmentFilter ? true : true;
    
    return matchesSearch && matchesWorkshop && matchesEstablishment;
  });

  const handleOpenAddEquipment = () => {
    setSelectedEquipment(undefined);
    setEquipmentFormOpen(true);
  };

  const handleOpenEditEquipment = (item: EquipmentType) => {
    setSelectedEquipment(item);
    setEquipmentFormOpen(true);
  };

  const handleDeleteEquipment = (item: EquipmentType) => {
    setSelectedEquipment(item);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteEquipment = () => {
    if (selectedEquipment) {
      setEquipment(equipment.filter(item => item.id !== selectedEquipment.id));
      toast({
        title: "Équipement supprimé",
        description: `${selectedEquipment.name} a été supprimé avec succès.`,
      });
      setDeleteDialogOpen(false);
      setSelectedEquipment(undefined);
    }
  };

  const handleOpenAnomalyModal = (item: EquipmentType) => {
    setSelectedEquipment(item);
    setAnomalyModalOpen(true);
  };

  const handleOpenOperationForm = (item: EquipmentType) => {
    setSelectedEquipment(item);
    setOperationFormOpen(true);
  };

  const handleSaveEquipment = (data: Partial<EquipmentType>) => {
    if (data.id) {
      setEquipment(equipment.map(item => 
        item.id === data.id ? { ...item, ...data } as EquipmentType : item
      ));
    } else {
      const newEquipment: EquipmentType = {
        id: `eq-${Date.now()}`,
        name: data.name || "",
        reference: data.reference || "",
        category: data.category || "",
        location: data.location || "",
        status: data.status || "operational",
        hasAnomaly: data.hasAnomaly || false,
        acquisitionYear: data.acquisitionYear || new Date().getFullYear(),
        acquisitionValue: data.acquisitionValue || 0,
        lastMaintenance: new Date().toISOString().split('T')[0],
        nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
      
      setEquipment([...equipment, newEquipment]);
    }
  };

  return (
    <>
      <PageHeader 
        title="Équipements" 
        description="Gérez et suivez tous vos équipements"
        actions={
          <Button onClick={handleOpenAddEquipment}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un équipement
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <Select 
            value={establishmentFilter || undefined} 
            onValueChange={(value) => setEstablishmentFilter(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrer par établissement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les établissements</SelectItem>
              {establishments.map((establishment) => (
                <SelectItem key={establishment} value={establishment}>
                  {establishment}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={workshopFilter || undefined} 
            onValueChange={(value) => setWorkshopFilter(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrer par atelier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les ateliers</SelectItem>
              {workshops.map((workshop) => (
                <SelectItem key={workshop} value={workshop}>
                  {workshop}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="shrink-0">
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-md border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Référence</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Emplacement</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>État</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEquipment.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <Link to={`/equipment/${item.id}`} className="hover:text-blue-600 hover:underline">
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell>{item.reference}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  <StatusBadge status={item.status} type="equipment" />
                </TableCell>
                <TableCell>
                  {item.hasAnomaly ? (
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-red-500 text-sm">Anomalie</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 text-sm">Normal</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link to={`/equipment/${item.id}`} className="w-full">
                          Voir les détails
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleOpenEditEquipment(item)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      {item.hasAnomaly ? (
                        <DropdownMenuItem>
                          <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                          Voir les anomalies
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => handleOpenAnomalyModal(item)}>
                          <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                          <span className="text-red-500">Signaler une anomalie</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleOpenOperationForm(item)}>
                        <Settings className="h-4 w-4 mr-2" />
                        Effectuer une opération
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteEquipment(item)}
                        className="text-red-500"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EquipmentFormModal 
        open={equipmentFormOpen} 
        onOpenChange={setEquipmentFormOpen} 
        equipment={selectedEquipment}
        onSave={handleSaveEquipment}
      />

      {selectedEquipment && (
        <OperationAnomalyModal
          open={anomalyModalOpen}
          onOpenChange={setAnomalyModalOpen}
          operation={{
            id: 'placeholder',
            name: selectedEquipment.name,
            equipmentName: selectedEquipment.name,
            equipmentId: selectedEquipment.id,
            type: 'maintenance',
            status: 'planned',
            date: new Date().toISOString(),
            duration: 1,
            performedBy: ''
          }}
        />
      )}

      {selectedEquipment && (
        <OperationFormModal
          open={operationFormOpen}
          onOpenChange={setOperationFormOpen}
          equipmentId={selectedEquipment.id}
          equipmentName={selectedEquipment.name}
          onSave={(data) => {
            toast({
              title: "Opération planifiée",
              description: `${data.name} a été planifiée avec succès.`,
            });
          }}
        />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cela supprimera définitivement l'équipement 
              "{selectedEquipment?.name}" et toutes les données associées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteEquipment} className="bg-red-500 hover:bg-red-600">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Equipment;
