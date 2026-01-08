
import { ConversationLog, Campaign, Product, Horario, Metric, Segment, SegmentMember } from '../types';

export const mockConversations: ConversationLog[] = Array.from({ length: 20 }, (_, i) => ({
  id: `conv-${i}`,
  date: '2025-11-20',
  time: `${10 + (i % 8)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  from: `+54911${Math.floor(Math.random() * 90000000 + 10000000)}`,
  role: i % 3 === 0 ? 'bot' : i % 3 === 1 ? 'agent' : 'cliente',
  pushname: ['Javier Jimenez', 'Maria Garcia', 'Carlos Mamani', 'Lucia Lopez'][i % 4],
  body: [
    'Hola, necesito info de precios del refrigerante',
    'Claro, aqui tienes el catálogo',
    '¿Tienen stock del R‑410A 1 kg?',
    'Si, disponible en nuestras 3 sucursales',
    'Gracias por la ayuda!',
    '¡De nada! Estamos para servirle.'
  ][i % 6],
  messageid: `wa-${Math.random().toString(36).substr(2, 9)}`,
  etapaembudo: ['Atención', 'Consideración', 'Compra', 'Post-Venta'][i % 4],
  interescliente: Math.floor(Math.random() * 100),
  botname: 'BotRoly',
}));

export const mockSegments: Segment[] = [
  { id: 's1', nombre: 'Clientes VIP', color: 'indigo', miembros: 1240, conversion: 68, descripcion: 'Gasto mensual > $500 y > 5 compras anuales', regla_activa: true },
  { id: 's2', nombre: 'Riesgo de Fuga', color: 'rose', miembros: 450, conversion: 12, descripcion: 'Sin actividad en los últimos 45 días', regla_activa: true },
  { id: 's3', nombre: 'Nuevos Leads', color: 'emerald', miembros: 2100, conversion: 45, descripcion: 'Suscritos en los últimos 7 días', regla_activa: false },
  { id: 's4', nombre: 'Inactivos', color: 'slate', miembros: 3200, conversion: 5, descripcion: 'Usuarios sin compra hace > 6 meses', regla_activa: false },
];

export const mockMembers: SegmentMember[] = [
  { id: 'm1', nombre: 'Juan Pérez', telefono: '+5491145678901', score: 92, ultimo_contacto: 'Hace 2 horas', segmentos: ['VIP', 'Fidelizado'] },
  { id: 'm2', nombre: 'Elena Gómez', telefono: '+5491198765432', score: 45, ultimo_contacto: 'Hace 3 días', segmentos: ['Nuevos Leads'] },
  { id: 'm3', nombre: 'Ricardo Soto', telefono: '+5491122334455', score: 12, ultimo_contacto: 'Hace 2 meses', segmentos: ['Inactivos', 'Riesgo de Fuga'] },
];

export const mockCampaigns: Campaign[] = [
  { id: '1', name: 'Black Friday 2026', status: 'completed', sent: 15000, opened: 12000, clicked: 4500, conversion: 800 },
  { id: '2', name: 'Navidad Promo', status: 'active', sent: 5000, opened: 3200, clicked: 1100, conversion: 250 },
  { id: '3', name: 'Lanzamiento Verano', status: 'scheduled', sent: 0, opened: 0, clicked: 0, conversion: 0 },
];

export const mockProducts: Product[] = [
   { id: 'p1', nombre: 'Refrigerador Comercial 300L', descripcion: 'Puerta doble, control digital, ideal para comercio y tiendas', precio: 1200, stock: 8, oferta: 1050 },
  { id: 'p2', nombre: 'Compresor Hermético Scroll 1.5HP', descripcion: 'Alta eficiencia para sistemas de refrigeración comercial', precio: 450, stock: 20 },
  { id: 'p3', nombre: 'Gas Refrigerante R134a (1 kg)', descripcion: 'Envase de 1kg para recarga de equipos R134a', precio: 85, stock: 150, oferta: 75 },
  { id: 'p4', nombre: 'Servicio: Mantenimiento Preventivo', descripcion: 'Inspección, limpieza y ajuste; incluye carga ligera de gas (por unidad)', precio: 60, stock: 999 },
];

export const mockMetrics: Metric[] = [
  { label: 'Conversaciones Totales', value: '90,194', change: '+12%', trend: 'up' },
  { label: 'SLA Promedio', value: '4.2m', change: '-30s', trend: 'up' },
  { label: 'Conversión Campañas', value: '18.4%', change: '+2.1%', trend: 'up' },
  { label: 'Stock Crítico', value: '5 ítems', change: 'Estable', trend: 'neutral' },
];

export const mockHorarios: Horario[] = [
  {
    horario_id: 'h1',
    nombre: 'Horario Comercial Estándar',
    descripcion: 'Lunes a Viernes 09:00 a 18:00',
    bot_name: 'BotRoly',
    tipo_horario_id: 'standard',
    zona_horaria: 'GMT-3',
    activo: true,
    created_at: '2025-01-01',
    updated_at: '2025-11-01',
  }
];
