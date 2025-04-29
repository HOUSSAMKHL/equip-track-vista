
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Equipment from "./pages/Equipment";
import EquipmentDetail from "./pages/EquipmentDetail";
import Anomalies from "./pages/Anomalies";
import AnomalyDetail from "./pages/AnomalyDetail";
import Operations from "./pages/Operations";
import Complexes from "./pages/Complexes";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Protected route component to ensure user is authenticated
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Layout><Index /></Layout></ProtectedRoute>} />
      <Route path="/equipment" element={<ProtectedRoute><Layout><Equipment /></Layout></ProtectedRoute>} />
      <Route path="/equipment/:id" element={<ProtectedRoute><Layout><EquipmentDetail /></Layout></ProtectedRoute>} />
      <Route path="/anomalies" element={<ProtectedRoute><Layout><Anomalies /></Layout></ProtectedRoute>} />
      <Route path="/anomalies/:id" element={<ProtectedRoute><Layout><AnomalyDetail /></Layout></ProtectedRoute>} />
      <Route path="/operations" element={<ProtectedRoute><Layout><Operations /></Layout></ProtectedRoute>} />
      <Route path="/complexes" element={<ProtectedRoute><Layout><Complexes /></Layout></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Layout><Reports /></Layout></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><Layout><Users /></Layout></ProtectedRoute>} />
      <Route path="/users/:id" element={<ProtectedRoute><Layout><UserProfile /></Layout></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
