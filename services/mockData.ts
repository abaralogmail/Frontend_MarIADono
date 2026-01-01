
import { ConversationLog, Campaign, Product, Horario, Metric } from '../types';

export const mockConversations: ConversationLog[] = Array.from({ length: 20 }, (_, i) => ({
  id: `conv-${i}`,
  date: '2023-11-20',
  time: `${10 + (i % 8)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  from: `+54911${Math.floor(Math.random() * 90000000 + 10000000)}`,
  role: i % 3 === 0 ? 'bot' : i % 3 === 1 ? 'agent' : 'cliente',
  pushname: ['Juan Perez', 'Maria Garcia', 'Alex Smith', 'Lucia Lopez'][i % 4],
  body: [
    'Hola, necesito info de precios',
    'Claro, aqui tienes el catálogo',
    '¿Tienen stock del producto A?',
    'Si, disponible en nuestras 3 sucursales',
    'Gracias por la ayuda!',
    '¡De nada! Estamos para servirle.'
  ][i % 6],
  messageid: `wa-${Math.random().toString(36).substr(2, 9)}`,
  etapaembudo: ['Atención', 'Consideración', 'Compra', 'Post-Venta'][i % 4],
  interescliente: Math.floor(Math.random() * 100),
  botname: 'AstroBot v2.4',
}));

export const mockCampaigns: Campaign[] = [
  { id: '1', name: 'Black Friday 2023', status: 'completed', sent: 15000, opened: 12000, clicked: 4500, conversion: 800 },
  { id: '2', name: 'Navidad Promo', status: 'active', sent: 5000, opened: 3200, clicked: 1100, conversion: 250 },
  { id: '3', name: 'Lanzamiento Verano', status: 'scheduled', sent: 0, opened: 0, clicked: 0, conversion: 0 },
];

export const mockProducts: Product[] = [
  { id: 'p1', nombre: 'Smartphone Galaxy X', descripcion: 'Pantalla OLED 6.7"', precio: 899, stock: 45, oferta: 799 },
  { id: 'p2', nombre: 'Laptop Pro 14', descripcion: 'CPU 12-core, 16GB RAM', precio: 1499, stock: 12 },
  { id: 'p3', nombre: 'Auriculares Hi-Fi', descripcion: 'Cancelación de ruido activa', precio: 299, stock: 88, oferta: 199 },
];

export const mockMetrics: Metric[] = [
  { label: 'Conversaciones Totales', value: '12,840', change: '+12%', trend: 'up' },
  { label: 'SLA Promedio', value: '4.2m', change: '-30s', trend: 'up' },
  { label: 'Conversión Campañas', value: '18.4%', change: '+2.1%', trend: 'up' },
  { label: 'Stock Crítico', value: '5 ítems', change: 'Estable', trend: 'neutral' },
];

export const mockHorarios: Horario[] = [
  {
    horario_id: 'h1',
    nombre: 'Horario Comercial Estándar',
    descripcion: 'Lunes a Viernes 09:00 a 18:00',
    bot_name: 'AstroBot v2.4',
    tipo_horario_id: 'standard',
    zona_horaria: 'GMT-3',
    activo: true,
    created_at: '2023-01-01',
    updated_at: '2023-11-01',
  }
];
