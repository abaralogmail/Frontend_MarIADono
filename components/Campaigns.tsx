
import React from 'react';
import { mockCampaigns } from '../services/mockData';

const Campaigns: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Campañas Multicanal</h1>
          <p className="text-slate-500">Gestión de campañas, tracking y analytics (campaign_analytics)</p>
        </div>
        <button className="flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
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
    </div>
  );
};

export default Campaigns;
