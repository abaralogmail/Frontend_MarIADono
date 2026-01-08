
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockMetrics, incomingPeriodData, bulkPeriodData } from '../services/mockData';

const Dashboard: React.FC = () => {
  const [isChartReady, setIsChartReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsChartReady(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Combinamos los datos para un gráfico comparativo de tendencias
  const trendData = incomingPeriodData.map((inc, i) => ({
    name: inc.period.replace('2025-', '').replace('2024-', ''),
    Incoming: inc.volume,
    Bulk: bulkPeriodData[i]?.volume || 0,
  }));

  const proportionData = [
    { name: 'BulkMessage', value: 49833, color: '#128C7E', percent: '55.3%' },
    { name: 'Incoming', value: 40361, color: '#34B7F1', percent: '44.7%' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      {/* Resumen Ejecutivo Hero Section */}
      <header className="bg-[#111b21] rounded-[2.5rem] p-10 text-white relative overflow-hidden border border-[#2a3942] shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#25D366]/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#25D366]/10 rounded-full border border-[#25D366]/20 mb-4">
                <span className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#25D366]">Status: Live Performance</span>
              </div>
              <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Sistema de Fidelización de Clientes</h1>
              <p className="text-[#667781] font-bold text-xs uppercase tracking-[0.3em]">Análisis Global de Comunicaciones</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10">
               <p className="text-[10px] font-black text-[#667781] uppercase tracking-widest mb-1">Total General de Mensajería</p>
               <h2 className="text-4xl font-black text-white">90,194 <span className="text-xs font-bold text-[#25D366] ml-2 tracking-normal">Mensajes</span></h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:bg-white/[0.08] transition-all">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-black text-[#34B7F1] uppercase tracking-widest">Total Incoming</p>
                <span className="px-2 py-0.5 bg-[#34B7F1]/20 text-[#34B7F1] text-[9px] font-black rounded uppercase">Entrante</span>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-black">40,361</h3>
                <div className="text-right">
                  <p className="text-2xl font-black text-[#34B7F1]">44.7%</p>
                  <p className="text-[8px] font-bold text-[#667781] uppercase">Proporción</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:bg-white/[0.08] transition-all">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-black text-[#25D366] uppercase tracking-widest">Total BulkMessage</p>
                <span className="px-2 py-0.5 bg-[#25D366]/20 text-[#25D366] text-[9px] font-black rounded uppercase">Masivo</span>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-black">49,833</h3>
                <div className="text-right">
                  <p className="text-2xl font-black text-[#25D366]">55.3%</p>
                  <p className="text-[8px] font-bold text-[#667781] uppercase">Proporción</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tendencia Temporal */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-[#d1d7db] shadow-sm flex flex-col min-h-[450px]">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Tendencia por Período</h3>
              <p className="text-xs font-bold text-[#667781] uppercase mt-1">Comparativa Incoming vs BulkMessage (12 Meses)</p>
            </div>
            <div className="flex items-center space-x-6">
               <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#128C7E]"></div>
                  <span className="text-[10px] font-black text-slate-500 uppercase">Bulk</span>
               </div>
               <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#34B7F1]"></div>
                  <span className="text-[10px] font-black text-slate-500 uppercase">Incoming</span>
               </div>
            </div>
          </div>
          <div className="flex-1 w-full">
            {isChartReady ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34B7F1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#34B7F1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBulk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#128C7E" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#128C7E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f5" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#667781', fontSize: 10, fontWeight: 800}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#667781', fontSize: 10, fontWeight: 800}} />
                  <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="Incoming" stroke="#34B7F1" strokeWidth={3} fillOpacity={1} fill="url(#colorInc)" animationDuration={1000} />
                  <Area type="monotone" dataKey="Bulk" stroke="#128C7E" strokeWidth={3} fillOpacity={1} fill="url(#colorBulk)" animationDuration={1200} />
                </AreaChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </div>

        {/* Mix de Proporción */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-[#d1d7db] shadow-sm flex flex-col items-center justify-between">
          <div className="w-full text-left">
            <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Mix de Mensajería</h3>
            <p className="text-[10px] font-bold text-[#667781] uppercase tracking-widest mt-1">Distribución del Canal</p>
          </div>
          
          <div className="relative w-full h-64 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={proportionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    animationBegin={200}
                    animationDuration={1500}
                  >
                    {proportionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-sm font-black text-slate-900 uppercase">Proporción</p>
                <p className="text-2xl font-black text-[#128C7E]">Global</p>
             </div>
          </div>

          <div className="w-full space-y-4">
            {proportionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs font-black text-slate-600 uppercase">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">{item.percent}</p>
                  <p className="text-[9px] font-bold text-[#667781] uppercase">{item.value.toLocaleString()} msgs</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
