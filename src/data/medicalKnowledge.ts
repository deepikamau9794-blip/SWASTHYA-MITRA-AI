import type { MedicalEvidence, SupportiveCareAdvice, TriageLevel } from '../types';

export interface KnowledgeProtocol {
  id: string;
  category: string;
  categoryHi: string;
  conditionName: string;
  conditionNameHi: string;
  keywords: string[];
  triggerRules: {
    triageLevel: TriageLevel;
    ruleDescription: string;
    ruleDescriptionHi: string;
    rationaleBullets: string[];
    rationaleBulletsHi: string[];
    guidelineRef: string;
    guidelineModule: string;
    confidenceScore: number;
    recommendedAction: string;
    recommendedActionHi: string;
    supportiveCare: SupportiveCareAdvice;
  }[];
}

export const medicalProtocols: KnowledgeProtocol[] = [
  {
    id: "PROTO-PEDS-RESP",
    category: "Maternal & Child Health (RMNCH+A)",
    categoryHi: "मातृ एवं शिशु स्वास्थ्य",
    conditionName: "Pediatric Acute Respiratory & High Fever",
    conditionNameHi: "बाल तीव्र श्वसन संक्रमण व तेज बुखार",
    keywords: ["fever", "cough", "breathing difficulty", "lethargy", "child", "infant", "chest indrawing", "बुखार", "खांसी", "सांस"],
    triggerRules: [
      {
        triageLevel: "RED",
        ruleDescription: "IMNCI Severe Pneumonia / Acute Febrile Illness alert: Age < 5 yrs with fast breathing or chest indrawing.",
        ruleDescriptionHi: "आईएमएनसीआई गंभीर निमोनिया/तीव्र ज्वर चेतावनी: 5 वर्ष से कम आयु, तेज सांस या छाती का धंसना।",
        rationaleBullets: [
          "Patient is an infant/toddler with fever > 102.5°F for 3 consecutive days.",
          "Observed tachypnea (elevated respiratory rate > 50 bpm) and subcostal retraction.",
          "Child appears lethargic with poor oral fluid acceptance.",
          "High clinical risk of pediatric lower respiratory tract infection requiring immediate oxygenation and clinical stabilization."
        ],
        rationaleBulletsHi: [
          "मरीज 5 वर्ष से कम आयु का बच्चा है जिसे 3 दिनों से 102.5°F से अधिक तेज बुखार है।",
          "सांस लेने की गति तीव्र (50/मिनट से अधिक) तथा छाती में खिंचाव देखा गया।",
          "बच्चा सुस्त है और पर्याप्त तरल पदार्थ नहीं ले पा रहा है।",
          "गंभीर श्वसन संक्रमण की संभावना, जिसके लिए अस्पताल में तत्काल ऑक्सीजन एवं चिकित्सकीय सहायता आवश्यक है।"
        ],
        guidelineRef: "IMNCI Guidelines (MoHFW, Govt of India) - Module 3: Management of Sick Infant",
        guidelineModule: "National RMNCH+A Clinical Protocol 2024",
        confidenceScore: 0.96,
        recommendedAction: "Immediate escalation to nearest CHC/District Hospital pediatric ward or initiate emergency Teleconsultation.",
        recommendedActionHi: "निकटतम सीएचसी / जिला अस्पताल बाल रोग विभाग में तुरंत रेफर करें या तत्काल टेलीकंसल्टेशन शुरू करें।",
        supportiveCare: {
          general: ["Keep child warm and clothed in breathable cotton", "Do not bundle excessively during high fever", "Keep head elevated slightly while sleeping"],
          generalHi: ["बच्चे को आरामदायक सूती कपड़े पहनाएं", "तेज बुखार में ज्यादा मोटे कपड़े न ओढ़ाएं", "सोते समय सिर को थोड़ा ऊंचा रखें"],
          hydration: ["Continue frequent breastfeeding / small sips of boiled, cooled water", "Give ORS solution if loose stools present", "Never force feed large quantities at once"],
          hydrationHi: ["स्तनपान जारी रखें / उबला और ठंडा किया हुआ पानी थोड़ा-थोड़ा दें", "दस्त होने पर ओआरएस घोल पिलाएं", "एक बार में जबरन ज्यादा न पिलाएं"],
          diet: ["Light khichdi, mashed banana, breastmilk as tolerated", "Frequent small portions"],
          dietHi: ["हल्की मूंग दाल खिचड़ी, मसला हुआ केला, स्तनपान", "थोड़ी-थोड़ी देर में हल्का आहार"],
          activity: ["Complete physical rest in a well-ventilated, clean room", "Minimize loud noise and environmental stress"],
          activityHi: ["हवादार व शांत कमरे में पूरा विश्राम", "धूल और धुएं से पूरी तरह बचाएं"],
          avoid: ["DO NOT administer unprescribed adult syrups or self-medications", "DO NOT apply cold ice packs directly to infant chest", "Avoid commercial carbonated drinks"],
          avoidHi: ["बिना डॉक्टर की सलाह के बड़ों की दवा या सीरप न दें", "सीने पर सीधे बर्फ न लगाएं", "बाजार के ठंडे या पैकेज्ड पेय न दें"],
          warningSigns: ["Inability to drink or breastfeed", "Vomiting everything consumed", "Convulsions or unresponsiveness", "Bluish tint around lips or fingernails (cyanosis)"],
          warningSignsHi: ["दूध या पानी पीने में पूरी तरह असमर्थता", "सब कुछ उल्टी कर देना", "झटके (दौरे) आना या बेहोशी", "होंठों या नाखूनों का नीला पड़ना"]
        }
      }
    ]
  },
  {
    id: "PROTO-ADULT-FEVER",
    category: "Vector-Borne & Infectious Disease (NVBDCP)",
    categoryHi: "मच्छर जनित एवं संक्रामक रोग",
    conditionName: "Prolonged Febrile Illness with Systemic Symptoms",
    conditionNameHi: "लंबे समय से बुखार व शारीरिक कमजोरी",
    keywords: ["fever", "headache", "weakness", "body pain", "chills", "vomiting", "बुखार", "सिरदर्द", "कमजोरी"],
    triggerRules: [
      {
        triageLevel: "AMBER",
        ruleDescription: "National Vector Borne Disease Control Protocol: Febrile episode > 4 days with chills, headache, and myalgia.",
        ruleDescriptionHi: "राष्ट्रीय वेक्टर जनित रोग नियंत्रण प्रोटोकॉल: 4 दिन से अधिक का बुखार, कंपकंपी, सिरदर्द और बदन दर्द।",
        rationaleBullets: [
          "Persistent intermittent fever (101.4°F) lasting 4+ days.",
          "Severe frontal headache accompanied by generalized myalgia and joint discomfort.",
          "History of type-2 diabetes / hypertension requires cautious monitoring.",
          "Differential includes Malaria/Dengue/Typhoid endemic in eastern UP; needs confirmatory RDT blood smear."
        ],
        rationaleBulletsHi: [
          "लगातार 4 दिनों से 101.4°F का मध्यम से तेज बुखार।",
          "सिर के अगले हिस्से में तेज दर्द और जोड़ों व मांसपेशियों में खिंचाव।",
          "मधुमेह या बीपी का पूर्व इतिहास होने से विशेष सावधानी आवश्यक।",
          "मलेरिया/डेंगू या टाइफाइड की संभावना; प्राथमिक स्वास्थ्य केंद्र पर तुरंत रक्त जांच (RDT) की आवश्यकता।"
        ],
        guidelineRef: "NVBDCP Clinical Management Protocol for Febrile Illness (NVBDCP-UP 2025)",
        guidelineModule: "National Health Mission Frontline Worker Triage Standard",
        confidenceScore: 0.91,
        recommendedAction: "Schedule in-person clinical evaluation at nearest Primary Health Centre (PHC) within 24 hours for lab investigations (RDT/CBC).",
        recommendedActionHi: "24 घंटे के भीतर नज़दीकी प्राथमिक स्वास्थ्य केंद्र (पीएचसी) पर डॉक्टर से जांच और खून की जांच (आरडीटी/सीबीसी) कराएं।",
        supportiveCare: {
          general: ["Tepid water sponge bath across forehead and limbs if temperature exceeds 101°F", "Sleep under medicated mosquito bed net"],
          generalHi: ["बुखार 101°F से ऊपर जाने पर माथे और बांहों पर ताजे पानी की पट्टी रखें", "मच्छरदानी लगाकर सोएं"],
          hydration: ["Drink 2.5 to 3 liters of fluids daily: lemon water, ORS, coconut water, dal water", "Monitor urine output (light clear color)"],
          hydrationHi: ["प्रतिदिन 2.5 से 3 लीटर तरल पदार्थ: नींबू पानी, ओआरएस, नारियल पानी, दाल का पानी", "पेशाब की नियमितता पर ध्यान दें"],
          diet: ["Soft digestible diet: rice congee, cooked vegetables, boiled eggs/dal", "Avoid oily, spicy deep-fried foods"],
          dietHi: ["सुपाच्य हल्का भोजन: दलिया, खिचड़ी, उबली सब्जियां, दाल का सूप", "तला-भुना व भारी भोजन न करें"],
          activity: ["Bed rest during fever spikes; gentle room mobilization when afebrile"],
          activityHi: ["बुखार के समय पूरा आराम करें; भारी काम या धूप में मजदूरी न करें"],
          avoid: ["Do not take NSAIDs like Aspirin or Ibuprofen without doctor confirmation", "Avoid skipping meals with existing diabetes"],
          avoidHi: ["बिना डॉक्टर की सलाह के दर्द निवारक दवाएं (एस्पिरिन/आईबुप्रोफेन) न लें", "भोजन न छोड़ें"],
          warningSigns: ["Bleeding from gums or nose", "Persistent abdominal pain or repeated vomiting", "Sudden drop in body temperature with clammy cold skin", "Extreme confusion or drowsiness"],
          warningSignsHi: ["मसूड़ों या नाक से खून आना", "पेट में असहनीय दर्द या लगातार उल्टी", "अचानक शरीर का ठंडा पड़ना व पसीना आना", "अत्यधिक सुस्ती या भ्रम की स्थिति"]
        }
      }
    ]
  },
  {
    id: "PROTO-SEASONAL-MILD",
    category: "General Primary Care & Seasonal Ailments",
    categoryHi: "प्राथमिक स्वास्थ्य एवं मौसमी विकार",
    conditionName: "Mild Seasonal Upper Respiratory Coryza",
    conditionNameHi: "सामान्य मौसमी जुकाम व हल्का सिरदर्द",
    keywords: ["cough", "headache", "sneezing", "mild sore throat", "weakness", "जुकाम", "हल्की खांसी", "सिरदर्द"],
    triggerRules: [
      {
        triageLevel: "GREEN",
        ruleDescription: "Primary Community Health Care Guidelines: Mild viral upper respiratory symptoms without red flags or respiratory distress.",
        ruleDescriptionHi: "सामुदायिक प्राथमिक स्वास्थ्य दिशानिर्देश: बिना किसी आपातकालीन लक्षण के सामान्य मौसमी जुकाम।",
        rationaleBullets: [
          "Low-grade temperature (< 99.5°F) with clear nasal discharge and mild throat tickle for 2 days.",
          "Normal respiratory rate (18 bpm) and SpO2 at 98% on room air.",
          "Patient is fully alert, hydrated, and able to perform daily household activities.",
          "Self-limiting viral etiology appropriate for home supportive care with ASHA follow-up on Day 3."
        ],
        rationaleBulletsHi: [
          "हल्का तापमान (99.5°F से कम) तथा नाक बहना व हल्की खराश (2 दिन)।",
          "सांस की गति सामान्य (18/मिनट) और ऑक्सीजन स्तर 98% सामान्य।",
          "मरीज पूरी तरह सचेत है और भोजन-पानी सामान्य रूप से ले रहा है।",
          "सामान्य मौसमी विकार, जिसके लिए घरेलू देखभाल पर्याप्त है; आशा कार्यकर्ता द्वारा तीसरे दिन समीक्षा की जाएगी।"
        ],
        guidelineRef: "Comprehensive Primary Health Care (CPHC) Operational Guidelines - Ayushman Arogya Mandir",
        guidelineModule: "NHSRC Community Case Management Protocols",
        confidenceScore: 0.94,
        recommendedAction: "Home supportive management with adequate rest and warm fluids. Routine follow-up visit scheduled in 3 days.",
        recommendedActionHi: "घरेलू देखभाल, पर्याप्त आराम व गुनगुना पानी। 3 दिन बाद आशा कार्यकर्ता द्वारा नियमित फॉलो-अप।",
        supportiveCare: {
          general: ["Steam inhalation with plain warm water twice daily", "Warm salt-water gargles for throat soothing"],
          generalHi: ["सादे गर्म पानी की भाप दिन में दो बार लें", "गुनगुने नमक के पानी से गरारे करें"],
          hydration: ["Drink warm water, herbal tulsi-ginger decoction (kadha), warm soups", "Maintain at least 2 liters of fluid intake"],
          hydrationHi: ["गुनगुना पानी, तुलसी-अदरक का काढ़ा, सूप आदि का सेवन करें", "पर्याप्त पानी पिएं"],
          diet: ["Nutritious freshly cooked warm food, green leafy vegetables, seasonal citrus fruits"],
          dietHi: ["ताजा पका हुआ गर्म पौष्टिक भोजन, हरी सब्जियां, मौसमी फल"],
          activity: ["Adequate 8 hours nightly sleep, avoid strenuous outdoor field work in dust/chilly weather"],
          activityHi: ["रात में 8 घंटे की पूरी नींद लें, धूल और अत्यधिक ठंड से बचें"],
          avoid: ["Avoid cold iced beverages, refrigerated leftovers, smoking or exposure to biomass smoke (chulha)"],
          avoidHi: ["अत्यधिक ठंडे पेय, फ्रिज में रखा बासी खाना, और चूल्हे के धुएं से बचें"],
          warningSigns: ["Development of high fever (> 101°F) lasting over 48 hours", "Shortness of breath or difficulty speaking full sentences", "Chest pain or blood in sputum"],
          warningSignsHi: ["बुखार का 101°F से ऊपर बढ़ना", "सांस फूलना या बोलने में तकलीफ", "सीने में दर्द या बलगम में खून आना"]
        }
      }
    ]
  }
];

export function evaluateClinicalTriage(
  symptoms: string[],
  age: number,
  tempF?: number,
  hasBreathingDifficulty?: boolean,
  hasRedFlags?: boolean
): {
  level: TriageLevel;
  protocol: KnowledgeProtocol;
  ruleIndex: number;
} {
  // Urgent Red rule: Pediatric respiratory distress / high fever OR clear red flags
  if ((age < 8 && (hasBreathingDifficulty || (tempF && tempF >= 102.5))) || hasRedFlags) {
    return {
      level: 'RED',
      protocol: medicalProtocols[0],
      ruleIndex: 0
    };
  }

  // Needs evaluation Amber rule: prolonged fever, moderate symptoms, adult comorbidities
  const isFever = symptoms.some(s => s.toLowerCase().includes('fever') || s.toLowerCase().includes('बुखार'));
  const isCough = symptoms.some(s => s.toLowerCase().includes('cough') || s.toLowerCase().includes('खांसी'));
  
  if (isFever || (tempF && tempF > 100.5) || (isCough && age > 45)) {
    return {
      level: 'AMBER',
      protocol: medicalProtocols[1],
      ruleIndex: 0
    };
  }

  // Otherwise Lower Priority Green
  return {
    level: 'GREEN',
    protocol: medicalProtocols[2],
    ruleIndex: 0
  };
}
