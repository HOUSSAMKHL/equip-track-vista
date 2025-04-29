import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clipboard, 
  Clock, 
  Tag, 
  MapPin, 
  CreditCard, 
  AlertTriangle, 
  Activity,
  CheckCircle,
  PlusCircle,
  MoreHorizontal
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import StatusBadge from '@/components/StatusBadge';
import PriorityBadge from '@/components/PriorityBadge';
import AnomalyModal from '@/components/AnomalyModal';
import { equipmentData, operationData, anomalyData } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import OperationFormModal from '@/components/OperationFormModal';
import OperationDetailModal from '@/components/OperationDetailModal';
import { Operation } from '@/types';

const EquipmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [anomalyModalOpen, setAnomalyModalOpen] = useState(false);
  const [operationFormModalOpen, setOperationFormModalOpen] = useState(false);
  const [operationDetailModalOpen, setOperationDetailModalOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState<Operation | undefined>(undefined);
  const [operations, setOperations] = useState(operationData.filter(op => op.equipmentId === id));
  const { toast } = useToast();
  
  const equipment = equipmentData.find(eq => eq.id === id);
  const equipmentAnomalies = anomalyData.filter(an => an.equipmentId === id);
  
  if (!equipment) {
    return <div>Équipement non trouvé</div>;
  }

  const handlePlanOperation = () => {
    setSelectedOperation(undefined);
    setOperationFormModalOpen(true);
  };

  const handleAddOperationClick = () => {
    setSelectedOperation(undefined);
    setOperationFormModalOpen(true);
  };

  const handleViewOperationDetails = (operation: Operation) => {
    setSelectedOperation(operation);
    setOperationDetailModalOpen(true);
  };

  const handleEditOperation = (operation: Operation) => {
    setSelectedOperation(operation);
    setOperationFormModalOpen(true);
  };

  const handleDeleteOperation = (operationId: string) => {
    setOperations(operations.filter(op => op.id !== operationId));
    toast({
      title: "Opération supprimée",
      description: `L'opération a été supprimée avec succès`,
    });
  };

  const handleSaveOperation = (operationData: Partial<Operation>) => {
    if (operationData.id) {
      // Update existing operation
      const updatedOperations = operations.map(op => 
        op.id === operationData.id ? { ...op, ...operationData } : op
      );
      setOperations(updatedOperations);
      toast({
        title: "Opération modifiée",
        description: `L'opération a été modifiée avec succès`,
      });
    } else {
      // Add new operation
      const newOperation: Operation = {
        id: `op-${Date.now()}`,
        name: operationData.name || '',
        type: operationData.type || 'maintenance',
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        date: operationData.date || '',
        duration: operationData.duration || 0,
        performedBy: operationData.performedBy || '',
        status: operationData.status || 'planned',
      };
      setOperations([...operations, newOperation]);
      toast({
        title: "Opération planifiée",
        description: `L'opération a été planifiée avec succès`,
      });
    }
  };

  const handleAnomalyAction = (action: string, anomalyId: string) => {
    toast({
      title: `${action} anomalie`,
      description: `Action ${action.toLowerCase()} pour l'anomalie ${anomalyId}`,
    });
  };

  return (
    <>
      <div className="mb-6">
        <Link to="/equipment" className="text-muted-foreground hover:text-foreground flex items-center mb-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour à la liste des équipements
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{equipment.name}</h1>
            <p className="text-muted-foreground">Référence: {equipment.reference}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setAnomalyModalOpen(true)}>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Signaler une anomalie
            </Button>
            <Button onClick={handlePlanOperation}>
              <Activity className="h-4 w-4 mr-2" />
              Planifier une opération
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Statut</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <StatusBadge status={equipment.status} type="equipment" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Catégorie</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{equipment.category}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Emplacement</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{equipment.location}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">État</CardTitle>
          </CardHeader>
          <CardContent>
            {equipment.hasAnomaly ? (
              <div className="flex items-center text-red-500">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span>Anomalie détectée</span>
              </div>
            ) : (
              <div className="flex items-center text-green-500">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Fonctionnement normal</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Détails d'acquisition</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Année d'acquisition: {equipment.acquisitionYear}</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Valeur d'acquisition: {equipment.acquisitionValue.toLocaleString()} €</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Maintenance</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Dernière maintenance: {equipment.lastMaintenance}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Prochaine maintenance: {equipment.nextMaintenance}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="operations" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="operations">Opérations</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
        </TabsList>
        <TabsContent value="operations" className="pt-4">
          <div className="bg-white rounded-md border shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">Opérations de l'équipement</h3>
              <Button variant="outline" size="sm" onClick={handleAddOperationClick}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Réalisé par</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {operations.length > 0 ? (
                  operations.map((operation) => (
                    <TableRow key={operation.id}>
                      <TableCell className="capitalize">{operation.type}</TableCell>
                      <TableCell>{operation.name}</TableCell>
                      <TableCell>{operation.date}</TableCell>
                      <TableCell>{operation.performedBy}</TableCell>
                      <TableCell>
                        <StatusBadge status={operation.status} type="operation" />
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
                            <DropdownMenuItem onClick={() => handleViewOperationDetails(operation)}>
                              Voir les détails
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditOperation(operation)}>
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-500"
                              onClick={() => handleDeleteOperation(operation.id)}
                            >
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      Aucune opération pour cet équipement
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="anomalies" className="pt-4">
          <div className="bg-white rounded-md border shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">Anomalies détectées</h3>
              <Button variant="outline" size="sm" onClick={() => setAnomalyModalOpen(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Signaler
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cause</TableHead>
                  <TableHead>Date signalée</TableHead>
                  <TableHead>Priorité</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Action corrective</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipmentAnomalies.length > 0 ? (
                  equipmentAnomalies.map((anomaly) => (
                    <TableRow key={anomaly.id}>
                      <TableCell>{anomaly.cause}</TableCell>
                      <TableCell>{anomaly.reportDate}</TableCell>
                      <TableCell>
                        <PriorityBadge priority={anomaly.priority} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={anomaly.status} type="anomaly" />
                      </TableCell>
                      <TableCell>{anomaly.correctiveAction || "Non définie"}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleAnomalyAction("Voir", anomaly.id)}>
                              Voir les détails
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAnomalyAction("Mettre à jour", anomaly.id)}>
                              Mettre à jour
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAnomalyAction("Résoudre", anomaly.id)}>
                              Marquer comme résolu
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      Aucune anomalie détectée pour cet équipement
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <AnomalyModal 
        open={anomalyModalOpen} 
        onOpenChange={setAnomalyModalOpen} 
        equipment={equipment}
      />

      <OperationFormModal
        open={operationFormModalOpen}
        onOpenChange={setOperationFormModalOpen}
        operation={selectedOperation}
        equipmentId={equipment.id}
        equipmentName={equipment.name}
        onSave={handleSaveOperation}
      />

      <OperationDetailModal
        open={operationDetailModalOpen}
        onOpenChange={setOperationDetailModalOpen}
        operation={selectedOperation}
      />
    </>
  );
};

export default EquipmentDetail;
