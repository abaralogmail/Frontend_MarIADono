
import { ConversationLog, Campaign, Horario, Metric, Segment, SegmentMember, Product } from '../types';

export const mockConversations: ConversationLog[] = Array.from({ length: 40 }, (_, i) => ({
  id: `conv-${i}`,
  date: '2025-11-20',
  time: `${10 + (i % 8)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  from: `+54911${Math.floor(Math.random() * 90000000 + 10000000)}`,
  role: i % 3 === 0 ? 'bot' : i % 3 === 1 ? 'agent' : 'cliente',
  pushname: ['Javier Jimenez', 'Maria Garcia', 'Carlos Mamani', 'Lucia Lopez', 'Roberto Sanz', 'Ana Belén'][i % 6],
  body: [
    'Hola, necesito info sobre mis puntos de fidelización',
    'Claro, aqui tienes tu saldo actual',
    '¿Cómo canjeo mi cupón de descuento?',
    'Puedes presentarlo en cualquier sucursal con este código QR',
    'Gracias por la ayuda!',
    '¡De nada! Estamos para servirle.',
    '¿Tienen stock del set premium?',
    'Sí, nos quedan 5 unidades en preventa.',
    'Quiero agendar una cita para mañana.',
    'Perfecto, ¿en qué horario prefieres?'
  ][i % 10],
  messageid: `wa-${Math.random().toString(36).substr(2, 9)}`,
  etapaembudo: ['Atención', 'Consideración', 'Compra', 'Post-Venta'][i % 4],
  interescliente: Math.floor(Math.random() * 100),
  botname: 'Maria AI',
}));

export const incomingPeriodData = [
  { period: '2024-M11', volume: 2049, percent: '5.1%', trend: '🔴 Línea base', color: 'text-rose-500' },
  { period: '2024-M12', volume: 342, percent: '0.8%', trend: '🔴 -83.3%', color: 'text-rose-500' },
  { period: '2025-M01', volume: 715, percent: '1.8%', trend: '🟡 +109.1%', color: 'text-amber-500' },
  { period: '2025-M02', volume: 1208, percent: '3.0%', trend: '🟢 +68.9%', color: 'text-emerald-500' },
  { period: '2025-M03', volume: 1410, percent: '3.5%', trend: '🟡 +16.8%', color: 'text-amber-500' },
  { period: '2025-M04', volume: 2799, percent: '6.9%', trend: '🟢 +98.4%', color: 'text-emerald-500' },
  { period: '2025-M05', volume: 5488, percent: '13.6%', trend: '🟢 +96.0%', color: 'text-emerald-500' },
  { period: '2025-M06', volume: 5205, percent: '12.9%', trend: '🔴 -5.2%', color: 'text-rose-500' },
  { period: '2025-M07', volume: 3765, percent: '9.3%', trend: '🔴 -27.7%', color: 'text-rose-500' },
  { period: '2025-M08', volume: 6251, percent: '15.5%', trend: '🟢 +66.0%', color: 'text-emerald-500' },
  { period: '2025-M09', volume: 4864, percent: '12.0%', trend: '🔴 -22.2%', color: 'text-rose-500' },
  { period: '2025-M10', volume: 6265, percent: '15.5%', trend: '🟢 +28.8%', color: 'text-emerald-500' },
];

export const bulkPeriodData = [
  { period: '2024-M11', volume: 3259, percent: '6.5%', trend: '🔴 Línea base', color: 'text-rose-500' },
  { period: '2024-M12', volume: 1440, percent: '2.9%', trend: '🔴 -55.8%', color: 'text-rose-500' },
  { period: '2025-M01', volume: 3449, percent: '6.9%', trend: '🟢 +139.4%', color: 'text-emerald-500' },
  { period: '2025-M02', volume: 5310, percent: '10.6%', trend: '🟢 +54.0%', color: 'text-emerald-500' },
  { period: '2025-M03', volume: 3829, percent: '7.7%', trend: '🔴 -27.9%', color: 'text-rose-500' },
  { period: '2025-M04', volume: 2552, percent: '5.1%', trend: '🔴 -33.3%', color: 'text-rose-500' },
  { period: '2025-M05', volume: 5022, percent: '10.1%', trend: '🟢 +96.8%', color: 'text-emerald-500' },
  { period: '2025-M06', volume: 4196, percent: '8.4%', trend: '🔴 -16.5%', color: 'text-rose-500' },
  { period: '2025-M07', volume: 1916, percent: '3.8%', trend: '🔴 -54.3%', color: 'text-rose-500' },
  { period: '2025-M08', volume: 5626, percent: '11.3%', trend: '🟢 +193.5%', color: 'text-emerald-500' },
  { period: '2025-M09', volume: 7723, percent: '15.5%', trend: '🟢 +37.3%', color: 'text-emerald-500' },
  { period: '2025-M10', volume: 5511, percent: '11.1%', trend: '🔴 -28.6%', color: 'text-rose-500' },
];

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
  { label: 'Total General', value: '90,194', change: 'Histórico', trend: 'neutral' },
  { label: 'Total BulkMessage', value: '49,833', change: '55.3%', trend: 'up' },
  { label: 'Total Incoming', value: '40,361', change: '44.7%', trend: 'up' },
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

export const mockProducts: Product[] = [
  { id: 'p1', nombre: 'Set de Regalo Premium', descripcion: 'Una selección exclusiva...', precio: 1500, stock: 25, oferta: 1200 },
  { id: 'p2', nombre: 'Suscripción Anual VIP', descripcion: 'Acceso a beneficios...', precio: 5000, stock: 100 },
  { id: 'p3', nombre: 'Kit de Bienvenida Plus', descripcion: 'Perfecto para nuevos...', precio: 800, stock: 10, oferta: 650 }
];
