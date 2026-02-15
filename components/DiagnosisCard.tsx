import React from 'react';
import { Patient } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface DiagnosisCardProps {
  patient: Patient;
}

export const DiagnosisCard: React.FC<DiagnosisCardProps> = ({ patient }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">{patient.name}</h3>
          <p className="text-sm text-slate-500">
             {t('patient.id')}: {patient.id} • {patient.age}y • {t(`gender.${patient.gender}`)}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          patient.status === 'Critical' ? 'bg-rose-100 text-rose-700' :
          patient.status === 'Stable' ? 'bg-emerald-100 text-emerald-700' :
          'bg-blue-100 text-blue-700'
        }`}>
          {t(`status.${patient.status}`)}
        </span>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t('diagnosis.primary')}</label>
          <p className="text-xl font-medium text-slate-800 mt-1">{patient.condition}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <label className="text-xs text-slate-500">{t('vitals.bp')}</label>
            <div className="text-lg font-semibold text-slate-700">{patient.lastVitals.bp} <span className="text-xs font-normal text-slate-400">mmHg</span></div>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <label className="text-xs text-slate-500">{t('vitals.hr')}</label>
            <div className="text-lg font-semibold text-slate-700">{patient.lastVitals.hr} <span className="text-xs font-normal text-slate-400">bpm</span></div>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <label className="text-xs text-slate-500">{t('vitals.temp')}</label>
            <div className={`text-lg font-semibold ${patient.lastVitals.temp > 37.5 ? 'text-rose-600' : 'text-slate-700'}`}>
              {patient.lastVitals.temp}°C
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <label className="text-xs text-slate-500">{t('vitals.spo2')}</label>
            <div className={`text-lg font-semibold ${patient.lastVitals.spo2 < 95 ? 'text-orange-600' : 'text-slate-700'}`}>
              {patient.lastVitals.spo2}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};