import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface PatientTimelineProps {
  history: string[];
}

export const PatientTimeline: React.FC<PatientTimelineProps> = ({ history }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h3 className="font-bold text-slate-800">{t('history.title')}</h3>
      </div>
      <div className="p-6 overflow-y-auto flex-1">
        {history.length === 0 ? (
          <p className="text-slate-400 italic text-sm">{t('history.empty')}</p>
        ) : (
          <div className="relative border-l-2 border-slate-200 ml-3 space-y-6 rtl:border-r-2 rtl:border-l-0 rtl:mr-3 rtl:ml-0">
            {history.map((item, index) => (
              <div key={index} className="relative pl-6 rtl:pr-6 rtl:pl-0">
                <span className="absolute -left-[9px] rtl:-right-[9px] rtl:left-auto top-1 h-4 w-4 rounded-full border-2 border-white bg-medical-500 shadow-sm"></span>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-sm font-medium text-slate-800">{item}</p>
                  <p className="text-xs text-slate-400 mt-1">{t('history.recorded')}</p>
                </div>
              </div>
            ))}
            <div className="relative pl-6 rtl:pr-6 rtl:pl-0">
               <span className="absolute -left-[9px] rtl:-right-[9px] rtl:left-auto top-1 h-4 w-4 rounded-full border-2 border-white bg-slate-300"></span>
               <p className="text-xs text-slate-400 pt-1">{t('history.initial')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};