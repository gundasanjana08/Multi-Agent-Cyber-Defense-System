export interface Alert {
  id: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  source: string;
  description: string;
  status: 'new' | 'investigating' | 'resolved' | 'false-positive';
  recommendation?: string;
}

export interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'investigating' | 'idle';
  currentTask?: string;
  progress?: number;
  lastScan?: Date;
  coverage?: number;
}

export interface SystemMetrics {
  totalAlerts: number;
  resolvedAlerts: number;
  activeAgents: number;
  threatLevel: number;
  scanProgress: number;
  lastUpdated: Date;
}

export interface ScanTarget {
  url: string;
  status: 'scanning' | 'paused' | 'completed';
  startTime: Date;
  lastScan: Date;
  coverage: number;
}