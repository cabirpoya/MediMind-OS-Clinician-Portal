import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { PatientDashboard } from './components/PatientDashboard';
import { AgentConsole } from './components/AgentConsole';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { SystemMonitor } from './components/SystemMonitor';
import { Login } from './components/Login';
import { ViewType } from './types';
import { LanguageProvider } from './contexts/LanguageContext';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <PatientDashboard onViewChange={setCurrentView} />;
      case 'agents':
        return <AgentConsole />;
      case 'knowledge':
        return <KnowledgeGraphView />;
      case 'system':
        return <SystemMonitor />;
      default:
        return <PatientDashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-50 transition-all duration-300">
      <Sidebar 
        isOpen={sidebarOpen} 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden transition-all duration-300">
        <Header sidebarOpen={sidebarOpen} />
        <main className="flex-1 overflow-hidden p-4 relative">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}