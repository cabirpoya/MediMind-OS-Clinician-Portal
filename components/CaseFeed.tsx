import React from 'react';
import { Patient } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface CaseFeedProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
}

export const CaseFeed: React.FC<CaseFeedProps> = ({ patients, onSelectPatient }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
       <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h3 className="font-bold text-slate-800">{t('active_cases')}</h3>
        <span className="bg-medical-100 text-medical-700 text-xs px-2 py-1 rounded-full">{patients.length} {t('active')}</span>
      </div>
      <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
        {patients.map((patient) => (
          <button
            key={patient.id}
            onClick={() => onSelectPatient(patient)}
            className="w-full text-left p-4 hover:bg-slate-50 transition-colors group flex items-start gap-4"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${
               patient.status === 'Critical' ? 'bg-rose-100 text-rose-600' :
               patient.status === 'Recovering' ? 'bg-green-100 text-green-600' :
               'bg-blue-100 text-blue-600'
            }`}>
              {patient.name.charAt(0)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="text-sm font-semibold text-slate-900 truncate">{patient.name}</p>
                <span className="text-xs text-slate-400 font-mono">{patient.id}</span>
              </div>
              <p className="text-sm text-slate-600 truncate mt-0.5">{patient.condition}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  2 {t('time.h')} {t('time.ago')}
                </span>
                <span>•</span>
                <span>{t(`gender.${patient.gender}`)}, {patient.age}y</span>
              </div>
            </div>

            <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
               <svg className="w-5 h-5 text-slate-400 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};