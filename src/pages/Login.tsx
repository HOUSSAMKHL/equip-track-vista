
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, LockKeyhole, LogIn, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { userData } from '@/data/userMockData';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  // If already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = (data: FormValues) => {
    // Simple mock authentication - in a real app this would call an API
    const foundUser = userData.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    
    if (foundUser) {
      // In a real application, we would verify the password here
      login(foundUser);
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${foundUser.name}`,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Échec de la connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-equiptrack-blue p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
            <Box className="h-6 w-6 text-equiptrack-teal" />
          </div>
          <h1 className="text-2xl font-bold text-center">
            Équip<span className="text-equiptrack-teal">Track</span>
          </h1>
          <p className="text-gray-500 text-center mt-1">
            Connectez-vous pour accéder à votre tableau de bord
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="votre.email@exemple.com" 
                        type="email" 
                        className="pl-10" 
                        {...field} 
                      />
                      <div className="absolute left-3 top-2.5 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Votre mot de passe"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10"
                        {...field}
                      />
                      <div className="absolute left-3 top-2.5 text-gray-400">
                        <LockKeyhole size={16} />
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded text-equiptrack-teal focus:ring-equiptrack-teal"
                />
                <label htmlFor="remember" className="text-sm text-gray-500">
                  Se souvenir de moi
                </label>
              </div>
              <a href="#" className="text-sm text-equiptrack-teal hover:underline">
                Mot de passe oublié?
              </a>
            </div>
            <Button type="submit" className="w-full bg-equiptrack-teal hover:bg-equiptrack-teal/90">
              <LogIn className="mr-2 h-4 w-4" /> Se connecter
            </Button>
          </form>
        </Form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>
            Pour démonstration, utilisez n'importe quel email des utilisateurs déjà créés. <br />
            Par exemple: <span className="font-medium">admin@equiptrack.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
