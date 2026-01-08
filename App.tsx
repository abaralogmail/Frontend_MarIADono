
import React, { useState } from 'react';
import { ViewType } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Conversations from './components/Conversations';
import Campaigns from './components/Campaigns';
import Commerce from './components/Commerce';
import Scheduling from './components/Scheduling';
import Metrics from './components/Metrics';
import Segments from './components/Segments';

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
        return <Segments />;
      case 'metrics':
        return <Metrics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F0F2F5] selection:bg-[#25D366]/20 selection:text-[#075e54]">
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
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #f0f2f5;
        }
        ::-webkit-scrollbar-thumb {
          background: #ced0d1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #bfc1c2;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default App;
