import React, { useState, useEffect } from 'react';
import { 
  Users as UsersIcon, 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal,
  Mail,
  Phone,
  Briefcase,
  ShieldAlert,
  ShieldCheck
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
import { userData } from '@/data/mockData';
import { User as UserType } from '@/types';
import { useAuth } from '@/context/AuthContext';
import ProtectedElement from '@/components/ProtectedElement';
import { useToast } from '@/hooks/use-toast';
import UserFormModal from '@/components/UserFormModal';
import UserRoleModal from '@/components/UserRoleModal';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

const getRoleBadgeClass = (role: string) => {
  switch (role) {
    case 'admin':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'directeur_regional':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'directeur_complexe':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'directeur_etablissement':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'formateur':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getRoleDisplayName = (role: string) => {
  switch (role) {
    case 'admin':
      return 'Admin';
    case 'directeur_regional':
      return 'Directeur Régional';
    case 'directeur_complexe':
      return 'Directeur Complexe';
    case 'directeur_etablissement':
      return 'Directeur Établissement';
    case 'formateur':
      return 'Formateur';
    default:
      return role;
  }
};

const Users = () => {
  const [users, setUsers] = useState<UserType[]>(userData);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, hasPermission } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isUserRoleModalOpen, setIsUserRoleModalOpen] = useState(false);
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

  useEffect(() => {
    if (searchParams.get('edit')) {
      const userToEdit = users.find(u => u.id === searchParams.get('edit'));
      if (userToEdit) {
        setSelectedUser(userToEdit);
        setFormMode('edit');
        setIsUserFormOpen(true);
      }
    }
  }, [searchParams, users]);

  const filteredUsers = users.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const roleCounts = {
    admin: users.filter(u => u.role === 'admin').length,
    directeur_regional: users.filter(u => u.role === 'directeur_regional').length,
    directeur_complexe: users.filter(u => u.role === 'directeur_complexe').length,
    directeur_etablissement: users.filter(u => u.role === 'directeur_etablissement').length,
    formateur: users.filter(u => u.role === 'formateur').length
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setFormMode('add');
    setIsUserFormOpen(true);
  };

  const handleFilterClick = () => {
    toast({
      title: "Filtres utilisateurs",
      description: "Fonctionnalité de filtrage à venir",
    });
  };

  const handleViewProfile = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const handleEditUser = (userId: string) => {
    const userToEdit = users.find(u => u.id === userId);
    if (userToEdit) {
      setSelectedUser(userToEdit);
      setFormMode('edit');
      setIsUserFormOpen(true);
    }
  };

  const handleManageAccess = (userId: string) => {
    const userToManage = users.find(u => u.id === userId);
    if (userToManage) {
      setSelectedUser(userToManage);
      setIsUserRoleModalOpen(true);
    }
  };

  const handleDeactivateUser = (userId: string) => {
    const userToDeactivate = users.find(u => u.id === userId);
    if (userToDeactivate) {
      setSelectedUser(userToDeactivate);
      setIsDeactivateDialogOpen(true);
    }
  };

  const confirmDeactivateUser = () => {
    if (selectedUser) {
      setUsers(users.map(u => 
        u.id === selectedUser.id 
          ? { ...u, isActive: false } 
          : u
      ));
      
      toast({
        title: "Utilisateur désactivé",
        description: `L'utilisateur ${selectedUser.name} a été désactivé avec succès.`,
        variant: "destructive",
      });
      
      setIsDeactivateDialogOpen(false);
    }
  };

  const handleSaveUser = (userData: Partial<UserType>) => {
    if (userData.id) {
      setUsers(users.map(u => 
        u.id === userData.id 
          ? { ...u, ...userData } 
          : u
      ));
      
      toast({
        title: "Utilisateur modifié",
        description: `L'utilisateur a été modifié avec succès.`,
      });
    } else {
      const newUser: UserType = {
        id: `user-${Date.now()}`,
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'formateur',
        phone: userData.phone || '',
        department: userData.department || '',
        isActive: true
      };
      
      setUsers([...users, newUser]);
      
      toast({
        title: "Utilisateur ajouté",
        description: `L'utilisateur a été ajouté avec succès.`,
      });
    }
  };

  const handleSaveRole = (userData: Partial<UserType>) => {
    if (userData.id) {
      setUsers(users.map(u => 
        u.id === userData.id 
          ? { ...u, role: userData.role || u.role } 
          : u
      ));
      
      toast({
        title: "Rôle mis à jour",
        description: `Le rôle de l'utilisateur a été mis à jour avec succès.`,
      });
    }
  };

  return (
    <>
      <PageHeader 
        title="Utilisateurs" 
        description="Gérez les utilisateurs et leurs accès" 
        actions={
          <ProtectedElement permission="canAddUser">
            <Button onClick={handleAddUser}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un utilisateur
            </Button>
          </ProtectedElement>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total utilisateurs</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <UsersIcon className="h-5 w-5 mr-2 text-gray-500" />
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Directeurs Régionaux</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <ShieldCheck className="h-5 w-5 mr-2 text-blue-500" />
            <div className="text-2xl font-bold">{roleCounts.directeur_regional}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Directeurs Complexes</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <ShieldCheck className="h-5 w-5 mr-2 text-green-500" />
            <div className="text-2xl font-bold">{roleCounts.directeur_complexe}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Directeurs Établissements</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <ShieldCheck className="h-5 w-5 mr-2 text-yellow-500" />
            <div className="text-2xl font-bold">{roleCounts.directeur_etablissement}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Formateurs</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-orange-500" />
            <div className="text-2xl font-bold">{roleCounts.formateur}</div>
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
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Département</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((userItem) => (
              <TableRow key={userItem.id} className={!userItem.isActive ? "opacity-60" : ""}>
                <TableCell className="font-medium">{userItem.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{userItem.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {userItem.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{userItem.phone}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {userItem.department && (
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{userItem.department}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getRoleBadgeClass(userItem.role)}>
                    {getRoleDisplayName(userItem.role)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={userItem.isActive ? "default" : "destructive"}>
                    {userItem.isActive ? "Actif" : "Désactivé"}
                  </Badge>
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
                      <DropdownMenuItem onClick={() => handleViewProfile(userItem.id)}>
                        Voir le profil
                      </DropdownMenuItem>
                      <ProtectedElement permission="canEditUser">
                        <DropdownMenuItem onClick={() => handleEditUser(userItem.id)} disabled={!userItem.isActive}>
                          Modifier
                        </DropdownMenuItem>
                      </ProtectedElement>
                      <ProtectedElement permission="canEditUser">
                        <DropdownMenuItem onClick={() => handleManageAccess(userItem.id)} disabled={!userItem.isActive}>
                          Gérer les accès
                        </DropdownMenuItem>
                      </ProtectedElement>
                      <ProtectedElement permission="canDeleteUser">
                        {userItem.isActive ? (
                          <DropdownMenuItem 
                            className="text-red-500"
                            onClick={() => handleDeactivateUser(userItem.id)}
                          >
                            Désactiver
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            onClick={() => {
                              setUsers(users.map(u => 
                                u.id === userItem.id 
                                  ? { ...u, isActive: true } 
                                  : u
                              ));
                              toast({
                                title: "Utilisateur réactivé",
                                description: `L'utilisateur ${userItem.name} a été réactivé.`,
                              });
                            }}
                          >
                            Réactiver
                          </DropdownMenuItem>
                        )}
                      </ProtectedElement>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserFormModal 
        open={isUserFormOpen}
        onOpenChange={setIsUserFormOpen}
        user={formMode === 'edit' ? selectedUser || undefined : undefined}
        onSave={handleSaveUser}
      />

      {selectedUser && (
        <UserRoleModal
          open={isUserRoleModalOpen}
          onOpenChange={setIsUserRoleModalOpen}
          user={selectedUser}
          onSave={handleSaveRole}
        />
      )}

      <AlertDialog open={isDeactivateDialogOpen} onOpenChange={setIsDeactivateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Désactiver l'utilisateur</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir désactiver {selectedUser?.name} ? 
              Cet utilisateur ne pourra plus se connecter au système.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeactivateUser} className="bg-red-600 hover:bg-red-700">
              Désactiver
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Users;
