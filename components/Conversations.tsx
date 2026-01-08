
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { mockConversations } from '../services/mockData';
import { ConversationLog, Role } from '../types';
import { COLORS } from '../constants';

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onSendMessage(selectedContact, newMessage);
    setNewMessage('');
  };

  const activeContactData = contacts.find(c => c.from === selectedContact);

  return (
    <div className="flex h-[80vh] bg-white rounded-3xl overflow-hidden border border-[#d1d7db] shadow-2xl animate-fadeIn">
      {/* Listado de Contactos CRM */}
      <div className="w-1/3 border-r border-[#d1d7db] flex flex-col bg-white">
        <div className="p-4 bg-[#f0f2f5] flex items-center justify-between border-b border-[#d1d7db]">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
             </div>
             <div>
                <h3 className="text-sm font-bold text-slate-900">Conversaciones</h3>
                <p className="text-[10px] font-black text-[#128C7E] uppercase tracking-widest">Maria Business AI</p>
             </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-white">
          {contacts.map((contact) => (
            <div 
              key={contact.from}
              onClick={() => setSelectedContact(contact.from)}
              className={`flex flex-col px-4 py-3 cursor-pointer border-b border-[#f0f2f5] transition-all ${selectedContact === contact.from ? 'bg-[#f0f2f5]' : 'hover:bg-[#f5f6f6]'}`}
            >
              <div className="flex items-center mb-1">
                <div className="w-12 h-12 rounded-full bg-slate-200 mr-3 flex-shrink-0 flex items-center justify-center font-black text-slate-500 overflow-hidden">
                   <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${contact.pushname}`} alt={contact.pushname} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-slate-900 truncate text-sm">{contact.pushname}</h4>
                    <span className="text-[9px] text-[#667781] font-bold">{contact.time}</span>
                  </div>
                  <p className="text-xs text-[#667781] truncate">{contact.lastMessage}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="px-2 py-0.5 bg-[#dcf8c6] text-[#075e54] text-[8px] font-black uppercase rounded-lg border border-[#c5e1a5]">{contact.etapa}</span>
                <span className="px-2 py-0.5 bg-blue-50 text-[#128C7E] text-[8px] font-black uppercase rounded-lg border border-blue-100">{contact.interes}% Interés</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área de Chat */}
      <div className="flex-1 flex flex-col bg-[#efeae2] relative">
        {/* Chat Header */}
        <div className="z-10 px-4 py-3 bg-[#f0f2f5] flex items-center justify-between border-b border-[#d1d7db] shadow-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-slate-200 mr-3 overflow-hidden border border-slate-300">
               <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${activeContactData?.pushname}`} alt="user" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{activeContactData?.pushname}</h4>
              <p className="text-[10px] text-[#667781] font-bold">últ. vez hoy a las {activeContactData?.time}</p>
            </div>
          </div>
          <div className="flex space-x-4">
             <button className="p-2 text-[#54656f] hover:text-[#128C7E] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
             </button>
             <button className="px-4 py-2 bg-[#128C7E] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-[#075e54] transition-all">
                Cerrar Caso
             </button>
          </div>
        </div>

        {/* Mensajes */}
        <div className="z-10 flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[url('https://w0.peakpx.com/wallpaper/580/630/HD-wallpaper-whatsapp-background-whatsapp-theme-light.jpg')] bg-repeat">
          {activeConversation.map((msg) => {
            const isBot = msg.role === 'bot' || msg.role === 'agent';
            return (
              <div key={msg.id} className={`flex ${isBot ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-xl p-3 shadow-sm text-sm relative group ${isBot ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none'}`}>
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

        {/* Input */}
        <div className="z-10 p-4 bg-[#f0f2f5] flex items-center space-x-3">
          <button className="text-[#54656f] p-2 hover:bg-slate-200 rounded-full transition-all">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          </button>
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Escribe un mensaje" 
              className="w-full px-4 py-3 bg-white border-none rounded-xl text-sm outline-none shadow-sm"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(e as any)}
            />
          </div>
          <button 
            onClick={handleSendMessage}
            className={`p-3 rounded-full transition-all ${newMessage.trim() ? 'text-[#128C7E]' : 'text-[#54656f]'}`}
            disabled={!newMessage.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
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
      botname: 'Maria Fidelity AI'
    };

    setLogs(prev => [...prev, newLog]);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#075e54] tracking-tighter uppercase">Registro de Fidelización</h1>
          <p className="text-[#667781] font-medium italic mt-1">Historial WhatsApp Business gestionado por Maria AI</p>
        </div>
        <div className="flex bg-[#f0f2f5] p-1.5 rounded-2xl border border-[#d1d7db]">
          <button 
            onClick={() => setViewMode('table')}
            className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'table' ? 'bg-white text-[#128C7E] shadow-md' : 'text-[#667781]'}`}
          >
            VISTA TABLA
          </button>
          <button 
            onClick={() => setViewMode('whatsapp')}
            className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'whatsapp' ? 'bg-[#128C7E] text-white shadow-md' : 'text-[#667781]'}`}
          >
            VISTA CHAT
          </button>
        </div>
      </header>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <input 
            type="text" 
            placeholder="Buscar por nombre o número (+E.164)..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-[#d1d7db] rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#25D366] outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#667781]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <select 
          className="w-full px-4 py-3 bg-white border border-[#d1d7db] rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#25D366] outline-none transition-all shadow-sm appearance-none"
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
        <div className="bg-white rounded-3xl border border-[#d1d7db] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#f0f2f5] border-b border-[#d1d7db]">
                  <th className="px-8 py-5 text-[10px] font-black text-[#54656f] uppercase tracking-widest">Contacto</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#54656f] uppercase tracking-widest">Embudo</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#54656f] uppercase tracking-widest">Mensaje</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#54656f] uppercase tracking-widest">Interés</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#54656f] uppercase tracking-widest text-right">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f2f5]">
                {filteredLogs.slice().reverse().map((log) => (
                  <tr key={log.id} className="hover:bg-[#f5f6f6] transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-[10px] ${
                          log.role === 'bot' ? 'bg-[#dcf8c6] text-[#075e54]' : 'bg-blue-50 text-[#128C7E]'
                        }`}>
                          {log.pushname.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{log.pushname}</p>
                          <p className="text-[10px] text-[#667781] font-bold uppercase">{log.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-[#f0f2f5] text-[#54656f] text-[9px] font-black uppercase rounded-lg border border-[#d1d7db]">{log.etapaembudo}</span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm text-[#54656f] font-medium truncate max-w-xs">{log.body}</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 w-16 bg-[#f0f2f5] h-1.5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#25D366]" style={{ width: `${log.interescliente}%` }}></div>
                        </div>
                        <span className="text-[10px] font-black text-[#54656f]">{log.interescliente}%</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <p className="text-[10px] font-black text-slate-900 uppercase">{log.time}</p>
                      <p className="text-[9px] text-[#667781] font-bold uppercase">{log.date}</p>
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

export default Conversations;
