
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
    { id: 'bi_logic' as ViewType, label: 'Cerebro de Datos', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v10"/><path d="M18.4 4.6a10 10 0 1 1-12.8 0"/></svg>
    )},
    { id: 'analytics' as ViewType, label: 'Inteligencia BI', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/><path d="M12 2v20"/><path d="m4.9 4.9 14.2 14.2"/><path d="m19.1 4.9-14.2 14.2"/></svg>
    )},
    { id: 'conversations' as ViewType, label: 'Conversaciones', icon: <ICONS.Chat /> },
    { id: 'campaigns' as ViewType, label: 'Campañas', icon: <ICONS.Campaigns /> },
    { id: 'segments' as ViewType, label: 'Segmentación', icon: <ICONS.Users /> },
    { id: 'metrics' as ViewType, label: 'Métricas', icon: <ICONS.Analytics /> },
    { id: 'import' as ViewType, label: 'Base de Datos', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
    )},
  ];

  return (
    <aside className="w-64 bg-[#111b21] h-screen fixed left-0 top-0 text-slate-300 flex flex-col z-20 transition-all duration-300 shadow-2xl border-r border-[#2a3942]">
      {/* Branding */}
      <div className="p-8 border-b border-[#2a3942] bg-[#202c33]">
        <div className="flex flex-col items-center">
          <div className="relative group mb-4">
            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-[0_0_20px_rgba(37,211,102,0.2)] border-2 border-[#25D366] flex items-center justify-center transition-transform duration-500 hover:scale-105 overflow-hidden">
              <img 
                src="assets/logo.svg" 
                alt="MarIADono Logo" 
                className="w-full h-full object-contain p-2"
              />
            </div>
            <div className="absolute top-1 right-3 w-4 h-4 bg-[#25D366] rounded-full border-2 border-[#111b21] z-10 animate-pulse shadow-[0_0_8px_#25D366]"></div>
          </div>
          <div className="text-center">
            <h1 className="text-xl font-black text-white tracking-tighter leading-none mb-1 uppercase">MarIADono</h1>
            <p className="text-[9px] text-[#25D366] font-black uppercase tracking-[0.2em]">
              Data Brain Engine
            </p>
          </div>
        </div>
      </div>
      
      {/* Navegación */}
      <nav className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
              currentView === item.id
                ? 'bg-[#202c33] text-white shadow-lg translate-x-1 border-l-4 border-[#25D366]'
                : 'hover:bg-[#202c33]/50 hover:text-white'
            }`}
          >
            <span className={`${currentView === item.id ? 'text-[#25D366]' : 'text-slate-500 group-hover:text-[#25D366]'}`}>
              {item.icon}
            </span>
            <span className="font-bold text-sm tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-[#202c33] rounded-2xl p-4 border border-[#2a3942] flex items-center justify-between">
           <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Engine Status</p>
              <p className="text-xs font-bold text-[#25D366]">Optimized</p>
           </div>
           <div className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse"></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
