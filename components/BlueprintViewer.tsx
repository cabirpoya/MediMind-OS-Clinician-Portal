import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const BlueprintViewer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-700 overflow-hidden h-full flex flex-col text-white">
      <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-800">
        <h3 className="font-bold text-medical-300 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 7" /></svg>
          {t('blueprint.title')}
        </h3>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-slate-700 rounded"><span className="text-xs">{t('blueprint.ant')}</span></button>
          <button className="p-1 hover:bg-slate-700 rounded text-slate-500"><span className="text-xs">{t('blueprint.post')}</span></button>
        </div>
      </div>
      <div className="flex-1 relative p-4 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-900">
        {/* Abstract Body Visualization */}
        <svg viewBox="0 0 200 400" className="h-full w-auto opacity-80">
            <path d="M100,30 C115,30 125,40 125,55 C125,70 115,80 100,80 C85,80 75,70 75,55 C75,40 85,30 100,30 Z" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <path d="M100,80 L100,90" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <path d="M70,100 C70,100 60,110 50,150 L40,220" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <path d="M130,100 C130,100 140,110 150,150 L160,220" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <path d="M70,100 L130,100 L125,230 L135,350" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <path d="M70,100 L75,230 L65,350" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <path d="M70,100 L130,100" fill="none" stroke="#38bdf8" strokeWidth="2" />
            
            {/* Highlights for "Pain" or "Issue" */}
            <circle cx="110" cy="140" r="5" fill="#e11d48" className="animate-pulse">
               <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
            </circle>
             <circle cx="100" cy="55" r="3" fill="#fbbf24" className="opacity-60" />
        </svg>

        <div className="absolute bottom-4 left-4 text-xs text-slate-500 rtl:right-4 rtl:left-auto">
          <p>{t('blueprint.scan_id')}: S-2024-889</p>
          <p>{t('blueprint.modality')}: MRI/CT Composite</p>
        </div>
      </div>
    </div>
  );
};