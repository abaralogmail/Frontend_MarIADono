
// Fix: Updated Role type to match actual usage in components and mock data ('bot', 'agent', 'cliente')
export type Role = 'bot' | 'agent' | 'cliente';

export interface ConversationLog {
  id: string;
  date: string;
  time: string;
  from: string; // E.164
  role: Role;
  pushname: string;
  body: string;
  messageid: string;
  etapaembudo: string;
  interescliente: number; // 0-100
  botname: string;
}

export interface Metric {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface Segment {
  id: string;
  nombre: string;
  color: string;
  miembros: number;
  conversion: number;
  descripcion: string;
  regla_activa: boolean;
}

export interface SegmentMember {
  id: string;
  nombre: string;
  telefono: string;
  score: number; // 0-100
  ultimo_contacto: string;
  segmentos: string[];
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'scheduled' | 'draft' | 'completed';
  sent: number;
  opened: number;
  clicked: number;
  conversion: number;
}

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  oferta?: number;
}

export interface Horario {
  horario_id: string;
  nombre: string;
  descripcion: string;
  bot_name: string;
  tipo_horario_id: string;
  zona_horaria: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReglaHorario {
  regla_id: string;
  horario_id: string;
  dia_semana: number; // 0-6
  hora_inicio: string;
  hora_fin: string;
  estado: 'open' | 'closed';
}

export interface ExcepcionHorario {
  excepcion_id: string;
  horario_id: string;
  fecha: string;
  estado: 'closed' | 'open_especial';
  descripcion: string;
}

export type ViewType = 'dashboard' | 'conversations' | 'campaigns' | 'segments' | 'commerce' | 'scheduling' | 'metrics';