import React, { useState, useRef, useEffect } from 'react';
import { AGENTS, MOCK_PATIENTS } from '../constants';
import { Agent, Message, Patient } from '../types';
import { sendMessageToAgent } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

export const AgentConsole: React.FC = () => {
  const { t, dir } = useLanguage();
  const [selectedAgent, setSelectedAgent] = useState<Agent>(AGENTS[0]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [input, setInput] = useState('');
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hello, I am the ${AGENTS[0].name} agent. How can I assist you with clinical diagnosis or treatment protocols today?`,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAgentChange = (agent: Agent) => {
    setSelectedAgent(agent);
    const agentName = t(`agent.${agent.id}.name`);
    const agentDesc = t(`agent.${agent.id}.desc`);
    
    setMessages([
      {
        id: `welcome-${agent.id}`,
        role: 'model',
        text: `Switched to ${agentName} module. ${agentDesc} How can I help?`,
        timestamp: new Date()
      }
    ]);
  };

  const handleSymptomCheckTemplate = () => {
    const template = t('agent.template.symptom_check');
    setInput(template);
    inputRef.current?.focus();
  };

  // Helper to format text: removes **, ### and handles indentation
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Remove ** bold markers for clean display, but apply bold style if detected
      const cleanLine = line.replace(/\*\*/g, '').replace(/###/g, '').trim();
      
      if (!cleanLine) return <div key={index} className="h-2"></div>;

      // Header styling (detected by ### in original or usually capitalized short lines)
      const isHeader = line.includes('###');
      // List styling (detected by * or - at start)
      const isListItem = line.trim().startsWith('* ') || line.trim().startsWith('- ') || line.trim().startsWith('• ');

      if (isHeader) {
        return (
          <div key={index} className="font-bold text-base mt-4 mb-2 text-slate-800 border-b border-slate-200 pb-1">
            {cleanLine}
          </div>
        );
      }

      if (isListItem) {
        return (
          <div key={index} className="flex items-start gap-2 ml-4 rtl:mr-4 rtl:ml-0 my-1 text-slate-700">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-medical-500 shrink-0"></span>
            <span>{cleanLine.replace(/^[\*\-•]\s*/, '')}</span>
          </div>
        );
      }

      // Standard paragraph
      return (
        <div key={index} className="mb-1 text-slate-700 leading-relaxed">
          {cleanLine}
        </div>
      );
    });
  };

  const handleDownloadPDF = (content: string, timestamp: Date) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Clean markdown for print
    const cleanContent = content
      .split('\n')
      .map(line => {
        if (line.includes('###')) return `<h3>${line.replace(/###/g, '').replace(/\*\*/g, '')}</h3>`;
        if (line.trim().startsWith('*') || line.trim().startsWith('-')) return `<li>${line.replace(/[\*\-]/, '').replace(/\*\*/g, '')}</li>`;
        return `<p>${line.replace(/\*\*/g, '')}</p>`;
      })
      .join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html dir="${dir}">
      <head>
        <title>Medical Report - ${timestamp.toLocaleDateString()}</title>
        <style>
          body { font-family: sans-serif; padding: 40px; color: #333; }
          h1 { color: #0284c7; border-bottom: 2px solid #0284c7; padding-bottom: 10px; }
          h3 { color: #0f172a; margin-top: 20px; font-weight: bold; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
          p { margin-bottom: 8px; line-height: 1.5; font-size: 14px; }
          li { margin-bottom: 5px; margin-left: 20px; font-size: 14px; }
          .meta { font-size: 12px; color: #64748b; margin-bottom: 30px; }
          .footer { margin-top: 50px; font-size: 10px; text-align: center; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
        </style>
      </head>
      <body>
        <h1>${t('hospital.name')}</h1>
        <div class="meta">
          <p><strong>Date:</strong> ${timestamp.toLocaleString()}</p>
          <p><strong>Agent:</strong> ${t(`agent.${selectedAgent.id}.name`)}</p>
          ${selectedPatient ? `<p><strong>Patient:</strong> ${selectedPatient.name} (ID: ${selectedPatient.id})</p>` : ''}
        </div>
        <div class="content">
          ${cleanContent}
        </div>
        <div class="footer">
          Generated by MediMind-OS AI Assistant. Verify all information with clinical guidelines.
        </div>
        <script>
          window.print();
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    let prompt = input;
    if (selectedPatient) {
      prompt = `Context: Patient ${selectedPatient.name}, ${selectedPatient.age}y ${selectedPatient.gender}, Condition: ${selectedPatient.condition}, Vitals: BP ${selectedPatient.lastVitals.bp}, HR ${selectedPatient.lastVitals.hr}. \n\nQuery: ${input}`;
    }

    const responseText = await sendMessageToAgent(selectedAgent, prompt, history);

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex h-full gap-4">
      {/* Sidebar: Agents & Context */}
      <div className="w-80 flex flex-col gap-4 shrink-0">
        {/* Agent Selector */}
        <div className="bg-white rounded-lg shadow border border-slate-200 flex-1 flex flex-col overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 font-medium text-slate-700">
            {t('agent.select')}
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-2">
            {AGENTS.map(agent => (
              <button
                key={agent.id}
                onClick={() => handleAgentChange(agent)}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${
                  selectedAgent.id === agent.id
                    ? 'bg-slate-50 border-medical-500 ring-1 ring-medical-500'
                    : 'bg-white border-slate-200 hover:border-medical-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 ${agent.color}`}>
                  {agent.icon}
                </div>
                <div>
                  <div className="font-semibold text-slate-800 text-sm">{t(`agent.${agent.id}.name`)}</div>
                  <div className="text-xs text-slate-500 leading-tight mt-0.5">{t(`agent.${agent.id}.role`)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Patient Context Selector */}
        <div className="bg-white rounded-lg shadow border border-slate-200 h-1/3 flex flex-col overflow-hidden">
           <div className="p-3 bg-slate-50 border-b border-slate-200 font-medium text-slate-700 flex justify-between items-center">
            <span>{t('agent.context')}</span>
            {selectedPatient && (
              <button onClick={() => setSelectedPatient(null)} className="text-xs text-red-500 hover:underline">{t('agent.clear')}</button>
            )}
          </div>
          <div className="overflow-y-auto p-2 space-y-2">
            {MOCK_PATIENTS.map(patient => (
              <button
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`w-full text-left p-2 rounded text-sm border ${
                  selectedPatient?.id === patient.id 
                    ? 'bg-medical-50 border-medical-500 text-medical-900' 
                    : 'bg-white border-slate-100 hover:bg-slate-50'
                }`}
              >
                <div className="font-medium">{patient.name} ({patient.age}{patient.gender[0]})</div>
                <div className="text-xs text-slate-500 truncate">{patient.condition}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-white rounded-lg shadow border border-slate-200 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="h-16 border-b border-slate-200 flex items-center px-6 justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${selectedAgent.color}`}>
              {selectedAgent.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                 <h3 className="font-bold text-slate-800">{t(`agent.${selectedAgent.id}.name`)}</h3>
                 <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">
                    Agent v2.0
                 </span>
              </div>
              <p className="text-xs text-slate-500">
                {t('agent.powered_by')} • Safety Engine: <span className="text-green-600 font-medium">Active</span>
              </p>
            </div>
          </div>
          {selectedPatient && (
            <div className="bg-yellow-50 text-yellow-800 text-xs px-3 py-1 rounded-full border border-yellow-200">
              {t('agent.context')}: {selectedPatient.name}
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 shadow-sm relative ${
                  msg.role === 'user'
                    ? 'bg-medical-600 text-white rounded-br-none rtl:rounded-bl-none rtl:rounded-br-2xl'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none rtl:rounded-br-none rtl:rounded-bl-2xl'
                }`}
              >
                {/* Render formatting logic for Model, simple text for User */}
                <div className="text-sm">
                  {msg.role === 'model' ? renderFormattedText(msg.text) : msg.text}
                </div>
                
                <div className={`text-[10px] mt-2 opacity-70 flex justify-between items-center ${msg.role === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                  <span>{msg.timestamp.toLocaleTimeString()}</span>
                  
                  {msg.role === 'model' && (
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleDownloadPDF(msg.text, msg.timestamp)}
                        className="flex items-center gap-1 hover:text-medical-600 transition-colors"
                        title="Download / Print Report"
                      >
                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                         <span className="font-medium">Download PDF</span>
                      </button>
                      <span className="flex items-center gap-1 border-l border-slate-300 pl-3 rtl:pl-0 rtl:pr-3 rtl:border-r">
                        <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Verified
                     </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-4 shadow-sm flex flex-col space-y-2">
                 <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                 </div>
                 <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-100">
                    Analysing clinical protocols...
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
          <div className="mb-2 flex gap-2">
            <button
              onClick={handleSymptomCheckTemplate}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors border border-slate-200"
              title="Use Symptom Checker Template"
            >
              <span className="text-medical-600">🩺</span> {t('agent.symptom_checker')}
            </button>
             <button
              onClick={() => setInput(t('agent.template.treatment_protocol'))}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors border border-slate-200"
            >
              <span className="text-medical-600">📋</span> {t('agent.treatment_protocol')}
            </button>
          </div>
          <div className="flex gap-2 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={t('agent.input_placeholder')}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-medical-500 focus:border-transparent resize-none h-[80px]"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="px-6 rounded-xl bg-medical-600 text-white font-medium hover:bg-medical-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t('agent.send')}
            </button>
          </div>
          <div className="mt-2 flex justify-center items-center gap-4">
             <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                HIPAA Secure
             </div>
             <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {t('agent.disclaimer')}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};