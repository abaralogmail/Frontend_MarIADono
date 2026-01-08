
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { mockMetrics } from '../services/mockData';
import { COLORS as WA_COLORS } from '../constants';

const Metrics: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const funnelData = [
    { name: 'Atención', value: 4500, fill: '#128C7E' },
    { name: 'Consideración', value: 3200, fill: '#25D366' },
    { name: 'Compra', value: 1200, fill: '#34B7F1' },
    { name: 'Fidelización', value: 800, fill: '#075E54' },
  ];

  const activityData = [
    { day: 'Lun', bot: 450, agent: 120 },
    { day: 'Mar', bot: 520, agent: 150 },
    { day: 'Mie', bot: 480, agent: 110 },
    { day: 'Jue', bot: 610, agent: 190 },
    { day: 'Vie', bot: 590, agent: 210 },
    { day: 'Sab', bot: 320, agent: 80 },
    { day: 'Dom', bot: 280, agent: 40 },
  ];

  const COLORS = ['#128C7E', '#25D366', '#34B7F1', '#075E54'];

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-[#075e54] tracking-tighter uppercase">Inteligencia de Datos</h1>
          <p className="text-[#667781] font-medium italic mt-1">Análisis profundo de n8n_metrics y rendimiento operativo</p>
        </div>
        <div className="flex bg-[#f0f2f5] p-1 rounded-xl border border-[#d1d7db]">
          {['daily', 'weekly', 'monthly'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t as any)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                timeframe === t ? 'bg-white text-[#128C7E] shadow-sm' : 'text-[#667781] hover:text-[#075e54]'
              }`}
            >
              {t === 'daily' ? 'Hoy' : t === 'weekly' ? 'Semana' : 'Mes'}
            </button>
          ))}
        </div>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((m, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-[#d1d7db] shadow-sm hover:shadow-md transition-all">
            <p className="text-[10px] font-black text-[#667781] uppercase tracking-[0.2em] mb-2">{m.label}</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-slate-900">{m.value}</span>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                m.trend === 'up' ? 'bg-[#dcf8c6] text-[#075e54]' : 'bg-slate-50 text-slate-500'
              }`}>
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Actividad Bot vs Agente */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-[#d1d7db] shadow-sm">
          <h3 className="text-xl font-black text-[#075e54] mb-6 tracking-tight">Carga de Trabajo: Bot vs Agente</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f5" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#667781', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#667781', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  cursor={{fill: '#f0f2f5'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}}
                />
                <Bar dataKey="bot" name="Maria AI" fill="#128C7E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="agent" name="Agente Humano" fill="#25D366" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Embudo de Conversión */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-[#d1d7db] shadow-sm">
          <h3 className="text-xl font-black text-[#075e54] mb-6 tracking-tight">Embudo de Fidelización</h3>
          <div className="h-80 flex items-center">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={funnelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-4">
              {funnelData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                    <span className="text-xs font-bold text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Eficiencia de Maria AI */}
      <div className="bg-[#111b21] p-10 rounded-[2.5rem] text-white relative overflow-hidden border border-[#2a3942]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#25D366]/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#25D366]/10 rounded-full border border-[#25D366]/20 mb-6">
              <span className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#25D366]">Reporte de eficiencia</span>
            </div>
            <h2 className="text-3xl font-black leading-tight mb-4">MarIADono ha resuelto el 34% de las consultas autónomamente.</h2>
            <p className="text-[#667781] font-medium">Esto representa un ahorro operativo <span className="text-white font-bold"></span> este mes mediante la automatización de procesos n8n.</p>
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <p className="text-4xl font-black text-[#128C7E]">4.2s</p>
              <p className="text-[10px] font-black text-[#667781] uppercase tracking-widest mt-2">SLA Respuesta</p>
            </div>
            <div className="w-px h-16 bg-[#2a3942]"></div>
            <div className="text-center">
              <p className="text-4xl font-black text-[#25D366]">92%</p>
              <p className="text-[10px] font-black text-[#667781] uppercase tracking-widest mt-2">Satisfacción</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
