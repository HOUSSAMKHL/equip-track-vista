
import React from 'react';
import { Package, AlertTriangle, Activity, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import PageHeader from '@/components/PageHeader';
import StatCard from '@/components/StatCard';
import { dashboardStats } from '@/data/mockData';

const Index = () => {
  const { 
    totalEquipment, 
    activeAnomalies, 
    operationsThisMonth, 
    activeUsers, 
    equipmentStatusData, 
    monthlyOperations 
  } = dashboardStats;

  const pieChartData = [
    { name: 'Opérationnel', value: equipmentStatusData.operational, color: '#00C49F' },
    { name: 'Maintenance', value: equipmentStatusData.maintenance, color: '#FFBB28' },
    { name: 'Hors service', value: equipmentStatusData.outOfService, color: '#FF8042' }
  ];

  return (
    <>
      <PageHeader title="Tableau de bord" description="Vue d'ensemble de votre système de gestion d'équipements" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total des Équipements" 
          value={totalEquipment} 
          description="Tous équipements confondus" 
          trend={{ value: "+8% depuis le mois dernier", positive: true }}
          icon={Package}
          iconColor="text-equiptrack-teal"
        />
        <StatCard 
          title="Anomalies actives" 
          value={activeAnomalies} 
          description="7 priorités élevées"
          trend={{ value: "-3% depuis le mois dernier", positive: true }}
          icon={AlertTriangle}
          iconColor="text-equiptrack-red"
        />
        <StatCard 
          title="Opérations ce mois" 
          value={operationsThisMonth} 
          description="12 en attente"
          trend={{ value: "+12% depuis le mois dernier", positive: true }}
          icon={Activity}
          iconColor="text-blue-500"
        />
        <StatCard 
          title="Utilisateurs actifs" 
          value={activeUsers} 
          description="5 administrateurs"
          trend={{ value: "Stable depuis le mois dernier", positive: true }}
          icon={Users}
          iconColor="text-purple-500"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>État des équipements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#00C49F] rounded-full mr-2"></div>
                <span>Opérationnel: {equipmentStatusData.operational}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#FFBB28] rounded-full mr-2"></div>
                <span>Maintenance: {equipmentStatusData.maintenance}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#FF8042] rounded-full mr-2"></div>
                <span>Hors service: {equipmentStatusData.outOfService}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Opérations par mois</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyOperations}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="maintenance" fill="#00C49F" name="Maintenance" />
                  <Bar dataKey="repair" fill="#3B82F6" name="Réparation" />
                  <Bar dataKey="inspection" fill="#A855F7" name="Inspection" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Anomalies récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Équipement</th>
                    <th className="py-3 px-4 text-left">Cause</th>
                    <th className="py-3 px-4 text-left">Priorité</th>
                    <th className="py-3 px-4 text-left">Statut</th>
                    <th className="py-3 px-4 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">Compresseur d'Air CA-500</td>
                    <td className="py-3 px-4">Fuite d'air au niveau du joint principal</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Moyenne</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">En cours</span>
                    </td>
                    <td className="py-3 px-4">10/02/2024</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">Four Industriel FI-300</td>
                    <td className="py-3 px-4">Dysfonctionnement du système de contrôle de température</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Critique</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Ouvert</span>
                    </td>
                    <td className="py-3 px-4">25/01/2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Index;
