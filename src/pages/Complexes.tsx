
import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  ChevronRight, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  MapPin, 
  Package,
  Edit,
  Trash,
  School
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
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
import { Complex, Establishment } from '@/types';
import { useToast } from '@/hooks/use-toast';
import ComplexFormModal from '@/components/ComplexFormModal';

// OFPPT Casablanca complexes data
const ofpptComplexes: Complex[] = [
  {
    id: "complex-1",
    name: "OFPPT Complexe Ain Sebaa",
    city: "Casablanca",
    address: "Rue 1, Quartier Industriel, Ain Sebaa",
    description: "Complexe de formation professionnelle dans le quartier industriel d'Ain Sebaa",
    establishments: [
      {
        id: "est-1",
        name: "ISTA Hay Mohammadi",
        address: "Hay Mohammadi, Casablanca",
        email: "istamohammadi@ofppt.ma",
        phone: "0522-123456",
        equipmentCount: 48
      },
      {
        id: "est-2",
        name: "ITA Ain Sebaa",
        address: "Zone Industrielle, Ain Sebaa",
        email: "itaainsebaa@ofppt.ma",
        phone: "0522-789012",
        equipmentCount: 32
      }
    ]
  },
  {
    id: "complex-2",
    name: "OFPPT Complexe Sidi Bernoussi",
    city: "Casablanca",
    address: "Boulevard Al Qods, Sidi Bernoussi",
    description: "Complexe de formation professionnelle dans le quartier de Sidi Bernoussi",
    establishments: [
      {
        id: "est-3",
        name: "ISGI Sidi Bernoussi",
        address: "Boulevard Al Qods, Sidi Bernoussi",
        email: "isgibernoussi@ofppt.ma",
        phone: "0522-345678",
        equipmentCount: 56
      },
      {
        id: "est-4",
        name: "ISTA Sidi Moumen",
        address: "Quartier Sidi Moumen, Casablanca",
        email: "istamoumen@ofppt.ma",
        phone: "0522-901234",
        equipmentCount: 41
      }
    ]
  },
  {
    id: "complex-3",
    name: "OFPPT Complexe Hay Hassani",
    city: "Casablanca",
    address: "Boulevard Oum Errabia, Hay Hassani",
    description: "Complexe de formation professionnelle dans le quartier de Hay Hassani",
    establishments: [
      {
        id: "est-5",
        name: "ISTA Hay Hassani",
        address: "Boulevard Oum Errabia, Hay Hassani",
        email: "istahassani@ofppt.ma",
        phone: "0522-567890",
        equipmentCount: 38
      },
      {
        id: "est-6",
        name: "ISGI Lissasfa",
        address: "Zone Industrielle, Lissasfa",
        email: "isgilissasfa@ofppt.ma",
        phone: "0522-345678",
        equipmentCount: 45
      }
    ]
  },
  {
    id: "complex-4",
    name: "OFPPT Centre de Formation Maarif",
    city: "Casablanca",
    address: "Rue Ibnou Mounir, Maarif",
    description: "Centre de formation professionnelle spécialisé dans les métiers de services dans le quartier Maarif",
    establishments: [
      {
        id: "est-7",
        name: "ISIC Maarif",
        address: "Rue Ibnou Mounir, Maarif",
        email: "isicmaarif@ofppt.ma",
        phone: "0522-123789",
        equipmentCount: 29
      }
    ]
  },
  {
    id: "complex-5",
    name: "OFPPT Technoparc Casa-Nearshore",
    city: "Casablanca",
    address: "Shore 19, Casa-Nearshore, Sidi Maarouf",
    description: "Centre de formation dédié aux métiers de l'offshoring et des technologies de l'information",
    establishments: [
      {
        id: "est-8",
        name: "ISGI Casa-Nearshore",
        address: "Shore 19, Casa-Nearshore, Sidi Maarouf",
        email: "isginearshore@ofppt.ma",
        phone: "0522-987654",
        equipmentCount: 62
      },
      {
        id: "est-9",
        name: "ISMO Casa-Nearshore",
        address: "Shore 20, Casa-Nearshore, Sidi Maarouf",
        email: "ismonearshore@ofppt.ma",
        phone: "0522-456789",
        equipmentCount: 37
      }
    ]
  }
];

const Complexes = () => {
  const [complexes, setComplexes] = useState<Complex[]>(ofpptComplexes);
  const [searchQuery, setSearchQuery] = useState('');
  const [complexFormOpen, setComplexFormOpen] = useState(false);
  const [selectedComplex, setSelectedComplex] = useState<Complex | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [establishmentFormOpen, setEstablishmentFormOpen] = useState(false);
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | undefined>(undefined);

  const { toast } = useToast();

  const filteredComplexes = complexes.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddComplex = () => {
    setSelectedComplex(undefined);
    setComplexFormOpen(true);
  };

  const handleEditComplex = (complex: Complex) => {
    setSelectedComplex(complex);
    setComplexFormOpen(true);
  };

  const handleDeleteComplex = (complex: Complex) => {
    setSelectedComplex(complex);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteComplex = () => {
    if (selectedComplex) {
      setComplexes(complexes.filter(item => item.id !== selectedComplex.id));
      toast({
        title: "Complexe supprimé",
        description: `${selectedComplex.name} a été supprimé avec succès.`,
      });
      setDeleteDialogOpen(false);
    }
  };

  const handleSaveComplex = (data: Partial<Complex>) => {
    if (data.id) {
      // Update existing complex
      setComplexes(complexes.map(item => 
        item.id === data.id ? { ...item, ...data } as Complex : item
      ));
    } else {
      // Add new complex
      const newComplex: Complex = {
        id: `complex-${Date.now()}`,
        name: data.name || "",
        city: data.city || "",
        address: data.address || "",
        description: data.description || "",
        establishments: data.establishments || []
      };
      
      setComplexes([...complexes, newComplex]);
    }
  };

  return (
    <>
      <PageHeader 
        title="Complexes" 
        description="Gestion des complexes industriels et leurs établissements" 
        actions={
          <Button onClick={handleAddComplex}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un complexe
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
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {filteredComplexes.map((complex) => (
          <AccordionItem key={complex.id} value={complex.id} className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-indigo-500" />
                <div className="text-left">
                  <h3 className="font-medium">{complex.name}</h3>
                  <p className="text-sm text-muted-foreground">{complex.establishments.length} établissements</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-white p-0">
              <div className="p-4 border-b">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Adresse</h4>
                    <p className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      {complex.address}, {complex.city}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                    <p className="text-sm">{complex.description}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Établissements</h4>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditComplex(complex)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteComplex(complex)}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </div>

                <div className="bg-white rounded-md border shadow-sm overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Adresse</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Équipements</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {complex.establishments.map((establishment) => (
                        <TableRow key={establishment.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <School className="h-4 w-4 mr-2 text-blue-500" />
                              {establishment.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{establishment.address}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {establishment.email && (
                                <div className="flex items-center text-sm">
                                  <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                                  <span>{establishment.email}</span>
                                </div>
                              )}
                              {establishment.phone && (
                                <div className="flex items-center text-sm">
                                  <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                                  <span>{establishment.phone}</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Package className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{establishment.equipmentCount}</span>
                            </div>
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
                                <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                                <DropdownMenuItem>Voir les équipements</DropdownMenuItem>
                                <DropdownMenuItem>Modifier</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500">Supprimer</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Complex Form Modal */}
      <ComplexFormModal 
        open={complexFormOpen} 
        onOpenChange={setComplexFormOpen} 
        complex={selectedComplex}
        onSave={handleSaveComplex}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cela supprimera définitivement le complexe 
              "{selectedComplex?.name}" et tous ses établissements.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteComplex} className="bg-red-500 hover:bg-red-600">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Complexes;
