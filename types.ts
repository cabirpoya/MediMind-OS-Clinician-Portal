export type ViewType = 'dashboard' | 'agents' | 'knowledge' | 'patients' | 'system' | 'settings';

export type Language = 'en' | 'fa' | 'ps';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  status: 'Critical' | 'Stable' | 'Recovering';
  lastVitals: {
    bp: string;
    hr: number;
    temp: number;
    spo2: number;
  };
  history: string[];
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  icon: string;
  color: string;
  description: string;
  systemInstruction: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  group: 'disease' | 'treatment' | 'symptom' | 'medication';
  value: number;
}

export interface KnowledgeLink {
  source: string;
  target: string;
  value: number;
}