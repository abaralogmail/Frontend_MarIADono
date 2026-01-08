
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { incomingPeriodData, bulkPeriodData } from '../services/mockData';

const Metrics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'incoming' | 'bulk'>('incoming');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  const combinedData = useMemo(() => {
    return incomingPeriodData.map((inc, i) => ({
      name: inc.period.replace('2025-', '').replace('2024-', ''),
      Incoming: inc.volume,
      Bulk: bulkPeriodData[i]?.volume || 0,
    }));
  }, []);

  const TableHeader = () => (
    <thead>
      <tr className="bg-[#f0f2f5] border-b border-[#d1d7db]">
        <th className="px-8 py-5 text-[10px] font-black text-[#54656f] uppercase tracking-widest">Período</th>
        <th className="px-8 py-5 text-[10px] font-black text-[#54656f] uppercase tracking-widest">Volumen</th>
        <th className="px-8 py-5 text-[10px] font-black text-[#54656f] uppercase tracking-widest">% del Total</th>
        <th className="px-8 py-5 text-[10px] font-black text-[#54656f] uppercase tracking-widest">Tendencia</th>
      </tr>
    </thead>
  );

  return (
    <div className="space-y-8 animate-fadeIn pb-10 flex flex-col min-h-full">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-2 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-[#075e54] tracking-tighter uppercase leading-none">Métricas de Performance</h1>
          <p className="text-[#667781] font-bold text-[10px] uppercase tracking-[0.2em] mt-2">Comparativa de Canales: Incoming vs BulkMessage</p>
        </div>
        <div className="flex bg-[#f0f2f5] p-1.5 rounded-2xl border border-[#d1d7db] shadow-sm">
          <button 
            onClick={() => setActiveTab('incoming')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'incoming' ? 'bg-[#128C7E] text-white shadow-md' : 'text-[#667781] hover:text-[#075e54]'}`}
          >
            Incoming
          </button>
          <button 
            onClick={() => setActiveTab('bulk')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'bulk' ? 'bg-[#128C7E] text-white shadow-md' : 'text-[#667781] hover:text-[#075e54]'}`}
          >
            BulkMessage
          </button>
        </div>
      </header>

      {/* Visualización Gráfica Comparativa */}
      <div className="bg-white rounded-[2.5rem] border border-[#d1d7db] p-8 shadow-sm shrink-0">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Comparativa de Tráfico</h3>
            <p className="text-[10px] font-bold text-[#667781] uppercase tracking-widest">Evolución Temporal Combinada</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-md transition-all ${chartType === 'bar' ? 'bg-white text-[#128C7E] shadow-sm' : 'text-slate-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 16v-4"/><path d="M11 16V9"/><path d="M15 16V5"/><path d="M19 16v-7"/></svg>
            </button>
            <button 
              onClick={() => setChartType('line')}
              className={`p-2 rounded-md transition-all ${chartType === 'line' ? 'bg-white text-[#128C7E] shadow-sm' : 'text-slate-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m19 20-4-4-4 4-4-4-4 4"/><path d="M3 3v18h18"/></svg>
            </button>
          </div>
        </div>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#667781', fontSize: 10, fontWeight: 800}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#667781', fontSize: 10, fontWeight: 800}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase'}} />
                <Bar dataKey="Bulk" fill="#128C7E" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Incoming" fill="#34B7F1" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            ) : (
              <LineChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#667781', fontSize: 10, fontWeight: 800}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#667781', fontSize: 10, fontWeight: 800}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase'}} />
                <Line type="monotone" dataKey="Bulk" stroke="#128C7E" strokeWidth={4} dot={{r: 4, strokeWidth: 2, fill: 'white'}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="Incoming" stroke="#34B7F1" strokeWidth={4} dot={{r: 4, strokeWidth: 2, fill: 'white'}} activeDot={{r: 6}} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Contenedor de Tabla de Detalle */}
      <div className="flex-1 min-h-0 bg-white rounded-[2.5rem] border border-[#d1d7db] shadow-sm overflow-hidden flex flex-col">
        <div className="p-8 border-b border-[#f0f2f5] flex justify-between items-center bg-white sticky top-0 z-10">
           <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${activeTab === 'incoming' ? 'bg-[#34B7F1]' : 'bg-[#128C7E]'}`}></div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">
                {activeTab === 'incoming' ? 'Incoming - Análisis Detallado' : 'BulkMessage - Análisis Detallado'}
              </h3>
           </div>
           <div className="text-right">
              <p className="text-[10px] font-black text-[#667781] uppercase tracking-widest">Total Acumulado</p>
              <p className="text-xl font-black text-slate-900">{activeTab === 'incoming' ? '40,361' : '49,833'}</p>
           </div>
        </div>
        
        <div className="flex-1 overflow-auto scrollbar-thin">
          <table className="w-full text-left border-collapse">
            <TableHeader />
            <tbody className="divide-y divide-[#f0f2f5]">
              {(activeTab === 'incoming' ? incomingPeriodData : bulkPeriodData).map((row, idx) => (
                <tr key={idx} className="hover:bg-[#f5f6f6] transition-colors group">
                  <td className="px-8 py-4">
                    <span className="text-xs font-black text-slate-900 group-hover:text-[#128C7E] transition-colors">{row.period}</span>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-sm font-bold text-slate-700">{row.volume.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center space-x-3">
                       <div className="w-20 h-1.5 bg-[#f0f2f5] rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${activeTab === 'incoming' ? 'bg-[#34B7F1]' : 'bg-[#128C7E]'}`} 
                            style={{ width: row.percent }}
                          ></div>
                       </div>
                       <span className="text-[10px] font-black text-slate-500">{row.percent}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className={`text-[10px] font-black uppercase tracking-tight ${row.color}`}>
                      {row.trend}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-[#fcfcfc] font-black border-t-2 border-[#d1d7db] sticky bottom-0">
                 <td className="px-8 py-6 text-sm uppercase text-slate-900">Total</td>
                 <td className="px-8 py-6 text-lg text-[#128C7E]">{activeTab === 'incoming' ? '40,361' : '49,833'}</td>
                 <td className="px-8 py-6 text-sm text-slate-500">100%</td>
                 <td className="px-8 py-6 text-xs text-slate-300">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
