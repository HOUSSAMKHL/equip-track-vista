
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { userData } from '@/data/userMockData';
import { LogOut, UserCircle } from 'lucide-react';

const UserSwitcher: React.FC = () => {
  const { user, login, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 h-auto py-2">
          <UserCircle className="h-5 w-5" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">{user?.name || "Connectez-vous"}</span>
            <span className="text-xs text-muted-foreground">{user?.role || ""}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="p-2 text-sm font-medium text-muted-foreground">
          Changer d'utilisateur
        </div>
        {userData.map((u) => (
          <DropdownMenuItem key={u.id} onClick={() => login(u)}>
            <div className="flex flex-col">
              <span>{u.name}</span>
              <span className="text-xs text-muted-foreground capitalize">
                {u.role.replace(/_/g, ' ')}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-500">
          <LogOut className="h-4 w-4 mr-2" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserSwitcher;
