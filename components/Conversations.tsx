
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { mockConversations } from '../services/mockData';
import { ConversationLog, Role } from '../types';

interface WhatsAppViewProps {
  logs: ConversationLog[];
  onSendMessage: (contactFrom: string, text: string) => void;
}

const WhatsAppView: React.FC<WhatsAppViewProps> = ({ logs, onSendMessage }) => {
  const contacts = useMemo(() => {
    const map = new Map<string, { pushname: string, lastMessage: string, time: string, unread: number, etapa: string, interes: number }>();
    logs.forEach(log => {
      const existing = map.get(log.from);
      const logDateTime = log.date + ' ' + log.time;
      const existingDateTime = existing ? logs.find(l => l.body === existing.lastMessage)?.date + ' ' + existing.time : '';

      if (!map.has(log.from) || logDateTime > existingDateTime) {
        map.set(log.from, {
          pushname: log.pushname,
          lastMessage: log.body,
          time: log.time,
          unread: log.role === 'cliente' ? 1 : 0,
          etapa: log.etapaembudo,
          interes: log.interescliente
        });
      }
    });
    return Array.from(map.entries()).map(([from, data]) => ({ from, ...data }));
  }, [logs]);

  const [selectedContact, setSelectedContact] = useState(contacts[0]?.from || '');
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "¡Hola! ¿En qué puedo ayudarte hoy?",
    "Claro, déjame revisar tu saldo de puntos.",
    "Tu cupón de descuento ya está activo. 🎟️",
    "Gracias por la ayuda.",
    "Te envío el catálogo actualizado."
  ];

  const activeConversation = useMemo(() => {
    return logs
      .filter(log => log.from === selectedContact)
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  }, [logs, selectedContact]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMessage.trim()) return;
    onSendMessage(selectedContact, newMessage);
    setNewMessage('');
  };

  const activeContactData = contacts.find(c => c.from === selectedContact);

  return (
    <div className="flex h-[calc(100vh-280px)] min-h-[500px] bg-white rounded-3xl overflow-hidden border border-[#d1d7db] shadow-xl animate-fadeIn">
      {/* Sidebar de Contactos */}
      <div className="w-80 border-r border-[#d1d7db] flex flex-col bg-white shrink-0">
        <div className="p-4 bg-[#f0f2f5] border-b border-[#d1d7db] flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-200">
             <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#25D366]" fill="currentColor">
               <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
             </svg>
          </div>
          <div className="min-w-0">
             <h3 className="text-xs font-black text-slate-900 truncate">WhatsApp Business</h3>
             <p className="text-[9px] font-bold text-[#128C7E] uppercase tracking-wider">Gestión Maria AI</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div 
              key={contact.from}
              onClick={() => setSelectedContact(contact.from)}
              className={`p-4 cursor-pointer border-b border-[#f0f2f5] transition-all ${selectedContact === contact.from ? 'bg-[#f0f2f5]' : 'hover:bg-[#f5f6f6]'}`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 overflow-hidden font-black text-slate-500 flex items-center justify-center">
                   <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${contact.pushname}`} alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold text-slate-900 truncate">{contact.pushname}</p>
                    <span className="text-[9px] text-[#667781] font-bold">{contact.time}</span>
                  </div>
                  <p className="text-xs text-[#667781] truncate">{contact.lastMessage}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-1.5 py-0.5 bg-[#dcf8c6] text-[#075e54] text-[8px] font-black uppercase rounded border border-[#c5e1a5]">{contact.etapa}</span>
                <span className="text-[9px] font-bold text-[#128C7E]">{contact.interes}% Interés</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área Central del Chat */}
      <div className="flex-1 flex flex-col bg-[#efeae2] relative overflow-hidden">
        {/* Chat Header */}
        <div className="h-16 px-6 bg-[#f0f2f5] flex items-center justify-between border-b border-[#d1d7db] shrink-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 overflow-hidden border border-slate-300">
               <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${activeContactData?.pushname}`} alt="" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{activeContactData?.pushname}</h4>
              <p className="text-[10px] text-[#667781] font-bold uppercase">En Línea</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
             <div className="px-3 py-1 bg-white rounded-full border border-slate-200 flex items-center space-x-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#25D366]" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">API Business</span>
             </div>
          </div>
        </div>

        {/* Área de Mensajes */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[url('https://w0.peakpx.com/wallpaper/580/630/HD-wallpaper-whatsapp-background-whatsapp-theme-light.jpg')] bg-repeat">
          {activeConversation.map((msg) => {
            const isBot = msg.role === 'bot' || msg.role === 'agent';
            return (
              <div key={msg.id} className={`flex ${isBot ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl p-3 shadow-sm text-sm relative ${isBot ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none'}`}>
                  {isBot && (
                    <div className="flex items-center space-x-1 mb-1 border-b border-black/5 pb-1">
                      <span className="text-[9px] font-black text-[#128C7E] uppercase tracking-widest">{msg.botname || 'Agente'}</span>
                    </div>
                  )}
                  <p className="text-[#111b21] leading-relaxed text-sm">{msg.body}</p>
                  <div className="flex items-center justify-end mt-1 space-x-1">
                    <span className="text-[9px] text-[#667781] font-bold">{msg.time}</span>
                    {isBot && (
                      <svg className="text-[#34B7F1]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Input & Sugerencias */}
        <div className="bg-[#f0f2f5] border-t border-[#d1d7db] shrink-0">
          <div className="px-4 py-2 flex items-center space-x-2 overflow-x-auto no-scrollbar scroll-smooth">
            <span className="shrink-0 text-[9px] font-black text-[#667781] uppercase tracking-tighter mr-2">Sugerencias:</span>
            {suggestions.map((text, idx) => (
              <button 
                key={idx}
                onClick={() => setNewMessage(text)}
                className="shrink-0 px-3 py-1.5 bg-white border border-[#d1d7db] hover:border-[#25D366] rounded-full text-[10px] font-bold text-slate-700 transition-all shadow-sm"
              >
                {text}
              </button>
            ))}
          </div>

          <div className="p-4 flex items-center space-x-3">
            <button className="text-[#54656f] p-2 hover:bg-slate-200 rounded-full transition-all shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
            </button>
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Escribe un mensaje" 
                className="w-full px-4 py-3 bg-white border border-transparent focus:border-[#d1d7db] rounded-xl text-sm outline-none shadow-sm transition-all"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(e as any)}
              />
            </div>
            <button 
              onClick={() => handleSendMessage()}
              className={`p-3 rounded-full transition-all shrink-0 flex items-center justify-center ${
                newMessage.trim() 
                  ? 'bg-[#128C7E] text-white shadow-lg scale-105' 
                  : 'bg-transparent text-[#54656f] opacity-40'
              }`}
              disabled={!newMessage.trim()}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

const Conversations: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'whatsapp'>('whatsapp');
  const [logs, setLogs] = useState<ConversationLog[]>(mockConversations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEtapa, setSelectedEtapa] = useState('Todas');

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = log.pushname.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           log.from.includes(searchTerm);
      const matchesEtapa = selectedEtapa === 'Todas' || log.etapaembudo === selectedEtapa;
      return matchesSearch && matchesEtapa;
    });
  }, [logs, searchTerm, selectedEtapa]);

  const handleSendMessage = (contactFrom: string, text: string) => {
    const now = new Date();
    const contactInfo = logs.find(l => l.from === contactFrom);
    
    const newLog: ConversationLog = {
      id: `new-${Date.now()}`,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      from: contactFrom,
      role: 'agent',
      pushname: contactInfo?.pushname || 'Usuario',
      body: text,
      messageid: `wa-${Math.random().toString(36).substr(2, 9)}`,
      etapaembudo: contactInfo?.etapaembudo || 'Atención',
      interescliente: contactInfo?.interescliente || 50,
      botname: 'Agente Humano'
    };

    setLogs(prev => [...prev, newLog]);
  };

  return (
    <div className="flex flex-col space-y-6 animate-fadeIn h-full">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0 px-2">
        <div>
          <h1 className="text-2xl font-black text-[#075e54] tracking-tighter uppercase">Conversaciones</h1>
          <p className="text-[#667781] text-xs font-bold uppercase tracking-wider">Historial n8n_whatsapp_log</p>
        </div>
        <div className="flex bg-white/50 p-1 rounded-2xl border border-[#d1d7db] backdrop-blur-sm shadow-sm">
          <button 
            onClick={() => setViewMode('table')}
            className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === 'table' ? 'bg-[#128C7E] text-white shadow-md' : 'text-[#667781]'}`}
          >
            LISTADO
          </button>
          <button 
            onClick={() => setViewMode('whatsapp')}
            className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === 'whatsapp' ? 'bg-[#128C7E] text-white shadow-md' : 'text-[#667781]'}`}
          >
            VISTA CHAT
          </button>
        </div>
      </header>

      {/* Contenedor Principal Ajustado */}
      <div className="flex flex-col flex-1 min-h-0 bg-transparent rounded-3xl">
        {/* Filtros compactos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6 shrink-0 px-2">
          <div className="md:col-span-3 relative">
            <input 
              type="text" 
              placeholder="Buscar por nombre o número..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#d1d7db] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#25D366] outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#667781]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <select 
            className="w-full px-4 py-3 bg-white border border-[#d1d7db] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#25D366] outline-none transition-all shadow-sm"
            value={selectedEtapa}
            onChange={(e) => setSelectedEtapa(e.target.value)}
          >
            <option>Todas</option>
            <option>Atención</option>
            <option>Consideración</option>
            <option>Compra</option>
            <option>Post-Venta</option>
          </select>
        </div>

        {viewMode === 'whatsapp' ? (
          <WhatsAppView logs={filteredLogs} onSendMessage={handleSendMessage} />
        ) : (
          <div className="bg-white rounded-3xl border border-[#d1d7db] shadow-sm overflow-hidden flex-1 flex flex-col min-h-0">
            <div className="overflow-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-20 bg-[#f0f2f5]">
                  <tr>
                    <th className="px-6 py-4 text-[9px] font-black text-[#54656f] uppercase border-b border-[#d1d7db]">Contacto</th>
                    <th className="px-6 py-4 text-[9px] font-black text-[#54656f] uppercase border-b border-[#d1d7db]">Etapa</th>
                    <th className="px-6 py-4 text-[9px] font-black text-[#54656f] uppercase border-b border-[#d1d7db]">Último Mensaje</th>
                    <th className="px-6 py-4 text-[9px] font-black text-[#54656f] uppercase border-b border-[#d1d7db] text-right">Fecha/Hora</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f2f5]">
                  {filteredLogs.slice().reverse().map((log) => (
                    <tr key={log.id} className="hover:bg-[#f5f6f6] transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-xs font-bold text-slate-900">{log.pushname}</p>
                        <p className="text-[9px] text-[#667781] font-bold">{log.from}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-[#dcf8c6] text-[#075e54] text-[8px] font-black uppercase rounded border border-[#c5e1a5]">{log.etapaembudo}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-[#54656f] truncate max-w-md">{log.body}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-[10px] font-bold text-slate-900">{log.time}</p>
                        <p className="text-[9px] text-[#667781] font-bold">{log.date}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversations;
