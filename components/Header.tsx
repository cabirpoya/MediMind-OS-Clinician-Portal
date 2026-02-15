import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';

interface HeaderProps {
  sidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10 shrink-0">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <h2 className="text-lg font-semibold text-slate-700">{t('hospital.name')}</h2>
      </div>

      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 rtl:ml-1.5 rtl:mr-0 animate-pulse"></span>
          {t('system.online')}
        </span>
        
        <div className="relative">
          <button className="text-slate-500 hover:text-slate-700 p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 rtl:left-0 rtl:right-auto block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500"></span>
          </button>
        </div>

        <div className="h-6 w-px bg-slate-300 mx-2"></div>

        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded focus:ring-medical-500 focus:border-medical-500 block p-1"
        >
          <option value="en">English</option>
          <option value="fa">Dari (فارسی)</option>
          <option value="ps">Pashto (پښتو)</option>
        </select>
      </div>
    </header>
  );
};