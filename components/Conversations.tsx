
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
    <div className="flex h-[80vh] bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl animate-fadeIn">
      {/* Listado de Contactos CRM */}
      <div className="w-1/3 border-r border-slate-200 flex flex-col bg-slate-50/50">
        <div className="p-6 bg-white border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Conversaciones</h3>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Maria AI Fidelity</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {contacts.map((contact) => (
            <div 
              key={contact.from}
              onClick={() => setSelectedContact(contact.from)}
              className={`flex flex-col px-6 py-5 cursor-pointer border-b border-slate-100 transition-all ${selectedContact === contact.from ? 'bg-white shadow-lg z-10 scale-[1.02] border-l-4 border-l-blue-600' : 'hover:bg-white/60'}`}
            >
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 mr-4 flex-shrink-0 flex items-center justify-center font-black text-blue-600 overflow-hidden shadow-sm border-2 border-white">
                  {contact.pushname.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-black text-slate-900 truncate text-sm">{contact.pushname}</h4>
                    <span className="text-[9px] text-slate-400 font-bold uppercase">{contact.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate font-medium">{contact.lastMessage}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[8px] font-black uppercase rounded border border-blue-100">{contact.etapa}</span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase rounded border border-emerald-100">{contact.interes}% Interés</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área de Chat & CRM Info */}
      <div className="flex-1 flex flex-col bg-[#f8fafc] relative">
        {/* Chat Header */}
        <div className="z-10 px-8 py-4 bg-white flex items-center justify-between border-b border-slate-200 shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 mr-4 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center font-black text-slate-400">
              {activeContactData?.pushname.charAt(0)}
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900 tracking-tight">{activeContactData?.pushname}</h4>
              <div className="flex items-center space-x-3 mt-0.5">
                 <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest flex items-center">
                   <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                   CRM Activo
                 </p>
                 <span className="text-[10px] text-slate-400 font-bold">{activeContactData?.from}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
             <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-blue-600 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
             </button>
             <button className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                <span className="text-xs font-black uppercase tracking-widest px-2">Cerrar Ticket</span>
             </button>
          </div>
        </div>

        {/* Mensajes con Identidad Maria AI */}
        <div className="z-10 flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
          {activeConversation.map((msg) => {
            const isBot = msg.role === 'bot' || msg.role === 'agent';
            return (
              <div key={msg.id} className={`flex ${isBot ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-3xl p-5 shadow-sm text-sm relative group ${isBot ? 'bg-white rounded-tr-none border-t-4 border-t-blue-600' : 'bg-[#e2e8f0]/40 backdrop-blur-sm rounded-tl-none'}`}>
                  {isBot && (
                    <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-slate-100">
                      <div className="w-6 h-6 rounded-lg bg-blue-100 overflow-hidden border border-blue-200 p-0.5">
                        <img 
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria&backgroundColor=b6e3f4" 
                          alt="Maria" 
                        />
                      </div>
                      <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">{msg.botname || 'Maria AI Fidelity'}</span>
                    </div>
                  )}
                  <p className="text-slate-800 leading-relaxed font-semibold">{msg.body}</p>
                  <div className="flex items-center justify-end mt-2 space-x-2">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{msg.time}</span>
                    {isBot && (
                      <svg className="text-blue-500" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Input CRM */}
        <div className="z-10 p-6 bg-white border-t border-slate-200 flex items-center space-x-4">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Escribe una respuesta de fidelización..." 
              className="w-full pl-6 pr-16 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(e as any)}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </button>
            </div>
          </div>
          <button 
            onClick={handleSendMessage}
            className={`p-4 rounded-2xl transition-all shadow-xl ${newMessage.trim() ? 'bg-blue-600 text-white scale-105' : 'bg-slate-200 text-slate-400'}`}
            disabled={!newMessage.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const Conversations: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'whatsapp'>('whatsapp');
  const [logs, setLogs] = useState<ConversationLog[]>(mockConversations);

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
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Registro de Fidelización</h1>
          <p className="text-slate-500 font-medium italic mt-1">Historial completo gestionado por Maria AI</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button 
            onClick={() => setViewMode('table')}
            className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            VISTA TABLA
          </button>
          <button 
            onClick={() => setViewMode('whatsapp')}
            className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'whatsapp' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            VISTA CHAT
          </button>
        </div>
      </header>

      {viewMode === 'whatsapp' ? (
        <WhatsAppView logs={logs} onSendMessage={handleSendMessage} />
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Contacto</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Embudo</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Último Mensaje</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Interés</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Hora</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.slice().reverse().map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors cursor-default">
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center font-black text-blue-600 text-[10px]">
                          {log.pushname.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{log.pushname}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{log.from}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[9px] font-black uppercase rounded-lg border border-slate-200">{log.etapaembudo}</span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm text-slate-600 font-medium truncate max-w-xs">{log.body}</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full" style={{ width: `${log.interescliente}%` }}></div>
                        </div>
                        <span className="text-[10px] font-black text-slate-500">{log.interescliente}%</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className="text-[10px] font-black text-slate-400 uppercase">{log.time}</span>
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
