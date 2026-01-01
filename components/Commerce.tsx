
import React from 'react';
import { mockProducts } from '../services/mockData';

const Commerce: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">E-commerce y Catálogo</h1>
          <p className="text-slate-500">Gestión de productos, stock y ofertas especiales</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">Importar CSV</button>
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">Agregar Producto</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockProducts.map((p) => (
          <div key={p.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden group hover:border-indigo-500 transition-all">
            <div className="aspect-video w-full bg-slate-100 flex items-center justify-center relative overflow-hidden">
               <img src={`https://picsum.photos/seed/${p.id}/600/400`} alt={p.nombre} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
               {p.oferta && (
                 <div className="absolute top-4 right-4 bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase">Oferta</div>
               )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-slate-900">{p.nombre}</h3>
                <div className="text-right">
                  {p.oferta ? (
                    <>
                      <p className="text-xs text-slate-400 line-through">${p.precio}</p>
                      <p className="text-xl font-black text-indigo-600">${p.oferta}</p>
                    </>
                  ) : (
                    <p className="text-xl font-black text-slate-900">${p.precio}</p>
                  )}
                </div>
              </div>
              <p className="text-sm text-slate-500 mb-6 line-clamp-2">{p.descripcion}</p>
              
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${p.stock < 15 ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                  <span className="text-xs font-bold text-slate-600">{p.stock} en stock</span>
                </div>
                <div className="flex space-x-1">
                  <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-indigo-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  </button>
                  <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-rose-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commerce;
