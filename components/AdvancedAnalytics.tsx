
import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ComposedChart, Line, Area, Cell, PieChart, Pie
} from 'recharts';

const AdvancedAnalytics: React.FC = () => {
  // Datos procesados: Interés del cliente por Etapa del Embudo
  const radarData = [
    { subject: 'Atención', A: 120, B: 110, fullMark: 150 },
    { subject: 'Consideración', A: 98, B: 130, fullMark: 150 },
    { subject: 'Deseo', A: 86, B: 130, fullMark: 150 },
    { subject: 'Compra', A: 99, B: 100, fullMark: 150 },
    { subject: 'Lealtad', A: 85, B: 90, fullMark: 150 },
    { subject: 'Recomendación', A: 65, B: 85, fullMark: 150 },
  ];

  // Datos de Actividad por Horas (Heatmap simplificado)
  const activityData = [
    { hour: '08h', volume: 450, response: 1.2 },
    { hour: '10h', volume: 1200, response: 2.5 },
    { hour: '12h', volume: 800, response: 1.8 },
    { hour: '14h', volume: 1500, response: 3.1 },
    { hour: '16h', volume: 1100, response: 2.2 },
    { hour: '18h', volume: 900, response: 1.5 },
    { hour: '20h', volume: 600, response: 1.1 },
  ];

  // Distribución de Sentimiento
  const sentimentData = [
    { name: 'Positivo', value: 65, color: '#25D366' },
    { name: 'Neutral', value: 25, color: '#34B7F1' },
    { name: 'Crítico', value: 10, color: '#ef4444' },
  ];

  const conversionFunnel = [
    { name: 'Leads', value: 100 },
    { name: 'Interés', value: 75 },
    { name: 'Deseo', value: 45 },
    { name: 'Cierre', value: 22 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-2">
        <div>
          <h1 className="text-3xl font-black text-[#111b21] tracking-tighter uppercase leading-none">Intelligence Hub</h1>
          <p className="text-[#667781] font-bold text-[10px] uppercase tracking-[0.2em] mt-2">Analítica Predictiva y Procesamiento de Datos Maria AI</p>
        </div>
        <div className="flex items-center space-x-3">
           <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase border border-emerald-200">Datos Sincronizados</span>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">v2.5.0-PRO</span>
        </div>
      </header>

      {/* Fila 1: KPIs de Inteligencia */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#111b21] p-8 rounded-[2.5rem] text-white border border-[#2a3942] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/10 rounded-full blur-2xl"></div>
          <p className="text-[10px] font-black text-[#25D366] uppercase tracking-widest mb-4">Resolution Score</p>
          <h3 className="text-5xl font-black mb-2">92.4%</h3>
          <p className="text-xs font-medium text-slate-400">Eficiencia combinada Bot/Humano</p>
        </div>
        
        <div className="bg-white p-8 rounded-[2.5rem] border border-[#d1d7db] shadow-sm flex flex-col justify-between">
           <div>
              <p className="text-[10px] font-black text-[#667781] uppercase tracking-widest mb-4">Sentiment Index</p>
              <h3 className="text-4xl font-black text-slate-900">Estable</h3>
           </div>
           <div className="flex items-center space-x-4">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-[#25D366]" style={{ width: '85%' }}></div>
              </div>
              <span className="text-xs font-black text-emerald-600">85% Positivo</span>
           </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-[#d1d7db] shadow-sm flex flex-col justify-between">
           <div>
              <p className="text-[10px] font-black text-[#667781] uppercase tracking-widest mb-4">Proyección Mensual</p>
              <h3 className="text-4xl font-black text-[#128C7E]">+12.5k</h3>
           </div>
           <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Mensajes estimados para Diciembre</p>
        </div>
      </div>

      {/* Fila 2: Análisis de Actividad y Sentimiento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Actividad vs Tiempo de Respuesta */}
        <div className="bg-white p-10 rounded-[3rem] border border-[#d1d7db] shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase">Eficiencia de Respuesta</h3>
              <p className="text-[10px] font-bold text-[#667781] uppercase">Volumen vs Tiempo (ms)</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f5" />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fill: '#667781', fontSize: 10, fontWeight: 800}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#667781', fontSize: 10, fontWeight: 800}} />
                <Tooltip />
                <Bar dataKey="volume" fill="#128C7E" radius={[10, 10, 0, 0]} barSize={30} />
                <Line type="monotone" dataKey="response" stroke="#34B7F1" strokeWidth={4} dot={{r: 4}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Perfil del Cliente (Radar) */}
        <div className="bg-white p-10 rounded-[3rem] border border-[#d1d7db] shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase">Madurez del Embudo</h3>
              <p className="text-[10px] font-bold text-[#667781] uppercase">Interés por Etapa Operativa</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#f0f2f5" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#667781', fontSize: 10, fontWeight: 800}} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Meta actual" dataKey="A" stroke="#128C7E" fill="#128C7E" fillOpacity={0.6} />
                <Radar name="Proyectado" dataKey="B" stroke="#34B7F1" fill="#34B7F1" fillOpacity={0.4} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Fila 3: Embudo y Sentimiento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sentiment Pie */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-[#d1d7db] shadow-sm flex flex-col items-center">
          <h3 className="text-sm font-black text-slate-900 uppercase mb-6 self-start">Sentimiento Global</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full space-y-2 mt-4">
             {sentimentData.map(s => (
               <div key={s.name} className="flex justify-between items-center px-4 py-2 bg-slate-50 rounded-xl">
                  <span className="text-[10px] font-black text-slate-600 uppercase">{s.name}</span>
                  <span className="text-[10px] font-black text-slate-900">{s.value}%</span>
               </div>
             ))}
          </div>
        </div>

        {/* Conversión Funnel */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-[#d1d7db] shadow-sm overflow-hidden relative">
           <div className="absolute top-0 right-0 p-8">
              <div className="flex items-center space-x-2">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Optimización Activa</span>
              </div>
           </div>
           <h3 className="text-xl font-black text-slate-900 uppercase mb-10">Sales & Fidelity Funnel</h3>
           <div className="space-y-6 relative">
              {conversionFunnel.map((item, i) => (
                <div key={i} className="relative">
                   <div 
                    className="h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between px-8 relative z-10 hover:bg-[#128C7E] group transition-all"
                    style={{ width: `${100 - (i * 10)}%`, marginLeft: `${i * 5}%` }}
                   >
                      <span className="text-xs font-black text-slate-400 uppercase group-hover:text-white transition-colors">{item.name}</span>
                      <span className="text-lg font-black text-slate-900 group-hover:text-white transition-colors">{item.value}%</span>
                   </div>
                   {i < conversionFunnel.length - 1 && (
                     <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 z-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d1d7db" strokeWidth="3">
                           <path d="M12 5v14M19 12l-7 7-7-7"/>
                        </svg>
                     </div>
                   )}
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Maria AI Insight Box */}
      <div className="bg-[#111b21] rounded-[2.5rem] p-10 text-white border border-[#2a3942] flex flex-col md:flex-row items-center gap-10">
         <div className="w-32 h-32 rounded-full border-4 border-[#25D366] p-2 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#25D366] rounded-full flex items-center justify-center animate-pulse">
               <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#111b21]" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"/>
               </svg>
            </div>
         </div>
         <div>
            <div className="flex items-center space-x-3 mb-4">
               <span className="px-2 py-0.5 bg-[#25D366] text-[#111b21] text-[10px] font-black rounded uppercase">AI Insight</span>
               <h4 className="text-lg font-black uppercase tracking-tighter">Observación de Maria AI</h4>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              "He detectado un patrón de alta conversión en usuarios que interactúan entre las 14:00 y las 16:00. 
              Sin embargo, el tiempo de respuesta promedio en esa franja sube a 3.1s. Recomiendo activar 
              el **Modo Turbo** de respuestas automatizadas para el segmento 'Interés' durante este período."
            </p>
            <button className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-[#25D366] hover:text-[#111b21] rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
               Aplicar Optimización Automática
            </button>
         </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
