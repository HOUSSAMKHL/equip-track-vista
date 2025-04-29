
import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Calendar, 
  Clock, 
  User, 
  Clipboard,
  WrenchIcon,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';
import PageHeader from '@/components/PageHeader';
import { operationData } from '@/data/mockData';
import { Operation as OperationType } from '@/types';
import { useToast } from '@/hooks/use-toast';
import OperationAnomalyModal from '@/components/OperationAnomalyModal';
import OperationFormModal from '@/components/OperationFormModal';
import OperationDetailModal from '@/components/OperationDetailModal';

const Operations = () => {
  const [operations, setOperations] = useState<OperationType[]>(operationData);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const [selectedOperation, setSelectedOperation] = useState<OperationType | undefined>(undefined);
  const [anomalyModalOpen, setAnomalyModalOpen] = useState(false);
  const [operationFormModalOpen, setOperationFormModalOpen] = useState(false);
  const [operationDetailModalOpen, setOperationDetailModalOpen] = useState(false);

  const filteredOperations = operations.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusCounts = {
    planned: operations.filter(o => o.status === 'planned').length,
    inProgress: operations.filter(o => o.status === 'in-progress').length,
    completed: operations.filter(o => o.status === 'completed').length
  };

  const typeCounts = {
    maintenance: operations.filter(o => o.type === 'maintenance').length,
    repair: operations.filter(o => o.type === 'repair').length,
    inspection: operations.filter(o => o.type === 'inspection').length
  };

  const handleAddOperation = () => {
    setSelectedOperation(undefined);
    setOperationFormModalOpen(true);
  };

  const handleFilterClick = () => {
    toast({
      title: "Filtres",
      description: "Fonctionnalité de filtrage à venir",
    });
  };

  const handleViewDetails = (operation: OperationType) => {
    setSelectedOperation(operation);
    setOperationDetailModalOpen(true);
  };

  const handleEditOperation = (operation: OperationType) => {
    setSelectedOperation(operation);
    setOperationFormModalOpen(true);
  };

  const handleStartOperation = (operationId: string) => {
    const updatedOperations = operations.map(op => 
      op.id === operationId ? { ...op, status: 'in-progress' as const } : op
    );
    setOperations(updatedOperations);
    toast({
      title: "Opération démarrée",
      description: `L'opération a été démarrée`,
      variant: "default",
    });
  };

  const handleCompleteOperation = (operationId: string) => {
    const updatedOperations = operations.map(op => 
      op.id === operationId ? { ...op, status: 'completed' as const } : op
    );
    setOperations(updatedOperations);
    toast({
      title: "Opération terminée",
      description: `L'opération a été marquée comme terminée`,
      variant: "default",
    });
  };

  const handleReportAnomaly = (operation: OperationType) => {
    setSelectedOperation(operation);
    setAnomalyModalOpen(true);
  };

  const handleSaveOperation = (operationData: Partial<OperationType>) => {
    if (operationData.id) {
      const updatedOperations = operations.map(op => 
        op.id === operationData.id ? { ...op, ...operationData } : op
      );
      setOperations(updatedOperations);
      toast({
        title: "Opération modifiée",
        description: `L'opération a été modifiée avec succès`,
        variant: "default",
      });
    } else {
      const newOperation: OperationType = {
        id: `op-${Date.now()}`,
        name: operationData.name || '',
        type: operationData.type || 'maintenance',
        equipmentId: operationData.equipmentId || '',
        equipmentName: operationData.equipmentName || '',
        date: operationData.date || '',
        duration: operationData.duration || 0,
        performedBy: operationData.performedBy || '',
        status: operationData.status || 'planned',
      };
      setOperations([...operations, newOperation]);
      toast({
        title: "Opération ajoutée",
        description: `L'opération a été planifiée avec succès`,
        variant: "default",
      });
    }
  };

  return (
    <>
      <PageHeader 
        title="Opérations" 
        description="Planifiez et suivez les opérations de maintenance et réparation" 
        actions={
          <Button onClick={handleAddOperation}>
            <Plus className="mr-2 h-4 w-4" />
            Créer une opération
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Opérations par statut</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">Planifiées</span>
                </div>
                <span className="font-medium">{statusCounts.planned}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">En cours</span>
                </div>
                <span className="font-medium">{statusCounts.inProgress}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Terminées</span>
                </div>
                <span className="font-medium">{statusCounts.completed}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Opérations par type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-teal-500 mr-2"></div>
                  <span className="text-sm">Maintenance</span>
                </div>
                <span className="font-medium">{typeCounts.maintenance}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">Réparation</span>
                </div>
                <span className="font-medium">{typeCounts.repair}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-sm">Inspection</span>
                </div>
                <span className="font-medium">{typeCounts.inspection}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Prochaines opérations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {operations
                .filter(op => op.status === 'planned')
                .slice(0, 2)
                .map(op => (
                  <div key={op.id} className="flex items-start space-x-2 p-2 rounded-md bg-gray-50">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{op.name}</p>
                      <p className="text-xs text-muted-foreground">{op.date} - {op.equipmentName}</p>
                    </div>
                  </div>
                ))}
              {operations.filter(op => op.status === 'planned').length > 2 && (
                <div className="text-xs text-center text-muted-foreground">
                  + {operations.filter(op => op.status === 'planned').length - 2} autres opérations planifiées
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

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
        <div className="flex gap-2">
          <Button variant="outline" className="shrink-0" onClick={handleFilterClick}>
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
              <TableHead>Type</TableHead>
              <TableHead>Équipement</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead>Technicien</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOperations.map((operation) => (
              <TableRow key={operation.id}>
                <TableCell className="font-medium">{operation.name}</TableCell>
                <TableCell className="capitalize">
                  {operation.type === 'maintenance' && (
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 mr-1 text-teal-500" />
                      <span>Maintenance</span>
                    </div>
                  )}
                  {operation.type === 'repair' && (
                    <div className="flex items-center">
                      <WrenchIcon className="h-4 w-4 mr-1 text-blue-500" />
                      <span>Réparation</span>
                    </div>
                  )}
                  {operation.type === 'inspection' && (
                    <div className="flex items-center">
                      <Clipboard className="h-4 w-4 mr-1 text-purple-500" />
                      <span>Inspection</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>{operation.equipmentName}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{operation.date}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{operation.duration}h</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{operation.performedBy}</span>
                  </div>
                </TableCell>
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
                      <DropdownMenuItem onClick={() => handleViewDetails(operation)}>
                        Voir les détails
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditOperation(operation)}>
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleReportAnomaly(operation)}>
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                        Signaler une anomalie
                      </DropdownMenuItem>
                      {operation.status === 'planned' && (
                        <DropdownMenuItem onClick={() => handleStartOperation(operation.id)}>
                          Démarrer l'opération
                        </DropdownMenuItem>
                      )}
                      {operation.status === 'in-progress' && (
                        <DropdownMenuItem onClick={() => handleCompleteOperation(operation.id)}>
                          Marquer comme terminée
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <OperationAnomalyModal 
        open={anomalyModalOpen} 
        onOpenChange={setAnomalyModalOpen} 
        operation={selectedOperation} 
      />

      <OperationFormModal
        open={operationFormModalOpen}
        onOpenChange={setOperationFormModalOpen}
        operation={selectedOperation}
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

export default Operations;
