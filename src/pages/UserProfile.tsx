
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User as UserIcon,
  Mail, 
  Phone, 
  Briefcase,
  ArrowLeft,
  Shield,
  CheckCircle,
  XCircle
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import PageHeader from '@/components/PageHeader';
import { userData } from '@/data/mockData';
import { User } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import ProtectedElement from '@/components/ProtectedElement';

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

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { hasPermission } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const foundUser = userData.find(u => u.id === id);
    
    if (foundUser) {
      setUser(foundUser);
    } else {
      toast({
        title: "Utilisateur non trouvé",
        description: "L'utilisateur demandé n'existe pas",
        variant: "destructive"
      });
      navigate('/users');
    }
  }, [id, navigate, toast]);

  const handleGoBack = () => {
    navigate('/users');
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Chargement du profil utilisateur...</p>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <PageHeader 
        title="Profil Utilisateur" 
        description="Détails du profil utilisateur"
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
            <CardHeader className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-lg">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{user.name}</CardTitle>
              <CardDescription className="text-center">
                <Badge className={`mt-2 ${getRoleBadgeClass(user.role)}`}>
                  {getRoleDisplayName(user.role)}
                </Badge>
                <div className="mt-2">
                  {user.isActive ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Actif
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      <XCircle className="h-3 w-3 mr-1" />
                      Désactivé
                    </Badge>
                  )}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                
                {user.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                )}
                
                {user.department && (
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Département</p>
                      <p className="font-medium">{user.department}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Rôle système</p>
                    <p className="font-medium">{getRoleDisplayName(user.role)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-3 pt-2">
              <ProtectedElement permission="canEditUser">
                <Button variant="outline" onClick={() => navigate(`/users?edit=${user.id}`)}>
                  Modifier le profil
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
                  <h3 className="text-lg font-medium">À propos</h3>
                  <p className="text-gray-600 mt-2">
                    {user.role === 'admin' 
                      ? "Administrateur système avec un accès complet à toutes les fonctionnalités de la plateforme."
                      : user.role === 'directeur_regional'
                      ? "Directeur régional supervisant plusieurs complexes et établissements dans la région."
                      : user.role === 'directeur_complexe'
                      ? "Directeur de complexe responsable de la supervision d'un ensemble d'établissements."
                      : user.role === 'directeur_etablissement'
                      ? "Directeur d'établissement responsable d'une installation spécifique et de son équipement."
                      : "Formateur intervenant dans les établissements et utilisant l'équipement pour la formation."}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium">Permissions d'accès</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={user.role === 'admin' || user.role === 'directeur_regional' ? "default" : "outline"}>
                        Gestion des utilisateurs
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.role !== 'formateur' ? "default" : "outline"}>
                        Gestion des équipements
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.role !== 'formateur' ? "default" : "outline"}>
                        Gestion des anomalies
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.role === 'admin' || user.role === 'directeur_regional' ? "default" : "outline"}>
                        Gestion des complexes
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.role !== 'formateur' ? "default" : "outline"}>
                        Gestion des opérations
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.role === 'admin' ? "default" : "outline"}>
                        Rapports système
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium">Activité récente</h3>
                  <p className="text-gray-500 mt-2 text-center">
                    Historique d'activité à venir dans une prochaine version
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
