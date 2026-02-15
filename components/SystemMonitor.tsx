import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const SystemMonitor: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pr-2 pb-10">
      <div className="flex justify-between items-end border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{t('system_monitor')}</h2>
          <p className="text-slate-500 mt-1">{t('monitor.subtitle')}</p>
        </div>
        <div className="flex gap-2">
           <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-mono rounded border border-green-200">
             {t('monitor.k8s_status')}
           </span>
           <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-mono rounded border border-blue-200">
             {t('monitor.region')}
           </span>
        </div>
      </div>

      {/* Infrastructure Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Resources */}
        <div className="bg-slate-900 text-white rounded-xl p-5 shadow-lg col-span-2">
           <h3 className="font-bold text-sm text-slate-400 uppercase tracking-wider mb-4">{t('monitor.core_resources')}</h3>
           <div className="grid grid-cols-3 gap-4 text-center">
             <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-3xl font-mono text-medical-400 mb-1">24%</div>
                <div className="text-xs text-slate-500">{t('monitor.cpu')}</div>
                <div className="w-full bg-slate-700 h-1 mt-3 rounded-full overflow-hidden">
                  <div className="bg-medical-400 h-full w-[24%]"></div>
                </div>
             </div>
             <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-3xl font-mono text-purple-400 mb-1">4.2GB</div>
                <div className="text-xs text-slate-500">{t('monitor.memory')}</div>
                 <div className="w-full bg-slate-700 h-1 mt-3 rounded-full overflow-hidden">
                  <div className="bg-purple-400 h-full w-[45%]"></div>
                </div>
             </div>
             <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-3xl font-mono text-green-400 mb-1">12ms</div>
                <div className="text-xs text-slate-500">{t('monitor.latency')}</div>
                 <div className="w-full bg-slate-700 h-1 mt-3 rounded-full overflow-hidden">
                  <div className="bg-green-400 h-full w-[10%]"></div>
                </div>
             </div>
           </div>
        </div>

        {/* Database Status */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
           <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4">{t('monitor.persistence')}</h3>
           <div className="space-y-4">
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="font-mono text-sm">PostgreSQL</span>
                 </div>
                 <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">{t('monitor.active')}</span>
              </div>
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="font-mono text-sm">MongoDB</span>
                 </div>
                 <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">{t('monitor.active')}</span>
              </div>
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="font-mono text-sm">Redis Cache</span>
                 </div>
                 <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">98% {t('monitor.hit_rate')}</span>
              </div>
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="font-mono text-sm">Elasticsearch</span>
                 </div>
                 <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">{t('monitor.indexing')}</span>
              </div>
           </div>
        </div>
      </div>

      {/* Services Status */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
         <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-bold text-slate-800">{t('monitor.microservices')}</h3>
         </div>
         <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
               <tr>
                  <th className="px-6 py-3">{t('monitor.service_name')}</th>
                  <th className="px-6 py-3">{t('monitor.replica')}</th>
                  <th className="px-6 py-3">{t('monitor.uptime')}</th>
                  <th className="px-6 py-3">{t('monitor.status')}</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               <tr>
                  <td className="px-6 py-4 font-mono">medimind-ai-engine</td>
                  <td className="px-6 py-4">3 / 3</td>
                  <td className="px-6 py-4">14d 2h</td>
                  <td className="px-6 py-4"><span className="text-green-600 font-medium">{t('monitor.running')}</span></td>
               </tr>
               <tr>
                  <td className="px-6 py-4 font-mono">medimind-agents-infectious</td>
                  <td className="px-6 py-4">2 / 2</td>
                  <td className="px-6 py-4">14d 2h</td>
                  <td className="px-6 py-4"><span className="text-green-600 font-medium">{t('monitor.running')}</span></td>
               </tr>
               <tr>
                  <td className="px-6 py-4 font-mono">medimind-agents-maternal</td>
                  <td className="px-6 py-4">2 / 2</td>
                  <td className="px-6 py-4">14d 2h</td>
                  <td className="px-6 py-4"><span className="text-green-600 font-medium">{t('monitor.running')}</span></td>
               </tr>
                <tr>
                  <td className="px-6 py-4 font-mono">medimind-api-gateway</td>
                  <td className="px-6 py-4">2 / 2</td>
                  <td className="px-6 py-4">14d 2h</td>
                  <td className="px-6 py-4"><span className="text-green-600 font-medium">{t('monitor.running')}</span></td>
               </tr>
            </tbody>
         </table>
      </div>

      {/* Logs Preview */}
      <div className="bg-slate-900 rounded-xl p-5 shadow-lg font-mono text-xs text-slate-300">
         <h3 className="font-bold text-slate-400 uppercase tracking-wider mb-3">{t('monitor.logs')}</h3>
         <div className="space-y-1 h-32 overflow-y-auto">
            <p><span className="text-slate-500">[2024-05-20 10:42:01]</span> <span className="text-blue-400">INFO</span> [kernel.orchestrator] Agent infectious_disease initialized successfully.</p>
            <p><span className="text-slate-500">[2024-05-20 10:42:05]</span> <span className="text-blue-400">INFO</span> [kernel.event_bus] New patient data ingested for ID: P-1024.</p>
            <p><span className="text-slate-500">[2024-05-20 10:42:12]</span> <span className="text-yellow-400">WARN</span> [integration.lis] Latency spike detected in LIS Adapter (205ms).</p>
            <p><span className="text-slate-500">[2024-05-20 10:43:01]</span> <span className="text-blue-400">INFO</span> [security.audit] User DR-AMIRA-102 accessed BlueprintViewer.</p>
            <p><span className="text-slate-500">[2024-05-20 10:43:45]</span> <span className="text-blue-400">INFO</span> [ai.inference] Infectious Disease Agent analysis completed (Confidence: 0.92).</p>
         </div>
      </div>
    </div>
  );
};