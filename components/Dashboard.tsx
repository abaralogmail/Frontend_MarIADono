
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockMetrics, mockCampaigns } from '../services/mockData';

const Dashboard: React.FC = () => {
  // Estado para manejar el delay de renderizado del gráfico y evitar width -1
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
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full -mr-40 -mt-40 blur-3xl opacity-50 pointer-events-none"></div>
        <div className="flex items-center space-x-6 z-10">
          <div className="w-20 h-20 bg-white rounded-3xl p-1.5 shadow-2xl border border-slate-100 flex flex-col overflow-hidden transform hover:rotate-3 transition-transform">
            <div className="flex-1 bg-[#0056b3] rounded-t-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M12 2v20M2 12h20" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1 bg-[#80b918] rounded-b-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                <path d="M12 22l8-8H4l8 8z" />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">MarIADono</h1>
            <p className="text-blue-600 font-black text-sm tracking-[0.1em] uppercase mt-2">Sistema de Fidelización de Clientes</p>
          </div>
        </div>
        <div className="flex space-x-3 w-full md:w-auto z-10">
          <button className="flex-1 md:flex-none px-8 py-3.5 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 hover:border-blue-200 transition-all shadow-sm">Configurar KPIs</button>
          <button className="flex-1 md:flex-none px-8 py-3.5 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">Nueva Estrategia</button>
        </div>
      </header>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((m, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-20 h-20 opacity-5 rounded-bl-full -mr-10 -mt-10 ${m.trend === 'up' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 relative z-10 group-hover:text-blue-500 transition-colors">{m.label}</p>
            <div className="flex items-end justify-between relative z-10">
              <p className="text-4xl font-black text-slate-900 tracking-tight">{m.value}</p>
              {m.change && (
                <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl border-2 ${
                  m.trend === 'up' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                  m.trend === 'down' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}>
                  {m.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gráfico de Fidelización */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col min-h-[500px]">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Evolución de Fidelidad</h3>
              <p className="text-sm font-medium text-slate-400 mt-1">Impacto de Maria AI en la retención semanal</p>
            </div>
            <div className="flex space-x-2">
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-xl">
                 <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                 <span className="text-[10px] font-black text-blue-700 uppercase">Fidelidad %</span>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[350px]">
            {isChartReady ? (
              <ResponsiveContainer width="100%" height="100%" minHeight={350}>
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFidel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} dy={20} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} dx={-15} />
                  <Tooltip 
                    contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '20px', fontWeight: '900'}} 
                  />
                  <Area type="monotone" dataKey="fidelidad" stroke="#2563eb" strokeWidth={6} fillOpacity={1} fill="url(#colorFidel)" animationDuration={2000} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-50/50 rounded-3xl animate-pulse">
                <div className="text-slate-300 font-black uppercase tracking-widest text-xs">Cargando Inteligencia Conversacional...</div>
              </div>
            )}
          </div>
        </div>

        {/* Campañas & Insights */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tighter">Ranking de Estrategias</h3>
          <div className="space-y-10 flex-1">
            {mockCampaigns.map((c) => (
              <div key={c.id} className="group cursor-pointer">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-sm font-black text-slate-700 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{c.name}</span>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">Activa • Maria Optimizing</p>
                  </div>
                  <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-xl border-2 border-blue-100">{Math.round((c.conversion/c.sent) * 100 || 0)}% CR</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden shadow-inner p-1">
                  <div 
                    className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-400 h-full rounded-full transition-all duration-2000 ease-out shadow-lg" 
                    style={{ width: `${(c.conversion/c.sent) * 100 || 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Tarjeta de Insight de Maria */}
          <div className="mt-10 p-8 bg-[#0f172a] rounded-[2rem] text-white relative overflow-hidden border-2 border-indigo-900 shadow-2xl">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="flex items-center space-x-4 mb-4 relative z-10">
               <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl border-2 border-blue-400/30">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="4">
                    <path d="M12 2v20M2 12h20" strokeLinecap="round"/>
                  </svg>
               </div>
               <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400">Insight MarIADono</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-bold relative z-10 italic">
              "Maria AI detectó que personalizar los horarios de respuesta aumentó la retención en el segmento VIP en un 14.5% este mes."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
