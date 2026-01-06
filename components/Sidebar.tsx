
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
    <aside className="w-64 bg-[#0f172a] h-screen fixed left-0 top-0 text-slate-300 flex flex-col z-20 transition-all duration-300 shadow-2xl border-r border-slate-800">
      {/* Branding con el Logo Oficial */}
      <div className="p-8 border-b border-slate-800/50 bg-[#1e293b]/30">
        <div className="flex flex-col items-center">
          {/* Logo Circular: Maria + Isotipo de Copo/Hojas */}
          <div className="relative group mb-4">
            <div className="w-28 h-28 rounded-full bg-white p-1 shadow-[0_0_25px_rgba(59,130,246,0.3)] border-2 border-indigo-400 overflow-hidden relative transition-transform duration-500 hover:scale-105">
              {/* Avatar de Maria optimizado para parecerse a la imagen */}
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria&backgroundColor=b6e3f4&top=longHair&eyebrows=default&eyes=default&mouth=smile&clothes=overall" 
                alt="Maria AI"
                className="w-full h-full object-cover rounded-full"
              />
              
              {/* Isotipo del Logo: Nieve/Hojas (Simulación del isotipo proporcionado) */}
              <div className="absolute bottom-1 right-1 w-12 h-12 bg-white rounded-full border-2 border-slate-100 shadow-xl flex flex-col overflow-hidden">
                <div className="flex-1 bg-gradient-to-br from-[#0056b3] to-[#007bff] flex items-center justify-center p-0.5">
                  <svg viewBox="0 0 24 24" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex-1 bg-gradient-to-br from-[#80b918] to-[#55a630] flex items-center justify-center p-0.5">
                   <svg viewBox="0 0 24 24" className="w-full h-full text-white" fill="currentColor">
                      <path d="M12 22l8-8H4l8 8z" />
                   </svg>
                </div>
              </div>
            </div>
            {/* Estado Activo */}
            <div className="absolute top-2 right-4 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0f172a] z-10 animate-pulse"></div>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-black text-white tracking-tighter leading-none mb-1">MarIADono</h1>
            <p className="text-[9px] text-blue-400 font-black uppercase tracking-[0.2em] mb-2">
              Sistema de Fidelización
            </p>
            <div className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded text-[8px] text-slate-400 font-bold uppercase tracking-widest">
              Enterprise Suite
            </div>
          </div>
        </div>
      </div>
      
      {/* Navegación */}
      <nav className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
              currentView === item.id
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40 translate-x-1'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className={`${currentView === item.id ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`}>
              {item.icon}
            </span>
            <span className="font-bold text-sm tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer Branding */}
      <div className="p-4 mt-auto">
        <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
           <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Powered By</p>
              <p className="text-xs font-bold text-slate-300">Maria AI v4.0</p>
           </div>
           <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
