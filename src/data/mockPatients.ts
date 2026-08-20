import type { Patient, AssessmentRecord } from '../types';

export const mockPatients: Patient[] = [
  {
    id: "RH-2026-00102",
    name: "Baby Aarav (s/o Meena Devi)",
    age: 2,
    gender: "MALE",
    phone: "+91 98391 44521",
    village: "Purey Pandey, Pratapgarh",
    preferredLanguage: "hi",
    abhaId: "91-4521-8890-1123",
    emergencyContact: {
      name: "Meena Devi (Mother)",
      relation: "Mother",
      phone: "+91 98391 44521"
    },
    allergies: ["No known drug allergies"],
    currentMedications: ["Paracetamol Drops 100mg SOS"],
    existingConditions: ["Low Birth Weight history"],
    notes: "Child presenting with severe high fever and fast chest indrawing.",
    registeredAt: "2026-08-15",
    lastAssessmentDate: "2026-08-19",
    lastTriageLevel: "RED"
  },
  {
    id: "RH-2026-00089",
    name: "Ramesh Devi",
    age: 54,
    gender: "FEMALE",
    phone: "+91 94502 33118",
    village: "Sandwa Chandrika, Pratapgarh",
    preferredLanguage: "hi",
    abhaId: "91-8821-3310-9944",
    emergencyContact: {
      name: "Rajesh Kumar (Son)",
      relation: "Son",
      phone: "+91 94502 33119"
    },
    allergies: ["Penicillin sensitivity"],
    currentMedications: ["Metformin 500mg BD", "Amlodipine 5mg OD"],
    existingConditions: ["Type 2 Diabetes Mellitus (5 yrs)", "Hypertension"],
    notes: "Continuous 4-day intermittent fever with severe body pain and lethargy.",
    registeredAt: "2026-07-20",
    lastAssessmentDate: "2026-08-18",
    lastTriageLevel: "AMBER"
  },
  {
    id: "RH-2026-00144",
    name: "Sunita Patel",
    age: 28,
    gender: "FEMALE",
    phone: "+91 91255 77632",
    village: "Purey Kalu, Pratapgarh",
    preferredLanguage: "hi",
    abhaId: "91-1124-7789-4450",
    emergencyContact: {
      name: "Dinesh Patel (Husband)",
      relation: "Husband",
      phone: "+91 91255 77633"
    },
    allergies: ["None"],
    currentMedications: ["None"],
    existingConditions: ["None reported"],
    notes: "Mild seasonal cold, runny nose, and light headache for 2 days.",
    registeredAt: "2026-08-17",
    lastAssessmentDate: "2026-08-19",
    lastTriageLevel: "GREEN"
  },
  {
    id: "RH-2026-00045",
    name: "Pooja Yadav",
    age: 24,
    gender: "FEMALE",
    phone: "+91 98892 11450",
    village: "Lalganj Ajhara, Pratapgarh",
    preferredLanguage: "hi",
    abhaId: "91-7782-9901-2244",
    emergencyContact: {
      name: "Santosh Yadav (Husband)",
      relation: "Husband",
      phone: "+91 98892 11451"
    },
    allergies: ["Sulfa drugs"],
    currentMedications: ["IFA Tablets", "Calcium Carbonate 500mg"],
    existingConditions: ["Primigravida (28 Weeks ANC)"],
    notes: "Regular antenatal checkup; mild pedal edema noted.",
    registeredAt: "2026-06-10",
    lastAssessmentDate: "2026-08-12",
    lastTriageLevel: "GREEN"
  },
  {
    id: "RH-2026-00067",
    name: "Ram Dulare Tiwari",
    age: 68,
    gender: "MALE",
    phone: "+91 97920 66311",
    village: "Purey Pandey, Pratapgarh",
    preferredLanguage: "hi",
    abhaId: "91-3341-5567-0099",
    emergencyContact: {
      name: "Amit Tiwari (Grandson)",
      relation: "Grandson",
      phone: "+91 97920 66312"
    },
    allergies: ["None"],
    currentMedications: ["Telmisartan 40mg OD", "Aspirin 75mg OD"],
    existingConditions: ["Chronic Bronchitis", "Hypertension"],
    notes: "Exertional breathlessness with mild productive cough.",
    registeredAt: "2026-05-18",
    lastAssessmentDate: "2026-08-14",
    lastTriageLevel: "AMBER"
  }
];

export const mockInitialAssessments: AssessmentRecord[] = [
  // 1. Baby Aarav - RED Urgent
  {
    id: "ASS-2026-00102-1",
    patientId: "RH-2026-00102",
    patientName: "Baby Aarav (s/o Meena Devi)",
    patientAge: 2,
    patientGender: "MALE",
    patientVillage: "Purey Pandey, Pratapgarh",
    date: "19 Aug 2026",
    timestamp: "10:15 AM",
    symptoms: [
      { id: "sym-1", name: "High Fever", nameHi: "तेज़ बुखार", severity: "severe", durationDays: 3, isPrimary: true },
      { id: "sym-2", name: "Breathing Difficulty", nameHi: "सांस लेने में कठिनाई", severity: "severe", durationDays: 2 },
      { id: "sym-3", name: "Lethargy / Weakness", nameHi: "सुस्ती व अत्यधिक कमजोरी", severity: "moderate", durationDays: 1 }
    ],
    vitals: {
      temperature: 103.2,
      respiratoryRate: 54,
      heartRate: 142,
      spo2: 91
    },
    generalObservations: "Child has visible subcostal chest indrawing, audible grunting sounds while breathing, and refused morning breastfeeding.",
    redFlagsIdentified: [
      "Tachypnea (RR 54 bpm > 50 IMNCI threshold)",
      "Chest indrawing with SpO2 91%",
      "Inability to accept oral fluids",
      "Lethargy / reduced alertness"
    ],
    triageLevel: "RED",
    urgencyLabel: "Urgent Clinical Escalation Required",
    urgencyLabelHi: "तत्काल अस्पताल रेफरल व चिकित्सा आवश्यक",
    rationaleBullets: [
      "Pediatric age under 5 with fast breathing (54 bpm) and lower chest wall indrawing meets IMNCI Severe Pneumonia criteria.",
      "High temperature (103.2°F) accompanied by borderline hypoxia (SpO2 91%).",
      "Marked lethargy and inability to maintain adequate hydration.",
      "Risk of rapid respiratory decompensation requiring immediate hospital-based pediatric care and supplemental oxygen."
    ],
    rationaleBulletsHi: [
      "5 वर्ष से कम आयु के बच्चे में तेज सांस (54/मिनट) और छाती का धंसना आईएमएनसीआई गंभीर निमोनिया के स्पष्ट लक्षण हैं।",
      "103.2°F तेज बुखार और ऑक्सीजन स्तर 91% का कम होना।",
      "अत्यधिक सुस्ती और स्तनपान न कर पाना।",
      "तुरंत अस्पताल में भर्ती कर ऑक्सीजन और विशेषज्ञ बाल रोग उपचार की आवश्यकता।"
    ],
    recommendedAction: "Immediate transfer to CHC Sandwa Chandrika or District Hospital Pratapgarh. Initiate Emergency Teleconsultation with AIIMS Hub pediatrician while arranging 108 Ambulance.",
    recommendedActionHi: "तुरंत सीएचसी संडवा चंद्रिका या जिला अस्पताल ले जाएं। 108 एम्बुलेंस बुलाते समय एम्स हब बाल रोग विशेषज्ञ से तत्काल टेलीकंसल्टेशन शुरू करें।",
    supportiveCare: {
      general: ["Keep child warmly clothed in cotton; do not over-bundle with heavy blankets", "Keep child in slightly upright/supported position to ease airflow"],
      generalHi: ["बच्चे को आरामदायक सूती कपड़े पहनाएं", "हवा का प्रवाह सुगम रखने के लिए बच्चे को सहारा देकर थोड़ा सीधा रखें"],
      hydration: ["Offer small sips of water or frequent breastmilk if child stays awake", "Do not forcefully feed large boluses of liquids"],
      hydrationHi: ["यदि बच्चा होश में है तो थोड़ा-थोड़ा स्तनपान या पानी दें", "जबरदस्ती ज्यादा तरल न पिलाएं"],
      diet: ["Light, easily swallowable liquid feed if tolerated"],
      dietHi: ["यदि बच्चा ले सके तो हल्का तरल आहार"],
      activity: ["Strict quiet bed rest; keep room calm and free of cooking smoke (chulha)"],
      activityHi: ["शांत वातावरण में पूरा आराम; चूल्हे के धुएं से पूरी तरह दूर रखें"],
      avoid: ["DO NOT give unprescribed over-the-counter adult cough sedatives or syrups", "DO NOT apply ice directly on the chest"],
      avoidHi: ["बिना डॉक्टर की सलाह के बड़ों की दवा या खांसी का सीरप कभी न दें", "सीने पर बर्फ न लगाएं"],
      warningSigns: ["Loss of consciousness or convulsions", "Stridor while calm", "Bluish discoloration around lips (cyanosis)", "Complete cessation of urination for > 8 hours"],
      warningSignsHi: ["बेहोशी या झटके (दौरे) आना", "होंठों के चारों ओर नीलापन", "8 घंटे से अधिक समय तक पेशाब न होना"]
    },
    explainability: [
      {
        guideline: "IMNCI Module 3 - Severe Acute Respiratory Infection (SARI) Protocol",
        sourceModule: "Ministry of Health & Family Welfare / WHO Guidelines",
        ruleTriggered: "Rule PEDS-PNEU-01: Age < 60 mos + Fast Breathing (>50 bpm) + Chest Indrawing = RED",
        confidenceScore: 0.97,
        matchedKeywords: ["age 2", "chest indrawing", "RR 54", "fever 103.2", "hypoxia 91%"]
      },
      {
        guideline: "National RMNCH+A Child Health Danger Signs Standards 2024",
        sourceModule: "National Health Mission Uttar Pradesh",
        ruleTriggered: "Rule DANGER-04: Oral fluid refusal + severe lethargy",
        confidenceScore: 0.94,
        matchedKeywords: ["refused breastfeeding", "lethargy"]
      }
    ],
    referralDetails: {
      isReferred: true,
      suggestedFacilityId: "FAC-PRATAP-02",
      facilityName: "Community Health Centre (CHC) Sandwa Chandrika",
      reason: "Severe Acute Pediatric Respiratory Infection with Hypoxia (SpO2 91%) and Chest Indrawing",
      urgency: "IMMEDIATE",
      transportAdvised: "Dial 108 Govt Ambulance Service / Free Emergency Transport",
      referredByWorker: "Sunita Maurya (ASHA - Badge #PRT-8821)",
      referredAt: "19 Aug 2026, 10:20 AM",
      status: "PENDING_REVIEW"
    },
    teleconsult: {
      requested: true,
      status: "PENDING",
      scheduledAt: "19 Aug 2026, 10:25 AM"
    },
    followUp: {
      needed: true,
      dueDate: "20 Aug 2026",
      status: "SCHEDULED",
      notes: "Verify inpatient admission and post-stabilization follow-up."
    },
    syncStatus: "SYNCED"
  },

  // 2. Ramesh Devi - AMBER Needs Clinical Evaluation
  {
    id: "ASS-2026-00089-1",
    patientId: "RH-2026-00089",
    patientName: "Ramesh Devi",
    patientAge: 54,
    patientGender: "FEMALE",
    patientVillage: "Sandwa Chandrika, Pratapgarh",
    date: "18 Aug 2026",
    timestamp: "03:40 PM",
    symptoms: [
      { id: "sym-10", name: "Persistent Fever", nameHi: "लगातार बुखार", severity: "moderate", durationDays: 4, isPrimary: true },
      { id: "sym-11", name: "Severe Headache & Body Ache", nameHi: "तेज सिरदर्द व बदन दर्द", severity: "moderate", durationDays: 4 },
      { id: "sym-12", name: "Chills / Shivering", nameHi: "कंपकंपी व ठंड लगना", severity: "mild", durationDays: 3 }
    ],
    vitals: {
      temperature: 101.4,
      respiratoryRate: 20,
      heartRate: 88,
      spo2: 97,
      systolicBP: 138,
      diastolicBP: 88
    },
    generalObservations: "Patient has febrile episodes peaking in evening hours, accompanied by joint pains. Known diabetic on oral hypoglycemics.",
    redFlagsIdentified: [
      "Fever duration >= 4 days in vector-borne endemic monsoon period",
      "Known comorbid Type 2 Diabetes Mellitus"
    ],
    triageLevel: "AMBER",
    urgencyLabel: "Needs Clinical Evaluation within 24 Hours",
    urgencyLabelHi: "24 घंटे के भीतर चिकित्सकीय जांच आवश्यक",
    rationaleBullets: [
      "Persistent febrile illness (> 4 days) with rigors and myalgia warrants evaluation for endemic vector-borne etiologies (Malaria/Dengue/Typhoid).",
      "Underlying Diabetes Mellitus increases vulnerability to secondary infections and dehydration.",
      "Vitals are currently hemodynamically stable without respiratory distress (SpO2 97%).",
      "Requires in-person OPD evaluation at Primary Health Centre for confirmatory RDT testing and blood sugar monitoring."
    ],
    rationaleBulletsHi: [
      "4 दिन से अधिक का बुखार, कंपकंपी और बदन दर्द मच्छर जनित बुखार (मलेरिया/डेंगू/टाइफाइड) की ओर संकेत करता है।",
      "पूर्व से मधुमेह होने के कारण संक्रमण और निर्जलीकरण का खतरा अधिक है।",
      "वाइटल्स फिलहाल स्थिर हैं और सांस में कोई परेशानी नहीं है (ऑक्सीजन 97%)।",
      "पीएचसी पर डॉक्टर से जांच और खून की जांच (आरडीटी/सीबीसी/शुगर) कराना आवश्यक है।"
    ],
    recommendedAction: "Advise patient to visit PHC Sadar or CHC Sandwa Chandrika tomorrow morning OPD. Conduct Rapid Malaria RDT and review blood glucose.",
    recommendedActionHi: "मरीज को कल सुबह पीएचसी सदर या सीएचसी संडवा चंद्रिका ओपीडी में जाने की सलाह दें। मलेरिया जांच व शुगर की जांच कराएं।",
    supportiveCare: {
      general: ["Tepid water sponge across forehead when fever rises above 101°F", "Sleep strictly under a medicated bed net"],
      generalHi: ["बुखार 101°F से अधिक होने पर माथे पर ताजे पानी की पट्टी रखें", "मच्छरदानी लगाकर सोएं"],
      hydration: ["Drink 2.5 to 3 liters of fluids daily: boiled water, light dal water, lemon water with pinch of salt", "Continue regular diabetes diet"],
      hydrationHi: ["रोज 2.5 से 3 लीटर तरल: उबला पानी, दाल का पानी, नींबू पानी", "मधुमेह का नियमित आहार जारी रखें"],
      diet: ["Easily digestible warm meals: khichdi, boiled vegetables, dal", "Do not skip regular meals while taking diabetes medication"],
      dietHi: ["सुपाच्य हल्का भोजन: खिचड़ी, उबली सब्जियां, दाल", "दवा लेते समय भोजन न छोड़ें"],
      activity: ["Adequate bed rest; avoid heavy household or agricultural labor until afebrile"],
      activityHi: ["पूरा आराम करें; ठीक होने तक भारी काम या धूप में जाने से बचें"],
      avoid: ["Do not purchase unprescribed painkillers (NSAIDs like Ibuprofen/Brufen) from local shops without doctor guidance", "Avoid high-sugar juices"],
      avoidHi: ["बिना डॉक्टर से पूछे दर्द निवारक दवाएं न लें", "मीठे जूस न पिएं"],
      warningSigns: ["Bleeding from gums, nose or in stools", "Severe continuous abdominal pain", "Inability to hold fluids due to persistent vomiting", "Confusion or sudden extreme drop in body temperature"],
      warningSignsHi: ["मसूड़ों या नाक से खून आना", "पेट में असहनीय दर्द", "लगातार उल्टियां होना", "अचानक शरीर ठंडा पड़ जाना व भ्रम"]
    },
    explainability: [
      {
        guideline: "NVBDCP Clinical Management Protocol for Acute Febrile Illness 2025",
        sourceModule: "National Vector Borne Disease Control Programme - UP State Cell",
        ruleTriggered: "Rule FEVER-AMBER-02: Fever > 72h with chills + Comorbidity (Diabetes) = AMBER",
        confidenceScore: 0.92,
        matchedKeywords: ["fever 4 days", "chills", "myalgia", "diabetes"]
      }
    ],
    referralDetails: {
      isReferred: true,
      suggestedFacilityId: "FAC-PRATAP-01",
      facilityName: "Primary Health Centre (PHC) Sadar",
      reason: "Evaluation for Acute Febrile Illness / Vector-borne screening in diabetic patient",
      urgency: "WITHIN_24H",
      transportAdvised: "Standard Rural Transport / Family Accompanied",
      referredByWorker: "Sunita Maurya (ASHA - Badge #PRT-8821)",
      referredAt: "18 Aug 2026, 03:45 PM",
      status: "PENDING_REVIEW"
    },
    followUp: {
      needed: true,
      dueDate: "21 Aug 2026",
      status: "SCHEDULED",
      notes: "Verify PHC visit and check test results."
    },
    syncStatus: "SYNCED"
  },

  // 3. Sunita Patel - GREEN Lower Priority
  {
    id: "ASS-2026-00144-1",
    patientId: "RH-2026-00144",
    patientName: "Sunita Patel",
    patientAge: 28,
    patientGender: "FEMALE",
    patientVillage: "Purey Kalu, Pratapgarh",
    date: "19 Aug 2026",
    timestamp: "09:00 AM",
    symptoms: [
      { id: "sym-20", name: "Mild Cough & Cold", nameHi: "हल्की खांसी व जुकाम", severity: "mild", durationDays: 2, isPrimary: true },
      { id: "sym-21", name: "Runny Nose & Sneezing", nameHi: "नाक बहना व छींकें", severity: "mild", durationDays: 2 },
      { id: "sym-22", name: "Mild Frontal Headache", nameHi: "हल्का सिरदर्द", severity: "mild", durationDays: 1 }
    ],
    vitals: {
      temperature: 98.6,
      respiratoryRate: 18,
      heartRate: 74,
      spo2: 99
    },
    generalObservations: "Patient is alert, ambulatory, and cheerful. Chest clear on auscultation (per ANM visit). No shortness of breath or throat ulceration.",
    redFlagsIdentified: [],
    triageLevel: "GREEN",
    urgencyLabel: "Lower Priority — Routine Home Care & Monitoring",
    urgencyLabelHi: "कम प्राथमिकता — सामान्य घरेलू देखभाल व निगरानी",
    rationaleBullets: [
      "Vitals are completely normal (Temperature 98.6°F, SpO2 99%, RR 18 bpm).",
      "Mild upper respiratory symptoms consistent with self-limiting common viral coryza.",
      "Zero danger signs or systemic red flags present.",
      "Appropriate for home supportive care with steam inhalation, warm fluids, and standard ASHA follow-up in 3 days."
    ],
    rationaleBulletsHi: [
      "वाइटल्स पूरी तरह सामान्य हैं (तापमान 98.6°F, ऑक्सीजन 99%, सांस 18/मिनट)।",
      "सामान्य मौसमी जुकाम के हल्के लक्षण जो स्वतः ठीक होने वाले हैं।",
      "कोई भी आपातकालीन या खतरे का लक्षण मौजूद नहीं है।",
      "घरेलू देखभाल, गर्म पानी की भाप और तरल पदार्थों के साथ 3 दिन बाद आशा कार्यकर्ता द्वारा फॉलो-अप पर्याप्त है।"
    ],
    recommendedAction: "Home supportive care with steam inhalation and warm fluids. Routine follow-up visit scheduled for 22 Aug.",
    recommendedActionHi: "घरेलू देखभाल, भाप लेना और गुनगुना पानी पीना। 22 अगस्त को सामान्य फॉलो-अप।",
    supportiveCare: {
      general: ["Steam inhalation with plain water 2 times a day", "Warm salt-water gargle in morning and evening"],
      generalHi: ["सादे पानी की भाप दिन में 2 बार लें", "सुबह-शाम गुनगुने नमक के पानी से गरारे करें"],
      hydration: ["Drink warm water and herbal kadha (tulsi, ginger, black pepper, jaggery)", "Stay well hydrated with fresh buttermilk/dal soup"],
      hydrationHi: ["गुनगुना पानी और तुलसी-अदरक का काढ़ा पिएं", "पर्याप्त पानी व तरल पदार्थ लें"],
      diet: ["Freshly prepared warm meals, seasonal fruits (guava, amla, citrus)", "Avoid cold or stale food"],
      dietHi: ["ताजा गर्म भोजन, मौसमी फल (आंवला, अमरूद)", "ठंडा या बासी भोजन न खाएं"],
      activity: ["Adequate 8 hours night rest; avoid exposure to early morning chills"],
      activityHi: ["रात को 8 घंटे की पूरी नींद लें; सुबह की ठंडी हवा से बचें"],
      avoid: ["Avoid chilled water, ice creams, and exposure to dusty field winds", "Avoid unprescribed antibiotics"],
      avoidHi: ["फ्रिज का ठंडा पानी व आइसक्रीम न लें", "बिना डॉक्टर की सलाह के कोई एंटीबायोटिक दवा न लें"],
      warningSigns: ["Fever developing > 101°F", "Difficulty breathing or pain on deep breathing", "Yellow/green thick phlegm lasting > 7 days"],
      warningSignsHi: ["101°F से अधिक तेज बुखार होना", "सांस लेने में तकलीफ या सीने में दर्द", "लगातार गाढ़ा बलगम आना"]
    },
    explainability: [
      {
        guideline: "CPHC Community Health Worker Protocol for Upper Respiratory Infection",
        sourceModule: "National Health Systems Resource Centre (NHSRC)",
        ruleTriggered: "Rule URI-MILD-01: Coryza + Normal Vitals + No Danger Signs = GREEN",
        confidenceScore: 0.98,
        matchedKeywords: ["mild cough", "runny nose", "normal vitals", "spo2 99%"]
      }
    ],
    followUp: {
      needed: true,
      dueDate: "22 Aug 2026",
      status: "SCHEDULED",
      notes: "Routine home visit to confirm symptom resolution."
    },
    syncStatus: "SYNCED"
  }
];
