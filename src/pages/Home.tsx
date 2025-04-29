
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Box, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-equiptrack-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="md:flex md:items-center md:space-x-8">
            <div className="md:w-1/2">
              <div className="text-white">
                <div className="flex items-center mb-4">
                  <Box className="h-8 w-8 text-equiptrack-teal mr-2" />
                  <h1 className="text-3xl font-bold">
                    Équip<span className="text-equiptrack-teal">Track</span>
                  </h1>
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
                  Gestion d'équipements simplifiée
                </h2>
                <p className="mt-4 text-xl text-gray-200 max-w-3xl">
                  Suivez, maintenez et optimisez vos équipements avec notre plateforme
                  complète de gestion d'équipements.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link to="/login">
                    <Button className="bg-equiptrack-teal hover:bg-equiptrack-teal/90 text-white px-6 py-3 rounded-md font-medium">
                      Se connecter <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 md:mt-0 md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80"
                alt="Équipement industriel"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Fonctionnalités principales
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Découvrez comment EquipTrack peut vous aider à gérer efficacement vos équipements
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-equiptrack-teal p-2 w-12 h-12 rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Suivi d'inventaire</h3>
              <p className="mt-2 text-gray-500">
                Gérez facilement votre inventaire d'équipements avec des informations détaillées et des historiques complets.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-equiptrack-teal p-2 w-12 h-12 rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Maintenance préventive</h3>
              <p className="mt-2 text-gray-500">
                Planifiez et suivez les opérations de maintenance pour prévenir les pannes et optimiser la durée de vie des équipements.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-equiptrack-teal p-2 w-12 h-12 rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Analyses et rapports</h3>
              <p className="mt-2 text-gray-500">
                Générez des rapports détaillés et obtenez des analyses pour prendre des décisions éclairées sur votre parc d'équipements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Box className="h-6 w-6 text-equiptrack-teal mr-2" />
              <span className="text-xl font-bold">Équip<span className="text-equiptrack-teal">Track</span></span>
            </div>
            <p className="text-gray-500">© 2025 EquipTrack. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
