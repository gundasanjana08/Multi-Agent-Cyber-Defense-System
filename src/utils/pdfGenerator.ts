import { jsPDF } from 'jspdf';
import { Alert, Agent, SystemMetrics } from '../types';

export const generatePDF = (alerts: Alert[], agents: Agent[], metrics: SystemMetrics) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Title
  doc.setFontSize(20);
  doc.text('Cyber Defense System Report', pageWidth / 2, 20, { align: 'center' });
  
  // System Metrics
  doc.setFontSize(16);
  doc.text('System Metrics', 20, 40);
  doc.setFontSize(12);
  doc.text(`Total Alerts: ${metrics.totalAlerts}`, 20, 50);
  doc.text(`Resolved Alerts: ${metrics.resolvedAlerts}`, 20, 60);
  doc.text(`Active Agents: ${metrics.activeAgents}`, 20, 70);
  doc.text(`Current Threat Level: ${metrics.threatLevel}%`, 20, 80);

  // Active Alerts
  doc.setFontSize(16);
  doc.text('Active Alerts', 20, 100);
  doc.setFontSize(12);
  let yPos = 110;
  alerts.forEach(alert => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(`Type: ${alert.type}`, 20, yPos);
    doc.text(`Severity: ${alert.severity}`, 20, yPos + 7);
    doc.text(`Description: ${alert.description}`, 20, yPos + 14);
    if (alert.recommendation) {
      doc.text(`Recommendation: ${alert.recommendation}`, 20, yPos + 21);
    }
    yPos += 35;
  });

  // Active Agents
  doc.setFontSize(16);
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  } else {
    yPos += 10;
  }
  doc.text('Active Agents', 20, yPos);
  doc.setFontSize(12);
  yPos += 10;
  agents.forEach(agent => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(`Name: ${agent.name}`, 20, yPos);
    doc.text(`Type: ${agent.type}`, 20, yPos + 7);
    doc.text(`Status: ${agent.status}`, 20, yPos + 14);
    if (agent.currentTask) {
      doc.text(`Current Task: ${agent.currentTask}`, 20, yPos + 21);
    }
    yPos += 30;
  });

  // Generate timestamp
  const timestamp = new Date().toLocaleString();
  doc.setFontSize(10);
  doc.text(`Report generated: ${timestamp}`, 20, doc.internal.pageSize.getHeight() - 10);

  // Save the PDF
  doc.save('cyber-defense-report.pdf');
};