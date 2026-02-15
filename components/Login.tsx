import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  // We need access to translation here, but Login is typically outside LanguageProvider in basic apps,
  // however in our App.tsx, LanguageProvider wraps AppContent, but Login is rendered inside AppContent.
  // So we can use useLanguage hook.
  const { t, language, setLanguage } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API authentication delay
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden" dir={language === 'en' ? 'ltr' : 'rtl'}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 rtl:-left-40 rtl:right-auto w-80 h-80 rounded-full bg-medical-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>

      {/* Language Toggle for Login Screen */}
      <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto z-20">
         <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded focus:ring-medical-500 focus:border-medical-500 block p-2"
          >
            <option value="en">English</option>
            <option value="fa">Dari (فارسی)</option>
            <option value="ps">Pashto (پښتو)</option>
          </select>
      </div>

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-medical-500 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-medical-500/30">
            <span className="text-3xl font-bold text-white">M</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">{t('app.title')}</h1>
          <p className="text-slate-400 mt-2">{t('login.subtitle')}</p>
          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
             <span className="w-2 h-2 rounded-full bg-green-500 mr-2 rtl:ml-2 rtl:mr-0 animate-pulse"></span>
             <span className="text-xs text-slate-300 font-mono">{t('login.system_op')}</span>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t('login.clinician_id')}</label>
              <input 
                type="text" 
                defaultValue="DR-AMIRA-102"
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none transition-all placeholder-slate-600"
                placeholder={t('login.enter_id')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t('login.password')}</label>
              <input 
                type="password" 
                defaultValue="password123"
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-medical-500 focus:border-transparent outline-none transition-all placeholder-slate-600"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-medical-600 hover:bg-medical-500 text-white font-semibold py-3.5 rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-medical-600/20 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 rtl:ml-3 rtl:mr-0 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('login.authenticating')}
                </>
              ) : (
                t('login.access_portal')
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              {t('login.footer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};