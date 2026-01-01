
import React from 'react';
import { ViewType } from '../types';
import { ICONS } from '../constants';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: 'dashboard' as ViewType, label: 'Panel Control', icon: <ICONS.Dashboard /> },
    { id: 'conversations' as ViewType, label: 'Conversaciones', icon: <ICONS.Chat /> },
    { id: 'campaigns' as ViewType, label: 'Campañas', icon: <ICONS.Campaigns /> },
    { id: 'segments' as ViewType, label: 'Segmentación', icon: <ICONS.Users /> },
    { id: 'commerce' as ViewType, label: 'Ecommerce', icon: <ICONS.Store /> },
    { id: 'scheduling' as ViewType, label: 'Horarios', icon: <ICONS.Clock /> },
    { id: 'metrics' as ViewType, label: 'Métricas', icon: <ICONS.Analytics /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 h-screen fixed left-0 top-0 text-slate-300 flex flex-col z-20 transition-all duration-300">
      <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">O</div>
        <span className="text-xl font-bold text-white tracking-tight">OmniSuite</span>
      </div>
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === item.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className={`${currentView === item.id ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}`}>
              {item.icon}
            </span>
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 mt-auto">
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
          <p className="text-xs text-slate-500 mb-1">Usuario</p>
          <p className="text-sm font-semibold text-slate-200">Admin Omni</p>
          <div className="flex items-center mt-3 space-x-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-xs text-slate-400">Conectado</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
