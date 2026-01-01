
import React from 'react';
import { mockHorarios } from '../services/mockData';

const Scheduling: React.FC = () => {
  const rules = [
    { day: 'Lunes', hours: '09:00 - 18:00', status: 'Abierto' },
    { day: 'Martes', hours: '09:00 - 18:00', status: 'Abierto' },
    { day: 'Miércoles', hours: '09:00 - 18:00', status: 'Abierto' },
    { day: 'Jueves', hours: '09:00 - 18:00', status: 'Abierto' },
    { day: 'Viernes', hours: '09:00 - 18:00', status: 'Abierto' },
    { day: 'Sábado', hours: '-', status: 'Cerrado' },
    { day: 'Domingo', hours: '-', status: 'Cerrado' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Horarios de Atención</h1>
          <p className="text-slate-500">Configuración de disponibilidad y reglas del Bot (reglas_horario)</p>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">Crear Excepción</button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
              <span className="mr-2 text-indigo-600"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span>
              Calendario Semanal
            </h3>
            <div className="space-y-3">
              {rules.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                  <div className="flex items-center space-x-4">
                    <span className="w-24 text-sm font-bold text-slate-700">{r.day}</span>
                    <span className="text-sm text-slate-500 font-mono bg-slate-100 px-3 py-1 rounded-lg">{r.hours}</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${r.status === 'Abierto' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Información del Bot</h3>
            <div className="space-y-4">
              {mockHorarios.map(h => (
                <div key={h.horario_id} className="space-y-3">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Perfil Activo</label>
                    <p className="text-sm font-bold text-slate-800">{h.nombre}</p>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Asignado a</label>
                    <p className="text-sm text-indigo-600 font-medium">{h.bot_name}</p>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Zona Horaria</label>
                    <p className="text-sm text-slate-700">{h.zona_horaria}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-rose-50 rounded-2xl border border-rose-100 p-6">
            <h3 className="text-lg font-bold text-rose-900 mb-2">Próximas Excepciones</h3>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-xl border border-rose-100 shadow-sm">
                <p className="text-sm font-bold text-slate-800">Feriado Nacional</p>
                <p className="text-xs text-slate-500 mb-2">25 Noviembre, 2023</p>
                <span className="text-[10px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full uppercase">Cerrado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduling;
