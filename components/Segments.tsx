
import React, { useState } from 'react';
import { mockSegments, mockMembers } from '../services/mockData';
import { Segment } from '../types';
import { COLORS } from '../constants';

const Segments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'editor' | 'members'>('list');

  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'indigo': return 'bg-[#dcf8c6] text-[#075e54] border-[#c5e1a5]';
      case 'rose': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'emerald': return 'bg-[#25D366]/10 text-[#128C7E] border-[#25D366]/20';
      case 'slate': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#075e54] tracking-tighter uppercase">Segmentación Inteligente</h1>
          <p className="text-[#667781] font-medium italic mt-1">Gestión avanzada de perfiles y scoring de fidelidad</p>
        </div>
        <div className="flex bg-[#f0f2f5] p-1.5 rounded-2xl border border-[#d1d7db]">
          <button 
            onClick={() => setActiveTab('list')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'list' ? 'bg-white text-[#128C7E] shadow-sm' : 'text-[#667781] hover:text-[#075e54]'}`}
          >
            Mis Segmentos
          </button>
          <button 
            onClick={() => setActiveTab('editor')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'editor' ? 'bg-white text-[#128C7E] shadow-sm' : 'text-[#667781] hover:text-[#075e54]'}`}
          >
            Editor de Reglas
          </button>
          <button 
            onClick={() => setActiveTab('members')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'members' ? 'bg-white text-[#128C7E] shadow-sm' : 'text-[#667781] hover:text-[#075e54]'}`}
          >
            Miembros & Score
          </button>
        </div>
      </header>

      {activeTab === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockSegments.map((s) => (
            <div key={s.id} className="bg-white p-8 rounded-[2rem] border border-[#d1d7db] shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#25D366]/5 rounded-full -mr-12 -mt-12 group-hover:bg-[#25D366]/10 transition-colors"></div>
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${getBadgeColor(s.color)} border-2`}>
                  {s.nombre.charAt(0)}
                </div>
                <div className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${s.regla_activa ? 'bg-[#dcf8c6] text-[#075e54] border border-[#c5e1a5]' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
                  {s.regla_activa ? 'Auto-Active' : 'Manual'}
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">{s.nombre}</h3>
              <p className="text-xs text-[#667781] font-medium mb-6 line-clamp-2 leading-relaxed">{s.descripcion}</p>
              
              <div className="grid grid-cols-2 gap-4 border-t border-[#f0f2f5] pt-6">
                <div>
                  <p className="text-[9px] font-black text-[#667781] uppercase tracking-widest mb-1">Miembros</p>
                  <p className="text-lg font-black text-slate-900">{s.miembros.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-[#667781] uppercase tracking-widest mb-1">Conversion</p>
                  <p className="text-lg font-black text-[#128C7E]">{s.conversion}%</p>
                </div>
              </div>
              <button className="w-full mt-6 py-3 bg-[#f0f2f5] text-[#075e54] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#128C7E] hover:text-white transition-all">Ver Detalle</button>
            </div>
          ))}
          <button className="bg-white border-2 border-dashed border-[#d1d7db] p-8 rounded-[2rem] flex flex-col items-center justify-center text-[#667781] hover:border-[#25D366] hover:text-[#128C7E] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            <span className="text-[10px] font-black uppercase tracking-widest mt-4">Crear Segmento</span>
          </button>
        </div>
      )}

      {activeTab === 'editor' && (
        <div className="bg-white rounded-[2.5rem] border border-[#d1d7db] p-10 shadow-sm animate-fadeIn">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-black text-[#075e54] mb-8 tracking-tighter">Constructor de Lógica de Fidelización</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-6 bg-[#f0f2f5] rounded-2xl border border-[#d1d7db]">
                <span className="text-sm font-black text-[#54656f] uppercase">SI EL CLIENTE</span>
                <select className="flex-1 px-4 py-2 rounded-xl bg-white border border-[#d1d7db] font-bold text-sm outline-none focus:ring-2 focus:ring-[#25D366]">
                  <option>Ha gastado en total</option>
                  <option>Su última compra fue hace</option>
                  <option>Ha abierto mensajes</option>
                </select>
                <select className="w-24 px-4 py-2 rounded-xl bg-white border border-[#d1d7db] font-bold text-sm outline-none focus:ring-2 focus:ring-[#25D366]">
                  <option>{'>'}</option>
                  <option>{'<'}</option>
                  <option>{'='}</option>
                </select>
                <input type="text" placeholder="500" className="w-32 px-4 py-2 rounded-xl bg-white border border-[#d1d7db] font-bold text-sm outline-none focus:ring-2 focus:ring-[#25D366]" />
                <span className="text-sm font-black text-[#54656f] uppercase">USD</span>
              </div>
              
              <div className="flex items-center space-x-4 p-6 bg-[#dcf8c6]/50 rounded-2xl border border-[#c5e1a5]">
                <span className="text-sm font-black text-[#075e54] uppercase">ENTONCES MOVER A</span>
                <select className="flex-1 px-4 py-2 rounded-xl bg-white border border-[#c5e1a5] font-bold text-sm text-[#128C7E] outline-none focus:ring-2 focus:ring-[#25D366]">
                  <option>Segmento VIP</option>
                  <option>Segmento Fidelizado</option>
                  <option>Promociones Exclusivas</option>
                </select>
              </div>

              <div className="pt-6">
                <button className="px-8 py-4 bg-[#128C7E] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#075e54] transition-all">Activar Regla de Automatización</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div className="bg-white rounded-[2.5rem] border border-[#d1d7db] shadow-sm overflow-hidden animate-fadeIn">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#f0f2f5] border-b border-[#d1d7db]">
                  <th className="px-8 py-5 text-[10px] font-black text-[#54656f] uppercase tracking-widest">Cliente</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#54656f] uppercase tracking-widest">Score de Lealtad</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#54656f] uppercase tracking-widest">Segmentos</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#54656f] uppercase tracking-widest">Último Contacto</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#54656f] uppercase tracking-widest text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f2f5]">
                {mockMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-[#f5f6f6] transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-[#f0f2f5] flex items-center justify-center font-black text-[#128C7E] text-xs border border-[#d1d7db]">
                          {m.nombre.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{m.nombre}</p>
                          <p className="text-[10px] text-[#667781] font-bold uppercase">{m.telefono}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 w-32 h-2 bg-[#f0f2f5] rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${m.score > 80 ? 'bg-[#25D366]' : m.score > 40 ? 'bg-[#128C7E]' : 'bg-rose-500'}`} 
                            style={{ width: `${m.score}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-black text-slate-900">{m.score}/100</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-wrap gap-2">
                        {m.segmentos.map(seg => (
                          <span key={seg} className="px-2 py-0.5 bg-[#dcf8c6] text-[#075e54] text-[8px] font-black uppercase rounded border border-[#c5e1a5]">{seg}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-[10px] font-black text-[#667781] uppercase tracking-tighter">{m.ultimo_contacto}</p>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-[#128C7E] text-[10px] font-black uppercase tracking-widest hover:underline">Gestionar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Segments;
