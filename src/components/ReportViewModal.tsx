
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileBarChart, FileSpreadsheet, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Report } from "@/types";
import { Badge } from "@/components/ui/badge";

interface ReportViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: Report | null;
  onDownload: (reportId: string) => void;
  onSave?: (report: Partial<Report>) => void;
}

const ReportViewModal: React.FC<ReportViewModalProps> = ({
  open,
  onOpenChange,
  report,
  onDownload,
  onSave
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedType, setEditedType] = useState<'equipment' | 'anomaly' | 'maintenance' | 'complex'>('equipment');
  const [editedStatus, setEditedStatus] = useState<'draft' | 'published'>('draft');

  if (!report) return null;

  const getReportTypeIcon = (type: string) => {
    switch(type) {
      case 'equipment':
        return <FileBarChart className="h-5 w-5 mr-2 text-blue-500" />;
      case 'anomaly':
        return <FileText className="h-5 w-5 mr-2 text-red-500" />;
      case 'maintenance':
        return <FileSpreadsheet className="h-5 w-5 mr-2 text-green-500" />;
      case 'complex':
        return <FileBarChart className="h-5 w-5 mr-2 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 mr-2" />;
    }
  };

  const handleEdit = () => {
    setEditedTitle(report.title);
    setEditedContent(report.content);
    setEditedType(report.type as 'equipment' | 'anomaly' | 'maintenance' | 'complex');
    setEditedStatus(report.status);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        id: report.id,
        title: editedTitle,
        content: editedContent,
        type: editedType,
        status: editedStatus
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          {!isEditing ? (
            <div className="flex items-center gap-2">
              {getReportTypeIcon(report.type)}
              <DialogTitle>{report.title}</DialogTitle>
            </div>
          ) : (
            <DialogTitle>Modifier le rapport</DialogTitle>
          )}
          {!isEditing && (
            <DialogDescription>
              Généré le {report.generatedDate} par {report.generatedBy}
            </DialogDescription>
          )}
        </DialogHeader>

        {!isEditing ? (
          <>
            <div className="flex flex-wrap gap-2 mt-2 mb-4">
              <Badge className="capitalize">{report.type}</Badge>
              {report.status === 'published' ? (
                <Badge className="bg-green-100 text-green-800 border-green-200">Publié</Badge>
              ) : (
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Brouillon</Badge>
              )}
              {report.attachments && report.attachments > 0 && (
                <Badge variant="outline" className="ml-1">
                  {report.attachments} pièce{report.attachments > 1 ? 's' : ''} jointe{report.attachments > 1 ? 's' : ''}
                </Badge>
              )}
            </div>

            <ScrollArea className="flex-grow max-h-[400px] overflow-auto border rounded-md p-4 bg-gray-50">
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: report.content.replace(/\n/g, '<br/>') }} />
              </div>
            </ScrollArea>

            <div className="mt-4 flex justify-end gap-2">
              {report.status === 'draft' && onSave && (
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleEdit}
                >
                  <Pencil className="h-4 w-4" />
                  Modifier
                </Button>
              )}
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => onDownload(report.id)}
              >
                <Download className="h-4 w-4" />
                Télécharger
              </Button>
            </div>
          </>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Titre
                </Label>
                <Input 
                  id="title" 
                  value={editedTitle} 
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="col-span-3" 
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="content" className="text-right pt-2">
                  Contenu
                </Label>
                <Textarea 
                  id="content" 
                  value={editedContent} 
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="col-span-3 min-h-[200px]" 
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select 
                  value={editedType} 
                  onValueChange={(value: 'equipment' | 'anomaly' | 'maintenance' | 'complex') => setEditedType(value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equipment">Équipement</SelectItem>
                    <SelectItem value="anomaly">Anomalie</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="complex">Complexe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Statut
                </Label>
                <Select 
                  value={editedStatus} 
                  onValueChange={(value: 'draft' | 'published') => setEditedStatus(value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Annuler
              </Button>
              <Button type="submit">
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReportViewModal;
