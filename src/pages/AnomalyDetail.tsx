import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  AlertTriangle, 
  Wrench, 
  Clock, 
  DollarSign,
  User,
  FileText
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import PageHeader from '@/components/PageHeader';
import StatusBadge from '@/components/StatusBadge';
import PriorityBadge from '@/components/PriorityBadge';
import { anomalyData } from '@/data/mockData';
import { Anomaly } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import ProtectedElement from '@/components/ProtectedElement';
import AnomalyUpdateModal from '@/components/AnomalyUpdateModal';

const AnomalyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { hasPermission } = useAuth();
  const [anomaly, setAnomaly] = useState<Anomaly | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    const foundAnomaly = anomalyData.find(a => a.id === id);
    
    if (foundAnomaly) {
      setAnomaly(foundAnomaly);
    } else {
      toast({
        title: "Anomalie non trouvée",
        description: "L'anomalie demandée n'existe pas",
        variant: "destructive"
      });
      navigate('/anomalies');
    }
  }, [id, navigate, toast]);

  const handleGoBack = () => {
    navigate('/anomalies');
  };

  const handleUpdateAnomaly = () => {
    if (!anomaly) return;
    setUpdateModalOpen(true);
  };

  const handleSaveAnomaly = (data: Partial<Anomaly>) => {
    if (!anomaly) return;
    
    // Find the index of the anomaly in the array
    const index = anomalyData.findIndex(a => a.id === anomaly.id);
    
    if (index !== -1) {
      // Update the anomaly in the array
      const updatedAnomaly = { ...anomalyData[index], ...data };
      anomalyData[index] = updatedAnomaly as Anomaly;
      
      // Update the local state
      setAnomaly(updatedAnomaly as Anomaly);
      
      toast({
        title: "Anomalie mise à jour",
        description: `L'anomalie a été mise à jour avec succès.`,
      });
    }
  };

  if (!anomaly) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Chargement des détails de l'anomalie...</p>
      </div>
    );
  }

  return (
    <>
      <PageHeader 
        title="Détails de l'Anomalie" 
        description="Informations détaillées sur l'anomalie"
        actions={
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                Anomalie #{anomaly.id.substring(0, 8)}
              </CardTitle>
              <CardDescription>
                <div className="flex flex-col gap-2 mt-2">
                  <StatusBadge status={anomaly.status} type="anomaly" />
                  <PriorityBadge priority={anomaly.priority} />
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Date signalée</p>
                    <p className="font-medium">{anomaly.reportDate}</p>
                  </div>
                </div>
                
                {anomaly.technician && (
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Intervenant</p>
                      <p className="font-medium">{anomaly.technician}</p>
                    </div>
                  </div>
                )}
                
                {anomaly.downtime && (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Temps d'arrêt</p>
                      <p className="font-medium">{anomaly.downtime}h</p>
                    </div>
                  </div>
                )}
                
                {anomaly.repairCost && (
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Coût de réparation</p>
                      <p className="font-medium">{anomaly.repairCost} €</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-3 pt-2">
              <ProtectedElement permission="canEditAnomaly">
                <Button variant="outline" onClick={handleUpdateAnomaly}>
                  <Wrench className="mr-2 h-4 w-4" />
                  Mettre à jour
                </Button>
              </ProtectedElement>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations détaillées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Équipement concerné</h3>
                  <p className="text-gray-600 mt-2 font-semibold">
                    {anomaly.equipmentName}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium">Cause de l'anomalie</h3>
                  <p className="text-gray-600 mt-2">
                    {anomaly.cause}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium">Description</h3>
                  <p className="text-gray-600 mt-2">
                    {anomaly.description || "Aucune description détaillée disponible pour cette anomalie."}
                  </p>
                </div>
                
                {anomaly.resolution && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-medium">Résolution</h3>
                      <p className="text-gray-600 mt-2">
                        {anomaly.resolution}
                      </p>
                    </div>
                  </>
                )}
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium">Rapports associés</h3>
                  {anomaly.reports && anomaly.reports.length > 0 ? (
                    <div className="mt-2 space-y-2">
                      {anomaly.reports.map((report, index) => (
                        <div key={index} className="flex items-center bg-gray-50 p-2 rounded-md">
                          <FileText className="h-5 w-5 mr-2 text-gray-500" />
                          <span>{report}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 mt-2">
                      Aucun rapport associé à cette anomalie.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Anomaly Update Modal */}
      {anomaly && (
        <AnomalyUpdateModal
          open={updateModalOpen}
          onOpenChange={setUpdateModalOpen}
          anomaly={anomaly}
          onSave={handleSaveAnomaly}
        />
      )}
    </>
  );
};

export default AnomalyDetail;
