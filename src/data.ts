import { Alert, Agent, SystemMetrics, ScanTarget } from './types';

export const mockAlerts: Alert[] = [
  {
    id: '1',
    timestamp: new Date(),
    severity: 'high',
    type: 'Suspicious Login',
    source: 'Authentication System',
    description: 'Multiple failed login attempts detected from IP 192.168.1.100',
    status: 'new',
    recommendation: 'Block IP address and review authentication logs'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    severity: 'critical',
    type: 'Malware Detection',
    source: 'Endpoint Protection',
    description: 'Potential ransomware activity detected on workstation WS-001',
    status: 'investigating',
    recommendation: 'Isolate affected system and initiate incident response'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    severity: 'medium',
    type: 'Unusual Network Traffic',
    source: 'Network Monitor',
    description: 'Abnormal outbound traffic pattern detected to unknown IP',
    status: 'new',
    recommendation: 'Investigate traffic pattern and block if malicious'
  }
];

export const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Network Analyzer',
    type: 'network',
    status: 'active',
    currentTask: 'Analyzing traffic patterns',
    progress: 75,
    lastScan: new Date(),
    coverage: 80
  },
  {
    id: 'agent-2',
    name: 'Threat Hunter',
    type: 'investigation',
    status: 'investigating',
    currentTask: 'Investigating potential ransomware',
    progress: 45,
    lastScan: new Date(Date.now() - 1000 * 60 * 5),
    coverage: 60
  },
  {
    id: 'agent-3',
    name: 'Log Analyzer',
    type: 'logs',
    status: 'active',
    currentTask: 'Processing authentication logs',
    progress: 90,
    lastScan: new Date(Date.now() - 1000 * 60 * 2),
    coverage: 95
  }
];

export const mockMetrics: SystemMetrics = {
  totalAlerts: 27,
  resolvedAlerts: 24,
  activeAgents: 3,
  threatLevel: 65,
  scanProgress: 78,
  lastUpdated: new Date()
};

export const mockScanTarget: ScanTarget = {
  url: 'https://web.telegram.org/k/',
  status: 'scanning',
  startTime: new Date(Date.now() - 1000 * 60 * 30),
  lastScan: new Date(),
  coverage: 78
};