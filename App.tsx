
import React, { useState } from 'react';
import { ViewType } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Conversations from './components/Conversations';
import Campaigns from './components/Campaigns';
import Commerce from './components/Commerce';
import Scheduling from './components/Scheduling';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'conversations':
        return <Conversations />;
      case 'campaigns':
        return <Campaigns />;
      case 'commerce':
        return <Commerce />;
      case 'scheduling':
        return <Scheduling />;
      case 'segments':
        return (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Módulo de Segmentación</h2>
            <p className="text-slate-500 mt-2 italic">Segmentación dinámica (customer_segments) en desarrollo...</p>
          </div>
        );
      case 'metrics':
        return (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Métricas de n8n & SLAs</h2>
            <p className="text-slate-500 mt-2 italic">Integrando flujos de n8n_metrics y Reporting Avanzado...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 selection:bg-indigo-100 selection:text-indigo-700">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 ml-64 p-8 lg:p-12 transition-all duration-300 overflow-y-auto">
        <div className="max-w-7xl mx-auto pb-12">
          {renderContent()}
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default App;
