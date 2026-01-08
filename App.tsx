
import React, { useState } from 'react';
import { ViewType } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Conversations from './components/Conversations';
import Campaigns from './components/Campaigns';
import Scheduling from './components/Scheduling';
import Metrics from './components/Metrics';
import Segments from './components/Segments';
import Import from './components/Import';
import AdvancedAnalytics from './components/AdvancedAnalytics';

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
      case 'scheduling':
        return <Scheduling />;
      case 'segments':
        return <Segments />;
      case 'metrics':
        return <Metrics />;
      case 'import':
        return <Import />;
      case 'analytics':
        return <AdvancedAnalytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen flex bg-[#F0F2F5] selection:bg-[#25D366]/20 selection:text-[#075e54] overflow-hidden">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 ml-64 h-screen flex flex-col overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto px-6 py-8 flex-1 flex flex-col min-h-0">
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
          width: 5px;
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
      `}</style>
    </div>
  );
};

export default App;
