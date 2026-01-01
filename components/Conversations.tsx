
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { mockConversations } from '../services/mockData';
import { ConversationLog, Role } from '../types';

const WhatsAppView: React.FC<{ logs: ConversationLog[] }> = ({ logs }) => {
  // Group logs by contact (from number) to create a list of contacts
  const contacts = useMemo(() => {
    const map = new Map<string, { pushname: string, lastMessage: string, time: string, unread: number }>();
    logs.forEach(log => {
      if (!map.has(log.from) || log.date + log.time > (map.get(log.from)?.time || '')) {
        map.set(log.from, {
          pushname: log.pushname,
          lastMessage: log.body,
          time: log.time,
          unread: Math.floor(Math.random() * 3)
        });
      }
    });
    return Array.from(map.entries()).map(([from, data]) => ({ from, ...data }));
  }, [logs]);

  const [selectedContact, setSelectedContact] = useState(contacts[0]?.from || '');
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Filter messages for the selected contact
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
    // In a real app, this would call an API. Here we just clear the input.
    setNewMessage('');
  };

  return (
    <div className="flex h-[75vh] bg-[#f0f2f5] rounded-2xl overflow-hidden border border-slate-200 shadow-2xl animate-fadeIn">
      {/* Sidebar - Contacts List */}
      <div className="w-1/3 border-r border-slate-200 bg-white flex flex-col">
        {/* Header Sidebar */}
        <div className="p-4 bg-[#f0f2f5] flex justify-between items-center border-b border-slate-200">
          <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden">
            <img src="https://ui-avatars.com/api/?name=Admin+Omni&background=4f46e5&color=fff" alt="Me" />
          </div>
          <div className="flex space-x-4 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </div>
        </div>
        
        {/* Search */}
        <div className="p-2 bg-white">
          <div className="bg-[#f0f2f5] flex items-center px-3 py-1.5 rounded-lg">
            <svg className="text-slate-400 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" placeholder="Busca un chat o inicia uno nuevo" className="bg-transparent border-none outline-none text-sm w-full py-1" />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div 
              key={contact.from}
              onClick={() => setSelectedContact(contact.from)}
              className={`flex items-center px-4 py-3 cursor-pointer border-b border-slate-50 transition-colors ${selectedContact === contact.from ? 'bg-[#f0f2f5]' : 'hover:bg-slate-50'}`}
            >
              <div className="w-12 h-12 rounded-full bg-slate-200 mr-4 flex-shrink-0 flex items-center justify-center font-bold text-slate-500 overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${contact.pushname}&background=random`} alt={contact.pushname} />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-semibold text-slate-900 truncate">{contact.pushname}</h4>
                  <span className="text-[10px] text-slate-500">{contact.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-slate-500 truncate">{contact.lastMessage}</p>
                  {contact.unread > 0 && (
                    <span className="bg-[#25d366] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#efeae2] relative">
        {/* Chat Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://wweb.dev/assets/whatsapp-chat-wallpaper.png")', backgroundSize: '400px' }}></div>
        
        {/* Chat Header */}
        <div className="z-10 px-4 py-2 bg-[#f0f2f5] flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-slate-300 mr-3 overflow-hidden">
              <img src={`https://ui-avatars.com/api/?name=${contacts.find(c => c.from === selectedContact)?.pushname || '?'}&background=random`} alt="active" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">{contacts.find(c => c.from === selectedContact)?.pushname || 'Seleccione un chat'}</h4>
              <p className="text-[11px] text-slate-500 font-medium">En línea</p>
            </div>
          </div>
          <div className="flex space-x-5 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </div>
        </div>

        {/* Messages Body */}
        <div className="z-10 flex-1 overflow-y-auto p-4 md:p-8 space-y-3">
          {activeConversation.map((msg) => {
            const isMe = msg.role === 'agent' || msg.role === 'bot';
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-lg px-3 py-1.5 shadow-sm text-sm relative group ${isMe ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none'}`}>
                  {!isMe && <p className="text-[10px] font-bold text-slate-500 mb-0.5 uppercase tracking-tighter">{msg.role}</p>}
                  <p className="text-slate-800 leading-snug">{msg.body}</p>
                  <div className="flex items-center justify-end mt-1 space-x-1">
                    <span className="text-[10px] text-slate-400">{msg.time}</span>
                    {isMe && (
                      <svg className="text-blue-400" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="z-10 p-2 bg-[#f0f2f5] flex items-center space-x-3">
          <button className="text-slate-500 p-2 hover:bg-slate-200 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          </button>
          <button className="text-slate-500 p-2 hover:bg-slate-200 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.51a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          </button>
          <form onSubmit={handleSendMessage} className="flex-1 flex items-center space-x-3">
            <input 
              type="text" 
              placeholder="Escribe un mensaje aquí" 
              className="w-full px-4 py-2.5 bg-white border-none rounded-xl text-sm outline-none focus:ring-0"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button 
              type="submit" 
              className={`p-2.5 rounded-full transition-all ${newMessage.trim() ? 'bg-[#00a884] text-white shadow-md' : 'text-slate-500'}`}
            >
              {newMessage.trim() ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Conversations: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'whatsapp'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredLogs = mockConversations.filter(log => {
    const matchesSearch = log.pushname.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         log.from.includes(searchTerm) || 
                         log.body.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || log.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Conversaciones</h1>
          <p className="text-slate-500">Gestión de interacciones de WhatsApp (conversations_log)</p>
        </div>
        <div className="flex bg-slate-200 p-1 rounded-xl">
          <button 
            onClick={() => setViewMode('table')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'table' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Tabla
          </button>
          <button 
            onClick={() => setViewMode('whatsapp')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${viewMode === 'whatsapp' ? 'bg-[#25d366] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.3 8.5 8.5 0 0 1 5 1.5l3.5-1.5Z"/></svg>
            <span>Modo WhatsApp</span>
          </button>
        </div>
      </header>

      {viewMode === 'whatsapp' ? (
        <WhatsAppView logs={mockConversations} />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <input 
                type="text" 
                placeholder="Buscar por nombre, número o mensaje..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">Todos los roles</option>
              <option value="cliente">Cliente</option>
              <option value="bot">Bot</option>
              <option value="agent">Agente</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Remitente / ID</th>
                  <th className="px-6 py-4">Mensaje</th>
                  <th className="px-6 py-4">Etapa / Interés</th>
                  <th className="px-6 py-4">Fecha & Hora</th>
                  <th className="px-6 py-4">Bot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          log.role === 'cliente' ? 'bg-indigo-100 text-indigo-700' :
                          log.role === 'bot' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {log.pushname.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{log.pushname}</p>
                          <p className="text-xs text-slate-500">{log.from}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm text-slate-700 truncate">{log.body}</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase">ID: {log.messageid}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold mb-1 uppercase">
                        {log.etapaembudo}
                      </span>
                      <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full" style={{width: `${log.interescliente}%`}}></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900 font-medium">{log.date}</p>
                      <p className="text-xs text-slate-400">{log.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-600">{log.botname}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredLogs.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-slate-500">No se encontraron conversaciones que coincidan con la búsqueda.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversations;
