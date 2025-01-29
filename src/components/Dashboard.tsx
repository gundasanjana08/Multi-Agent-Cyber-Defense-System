import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Activity, Bot, LogOut, Download, Globe, Pause, Play, RefreshCw } from 'lucide-react';
import { mockAlerts, mockAgents, mockMetrics, mockScanTarget } from '../data';
import { useAuth } from '../hooks/useAuth';
import { generatePDF } from '../utils/pdfGenerator';
import Background3D from './Background3D';

const Dashboard = () => {
  const { logout } = useAuth();
  const [scanTarget, setScanTarget] = useState(mockScanTarget);
  const [metrics, setMetrics] = useState(mockMetrics);
  const [agents, setAgents] = useState(mockAgents);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        scanProgress: Math.min(100, prev.scanProgress + 1),
        lastUpdated: new Date()
      }));

      setAgents(prev => prev.map(agent => ({
        ...agent,
        progress: Math.min(100, (agent.progress || 0) + 2),
        lastScan: new Date()
      })));

      setScanTarget(prev => ({
        ...prev,
        coverage: Math.min(100, prev.coverage + 1),
        lastScan: new Date()
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleScan = () => {
    setScanTarget(prev => ({
      ...prev,
      status: prev.status === 'scanning' ? 'paused' : 'scanning'
    }));
  };

  const restartScan = () => {
    setScanTarget({
      ...scanTarget,
      status: 'scanning',
      startTime: new Date(),
      coverage: 0
    });
    setMetrics({
      ...metrics,
      scanProgress: 0
    });
    setAgents(agents.map(agent => ({
      ...agent,
      progress: 0
    })));
  };

  return (
    <div className="relative min-h-screen bg-gray-100/80">
      <Background3D />
      <nav className="relative bg-indigo-600/90 backdrop-blur-sm text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="w-8 h-8 mr-2" />
            <h1 className="text-2xl font-bold">Multi-Agent Cyber Defense System</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center px-4 py-2 bg-indigo-500 rounded">
                <Globe className="w-4 h-4 mr-2" />
                <span className="text-sm">{scanTarget.url}</span>
              </div>
              <button
                onClick={toggleScan}
                className="p-2 bg-indigo-500 rounded hover:bg-indigo-400 transition-colors"
                title={scanTarget.status === 'scanning' ? 'Pause Scan' : 'Resume Scan'}
              >
                {scanTarget.status === 'scanning' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={restartScan}
                className="p-2 bg-indigo-500 rounded hover:bg-indigo-400 transition-colors"
                title="Restart Scan"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => generatePDF(mockAlerts, agents, metrics)}
              className="flex items-center px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-400 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </button>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-400 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6 relative">
        {/* Scan Progress */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Scan Progress</h2>
            <span className="text-sm text-gray-500">
              Last Updated: {metrics.lastUpdated.toLocaleTimeString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${metrics.scanProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Overall Progress: {metrics.scanProgress}%</span>
            <span>Coverage: {scanTarget.coverage}%</span>
          </div>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500">Total Alerts</h3>
              <AlertTriangle className="text-yellow-500" />
            </div>
            <p className="text-3xl font-bold">{metrics.totalAlerts}</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500">Resolved</h3>
              <Shield className="text-green-500" />
            </div>
            <p className="text-3xl font-bold">{metrics.resolvedAlerts}</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500">Active Agents</h3>
              <Bot className="text-blue-500" />
            </div>
            <p className="text-3xl font-bold">{metrics.activeAgents}</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500">Threat Level</h3>
              <Activity className="text-red-500" />
            </div>
            <p className="text-3xl font-bold">{metrics.threatLevel}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Alerts */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Active Alerts</h2>
            </div>
            <div className="p-4">
              {mockAlerts.map(alert => (
                <div key={alert.id} className="mb-4 p-4 border rounded-lg bg-white/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-sm ${
                      alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">
                      {alert.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <h3 className="font-semibold">{alert.type}</h3>
                  <p className="text-gray-600 text-sm mt-1">{alert.description}</p>
                  {alert.recommendation && (
                    <p className="text-sm text-indigo-600 mt-2">
                      Recommendation: {alert.recommendation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Active Agents */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Active Agents</h2>
            </div>
            <div className="p-4">
              {agents.map(agent => (
                <div key={agent.id} className="mb-4 p-4 border rounded-lg bg-white/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Bot className="w-5 h-5 mr-2 text-indigo-500" />
                      <h3 className="font-semibold">{agent.name}</h3>
                    </div>
                    <span className={`px-2 py-1 rounded text-sm ${
                      agent.status === 'active' ? 'bg-green-100 text-green-800' :
                      agent.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  {agent.currentTask && (
                    <>
                      <p className="text-sm text-gray-600 mb-2">
                        Current Task: {agent.currentTask}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${agent.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Progress: {agent.progress}%</span>
                        <span>Coverage: {agent.coverage}%</span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;