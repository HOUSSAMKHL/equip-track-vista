
import { User } from '@/types';

// Utilisateurs avec des rôles valides
export const userData: User[] = [
  {
    id: "1",
    name: "Admin Système",
    email: "admin@equiptrack.com",
    role: "admin",
    phone: "+33 6 12 34 56 78",
    department: "Direction",
    isActive: true
  },
  {
    id: "2",
    name: "Jean Dupont",
    email: "jean.dupont@equiptrack.com",
    role: "directeur_regional",
    phone: "+33 6 23 45 67 89",
    department: "Direction Régionale Nord",
    isActive: true
  },
  {
    id: "3",
    name: "Marie Lambert",
    email: "marie.lambert@equiptrack.com",
    role: "directeur_complexe",
    phone: "+33 6 34 56 78 90",
    department: "Complexe Paris",
    isActive: true
  },
  {
    id: "4",
    name: "Thomas Martin",
    email: "thomas.martin@equiptrack.com",
    role: "directeur_etablissement",
    phone: "+33 6 45 67 89 01",
    department: "Établissement Ouest",
    isActive: true
  },
  {
    id: "5",
    name: "Sophie Bernard",
    email: "sophie.bernard@equiptrack.com",
    role: "formateur",
    phone: "+33 6 56 78 90 12",
    department: "Formation",
    isActive: true
  },
  {
    id: "6",
    name: "Philippe Dubois",
    email: "philippe.dubois@equiptrack.com",
    role: "directeur_etablissement",
    phone: "+33 6 67 89 01 23",
    department: "Établissement Est",
    isActive: true
  },
  {
    id: "7",
    name: "Claire Moreau",
    email: "claire.moreau@equiptrack.com",
    role: "formateur",
    phone: "+33 6 78 90 12 34",
    department: "Maintenance",
    isActive: true
  }
];
