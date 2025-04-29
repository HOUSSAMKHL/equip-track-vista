import { User, Equipment, Anomaly, Operation, Complex, Establishment, Report, DashboardStats } from '@/types';

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

// Équipements
export const equipmentData: Equipment[] = [
  {
    id: "eq-1",
    name: "Tour CNC Haas ST-10",
    reference: "CNC-T-001",
    category: "Machine-outil",
    location: "Atelier Usinage",
    status: "operational",
    hasAnomaly: false,
    acquisitionYear: 2019,
    acquisitionValue: 75000,
    lastMaintenance: "2023-12-15",
    nextMaintenance: "2024-06-15"
  },
  {
    id: "eq-2",
    name: "Fraiseuse Verticale VMC-500",
    reference: "VMC-F-002",
    category: "Machine-outil",
    location: "Atelier Usinage",
    status: "maintenance",
    hasAnomaly: true,
    acquisitionYear: 2018,
    acquisitionValue: 62000,
    lastMaintenance: "2023-11-10",
    nextMaintenance: "2024-05-10"
  },
  {
    id: "eq-3",
    name: "Robot Soudeur Fanuc ARC Mate",
    reference: "RSW-003",
    category: "Robot industriel",
    location: "Atelier Soudure",
    status: "operational",
    hasAnomaly: false,
    acquisitionYear: 2020,
    acquisitionValue: 95000,
    lastMaintenance: "2024-01-05",
    nextMaintenance: "2024-07-05"
  },
  {
    id: "eq-4",
    name: "Compresseur d'Air CA-500",
    reference: "CA-004",
    category: "Équipement auxiliaire",
    location: "Salle des machines",
    status: "out-of-service",
    hasAnomaly: true,
    acquisitionYear: 2017,
    acquisitionValue: 15000,
    lastMaintenance: "2023-10-20",
    nextMaintenance: "2024-04-20"
  },
  {
    id: "eq-5",
    name: "Four Industriel FI-300",
    reference: "FI-005",
    category: "Équipement de traitement thermique",
    location: "Atelier Traitement Thermique",
    status: "operational",
    hasAnomaly: true,
    acquisitionYear: 2019,
    acquisitionValue: 50000,
    lastMaintenance: "2023-12-01",
    nextMaintenance: "2024-06-01"
  }
];

// Anomalies
export const anomalyData: Anomaly[] = [
  {
    id: "ano-1",
    equipmentId: "eq-2",
    equipmentName: "Fraiseuse Verticale VMC-500",
    cause: "Vibrations excessives pendant l'usinage",
    reportDate: "2024-01-15",
    status: "in-progress",
    priority: "high",
    correctiveAction: "Remplacement des roulements",
    spareParts: "Roulements de broche",
    downtime: 16,
    repairCost: 2500,
    isResolved: false,
    technician: "Jean Lefort"
  },
  {
    id: "ano-2",
    equipmentId: "eq-4",
    equipmentName: "Compresseur d'Air CA-500",
    cause: "Fuite d'air au niveau du joint principal",
    reportDate: "2024-02-10",
    status: "open",
    priority: "medium",
    isResolved: false
  },
  {
    id: "ano-3",
    equipmentId: "eq-5",
    equipmentName: "Four Industriel FI-300",
    cause: "Dysfonctionnement du système de contrôle de température",
    reportDate: "2024-01-25",
    status: "open",
    priority: "critical",
    isResolved: false
  },
  {
    id: "ano-4",
    equipmentId: "eq-3",
    equipmentName: "Robot Soudeur Fanuc ARC Mate",
    cause: "Erreur de positionnement",
    reportDate: "2023-12-28",
    resolvedDate: "2024-01-10",
    status: "resolved",
    priority: "high",
    correctiveAction: "Recalibration des axes",
    downtime: 8,
    repairCost: 0,
    isResolved: true,
    technician: "Thomas Blanc"
  }
];

// Opérations
export const operationData: Operation[] = [
  {
    id: "op-1",
    name: "Maintenance préventive",
    type: "maintenance",
    equipmentId: "eq-1",
    equipmentName: "Tour CNC Haas ST-10",
    date: "2024-03-15",
    duration: 4,
    performedBy: "Pierre Dumont",
    observations: "Remplacement de l'huile et des filtres",
    status: "planned"
  },
  {
    id: "op-2",
    name: "Réparation broche",
    type: "repair",
    equipmentId: "eq-2",
    equipmentName: "Fraiseuse Verticale VMC-500",
    date: "2024-02-20",
    duration: 8,
    performedBy: "Jean Lefort",
    observations: "Remplacement des roulements et lubrification",
    status: "in-progress"
  },
  {
    id: "op-3",
    name: "Inspection annuelle",
    type: "inspection",
    equipmentId: "eq-3",
    equipmentName: "Robot Soudeur Fanuc ARC Mate",
    date: "2024-01-05",
    duration: 6,
    performedBy: "Thomas Blanc",
    observations: "Vérification de la précision et calibration",
    status: "completed"
  },
  {
    id: "op-4",
    name: "Entretien système",
    type: "maintenance",
    equipmentId: "eq-4",
    equipmentName: "Compresseur d'Air CA-500",
    date: "2024-02-10",
    duration: 3,
    performedBy: "Lucas Martin",
    observations: "Nettoyage et remplacement du filtre à air",
    status: "planned"
  },
  {
    id: "op-5",
    name: "Réparation circuit électrique",
    type: "repair",
    equipmentId: "eq-5",
    equipmentName: "Four Industriel FI-300",
    date: "2024-02-05",
    duration: 5,
    performedBy: "Philippe Lambert",
    observations: "Remplacement du thermocouple et calibration",
    status: "completed"
  }
];

// Complexes et établissements
export const establishmentData: Establishment[] = [
  {
    id: "est-1",
    name: "OFPPT Ain Sebaa",
    address: "123 Rue de l'Industrie, Ain Sebaa, Casablanca",
    phone: "+212 5 22 34 56 78",
    email: "contact.ainsebaa@ofppt.ma",
    equipmentCount: 35
  },
  {
    id: "est-2",
    name: "OFPPT Hay Hassani",
    address: "456 Avenue Hassan II, Hay Hassani, Casablanca",
    phone: "+212 5 22 87 65 43",
    email: "contact.hayhassani@ofppt.ma",
    equipmentCount: 42
  },
  {
    id: "est-3",
    name: "OFPPT Sidi Bernoussi",
    address: "789 Boulevard Mohammed V, Sidi Bernoussi, Casablanca",
    phone: "+212 5 22 76 54 32",
    email: "contact.sidibernoussi@ofppt.ma",
    equipmentCount: 28
  },
  {
    id: "est-4",
    name: "OFPPT El Jadida",
    address: "10 Rue de la Formation, El Jadida",
    phone: "+212 5 23 45 67 89",
    email: "contact.eljadida@ofppt.ma",
    equipmentCount: 25
  }
];

export const complexData: Complex[] = [
  {
    id: "comp-1",
    name: "Complexe Casablanca Nord",
    city: "Casablanca",
    address: "123 Avenue Mohammed V, Casablanca",
    description: "Complexe de formation professionnelle",
    establishments: establishmentData.slice(0, 2)
  },
  {
    id: "comp-2",
    name: "Complexe Casablanca Sud",
    city: "Casablanca",
    address: "456 Boulevard Zerktouni, Casablanca",
    description: "Complexe de formation technique",
    establishments: establishmentData.slice(2)
  }
];

// Rapports
export const reportData: Report[] = [
  {
    id: "rep-1",
    title: "Rapport d'état des équipements - T1 2024",
    type: "equipment",
    generatedDate: "2024-01-31",
    generatedBy: "Marie Martin",
    status: "published",
    content: `<h2>Rapport d'état des équipements - T1 2024</h2>
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
    </ol>`,
    attachments: 2
  },
  {
    id: "rep-2",
    title: "Analyse des anomalies - Février 2024",
    type: "anomaly",
    generatedDate: "2024-02-28",
    generatedBy: "Thomas Petit",
    status: "published",
    content: `<h2>Analyse des anomalies - Février 2024</h2>
    <p>Ce rapport analyse les anomalies survenues en février 2024 et propose des actions correctives.</p>
    
    <h3>Résumé des anomalies</h3>
    <ul>
      <li>Nombre total d'anomalies: 15</li>
      <li>Anomalies critiques: 3</li>
      <li>Anomalies majeures: 7</li>
      <li>Anomalies mineures: 5</li>
    </ul>
    
    <h3>Causes principales</h3>
    <p>Les principales causes identifiées sont:</p>
    <ul>
      <li>Usure normale: 40%</li>
      <li>Erreur d'utilisation: 25%</li>
      <li>Défaut de maintenance: 20%</li>
      <li>Défaut de fabrication: 15%</li>
    </ul>
    
    <h3>Actions correctives recommandées</h3>
    <ol>
      <li>Renforcer la formation des utilisateurs</li>
      <li>Réviser le calendrier de maintenance préventive</li>
      <li>Contacter le fabricant concernant les défauts récurrents</li>
    </ol>`,
    attachments: 1
  },
  {
    id: "rep-3",
    title: "Planification de maintenance - T2 2024",
    type: "maintenance",
    generatedDate: "2024-03-15",
    generatedBy: "Philippe Lambert",
    status: "draft",
    content: `<h2>Planification de maintenance - T2 2024</h2>
    <p>Ce document présente le plan de maintenance pour le deuxième trimestre 2024.</p>
    
    <h3>Maintenance préventive</h3>
    <table>
      <tr>
        <th>Équipement</th>
        <th>Date prévue</th>
        <th>Durée estimée</th>
        <th>Technicien</th>
      </tr>
      <tr>
        <td>Tour CNC Haas ST-10</td>
        <td>15/04/2024</td>
        <td>4h</td>
        <td>Pierre Dumont</td>
      </tr>
      <tr>
        <td>Fraiseuse VMC-500</td>
        <td>20/04/2024</td>
        <td>6h</td>
        <td>Jean Lefort</td>
      </tr>
      <tr>
        <td>Robot Soudeur Fanuc</td>
        <td>05/05/2024</td>
        <td>8h</td>
        <td>Thomas Blanc</td>
      </tr>
    </table>
    
    <h3>Maintenance corrective</h3>
    <p>Les opérations de maintenance corrective seront planifiées en fonction des anomalies détectées.</p>
    
    <h3>Budget prévisionnel</h3>
    <p>Le budget prévisionnel pour la maintenance au T2 2024 est de 15 000 €.</p>`
  },
  {
    id: "rep-4",
    title: "Bilan du complexe Casablanca Nord",
    type: "complex",
    generatedDate: "2024-01-15",
    generatedBy: "Jean Dupont",
    status: "published",
    content: `<h2>Bilan du complexe Casablanca Nord - 2023</h2>
    <p>Ce rapport présente le bilan annuel du complexe Casablanca Nord pour l'année 2023.</p>
    
    <h3>Informations générales</h3>
    <ul>
      <li>Nombre d'établissements: 2</li>
      <li>Nombre total d'équipements: 77</li>
      <li>Taux d'utilisation moyen: 85%</li>
    </ul>
    
    <h3>Performance des équipements</h3>
    <ul>
      <li>Disponibilité moyenne: 92%</li>
      <li>Nombre d'anomalies: 35</li>
      <li>Coût total des réparations: 45 000 €</li>
    </ul>
    
    <h3>Recommandations</h3>
    <ol>
      <li>Renouveler les équipements vieillissants</li>
      <li>Renforcer l'équipe de maintenance</li>
      <li>Mettre en place un système de suivi en temps réel</li>
    </ol>`,
    attachments: 3
  },
  {
    id: "rep-5",
    title: "Statistiques des équipements - 2023",
    type: "equipment",
    generatedDate: "2024-01-10",
    generatedBy: "Sophie Bernard",
    status: "draft",
    content: `<h2>Statistiques d'utilisation des équipements - 2023</h2>
    <p>Ce rapport présente les statistiques d'utilisation des équipements pour l'année 2023.</p>
    
    <h3>Taux d'utilisation par catégorie</h3>
    <ul>
      <li>Machines-outils: 90%</li>
      <li>Robots industriels: 85%</li>
      <li>Équipements auxiliaires: 75%</li>
      <li>Équipements de traitement thermique: 80%</li>
    </ul>
    
    <h3>Fiabilité</h3>
    <p>Nombre moyen de jours entre deux pannes:</p>
    <ul>
      <li>Machines-outils: 120 jours</li>
      <li>Robots industriels: 150 jours</li>
      <li>Équipements auxiliaires: 90 jours</li>
      <li>Équipements de traitement thermique: 100 jours</li>
    </ul>
    
    <h3>Coûts d'exploitation</h3>
    <p>Coût moyen d'exploitation par heure d'utilisation:</p>
    <ul>
      <li>Machines-outils: 25 €/h</li>
      <li>Robots industriels: 30 €/h</li>
      <li>Équipements auxiliaires: 15 €/h</li>
      <li>Équipements de traitement thermique: 20 €/h</li>
    </ul>`
  }
];

// Statistiques pour le tableau de bord
export const dashboardStats: DashboardStats = {
  totalEquipment: 165,
  activeAnomalies: 24,
  operationsThisMonth: 47,
  activeUsers: 22,
  equipmentStatusData: {
    operational: 125,
    maintenance: 25,
    outOfService: 15
  },
  monthlyOperations: [
    {
      month: "Jan",
      maintenance: 12,
      repair: 7,
      inspection: 5
    },
    {
      month: "Fév",
      maintenance: 15,
      repair: 10,
      inspection: 8
    },
    {
      month: "Mar",
      maintenance: 10,
      repair: 5,
      inspection: 3
    },
    {
      month: "Avr",
      maintenance: 14,
      repair: 8,
      inspection: 6
    },
    {
      month: "Mai",
      maintenance: 16,
      repair: 9,
      inspection: 7
    },
    {
      month: "Juin",
      maintenance: 13,
      repair: 6,
      inspection: 5
    }
  ]
};
