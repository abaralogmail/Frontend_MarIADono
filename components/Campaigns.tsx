
import React, { useState } from 'react';
import { mockCampaigns } from '../services/mockData';

interface CampaignForm {
  name: string;
  channel: 'whatsapp' | 'email' | 'sms';
  segment: string;
  template: string;
  schedule: 'now' | 'later';
  scheduledDate?: string;
}

const CampaignBuilder: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const [form, setForm] = useState<CampaignForm>({
    name: '',
    channel: 'whatsapp',
    segment: 'Clientes VIP',
    template: 'Hola {{nombre}}, tenemos una oferta exclusiva para ti...',
    schedule: 'now'
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
      {/* Configuration Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Configurar Campaña</h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nombre de la Campaña</label>
            <input 
              type="text" 
              placeholder="Ej: Promo Verano 2024"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(['whatsapp', 'email', 'sms'] as const).map((ch) => (
              <button
                key={ch}
                onClick={() => setForm({...form, channel: ch})}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                  form.channel === ch ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 hover:border-slate-200 text-slate-400'
                }`}
              >
                <span className="mb-2">
                  {ch === 'whatsapp' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.3 8.5 8.5 0 0 1 5 1.5l3.5-1.5Z"/></svg>}
                  {ch === 'email' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>}
                  {ch === 'sms' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L2 22"/><path d="M2 2l20 20"/></svg>}
                </span>
                <span className="text-[10px] font-black uppercase">{ch}</span>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Segmento de Audiencia</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-no-repeat bg-[right_1rem_center]"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")' }}
              value={form.segment}
              onChange={(e) => setForm({...form, segment: e.target.value})}
            >
              <option>Clientes VIP</option>
              <option>Nuevos Leads</option>
              <option>Carrito Abandonado</option>
              <option>Re-engagement</option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Plantilla del Mensaje</label>
              <span className="text-[10px] text-indigo-600 font-bold cursor-pointer hover:underline">Insertar Variable</span>
            </div>
            <textarea 
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-sm"
              value={form.template}
              onChange={(e) => setForm({...form, template: e.target.value})}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">
              Guardar Borrador
            </button>
            <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
              Lanzar Campaña
            </button>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="hidden lg:flex flex-col items-center justify-center p-8 bg-slate-100/50 rounded-3xl border border-slate-200 border-dashed">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Vista Previa WhatsApp</p>
        
        {/* Device Frame */}
        <div className="w-[300px] h-[600px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden relative">
          {/* Top Speaker/Camera */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-slate-800 rounded-b-2xl z-20"></div>
          
          {/* Mock Screen Content */}
          <div className="h-full w-full bg-[#efeae2] flex flex-col pt-10">
             <div className="bg-[#075e54] p-3 flex items-center space-x-2 text-white">
                <div className="w-8 h-8 rounded-full bg-slate-200/20"></div>
                <div>
                  <p className="text-xs font-bold">{form.name || 'Nueva Campaña'}</p>
                  <p className="text-[8px] opacity-70">En línea</p>
                </div>
             </div>
             
             <div className="flex-1 p-3 overflow-y-auto">
                <div className="bg-white rounded-lg p-2.5 shadow-sm max-w-[85%] relative">
                   <p className="text-[11px] text-slate-800 leading-normal">
                    {form.template.replace('{{nombre}}', 'Juan')}
                   </p>
                   <p className="text-[8px] text-slate-400 text-right mt-1">10:45 AM</p>
                </div>
             </div>

             <div className="p-2 bg-[#f0f2f5] flex items-center space-x-2">
                <div className="w-full h-8 bg-white rounded-full"></div>
                <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Campaigns: React.FC = () => {
  const [mode, setMode] = useState<'list' | 'build'>('list');

  return (
    <div className="space-y-8 animate-fadeIn">
      {mode === 'list' ? (
        <>
          <header className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Campañas Multicanal</h1>
              <p className="text-slate-500">Gestión de campañas, tracking y analíticas avanzadas</p>
            </div>
            <button 
              onClick={() => setMode('build')}
              className="flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              <span>Nueva Campaña</span>
            </button>
          </header>

          <div className="grid grid-cols-1 gap-6">
            {mockCampaigns.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-lg transition-all border-l-4 border-l-indigo-600">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{c.name}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      c.status === 'completed' ? 'bg-slate-100 text-slate-600' :
                      c.status === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">Multicanal: WhatsApp, Email, SMS</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 text-center">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Enviados</p>
                    <p className="text-lg font-bold text-slate-900">{c.sent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Abiertos</p>
                    <p className="text-lg font-bold text-slate-900">{c.opened.toLocaleString()}</p>
                    <p className="text-[10px] text-emerald-600 font-bold">{Math.round((c.opened/c.sent)*100 || 0)}% Open Rate</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Clicks</p>
                    <p className="text-lg font-bold text-slate-900">{c.clicked.toLocaleString()}</p>
                    <p className="text-[10px] text-indigo-600 font-bold">{Math.round((c.clicked/c.opened)*100 || 0)}% CTR</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Conversión</p>
                    <p className="text-lg font-bold text-slate-900">{c.conversion.toLocaleString()}</p>
                    <p className="text-[10px] text-amber-600 font-bold">{Math.round((c.conversion/c.sent)*100 || 0)}% CR</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <CampaignBuilder onCancel={() => setMode('list')} />
      )}
    </div>
  );
};

export default Campaigns;
