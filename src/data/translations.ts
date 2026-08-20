export interface TranslationDict {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: TranslationDict = {
  // Navigation & Utility
  appName: {
    en: "Swasthya Mitra AI",
    hi: "स्वास्थ्य मित्र एआई",
  },
  tagline: {
    en: "Assist. Triage. Refer. Connect.",
    hi: "सहायता · प्राथमिक जांच · रेफरल · समन्वय",
  },
  govtLockupSub: {
    en: "Ministry of Health & Family Welfare, Government of India",
    hi: "स्वास्थ्य एवं परिवार कल्याण मंत्रालय, भारत सरकार",
  },
  initiativeSub: {
    en: "A Clinical Decision-Support Initiative for Frontline Healthcare Workers — Pratapgarh, Uttar Pradesh",
    hi: "अग्रिम पंक्ति के स्वास्थ्य कार्यकर्ताओं (आशा/एएनएम) के लिए नैदानिक निर्णय-समर्थन पहल — प्रतापगढ़, उत्तर प्रदेश",
  },
  emergencyMarquee: {
    en: "🚨 Medical Emergency? Call 108 (Ambulance) / 104 (Health Helpline) or visit nearest PHC immediately",
    hi: "🚨 आपातकालीन स्थिति? तुरंत 108 (एम्बुलेंस) / 104 (स्वास्थ्य हेल्पलाइन) डायल करें या नज़दीकी पीएचसी पहुंचे",
  },
  skipToContent: {
    en: "Skip to main content",
    hi: "मुख्य सामग्री पर जाएं",
  },
  highContrast: {
    en: "High Contrast",
    hi: "उच्च कंट्रास्ट",
  },
  fontSize: {
    en: "Text Size",
    hi: "अक्षर आकार",
  },
  
  // Public Menu
  navHome: {
    en: "Home",
    hi: "मुख्य पृष्ठ",
  },
  navAbout: {
    en: "About Initiative",
    hi: "पहल के बारे में",
  },
  navForWorkers: {
    en: "For Health Workers",
    hi: "स्वास्थ्य कार्यकर्ताओं हेतु",
  },
  navForDoctors: {
    en: "For Doctors / MO",
    hi: "चिकित्सकों हेतु",
  },
  navServices: {
    en: "Patient Services",
    hi: "मरीज सेवाएं",
  },
  navResources: {
    en: "Resources & Guidelines",
    hi: "संसाधन व दिशानिर्देश",
  },
  navContact: {
    en: "Helpdesk & Contact",
    hi: "संपर्क व सहायता",
  },

  // Auth & Roles
  loginTitle: {
    en: "Portal Login",
    hi: "पोर्टल लॉगिन",
  },
  roleWorker: {
    en: "Healthcare Worker / ASHA",
    hi: "स्वास्थ्य कार्यकर्ता / आशा",
  },
  roleDoctor: {
    en: "Doctor / Medical Officer",
    hi: "चिकित्सक / चिकित्सा अधिकारी",
  },
  roleAdmin: {
    en: "Administrator",
    hi: "प्रशासक",
  },
  mobileNumber: {
    en: "Mobile Number",
    hi: "मोबाइल नंबर",
  },
  sendOtp: {
    en: "Send OTP",
    hi: "ओटीपी भेजें",
  },
  enterOtp: {
    en: "Enter 6-digit OTP",
    hi: "6-अंकों का ओटीपी दर्ज करें",
  },
  verifyLogin: {
    en: "Verify & Enter Portal",
    hi: "सत्यापित करें व लॉगिन करें",
  },
  loginWithAbha: {
    en: "Login with ABHA ID",
    hi: "आभा (ABHA) आईडी से लॉगिन करें",
  },
  orLoginWithEmp: {
    en: "Login with Employee ID & Password",
    hi: "कर्मचारी आईडी और पासवर्ड से लॉगिन करें",
  },
  empId: {
    en: "Employee / Registration ID",
    hi: "कर्मचारी / पंजीकरण आईडी",
  },
  password: {
    en: "Password",
    hi: "पासवर्ड",
  },
  rememberDevice: {
    en: "Remember this device securely",
    hi: "इस डिवाइस को सुरक्षित रूप से याद रखें",
  },
  offlineAccessNote: {
    en: "You can view previously synced patients even without internet connectivity.",
    hi: "इंटरनेट न होने पर भी आप पहले से सिंक किए गए मरीजों का विवरण देख सकते हैं।",
  },
  newAshaRegister: {
    en: "New ASHA worker? Register with your ASHA Badge ID",
    hi: "नई आशा कार्यकर्ता? अपनी आशा आईडी से रजिस्टर करें",
  },
  loginHelpNote: {
    en: "Facing login issues? Contact your PHC Block Coordinator or call helpdesk 1800-180-1104.",
    hi: "लॉगिन में परेशानी? अपने पीएचसी ब्लॉक समन्वयक से संपर्क करें या 1800-180-1104 पर कॉल करें।",
  },

  // Worker Dashboard
  goodMorning: {
    en: "Good Morning",
    hi: "सुप्रभात",
  },
  goodAfternoon: {
    en: "Good Afternoon",
    hi: "नमस्कार / शुभ दोपहर",
  },
  goodEvening: {
    en: "Good Evening",
    hi: "शुभ संध्या",
  },
  assignedOverview: {
    en: "Patient Care Overview",
    hi: "मरीज देखभाल अवलोकन",
  },
  totalPatients: {
    en: "Total Registered Patients",
    hi: "कुल पंजीकृत मरीज",
  },
  todayAssessments: {
    en: "Today's Screenings",
    hi: "आज की गई जांचें",
  },
  followupsDue: {
    en: "Follow-ups Due",
    hi: "बकाया फॉलो-अप",
  },
  urgentReferrals: {
    en: "Urgent Referrals",
    hi: "तत्काल रेफरल",
  },
  actionNewPatient: {
    en: "New Patient",
    hi: "नया मरीज जोड़ें",
  },
  actionStartAssessment: {
    en: "Start Assessment",
    hi: "जांच शुरू करें",
  },
  actionPatientHistory: {
    en: "Patient History",
    hi: "मरीज का इतिहास",
  },
  actionPendingFollowups: {
    en: "Pending Follow-ups",
    hi: "लंबित फॉलो-अप",
  },
  nearbyFacilitiesTitle: {
    en: "Nearby Linked Healthcare Facilities",
    hi: "निकटवर्ती संबद्ध स्वास्थ्य केंद्र",
  },
  todayRemindersTitle: {
    en: "Today's Field Action Reminders",
    hi: "आज के आवश्यक स्वास्थ्य कार्य",
  },
  recentAssessmentsTitle: {
    en: "Recent Assessments & Triage",
    hi: "हालिया स्वास्थ्य जांच व परिणाम",
  },

  // Triage Levels & Badges
  triageGreen: {
    en: "Lower Priority",
    hi: "कम प्राथमिकता",
  },
  triageGreenDesc: {
    en: "Routine home care, hydration and scheduled follow-up advised.",
    hi: "सामान्य देखभाल, पर्याप्त जलपान और नियमित निगरानी की सलाह।",
  },
  triageAmber: {
    en: "Needs Clinical Evaluation",
    hi: "चिकित्सकीय जांच आवश्यक",
  },
  triageAmberDesc: {
    en: "Medical evaluation by PHC Doctor / MO recommended within 24 hours.",
    hi: "24 घंटे के भीतर पीएचसी चिकित्सक से चिकित्सकीय मूल्यांकन कराने की सलाह।",
  },
  triageRed: {
    en: "Urgent Escalation Required",
    hi: "तत्काल ध्यान आवश्यक",
  },
  triageRedDesc: {
    en: "Immediate escalation to nearest CHC/District Hospital or Teleconsultation advised.",
    hi: "निकटतम सीएचसी/जिला अस्पताल रेफरल या तत्काल टेलीकंसल्टेशन आवश्यक।",
  },

  // Assessment Wizard
  step1: { en: "1. Patient Info", hi: "1. मरीज विवरण" },
  step2: { en: "2. Symptoms & Voice", hi: "2. लक्षण व आवाज इनपुट" },
  step3: { en: "3. Observations & Vitals", hi: "3. संकेत व वाइटल्स" },
  step4: { en: "4. AI Analysis", hi: "4. एआई विश्लेषण" },
  step5: { en: "5. Preliminary Triage", hi: "5. प्राथमिक जांच परिणाम" },
  step6: { en: "6. Action & Referral", hi: "6. रेफरल व मार्गदर्शन" },

  speakInHindi: {
    en: "Speak Symptoms in Hindi",
    hi: "लक्षण हिंदी में बोलें",
  },
  listeningVoice: {
    en: "Listening... speak symptoms clearly",
    hi: "सुन रहे हैं... कृपया लक्षण स्पष्ट बोलें",
  },
  voiceRecognized: {
    en: "Recognized Hindi Speech:",
    hi: "पहचाना गया हिंदी वाक्य:",
  },
  commonSymptoms: {
    en: "Quick Symptom Selectors:",
    hi: "त्वरित लक्षण चयन:",
  },
  fever: { en: "Fever", hi: "तेज़ बुखार" },
  cough: { en: "Cough", hi: "खांसी" },
  breathingDifficulty: { en: "Breathing Difficulty", hi: "सांस लेने में कठिनाई" },
  headache: { en: "Headache", hi: "सिरदर्द" },
  weakness: { en: "Weakness / Fatigue", hi: "कमजोरी / थकान" },
  vomiting: { en: "Vomiting", hi: "उल्टी" },
  diarrhea: { en: "Diarrhea", hi: "दस्त" },
  chestPain: { en: "Chest Pain", hi: "सीने में दर्द" },
  dizziness: { en: "Dizziness", hi: "चक्कर आना" },
  rash: { en: "Skin Rash", hi: "त्वचा पर चकत्ते" },
  chills: { en: "Chills / Shivering", hi: "कंपकंपी / ठंड लगना" },

  // AI Pipeline
  aiProcessingTitle: {
    en: "Preparing Preliminary Triage Assessment",
    hi: "प्राथमिक नैदानिक जांच तैयार की जा रही है",
  },
  aiStage1: { en: "Understanding patient symptoms & history...", hi: "मरीज के लक्षणों और पूर्व इतिहास को समझा जा रहा है..." },
  aiStage2: { en: "Extracting clinical severity markers & vitals...", hi: "गंभीरता के संकेतों और वाइटल्स का विश्लेषण किया जा रहा है..." },
  aiStage3: { en: "Retrieving verified protocols (IMNCI, NVBDCP, NCD)...", hi: "सत्यापित स्वास्थ्य प्रोटोकॉल से मिलान किया जा रहा है..." },
  aiStage4: { en: "Evaluating risk category & red flags...", hi: "जोखिम श्रेणी और चेतावनियों का मूल्यांकन जारी है..." },
  aiStage5: { en: "Formulating supportive care and safety guidance...", hi: "सहायक देखभाल और घरेलू सुरक्षा मार्गदर्शन तैयार किया जा रहा है..." },

  // Supportive Care
  supportiveCareTitle: {
    en: "Supportive Care & Home Safety Guidance",
    hi: "सहायक देखभाल एवं घरेलू सुरक्षा मार्गदर्शन",
  },
  safetyDisclaimer: {
    en: "Disclaimer: This is preliminary decision-support guidance for frontline health workers and does NOT replace direct clinical diagnosis by a licensed medical officer. No autonomous medication prescriptions are generated.",
    hi: "अस्वीकरण: यह अग्रिम पंक्ति के कार्यकर्ताओं के लिए एक प्रारंभिक निर्णय-समर्थन प्रणाली है और योग्य चिकित्सक की प्रत्यक्ष जांच का विकल्प नहीं है। प्रणाली द्वारा कोई दवाई नहीं लिखी जाती।",
  },
  hydrationAdvice: { en: "Hydration & Fluids", hi: "तरल पदार्थ व जलपान" },
  dietAdvice: { en: "Dietary Guidance", hi: "आहार संबंधी सलाह" },
  restAdvice: { en: "Rest & Activity", hi: "विश्राम व गतिविधियां" },
  thingsToAvoid: { en: "Things to Avoid", hi: "सावधानियां व परहेज" },
  warningSigns: { en: "Immediate Warning Signs (Red Flags)", hi: "तत्काल आपातकालीन संकेत" },

  // Referral & Teleconsult
  referralSummary: {
    en: "Official Clinical Referral Summary",
    hi: "आधिकारिक नैदानिक रेफरल सारांश",
  },
  suggestedFacility: {
    en: "Suggested Receiving Facility",
    hi: "अनुशंसित स्वास्थ्य केंद्र",
  },
  downloadPdf: {
    en: "Download PDF Record",
    hi: "पीडीएफ पर्ची डाउनलोड करें",
  },
  printReferral: {
    en: "Print Referral Slip",
    hi: "रेफरल पर्ची प्रिंट करें",
  },
  shareSecurely: {
    en: "Share with MO via ABDM",
    hi: "आभा/डॉक्टर को सुरक्षित भेजें",
  },
  escalateTeleconsult: {
    en: "Escalate via Teleconsultation",
    hi: "तत्काल टेलीकंसल्टेशन से जोड़ें",
  },
  connectingDoctor: {
    en: "Connecting to On-Call Medical Officer...",
    hi: "ऑन-कॉल डॉक्टर से संपर्क स्थापित किया जा रहा है...",
  },
  videoCallConnected: {
    en: "Teleconsultation in Progress — AIIMS Hub Pratapgarh",
    hi: "टेलीकंसल्टेशन जारी — एम्स हब प्रतापगढ़",
  },
  endConsultation: {
    en: "Complete Consultation",
    hi: "परामर्श समाप्त करें",
  },

  // Explainability
  explainabilityTitle: {
    en: "Evidence & RAG Protocol Matching",
    hi: "निर्णय का आधार व स्वास्थ्य प्रोटोकॉल",
  },
  explainabilitySub: {
    en: "Transparent clinical factors and verified guidelines referenced for this assessment",
    hi: "इस परिणाम के लिए उपयोग किए गए पारदर्शी कारक एवं सत्यापित सरकारी दिशानिर्देश",
  },

  // Follow-up
  followupComparisonTitle: {
    en: "Longitudinal Care: Previous vs Current Assessment",
    hi: "दीर्घकालिक निगरानी: पिछली जांच बनाम वर्तमान जांच",
  },
  hasSituationChanged: {
    en: "Has the patient's condition improved or changed?",
    hi: "क्या मरीज की स्थिति में सुधार हुआ है या बदलाव आया है?",
  },
  improving: { en: "Improving (सुधार हो रहा है)", hi: "सुधार हो रहा है" },
  stable: { en: "Stable (स्थिति स्थिर है)", hi: "स्थिति स्थिर है" },
  deteriorating: { en: "Deteriorating (स्थिति बिगड़ रही है)", hi: "स्थिति बिगड़ रही है" },

  // Offline & Sync
  onlineStatus: {
    en: "Online — Data Synchronized",
    hi: "ऑनलाइन — डेटा सुरक्षित रूप से सिंक है",
  },
  offlineStatus: {
    en: "Offline Mode — Stored Locally",
    hi: "ऑफलाइन मोड — डेटा सुरक्षित रूप से सुरक्षित है",
  },
  syncNow: {
    en: "Sync Records Now",
    hi: "डेटा अभी सिंक करें",
  },
  syncCenter: {
    en: "Data Sync Center",
    hi: "डेटा सिंक केंद्र",
  },

  // Doctor Dashboard
  doctorDashboardTitle: {
    en: "Medical Officer Referral & Teleconsultation Dashboard",
    hi: "चिकित्सा अधिकारी रेफरल एवं टेलीकंसल्टेशन डैशबोर्ड",
  },
  referralQueue: {
    en: "Triage Referral Queue",
    hi: "रेफरल मरीज कतार",
  },
  teleconsultQueue: {
    en: "Live Teleconsultation Queue",
    hi: "सक्रिय टेलीकंसल्टेशन कतार",
  },
  addClinicalNote: {
    en: "Add Clinical Assessment Note",
    hi: "चिकित्सकीय टिप्पणी दर्ज करें",
  },
  updateStatus: {
    en: "Update Case Status",
    hi: "स्थिति अपडेट करें",
  },

  // Admin Dashboard
  adminDashboardTitle: {
    en: "District Health Administration & Analytics Portal",
    hi: "जिला स्वास्थ्य प्रशासन एवं विश्लेषण पोर्टल",
  },
  facilityDirectory: {
    en: "Health Facility Directory",
    hi: "स्वास्थ्य केंद्र निर्देशिका",
  },
  noticesManager: {
    en: "Public Notices & Field Circulars",
    hi: "सार्वजनिक सूचनाएं व परिपत्र",
  },

  // Buttons
  cancel: { en: "Cancel", hi: "रद्द करें" },
  save: { en: "Save", hi: "सहेजें" },
  submit: { en: "Submit", hi: "जमा करें" },
  back: { en: "Back", hi: "पीछे जाएं" },
  next: { en: "Continue", hi: "आगे बढ़ें" },
  close: { en: "Close", hi: "बंद करें" },
  viewDetails: { en: "View Details", hi: "विवरण देखें" },
  searchPlaceholder: { en: "Search by Name, Patient ID, or Phone...", hi: "नाम, मरीज आईडी, या फोन से खोजें..." },
  filterAll: { en: "All Cases", hi: "सभी मामले" },
};
