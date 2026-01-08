import { ConversationLog, Campaign, Horario, Metric, Segment, SegmentMember, Product } from '../types';

export const mockConversations: ConversationLog[] = Array.from({ length: 20 }, (_, i) => ({
  id: `conv-${i}`,
  date: '2025-11-20',
  time: `${10 + (i % 8)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  from: `+54911${Math.floor(Math.random() * 90000000 + 10000000)}`,
  role: i % 3 === 0 ? 'bot' : i % 3 === 1 ? 'agent' : 'cliente',
  pushname: ['Javier Jimenez', 'Maria Garcia', 'Carlos Mamani', 'Lucia Lopez'][i % 4],
  body: [
    'Hola, necesito info sobre mis puntos de fidelización',
    'Claro, aqui tienes tu saldo actual',
    '¿Cómo canjeo mi cupón de descuento?',
    'Puedes presentarlo en cualquier sucursal con este código QR',
    'Gracias por la ayuda!',
    '¡De nada! Estamos para servirle.'
  ][i % 6],
  messageid: `wa-${Math.random().toString(36).substr(2, 9)}`,
  etapaembudo: ['Atención', 'Consideración', 'Compra', 'Post-Venta'][i % 4],
  interescliente: Math.floor(Math.random() * 100),
  botname: 'Maria AI',
}));

export const mockSegments: Segment[] = [
  { id: 's1', nombre: 'Clientes VIP', color: 'indigo', miembros: 1240, conversion: 68, descripcion: 'Fidelización alta y compras recurrentes', regla_activa: true },
  { id: 's2', nombre: 'Riesgo de Fuga', color: 'rose', miembros: 450, conversion: 12, descripcion: 'Sin interacción en los últimos 30 días', regla_activa: true },
  { id: 's3', nombre: 'Recién Registrados', color: 'emerald', miembros: 2100, conversion: 45, descripcion: 'Nuevos usuarios de la última semana', regla_activa: false },
  { id: 's4', nombre: 'Inactivos', color: 'slate', miembros: 3200, conversion: 5, descripcion: 'Usuarios sin contacto hace > 6 meses', regla_activa: false },
];

export const mockMembers: SegmentMember[] = [
  { id: 'm1', nombre: 'Juan Pérez', telefono: '+5491145678901', score: 92, ultimo_contacto: 'Hace 2 horas', segmentos: ['VIP', 'Fidelizado'] },
  { id: 'm2', nombre: 'Elena Gómez', telefono: '+5491198765432', score: 45, ultimo_contacto: 'Hace 3 días', segmentos: ['Recién Registrados'] },
  { id: 'm3', nombre: 'Ricardo Soto', telefono: '+5491122334455', score: 12, ultimo_contacto: 'Hace 2 meses', segmentos: ['Inactivos', 'Riesgo de Fuga'] },
];

export const mockCampaigns: Campaign[] = [
  { id: '1', name: 'Fidelización Verano', status: 'completed', sent: 15000, opened: 12000, clicked: 4500, conversion: 800 },
  { id: '2', name: 'Bienvenida Automatizada', status: 'active', sent: 5000, opened: 3200, clicked: 1100, conversion: 250 },
  { id: '3', name: 'Promoción Aniversario', status: 'scheduled', sent: 0, opened: 0, clicked: 0, conversion: 0 },
];

export const mockMetrics: Metric[] = [
  { label: 'Conversaciones Totales', value: '90,194', change: '+12%', trend: 'up' },
  { label: 'SLA Promedio', value: '4.2m', change: '-30s', trend: 'up' },
  { label: 'Conversión Campañas', value: '18.4%', change: '+2.1%', trend: 'up' },
  { label: 'Satisfacción Cliente', value: '94%', change: '+5%', trend: 'up' },
];

export const mockHorarios: Horario[] = [
  {
    horario_id: 'h1',
    nombre: 'Horario Comercial Estándar',
    descripcion: 'Lunes a Viernes 09:00 a 18:00',
    bot_name: 'Maria AI',
    tipo_horario_id: 'standard',
    zona_horaria: 'GMT-3',
    activo: true,
    created_at: '2025-01-01',
    updated_at: '2025-11-01',
  }
];

// Fix: Added mockProducts export which was missing and required by Commerce.tsx
export const mockProducts: Product[] = [
  {
    id: 'p1',
    nombre: 'Set de Regalo Premium',
    descripcion: 'Una selección exclusiva de nuestros mejores productos para fidelización.',
    precio: 1500,
    stock: 25,
    oferta: 1200
  },
  {
    id: 'p2',
    nombre: 'Suscripción Anual VIP',
    descripcion: 'Acceso a beneficios exclusivos y descuentos permanentes en todas las sucursales.',
    precio: 5000,
    stock: 100
  },
  {
    id: 'p3',
    nombre: 'Kit de Bienvenida Plus',
    descripcion: 'Perfecto para nuevos clientes que buscan empezar con el pie derecho.',
    precio: 800,
    stock: 10,
    oferta: 650
  }
];