import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // General
    'app.title': 'MediMind-OS',
    'hospital.name': 'Kabul General Hospital - Ward 4',
    'system.online': 'System Online',
    'back_dashboard': 'Back to Dashboard',
    'add_note': 'Add Note',
    'ai_consult': 'AI Consult',
    'start_consult': 'Start New Consult',
    'dr_name': 'Dr. Amira',
    'dr_role': 'Chief Resident',
    'time.ago': 'ago',
    'time.h': 'h', // hours
    
    // Sidebar
    'dashboard': 'Dashboard',
    'agents': 'AI Agents',
    'knowledge': 'Knowledge Graph',
    'system_monitor': 'System Monitor',
    
    // Dashboard Metrics
    'total_patients': 'Total Patients',
    'critical_cases': 'Critical Cases',
    'bed_occupancy': 'Bed Occupancy',
    'ai_consultations': 'AI Consultations',
    'needs_review': 'Needs immediate review',
    'high_load': 'High Load',
    'system_alerts': 'System Alerts',
    'active_cases': 'Active Cases Feed',
    'active': 'Active',

    // Alerts
    'alert.oxygen': 'Oxygen Supply Low',
    'alert.lis': 'Lab Interface Down',
    'alert.protocol': 'New Protocol Update',

    // Diagnosis Card & Vitals
    'diagnosis.primary': 'Primary Diagnosis',
    'vitals.bp': 'Blood Pressure',
    'vitals.hr': 'Heart Rate',
    'vitals.temp': 'Temperature',
    'vitals.spo2': 'SpO2',
    'patient.id': 'ID',
    'gender.Male': 'Male',
    'gender.Female': 'Female',
    'status.Critical': 'Critical',
    'status.Stable': 'Stable',
    'status.Recovering': 'Recovering',

    // Timeline
    'history.title': 'Medical History',
    'history.empty': 'No significant history recorded.',
    'history.recorded': 'Recorded in previous history',
    'history.initial': 'Initial Registration',

    // Blueprint
    'blueprint.title': 'Anatomical Blueprint',
    'blueprint.scan_id': 'Scan ID',
    'blueprint.modality': 'Modality',
    'blueprint.ant': 'ANT',
    'blueprint.post': 'POST',

    // Knowledge Graph
    'graph.title': 'Knowledge Graph Visualization',
    'graph.interactive': 'Interactive: Drag nodes to explore relationships',

    // Agent Console
    'agent.select': 'Select Specialist Agent',
    'agent.context': 'Patient Context',
    'agent.clear': 'Clear',
    'agent.powered_by': 'Powered by Gemini 3 Flash',
    'agent.input_placeholder': 'Ask about symptoms, drugs, or protocols...',
    'agent.send': 'Send',
    'agent.disclaimer': 'AI generated content may be inaccurate. Verify with clinical guidelines.',
    'agent.symptom_checker': 'Symptom Checker',
    'agent.treatment_protocol': 'Treatment Protocol',
    'agent.template.symptom_check': 'Symptom Check Request:\nPatient Age: \nGender: \nChief Complaint: \nOnset/Duration: \nAssociated Symptoms: \nVitals (if available): ',
    'agent.template.treatment_protocol': 'Explain the treatment protocol for: ',
    
    // Agent Names & Roles
    'agent.diagnostic_assistant.name': 'Diagnostic Assistant',
    'agent.diagnostic_assistant.role': 'General Practitioner',
    'agent.diagnostic_assistant.desc': 'Symptom analysis and differential diagnosis.',
    'agent.infectious_disease.name': 'Infectious Disease',
    'agent.infectious_disease.role': 'Specialist',
    'agent.infectious_disease.desc': 'Specialized TB, Malaria, and Hepatitis management.',
    'agent.maternal_child.name': 'Maternal & Child',
    'agent.maternal_child.role': 'Specialist',
    'agent.maternal_child.desc': 'Prenatal, postnatal, and pediatric care.',
    'agent.chronic_disease.name': 'Chronic Disease',
    'agent.chronic_disease.role': 'Specialist',
    'agent.chronic_disease.desc': 'Diabetes, Hypertension, COPD management.',
    'agent.emergency.name': 'Emergency / Trauma',
    'agent.emergency.role': 'Triage',
    'agent.emergency.desc': 'Acute trauma, triage, and resuscitation.',
    'agent.mental_health.name': 'Mental Health',
    'agent.mental_health.role': 'Counselor',
    'agent.mental_health.desc': 'PTSD, Depression, Anxiety support.',

    // System Monitor
    'monitor.subtitle': 'Real-time infrastructure and kernel health observability',
    'monitor.k8s_status': 'KUBERNETES: HEALTHY',
    'monitor.region': 'REGION: AF-SOUTH-1',
    'monitor.core_resources': 'Core Resources (Cluster)',
    'monitor.cpu': 'CPU Usage',
    'monitor.memory': 'Memory Usage',
    'monitor.latency': 'Network Latency',
    'monitor.persistence': 'Data Persistence',
    'monitor.active': 'Active',
    'monitor.hit_rate': 'Hit Rate',
    'monitor.indexing': 'Indexing',
    'monitor.microservices': 'Microservices Status',
    'monitor.service_name': 'Service Name',
    'monitor.replica': 'Replica Set',
    'monitor.uptime': 'Uptime',
    'monitor.status': 'Status',
    'monitor.running': 'Running',
    'monitor.logs': 'Live Kernel Logs',

    // Login
    'login.subtitle': 'Professional Medical AI Platform',
    'login.system_op': 'System Operational v2.0.0',
    'login.clinician_id': 'Clinician ID',
    'login.enter_id': 'Enter ID',
    'login.password': 'Password',
    'login.access_portal': 'Access Portal',
    'login.authenticating': 'Authenticating...',
    'login.footer': 'Authorized personnel only. All access is logged and audited.'
  },
  fa: {
    // General
    'app.title': 'مدی‌مایند',
    'hospital.name': 'شفاخانه عمومی کابل - بخش ۴',
    'system.online': 'سیستم آنلاین',
    'back_dashboard': 'بازگشت به داشبورد',
    'add_note': 'افزودن یادداشت',
    'ai_consult': 'مشاوره هوش مصنوعی',
    'start_consult': 'شروع مشاوره جدید',
    'dr_name': 'دکتر امیرا',
    'dr_role': 'رئیس رزیدنت‌ها',
    'time.ago': 'پیش',
    'time.h': 'ساعت',

    // Sidebar
    'dashboard': 'داشبورد',
    'agents': 'عامل‌های هوشمند',
    'knowledge': 'گراف دانش',
    'system_monitor': 'مانیتور سیستم',

    // Dashboard Metrics
    'total_patients': 'مجموع بیماران',
    'critical_cases': 'موارد بحرانی',
    'bed_occupancy': 'اشغال تخت',
    'ai_consultations': 'مشاوره‌های هوشمند',
    'needs_review': 'نیاز به بررسی فوری',
    'high_load': 'بار کاری بالا',
    'system_alerts': 'هشدارهای سیستم',
    'active_cases': 'فید موارد فعال',
    'active': 'فعال',

    // Alerts
    'alert.oxygen': 'کاهش ذخیره اکسیژن',
    'alert.lis': 'قطعی رابط آزمایشگاه',
    'alert.protocol': 'بروزرسانی پروتکل جدید',

    // Diagnosis Card & Vitals
    'diagnosis.primary': 'تشخیص اولیه',
    'vitals.bp': 'فشار خون',
    'vitals.hr': 'ضربان قلب',
    'vitals.temp': 'درجه حرارت',
    'vitals.spo2': 'اشباع اکسیژن',
    'patient.id': 'شناسه',
    'gender.Male': 'مرد',
    'gender.Female': 'زن',
    'status.Critical': 'بحرانی',
    'status.Stable': 'پایدار',
    'status.Recovering': 'رو به بهبود',

    // Timeline
    'history.title': 'تاریخچه پزشکی',
    'history.empty': 'تاریخچه مهمی ثبت نشده است.',
    'history.recorded': 'ثبت شده در سوابق قبلی',
    'history.initial': 'ثبت نام اولیه',

    // Blueprint
    'blueprint.title': 'نقشه آناتومیک',
    'blueprint.scan_id': 'شناسه اسکن',
    'blueprint.modality': 'روش تصویربرداری',
    'blueprint.ant': 'قدامی',
    'blueprint.post': 'خلفی',

    // Knowledge Graph
    'graph.title': 'تصویرسازی گراف دانش',
    'graph.interactive': 'تعاملی: گره‌ها را برای کشف روابط بکشید',

    // Agent Console
    'agent.select': 'انتخاب متخصص هوشمند',
    'agent.context': 'زمینه بیمار',
    'agent.clear': 'پاک کردن',
    'agent.powered_by': 'با قدرت جمنای ۳ فلش',
    'agent.input_placeholder': 'سوال درباره علائم، داروها یا پروتکل‌ها...',
    'agent.send': 'ارسال',
    'agent.disclaimer': 'محتوای هوش مصنوعی ممکن است دقیق نباشد. با دستورالعمل‌های بالینی تایید کنید.',
    'agent.symptom_checker': 'بررسی علائم',
    'agent.treatment_protocol': 'پروتکل درمانی',
    'agent.template.symptom_check': 'درخواست بررسی علائم:\nسن بیمار: \nجنسیت: \nشکایت اصلی: \nشروع/مدت: \nعلائم همراه: \nعلائم حیاتی (در صورت وجود): ',
    'agent.template.treatment_protocol': 'پروتکل درمانی را برای این مورد توضیح دهید: ',

    // Agent Names & Roles
    'agent.diagnostic_assistant.name': 'دستیار تشخیصی',
    'agent.diagnostic_assistant.role': 'پزشک عمومی',
    'agent.diagnostic_assistant.desc': 'تحلیل علائم و تشخیص افتراقی.',
    'agent.infectious_disease.name': 'بیماری‌های عفونی',
    'agent.infectious_disease.role': 'متخصص',
    'agent.infectious_disease.desc': 'مدیریت تخصصی سل، مالاریا و هپاتیت.',
    'agent.maternal_child.name': 'مادر و کودک',
    'agent.maternal_child.role': 'متخصص',
    'agent.maternal_child.desc': 'مراقبت‌های پیش از زایمان، پس از زایمان و کودکان.',
    'agent.chronic_disease.name': 'بیماری‌های مزمن',
    'agent.chronic_disease.role': 'متخصص',
    'agent.chronic_disease.desc': 'مدیریت دیابت، فشار خون و COPD.',
    'agent.emergency.name': 'اورژانس / تروما',
    'agent.emergency.role': 'تریاژ',
    'agent.emergency.desc': 'ترومای حاد، تریاژ و احیاء.',
    'agent.mental_health.name': 'سلامت روان',
    'agent.mental_health.role': 'مشاور',
    'agent.mental_health.desc': 'پشتیبانی PTSD، افسردگی و اضطراب.',

    // System Monitor
    'monitor.subtitle': 'مشاهده‌پذیری زیرساخت و سلامت هسته در زمان واقعی',
    'monitor.k8s_status': 'کوبرنتیز: سالم',
    'monitor.region': 'منطقه: AF-SOUTH-1',
    'monitor.core_resources': 'منابع هسته (کلاستر)',
    'monitor.cpu': 'مصرف پردازنده',
    'monitor.memory': 'مصرف حافظه',
    'monitor.latency': 'تأخیر شبکه',
    'monitor.persistence': 'پایداری داده‌ها',
    'monitor.active': 'فعال',
    'monitor.hit_rate': 'نرخ برخورد',
    'monitor.indexing': 'اینکس‌گذاری',
    'monitor.microservices': 'وضعیت میکروسرویس‌ها',
    'monitor.service_name': 'نام سرویس',
    'monitor.replica': 'مجموعه کپی',
    'monitor.uptime': 'زمان فعالیت',
    'monitor.status': 'وضعیت',
    'monitor.running': 'در حال اجرا',
    'monitor.logs': 'لاگ‌های زنده کرنل',

    // Login
    'login.subtitle': 'پلتفرم هوش مصنوعی پزشکی حرفه‌ای',
    'login.system_op': 'سیستم عملیاتی نسخه ۲.۰.۰',
    'login.clinician_id': 'شناسه پزشک',
    'login.enter_id': 'شناسه را وارد کنید',
    'login.password': 'رمز عبور',
    'login.access_portal': 'ورود به پورتال',
    'login.authenticating': 'در حال احراز هویت...',
    'login.footer': 'فقط پرسنل مجاز. تمام دسترسی‌ها ثبت و بازرسی می‌شوند.'
  },
  ps: {
    // General
    'app.title': 'میډی مائنډ',
    'hospital.name': 'د کابل عمومي روغتون - ۴ څانګه',
    'system.online': 'سیسټم آنلاین',
    'back_dashboard': 'بیرته ډشبورډ ته',
    'add_note': 'یادښت اضافه کړئ',
    'ai_consult': 'مشوره',
    'start_consult': 'نوې مشوره پیل کړئ',
    'dr_name': 'ډاکټر امیره',
    'dr_role': 'لوړ رتبه ډاکټر',
    'time.ago': 'مخکې',
    'time.h': 'ساعته',

    // Sidebar
    'dashboard': 'ډشبورډ',
    'agents': 'هوښیار استازي',
    'knowledge': 'د پوهې ګراف',
    'system_monitor': 'د سیسټم څارنه',

    // Dashboard Metrics
    'total_patients': 'ټول ناروغان',
    'critical_cases': 'مهمې پیښې',
    'bed_occupancy': 'د بستر اشغال',
    'ai_consultations': 'د هوش مصنوعی مشورې',
    'needs_review': 'فوري بیاکتنې ته اړتیا',
    'high_load': 'لوړ بار',
    'system_alerts': 'د سیسټم خبرتیاوې',
    'active_cases': 'د فعالو قضیو فیډ',
    'active': 'فعال',

    // Alerts
    'alert.oxygen': 'د اکسیجن کمښت',
    'alert.lis': 'د لابراتوار اړیکه پرې شوې',
    'alert.protocol': 'د نوي پروتوکول تازه کول',

    // Diagnosis Card & Vitals
    'diagnosis.primary': 'لومړنی تشخیص',
    'vitals.bp': 'د وینې فشار',
    'vitals.hr': 'د زړه ضربان',
    'vitals.temp': 'د بدن تودوخه',
    'vitals.spo2': 'د اکسیجن کچه',
    'patient.id': 'پیژند',
    'gender.Male': 'نارینه',
    'gender.Female': 'ښځینه',
    'status.Critical': 'نازک',
    'status.Stable': 'باثبات',
    'status.Recovering': 'مخ په ښه کیدو',

    // Timeline
    'history.title': 'طبی تاریخچه',
    'history.empty': 'کوم مهم تاریخ نه دی ثبت شوی.',
    'history.recorded': 'په پخوانیو سوابقو کې ثبت شوی',
    'history.initial': 'لومړنی ثبت',

    // Blueprint
    'blueprint.title': 'اناتومیک نقشه',
    'blueprint.scan_id': 'د سکین پیژند',
    'blueprint.modality': 'د انځور اخیستنې طریقه',
    'blueprint.ant': 'مخکینی',
    'blueprint.post': 'شاته',

    // Knowledge Graph
    'graph.title': 'د پوهې ګراف لید',
    'graph.interactive': 'تعامل: د اړیکو سپړلو لپاره غوټۍ کش کړئ',

    // Agent Console
    'agent.select': 'ځانګړی استازی وټاکئ',
    'agent.context': 'د ناروغ شرایط',
    'agent.clear': 'پاکول',
    'agent.powered_by': 'د جمنای ۳ فلش لخوا ځواکمن شوی',
    'agent.input_placeholder': 'د نښو، درملو، یا پروتوکولونو په اړه پوښتنه وکړئ...',
    'agent.send': 'لیږل',
    'agent.disclaimer': 'د AI مینځپانګه ممکن دقیقه نه وي. د کلینیکي لارښوونو سره تایید کړئ.',
    'agent.symptom_checker': 'د نښو چیکر',
    'agent.treatment_protocol': 'د درملنې پروتوکول',
    'agent.template.symptom_check': 'د نښو ارزونې غوښتنه:\nد ناروغ عمر: \nجنسیت: \nاصلي شکایت: \nپیل/موده: \nملګری نښې: \nحیاتي نښې (که شتون ولري): ',
    'agent.template.treatment_protocol': 'د دې لپاره د درملنې پروتوکول تشریح کړئ: ',

    // Agent Names & Roles
    'agent.diagnostic_assistant.name': 'د تشخیص مرستیال',
    'agent.diagnostic_assistant.role': 'عمومي ډاکټر',
    'agent.diagnostic_assistant.desc': 'د نښو تحلیل او توپیري تشخیص.',
    'agent.infectious_disease.name': 'انتاني ناروغۍ',
    'agent.infectious_disease.role': 'متخصص',
    'agent.infectious_disease.desc': 'د نري رنځ، ملاریا او هیپاټایټس ځانګړې درملنه.',
    'agent.maternal_child.name': 'مور او ماشوم',
    'agent.maternal_child.role': 'متخصص',
    'agent.maternal_child.desc': 'د زیږون دمخه، وروسته او د ماشومانو پاملرنه.',
    'agent.chronic_disease.name': 'اوږدمهاله ناروغۍ',
    'agent.chronic_disease.role': 'متخصص',
    'agent.chronic_disease.desc': 'د شکرې، وینې لوړ فشار او COPD مدیریت.',
    'agent.emergency.name': 'بیړنۍ / ټرامه',
    'agent.emergency.role': 'تریاژ',
    'agent.emergency.desc': 'حاد ټرامه، تریاژ او بیا ژوندي کول.',
    'agent.mental_health.name': 'رواني روغتیا',
    'agent.mental_health.role': 'مشاور',
    'agent.mental_health.desc': 'د PTSD، خپګان او اضطراب ملاتړ.',

    // System Monitor
    'monitor.subtitle': 'د ریښتیني وخت زیربنا او د کرنل روغتیا څارنه',
    'monitor.k8s_status': 'کوبرنیټس: روغ',
    'monitor.region': 'سیمه: AF-SOUTH-1',
    'monitor.core_resources': 'اصلي سرچینې (کلسټر)',
    'monitor.cpu': 'د CPU کارول',
    'monitor.memory': 'د حافظې کارول',
    'monitor.latency': 'د شبکې ځنډ',
    'monitor.persistence': 'د معلوماتو پایښت',
    'monitor.active': 'فعال',
    'monitor.hit_rate': 'د بریالیتوب کچه',
    'monitor.indexing': 'لیست کول',
    'monitor.microservices': 'د مایکرو خدماتو حالت',
    'monitor.service_name': 'د خدمت نوم',
    'monitor.replica': 'د نقل ټولګه',
    'monitor.uptime': 'د فعالیت وخت',
    'monitor.status': 'حالت',
    'monitor.running': 'چلیږي',
    'monitor.logs': 'ژوندي کرنل لاګونه',

    // Login
    'login.subtitle': 'د مسلکي طبي AI پلیټ فارم',
    'login.system_op': 'عملیاتي سیسټم v2.0.0',
    'login.clinician_id': 'د ډاکټر پیژند',
    'login.enter_id': 'پیژند دننه کړئ',
    'login.password': 'پټنوم',
    'login.access_portal': 'پورټل ته لاسرسی',
    'login.authenticating': 'تصدیق کول...',
    'login.footer': 'یوازې مجاز پرسونل. ټول لاسرسی ثبت او پلټل کیږي.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const dir = language === 'en' ? 'ltr' : 'rtl';
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    
    // Optional: Add a class to body for specific styling if needed
    if (dir === 'rtl') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir: language === 'en' ? 'ltr' : 'rtl' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};