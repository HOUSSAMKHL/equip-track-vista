import React, { useState } from 'react';
import { 
  FileText, 
  FilePlus, 
  Download, 
  Search, 
  Calendar, 
  User, 
  MoreHorizontal, 
  CheckCircle2, 
  Pencil,
  FileBarChart,
  FileSpreadsheet,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
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
import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/PageHeader';
import { reportData } from '@/data/mockData';
import { Report } from '@/types';
import { useToast } from '@/hooks/use-toast';
import ReportViewModal from '@/components/ReportViewModal';

const Reports = () => {
  const [reports, setReports] = useState<Report[]>(reportData);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewReportModal, setViewReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const { toast } = useToast();

  const filteredReports = reports.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const typeCounts = {
    equipment: reports.filter(r => r.type === 'equipment').length,
    anomaly: reports.filter(r => r.type === 'anomaly').length,
    maintenance: reports.filter(r => r.type === 'maintenance').length,
    complex: reports.filter(r => r.type === 'complex').length
  };

  const getReportTypeIcon = (type: string) => {
    switch(type) {
      case 'equipment':
        return <FileBarChart className="h-4 w-4 mr-2 text-blue-500" />;
      case 'anomaly':
        return <FileText className="h-4 w-4 mr-2 text-red-500" />;
      case 'maintenance':
        return <FileSpreadsheet className="h-4 w-4 mr-2 text-green-500" />;
      case 'complex':
        return <FileBarChart className="h-4 w-4 mr-2 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4 mr-2" />;
    }
  };

  const handleGenerateReport = () => {
    toast({
      title: "Générer un rapport",
      description: "Fonctionnalité de génération de rapport à venir",
    });
  };

  const handleFilterClick = () => {
    toast({
      title: "Filtres des rapports",
      description: "Fonctionnalité de filtrage à venir",
    });
  };

  const handleViewReport = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      setSelectedReport(report);
      setViewReportModal(true);
    }
  };

  const handleEditReport = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      setSelectedReport(report);
      setViewReportModal(true);
    }
  };

  const handleSaveReport = (updatedReport: Partial<Report>) => {
    const updatedReports = reports.map(report => 
      report.id === updatedReport.id ? { ...report, ...updatedReport } : report
    );
    setReports(updatedReports);
    setSelectedReport(null);
    
    toast({
      title: "Rapport modifié",
      description: "Le rapport a été modifié avec succès",
      variant: "default",
    });
  };

  const handlePublishReport = (reportId: string) => {
    const updatedReports = reports.map(report => 
      report.id === reportId ? { ...report, status: 'published' as const } : report
    );
    setReports(updatedReports);
    toast({
      title: "Rapport publié",
      description: `Le rapport ${reportId} a été publié avec succès`,
      variant: "default",
    });
  };

  const handleDownloadReport = (reportId: string) => {
    toast({
      title: "Téléchargement du rapport",
      description: `Téléchargement du rapport ${reportId} en cours...`,
      variant: "default",
    });
  };

  return (
    <>
      <PageHeader 
        title="Rapports" 
        description="Générez et consultez des rapports sur vos équipements et activités" 
        actions={
          <Button onClick={handleGenerateReport}>
            <FilePlus className="mr-2 h-4 w-4" />
            Générer un rapport
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Rapports</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-gray-500" />
            <div className="text-2xl font-bold">{reports.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Équipements</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <FileBarChart className="h-5 w-5 mr-2 text-blue-500" />
            <div className="text-2xl font-bold">{typeCounts.equipment}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Anomalies</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-red-500" />
            <div className="text-2xl font-bold">{typeCounts.anomaly}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <FileSpreadsheet className="h-5 w-5 mr-2 text-green-500" />
            <div className="text-2xl font-bold">{typeCounts.maintenance}</div>
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
              <TableHead>Titre</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date de génération</TableHead>
              <TableHead>Généré par</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Pièces jointes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {getReportTypeIcon(report.type)}
                    <span>{report.title}</span>
                  </div>
                </TableCell>
                <TableCell className="capitalize">{report.type}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{report.generatedDate}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{report.generatedBy}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {report.status === 'published' ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200">Publié</Badge>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Brouillon</Badge>
                  )}
                </TableCell>
                <TableCell>{report.attachments || 0}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewReport(report.id)}>
                        <FileText className="h-4 w-4 mr-2" />
                        Visualiser
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownloadReport(report.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger
                      </DropdownMenuItem>
                      {report.status === 'draft' && (
                        <>
                          <DropdownMenuItem onClick={() => handleEditReport(report.id)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePublishReport(report.id)}>
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            <span className="text-green-500">Publier</span>
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Exemple de rapport</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <h2>Rapport d'état des équipements - T1 2024</h2>
              <p className="text-muted-foreground">Généré par Marie Martin le 31/01/2024</p>
              
              <h3>Résumé</h3>
              <p>Ce rapport présente l'état général des équipements pour le premier trimestre 2024.</p>
              
              <h3>État général</h3>
              <ul>
                <li>Équipements opérationnels: 125 (76%)</li>
                <li>Équipements en maintenance: 25 (15%)</li>
                <li>Équipements hors service: 15 (9%)</li>
              </ul>
              
              <h3>Indicateurs clés</h3>
              <p>Durant ce trimestre, nous avons observé:</p>
              <ul>
                <li>47 opérations de maintenance réalisées</li>
                <li>24 anomalies signalées, dont 14 ont été résolues</li>
                <li>Temps moyen de résolution d'une anomalie: 3,5 jours</li>
                <li>Coût total des réparations: 8 750 €</li>
              </ul>
              
              <h3>Recommandations</h3>
              <p>Pour améliorer la performance globale, nous recommandons:</p>
              <ol>
                <li>Renforcer la maintenance préventive des équipements hydrauliques</li>
                <li>Remplacer les pièces d'usure sur les compresseurs d'air</li>
                <li>Former le personnel sur les nouvelles procédures de maintenance</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>

      <ReportViewModal
        open={viewReportModal}
        onOpenChange={setViewReportModal}
        report={selectedReport}
        onDownload={handleDownloadReport}
        onSave={handleSaveReport}
      />
    </>
  );
};

export default Reports;
