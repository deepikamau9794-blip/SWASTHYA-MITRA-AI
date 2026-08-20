import type { NoticeItem, WorkerReminder } from '../types';

export const mockNotices: NoticeItem[] = [
  {
    id: "NOT-2026-01",
    title: "New Offline-Sync & PWA Caching Module 2.4 Rolled Out for Frontline Tablets",
    titleHi: "फ्रंटलाइन टैबलेट्स के लिए नया ऑफलाइन-सिंक और पीडब्ल्यूए कैशिंग मॉड्यूल 2.4 जारी",
    date: "18 Aug 2026",
    category: "URGENT",
    content: "All ASHA and ANM workers can now conduct full clinical triage in zero-network rural zones. Records will auto-sync upon returning to 4G/Wi-Fi coverage.",
    contentHi: "सभी आशा और एएनएम कार्यकर्ता अब बिना इंटरनेट वाले ग्रामीण क्षेत्रों में भी पूर्ण स्वास्थ्य जांच कर सकती हैं। नेटवर्क आने पर डेटा स्वतः सिंक हो जाएगा।",
    isPinned: true,
    department: "National Health Mission UP / Digital Health"
  },
  {
    id: "NOT-2026-02",
    title: "Monsoon Vector-Borne Fever Surveillance Protocol (Dengue/Malaria/JE Alert)",
    titleHi: "मानसून मच्छर जनित बुखार निगरानी प्रोटोकॉल (डेंगू/मलेरिया/जेई सतर्कता)",
    date: "16 Aug 2026",
    category: "CIRCULAR",
    content: "Frontline health workers are advised to utilize the Fever Rapid Diagnostic Kit (RDT) for cases with fever > 3 days and immediately record in Swasthya Mitra AI.",
    contentHi: "3 दिन से अधिक के बुखार वाले सभी मरीजों की आरडीटी किट से जांच करें और विवरण तुरंत स्वास्थ्या मित्र एआई पोर्टल पर दर्ज करें।",
    isPinned: true,
    department: "District Health Society Pratapgarh"
  },
  {
    id: "NOT-2026-03",
    title: "ASHA Training Webinar on Pediatric Respiratory Distress & IMNCI Protocols — 25 Aug",
    titleHi: "बाल श्वसन संक्रमण व आईएमएनसीआई प्रोटोकॉल पर आशा प्रशिक्षण वेबिनार — 25 अगस्त",
    date: "14 Aug 2026",
    category: "TRAINING",
    content: "Live virtual training with AIIMS Gorakhpur pediatric faculty on early identification of pneumonia and respiratory danger signs.",
    contentHi: "एम्स गोरखपुर के बाल रोग विशेषज्ञों के साथ निमोनिया व श्वसन खतरे के लक्षणों की पहचान पर लाइव वर्चुअल प्रशिक्षण।",
    isPinned: false,
    department: "RECP Pratapgarh & AIIMS Telemedicine Unit"
  },
  {
    id: "NOT-2026-04",
    title: "Natural Hindi & Awadhi Voice Input Beta Enabled for Dialect Triage",
    titleHi: "अवधी व हिंदी वॉयस इनपुट का बीटा वर्जन चालू — बोलकर लक्षण दर्ज करें",
    date: "10 Aug 2026",
    category: "GENERAL",
    content: "Frontline workers can now tap 'Speak Symptoms in Hindi' to transcribe rural colloquial complaints directly into structured clinical parameters.",
    contentHi: "अब 'हिंदी में बोलें' बटन दबाकर ग्रामीण मरीजों के लक्षणों को सीधे सिस्टम में दर्ज किया जा सकता है।",
    isPinned: false,
    department: "Swasthya Mitra AI R&D Cell"
  }
];

export const mockReminders: WorkerReminder[] = [
  {
    id: "REM-01",
    patientId: "RH-2026-00102",
    patientName: "Baby Aarav",
    village: "Purey Pandey, Pratapgarh",
    title: "Pneumonia Follow-up & Temperature Check",
    titleHi: "निमोनिया फॉलो-अप व तापमान पुनः जांच",
    category: "POST_NATAL",
    dueDate: "Today, 4:00 PM",
    isOverdue: false,
    completed: false
  },
  {
    id: "REM-02",
    patientId: "RH-2026-00089",
    patientName: "Kamlesh Verma",
    village: "Sandwa Chandrika",
    title: "Hypertension / BP Screening & Medication Review",
    titleHi: "उच्च रक्तचाप (बीपी) जांच व दवा समीक्षा",
    category: "NCD_FOLLOWUP",
    dueDate: "Today, 5:30 PM",
    isOverdue: false,
    completed: false
  },
  {
    id: "REM-03",
    patientId: "RH-2026-00045",
    patientName: "Pooja Yadav",
    village: "Lalganj Ajhara",
    title: "3rd Trimester ANC Checkup & Iron-Folic Acid Distribution",
    titleHi: "तीसरी तिमाही एएनसी जांच व आईएफए गोलियां वितरण",
    category: "ANC_CHECKUP",
    dueDate: "Tomorrow, 10:00 AM",
    isOverdue: false,
    completed: false
  },
  {
    id: "REM-04",
    patientId: "RH-2026-00078",
    patientName: "Ananya Mishra (8 Months)",
    village: "Purey Pandey, Pratapgarh",
    title: "Measles-Rubella (MR-1) Vaccination Due",
    titleHi: "खसरा-रूबेला (एमआर-1) टीकाकरण देय",
    category: "VACCINATION",
    dueDate: "21 Aug 2026",
    isOverdue: false,
    completed: false
  }
];
