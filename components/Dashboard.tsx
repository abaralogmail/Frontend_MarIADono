
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockMetrics, mockCampaigns } from '../services/mockData';
import { COLORS } from '../constants';

const Dashboard: React.FC = () => {
  const [isChartReady, setIsChartReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsChartReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const data = [
    { name: 'Lun', fidelidad: 65, volumen: 4000 },
    { name: 'Mar', fidelidad: 68, volumen: 3000 },
    { name: 'Mie', fidelidad: 75, volumen: 5000 },
    { name: 'Jue', fidelidad: 72, volumen: 2780 },
    { name: 'Vie', fidelidad: 85, volumen: 6890 },
    { name: 'Sab', fidelidad: 88, volumen: 2390 },
    { name: 'Dom', fidelidad: 92, volumen: 3490 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-[#d1d7db] shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#25D366]/5 rounded-full -mr-40 -mt-40 blur-3xl opacity-50 pointer-events-none"></div>
        <div className="flex items-center space-x-6 z-10">
          <div className="w-20 h-20 bg-white rounded-3xl p-1.5 shadow-xl border border-[#d1d7db] flex flex-col overflow-hidden">
            <div className="flex-1 bg-[#075E54] rounded-t-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M12 2v20M2 12h20" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1 bg-[#25D366] rounded-b-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                <path d="M12 22l8-8H4l8 8z" />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">MarIADono</h1>
            <p className="text-[#128C7E] font-black text-sm tracking-[0.1em] uppercase mt-2">Sistema de fidelizacion de Clientes</p>
          </div>
        </div>
        <div className="flex space-x-3 w-full md:w-auto z-10">
          <button className="flex-1 md:flex-none px-8 py-3.5 bg-white border-2 border-[#d1d7db] text-[#54656f] rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#f0f2f5] transition-all">Configuración</button>
          <button className="flex-1 md:flex-none px-8 py-3.5 bg-[#128C7E] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#075e54] transition-all shadow-xl shadow-[#128C7E]/20">Nueva Estrategia</button>
        </div>
      </header>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((m, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] border border-[#d1d7db] shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            <p className="text-[11px] font-black text-[#667781] uppercase tracking-widest mb-3 relative z-10">{m.label}</p>
            <div className="flex items-end justify-between relative z-10">
              <p className="text-4xl font-black text-slate-900 tracking-tight">{m.value}</p>
              {m.change && (
                <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl border-2 ${
                  m.trend === 'up' ? 'bg-[#dcf8c6] text-[#075e54] border-[#c5e1a5]' : 'bg-slate-50 text-slate-600 border-[#d1d7db]'
                }`}>
                  {m.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-[#d1d7db] shadow-sm flex flex-col min-h-[500px]">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Impacto en Fidelización</h3>
              <p className="text-sm font-medium text-[#667781] mt-1">Nivel de satisfacción y lealtad vía WhatsApp</p>
            </div>
            <div className="flex space-x-2">
              <div className="flex items-center space-x-2 bg-[#dcf8c6] px-4 py-2 rounded-xl border border-[#c5e1a5]">
                 <div className="w-3 h-3 bg-[#128C7E] rounded-full"></div>
                 <span className="text-[10px] font-black text-[#075e54] uppercase">Retención %</span>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[350px]">
            {isChartReady ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorWA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#128C7E" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#128C7E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f5" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#667781', fontSize: 11, fontWeight: 800}} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#667781', fontSize: 11, fontWeight: 800}} dx={-10} />
                  <Tooltip 
                    contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px'}} 
                  />
                  <Area type="monotone" dataKey="fidelidad" stroke="#128C7E" strokeWidth={5} fillOpacity={1} fill="url(#colorWA)" animationDuration={1500} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-3xl animate-pulse">
                <span className="text-[#667781] font-black uppercase tracking-widest text-xs">Conectando con WhatsApp API...</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-[#d1d7db] shadow-sm flex flex-col">
          <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tighter">Conversión por Campaña</h3>
          <div className="space-y-8 flex-1">
            {mockCampaigns.map((c) => (
              <div key={c.id}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-slate-700">{c.name}</span>
                  <span className="text-[10px] font-black text-[#128C7E] bg-[#dcf8c6] px-2 py-0.5 rounded-lg border border-[#c5e1a5] uppercase">{Math.round((c.conversion/c.sent) * 100 || 0)}%</span>
                </div>
                <div className="w-full bg-[#f0f2f5] rounded-full h-3 overflow-hidden shadow-inner">
                  <div 
                    className="bg-[#128C7E] h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${(c.conversion/c.sent) * 100 || 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-[#202c33] rounded-3xl text-white relative overflow-hidden border border-[#2a3942]">
            <div className="flex items-center space-x-3 mb-3 relative z-10">
               <div className="w-8 h-8 rounded-xl bg-[#128C7E] flex items-center justify-center border border-[#25D366]/30">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M12 2v20M2 12h20" strokeLinecap="round"/>
                  </svg>
               </div>
               <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#25D366]">Maria Insight</span>
            </div>
            <p className="text-xs text-slate-300 font-bold leading-relaxed relative z-10 italic">
              "El uso del modo oscuro en el panel aumenta la eficiencia de los agentes en un 12% durante turnos nocturnos."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
