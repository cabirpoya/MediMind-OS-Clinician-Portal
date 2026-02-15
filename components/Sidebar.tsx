import React from 'react';
import { ViewType } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentView, onViewChange, toggleSidebar }) => {
  const { t } = useLanguage();

  const menuItems: { id: ViewType; label: string; icon: string }[] = [
    { id: 'dashboard', label: t('dashboard'), icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { id: 'agents', label: t('agents'), icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { id: 'knowledge', label: t('knowledge'), icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'system', label: t('system_monitor'), icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
  ];

  return (
    <div className={`bg-slate-850 text-white flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} shrink-0`}>
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
        {isOpen && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-medical-500 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-white">M</span>
            </div>
            <span className="font-bold text-lg tracking-tight">{t('app.title')}</span>
          </div>
        )}
        <button onClick={toggleSidebar} className="p-2 rounded hover:bg-slate-700 text-slate-300">
          <svg className={`w-6 h-6 transform ${isOpen ? '' : 'rotate-180 rtl:rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 py-6 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center px-4 py-3 transition-colors ${
              currentView === item.id 
                ? 'bg-medical-600 text-white border-l-4 rtl:border-l-0 rtl:border-r-4 border-medical-300' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            {isOpen && <span className="ml-3 rtl:ml-0 rtl:mr-3 font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center border-2 border-slate-500">
            <span className="text-sm font-bold">DR</span>
          </div>
          {isOpen && (
            <div className="ml-3 rtl:ml-0 rtl:mr-3">
              <p className="text-sm font-medium text-white">{t('dr_name')}</p>
              <p className="text-xs text-slate-400">{t('dr_role')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};