import React, { useState } from 'react';
import { MOCK_PATIENTS } from '../constants';
import { ViewType, Patient } from '../types';
import { CaseFeed } from './CaseFeed';
import { DiagnosisCard } from './DiagnosisCard';
import { PatientTimeline } from './PatientTimeline';
import { BlueprintViewer } from './BlueprintViewer';
import { useLanguage } from '../contexts/LanguageContext';

interface PatientDashboardProps {
  onViewChange: (view: ViewType) => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ onViewChange }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { t } = useLanguage();

  if (selectedPatient) {
    return (
      <div className="h-full flex flex-col animate-in fade-in duration-300">
        {/* Navigation / Actions */}
        <div className="mb-4 flex justify-between items-center">
          <button 
            onClick={() => setSelectedPatient(null)} 
            className="flex items-center text-slate-600 hover:text-medical-600 transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-1 rtl:ml-1 rtl:mr-0 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {t('back_dashboard')}
          </button>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
                {t('add_note')}
             </button>
             <button 
                onClick={() => onViewChange('agents')}
                className="px-4 py-2 bg-medical-600 text-white rounded-lg hover:bg-medical-700 shadow-sm font-medium text-sm flex items-center gap-2"
             >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                {t('ai_consult')}
             </button>
          </div>
        </div>

        {/* Detailed Layout */}
        <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden pb-2">
          {/* Left Column: Vitals & History */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-6 overflow-y-auto pr-1">
            <div className="shrink-0">
               <DiagnosisCard patient={selectedPatient} />
            </div>
            <div className="flex-1 min-h-[300px]">
               <PatientTimeline history={selectedPatient.history} />
            </div>
          </div>

          {/* Right Column: Visualization */}
          <div className="col-span-12 md:col-span-8 h-full">
            <BlueprintViewer />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">{t('total_patients')}</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">124</h3>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-green-600 font-medium">
            <span>+12</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">{t('critical_cases')}</p>
              <h3 className="text-2xl font-bold text-rose-600 mt-1">8</h3>
            </div>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-rose-600 font-medium">
            <span>{t('needs_review')}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">{t('bed_occupancy')}</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">92%</h3>
            </div>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-orange-600 font-medium">
            <span>{t('high_load')}</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-medical-500 to-medical-700 rounded-xl shadow-sm border border-transparent p-5 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-medical-100">{t('ai_consultations')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">45</h3>
            </div>
             <div className="p-2 bg-white/20 rounded-lg text-white">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
          </div>
          <div className="mt-4 text-xs text-medical-100">
            <button onClick={() => onViewChange('agents')} className="underline hover:text-white flex items-center gap-1">
              {t('start_consult')} <span className="rtl:rotate-180">&rarr;</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6 flex-1 overflow-hidden pb-4">
        {/* Patient Feed */}
        <div className="flex-1 flex flex-col min-h-0">
          <CaseFeed patients={MOCK_PATIENTS} onSelectPatient={setSelectedPatient} />
        </div>

        {/* Alerts / Activity */}
        <div className="w-80 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col shrink-0">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-bold text-slate-800">{t('system_alerts')}</h3>
          </div>
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            <div className="flex gap-3">
               <div className="mt-1 w-2 h-2 rounded-full bg-rose-500 shrink-0"></div>
               <div>
                 <p className="text-sm font-medium text-slate-800">{t('alert.oxygen')}</p>
                 <p className="text-xs text-slate-500 mt-1">Main storage tank B at 15% capacity.</p>
                 <span className="text-[10px] text-slate-400 mt-2 block">10 mins ago</span>
               </div>
            </div>
             <div className="flex gap-3">
               <div className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0"></div>
               <div>
                 <p className="text-sm font-medium text-slate-800">{t('alert.lis')}</p>
                 <p className="text-xs text-slate-500 mt-1">LIS Adapter failing to sync results.</p>
                 <span className="text-[10px] text-slate-400 mt-2 block">45 mins ago</span>
               </div>
            </div>
             <div className="flex gap-3">
               <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
               <div>
                 <p className="text-sm font-medium text-slate-800">{t('alert.protocol')}</p>
                 <p className="text-xs text-slate-500 mt-1">Updated Malaria treatment guidelines.</p>
                 <span className="text-[10px] text-slate-400 mt-2 block">2 hours ago</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};