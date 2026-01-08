
import React, { useState, useRef } from 'react';

const Import: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && (selectedFile.name.endsWith('.sqlite') || selectedFile.name.endsWith('.db'))) {
      setFile(selectedFile);
      setStep(2);
    } else {
      alert('Por favor selecciona un archivo .sqlite o .db válido.');
    }
  };

  const simulateImport = () => {
    setIsProcessing(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsProcessing(false);
        setStep(3);
      }
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <header className="px-2">
        <h1 className="text-3xl font-black text-[#075e54] tracking-tighter uppercase leading-none">Importar Base de Datos</h1>
        <p className="text-[#667781] font-bold text-[10px] uppercase tracking-[0.2em] mt-2">Sincronización de registros conversations_log (.sqlite)</p>
      </header>

      {/* Stepper Superior */}
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-[#d1d7db] shadow-sm">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 transition-all ${
              step >= s ? 'bg-[#128C7E] border-[#128C7E] text-white' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}>
              {s}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s ? 'text-slate-900' : 'text-slate-400'}`}>
              {s === 1 ? 'Selección' : s === 2 ? 'Análisis' : 'Finalizado'}
            </span>
            {s < 3 && <div className="w-12 h-px bg-slate-200"></div>}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="bg-white border-4 border-dashed border-slate-200 rounded-[3rem] p-20 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#25D366] hover:bg-slate-50/50 transition-all group"
        >
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#667781" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </div>
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Cargar Archivo SQLite</h3>
          <p className="text-xs font-bold text-[#667781] uppercase mt-2">Arrastra tu archivo .sqlite o haz clic para buscar</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept=".sqlite,.db"
          />
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-[3rem] border border-[#d1d7db] overflow-hidden shadow-xl animate-fadeIn">
          <div className="p-10 border-b border-[#f0f2f5] bg-slate-50/50">
             <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 bg-[#128C7E] rounded-2xl flex items-center justify-center text-white font-black text-lg">SQL</div>
                   <div>
                      <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{file?.name}</h3>
                      <p className="text-[10px] font-bold text-[#667781] uppercase">Tamaño: {(file!.size / 1024 / 1024).toFixed(2)} MB</p>
                   </div>
                </div>
                <button 
                   onClick={() => setStep(1)}
                   className="text-[10px] font-black uppercase text-[#667781] hover:text-rose-500"
                >
                   Cambiar Archivo
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="p-6 bg-white rounded-2xl border border-slate-200">
                   <p className="text-[10px] font-black text-[#667781] uppercase tracking-widest mb-4">Tabla Detectada</p>
                   <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-900">conversations_log</span>
                      <span className="px-3 py-1 bg-emerald-100 text-[#128C7E] text-[10px] font-black rounded-lg uppercase">90,194 Filas</span>
                   </div>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-200">
                   <p className="text-[10px] font-black text-[#667781] uppercase tracking-widest mb-4">Estado del Esquema</p>
                   <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-900">Validado (Meta API)</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                   </div>
                </div>
             </div>

             {isProcessing ? (
                <div className="space-y-4">
                   <div className="flex justify-between items-end">
                      <p className="text-[10px] font-black text-[#128C7E] uppercase tracking-widest">Indexando registros...</p>
                      <p className="text-xl font-black text-slate-900">{progress}%</p>
                   </div>
                   <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#25D366] transition-all duration-300" 
                        style={{ width: `${progress}%` }}
                      ></div>
                   </div>
                </div>
             ) : (
                <button 
                  onClick={simulateImport}
                  className="w-full py-5 bg-[#128C7E] text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-[#075e54] transition-all"
                >
                  Impactar Sistema con 90,194 Mensajes
                </button>
             )}
          </div>
          <div className="p-8">
             <p className="text-[10px] font-bold text-[#667781] uppercase tracking-widest leading-loose">
               ADVERTENCIA: Esta acción actualizará todas las métricas del Panel de Control, el análisis por período y el historial de conversaciones. Los datos actuales serán reemplazados por los contenidos en el archivo SQLite.
             </p>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-[3rem] p-20 border border-[#d1d7db] shadow-xl text-center animate-fadeIn">
          <div className="w-24 h-24 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-[#25D366]">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#128C7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">¡Importación Exitosa!</h2>
          <p className="text-[#667781] text-sm font-bold uppercase tracking-wider mb-10 max-w-md mx-auto">
            Se han procesado 90,194 mensajes. La base de datos de fidelización ahora refleja la estructura de {file?.name}.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
             <button 
                onClick={() => window.location.reload()}
                className="px-10 py-4 bg-[#128C7E] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-[#075e54] transition-all"
             >
                Ver Dashboard Actualizado
             </button>
             <button 
                onClick={() => setStep(1)}
                className="px-10 py-4 bg-slate-50 border border-slate-200 text-[#667781] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all"
             >
                Importar Otro Archivo
             </button>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="bg-[#111b21] p-8 rounded-[2rem] border border-[#2a3942] flex items-center space-x-6 shadow-2xl">
         <div className="w-12 h-12 bg-[#25D366]/10 rounded-2xl flex items-center justify-center border border-[#25D366]/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
         </div>
         <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em]">Seguridad & Integridad</h4>
            <p className="text-[#667781] text-[9px] font-bold mt-1 uppercase leading-relaxed">
              El motor de importación valida la integridad referencial de cada mensaje antes de impactar en el almacenamiento persistente de MarIADono.
            </p>
         </div>
      </div>
    </div>
  );
};

export default Import;
