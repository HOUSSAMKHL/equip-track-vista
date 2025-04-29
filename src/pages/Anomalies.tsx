import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  AlertTriangle, 
  CheckCircle2, 
  Settings, 
  Clock, 
  Wrench,
  User,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';
import PriorityBadge from '@/components/PriorityBadge';
import PageHeader from '@/components/PageHeader';
import { anomalyData } from '@/data/mockData';
import { Anomaly as AnomalyType } from '@/types';
import { useAuth } from '@/context/AuthContext';
import ProtectedElement from '@/components/ProtectedElement';
import AnomalyUpdateModal from '@/components/AnomalyUpdateModal';
import { useToast } from '@/hooks/use-toast';

const Anomalies = () => {
  const navigate = useNavigate();
  const [anomalies, setAnomalies] = useState<AnomalyType[]>(anomalyData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnomaly, setSelectedAnomaly] = useState<AnomalyType | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const { user, hasPermission } = useAuth();
  const { toast } = useToast();

  const filteredAnomalies = anomalies.filter(item => 
    item.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.cause.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusCounts = {
    open: anomalies.filter(a => a.status === 'open').length,
    inProgress: anomalies.filter(a => a.status === 'in-progress').length,
    resolved: anomalies.filter(a => a.status === 'resolved').length
  };

  const priorityCounts = {
    critical: anomalies.filter(a => a.priority === 'critical').length,
    high: anomalies.filter(a => a.priority === 'high').length,
    medium: anomalies.filter(a => a.priority === 'medium').length,
    low: anomalies.filter(a => a.priority === 'low').length
  };

  const handleViewDetails = (anomalyId: string) => {
    navigate(`/anomalies/${anomalyId}`);
  };

  const handleUpdateAnomaly = (anomaly: AnomalyType) => {
    setSelectedAnomaly(anomaly);
    setUpdateModalOpen(true);
  };

  const handleResolveAnomaly = (anomaly: AnomalyType) => {
    setAnomalies(
      anomalies.map(item => 
        item.id === anomaly.id 
          ? { ...item, status: 'resolved' as 'open' | 'in-progress' | 'resolved' } 
          : item
      )
    );
    toast({
      title: "Anomalie résolue",
      description: `L'anomalie sur ${anomaly.equipmentName} a été marquée comme résolue.`,
    });
  };

  const handleSaveAnomaly = (data: Partial<AnomalyType>) => {
    setAnomalies(
      anomalies.map(item => 
        item.id === data.id 
          ? { ...item, ...data } as AnomalyType 
          : item
      )
    );
  };

  return (
    <>
      <PageHeader 
        title="Anomalies" 
        description="Gestion des anomalies détectées sur les équipements" 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Anomalies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{anomalies.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ouvertes</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
            <div className="text-2xl font-bold">{statusCounts.open}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En traitement</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <Settings className="h-5 w-5 mr-2 text-amber-500 animate-spin animate-duration-[4000ms]" />
            <div className="text-2xl font-bold">{statusCounts.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Résolues</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
            <div className="text-2xl font-bold">{statusCounts.resolved}</div>
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
              <TableHead>Équipement</TableHead>
              <TableHead>Cause</TableHead>
              <TableHead>Date signalée</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Intervenant</TableHead>
              <TableHead>Temps d'arrêt</TableHead>
              <TableHead>Coût de réparation</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAnomalies.map((anomaly) => (
              <TableRow key={anomaly.id}>
                <TableCell>{anomaly.equipmentName}</TableCell>
                <TableCell>{anomaly.cause}</TableCell>
                <TableCell>{anomaly.reportDate}</TableCell>
                <TableCell>
                  <PriorityBadge priority={anomaly.priority} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={anomaly.status} type="anomaly" />
                </TableCell>
                <TableCell>
                  {anomaly.technician ? (
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{anomaly.technician}</span>
                    </div>
                  ) : "-"}
                </TableCell>
                <TableCell>
                  {anomaly.downtime ? (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{anomaly.downtime}h</span>
                    </div>
                  ) : "-"}
                </TableCell>
                <TableCell>
                  {anomaly.repairCost ? `${anomaly.repairCost} €` : "-"}
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
                      <DropdownMenuItem onClick={() => handleViewDetails(anomaly.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Voir les détails
                      </DropdownMenuItem>
                      <ProtectedElement permission="canEditAnomaly">
                        <DropdownMenuItem onClick={() => handleUpdateAnomaly(anomaly)}>
                          <Wrench className="h-4 w-4 mr-2" />
                          Mettre à jour
                        </DropdownMenuItem>
                      </ProtectedElement>
                      <ProtectedElement permission="canEditAnomaly">
                        {anomaly.status !== 'resolved' && (
                          <DropdownMenuItem onClick={() => handleResolveAnomaly(anomaly)}>
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            <span className="text-green-500">Marquer comme résolu</span>
                          </DropdownMenuItem>
                        )}
                      </ProtectedElement>
                      <ProtectedElement permission="canDeleteAnomaly">
                        <DropdownMenuItem className="text-red-500">
                          Supprimer
                        </DropdownMenuItem>
                      </ProtectedElement>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Anomaly Update Modal */}
      {selectedAnomaly && (
        <AnomalyUpdateModal
          open={updateModalOpen}
          onOpenChange={setUpdateModalOpen}
          anomaly={selectedAnomaly}
          onSave={handleSaveAnomaly}
        />
      )}
    </>
  );
};

export default Anomalies;
