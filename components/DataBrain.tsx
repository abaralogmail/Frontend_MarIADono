
import React, { useState, useEffect } from 'react';

const DataBrain: React.FC = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [tablesDiscovered, setTablesDiscovered] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTablesDiscovered(['conversations_log', 'bulk_messages', 'campaigns', 'segments', 'products', 'horarios']);
      setIsScanning(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const tableStats = {
    conversations_log: { rows: '90,194', status: 'Healthy', last_sync: '2 min ago' },
    bulk_messages: { rows: '49,833', status: 'Healthy', last_sync: '5 min ago' },
    campaigns: { rows: '12', status: 'Active', last_sync: '1 hour ago' },
    segments: { rows: '8', status: 'Live', last_sync: '10 min ago' },
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <header className="px-2">
        <h1 className="text-4xl font-black text-[#111b21] tracking-tighter uppercase leading-none">Cerebro de Datos SQL</h1>
        <p className="text-[#667781] font-bold text-[11px] uppercase tracking-[0.3em] mt-3">Análisis de Estructura Relacional Maria AI</p>
      </header>

      {/* Database Discovery Visualizer */}
      <div className="bg-[#111b21] rounded-[3rem] p-12 text-white border border-[#2a3942] relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#25D366]/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
         
         <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-12">
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${isScanning ? 'border-[#25D366] animate-spin' : 'border-[#25D366] bg-[#25D366] text-[#111b21]'}`}>
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3">
                     <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
               </div>
               <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter">{isScanning ? 'Escaneando Esquema...' : 'Base de Datos Sincronizada'}</h2>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Motor Ceridono v2.0 - SQLite Logic</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {Object.entries(tableStats).map(([name, data]) => (
                 <div key={name} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                       <span className="text-[10px] font-black text-[#25D366] uppercase tracking-widest">{name}</span>
                       <div className="w-2 h-2 bg-[#25D366] rounded-full group-hover:animate-ping"></div>
                    </div>
                    <h3 className="text-3xl font-black mb-1">{data.rows}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-6">Registros Encontrados</p>
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                       <span className="text-[9px] font-black text-slate-500 uppercase">Status: {data.status}</span>
                       <span className="text-[9px] font-black text-slate-500 uppercase">{data.last_sync}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* Relational Intelligence Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-10 rounded-[3rem] border border-[#d1d7db] shadow-sm">
            <h3 className="text-xl font-black text-slate-900 uppercase mb-8">Lógica de Atribución</h3>
            <div className="space-y-6">
               <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-6">
                  <div className="w-10 h-10 bg-[#34B7F1] text-white rounded-xl flex items-center justify-center shrink-0">
                     <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div>
                     <p className="text-xs font-black text-slate-900 uppercase">Vínculo: Bulk ➔ Incoming</p>
                     <p className="text-[10px] text-[#667781] font-bold mt-1 uppercase">Relacionando messageid de envíos masivos con respuestas directas de clientes.</p>
                  </div>
               </div>

               <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-6">
                  <div className="w-10 h-10 bg-[#128C7E] text-white rounded-xl flex items-center justify-center shrink-0">
                     <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>
                  </div>
                  <div>
                     <p className="text-xs font-black text-slate-900 uppercase">Vínculo: Log ➔ Segment</p>
                     <p className="text-[10px] text-[#667781] font-bold mt-1 uppercase">Clasificando usuarios dinámicamente según la tabla conversations_log (Scoring).</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-white p-10 rounded-[3rem] border border-[#d1d7db] shadow-sm flex flex-col justify-center">
            <h3 className="text-xl font-black text-slate-900 uppercase mb-4">Recomendación Ceridono BI</h3>
            <div className="p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100">
               <div className="flex items-center space-x-3 mb-4">
                  <span className="w-3 h-3 bg-[#25D366] rounded-full"></span>
                  <span className="text-[10px] font-black text-[#128C7E] uppercase tracking-[0.2em]">Optimización de Base de Datos</span>
               </div>
               <p className="text-slate-800 text-sm font-medium leading-relaxed italic">
                 "Basado en los 90,194 registros de 'conversations_log', he detectado que el 34% de los contactos 
                 VIP no han recibido una campaña de 'bulk_messages' en los últimos 15 días. 
                 Sugerencia: Impactar tabla 'campaigns' con disparador de reactivación."
               </p>
            </div>
            <button className="mt-8 py-4 bg-[#111b21] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#25D366] hover:text-[#111b21] transition-all">
               Generar Script de Automatización
            </button>
         </div>
      </div>
    </div>
  );
};

export default DataBrain;
