export interface LabTestInfo {
  id: string;
  name: string;
  category: string;
  normalRange: string;
  meaningHigh: string;
  meaningLow: string;
  educationalInterpretation: string;
}

export const labTestsDb: LabTestInfo[] = [
  {
    id: "cbc-wbc",
    name: "White Blood Cell Count (WBC)",
    category: "Complete Blood Count (CBC)",
    normalRange: "4,500 to 11,000 cells per microliter (mcL)",
    meaningHigh: "Known as leukocytosis. Often indicates acute infection, tissue injury, inflammation, severe physical/emotional stress, or leukemia.",
    meaningLow: "Known as leukopenia. May indicate bone marrow failure, autoimmune disorders, overwhelming infection (sepsis), or chemotherapy side effects.",
    educationalInterpretation: "WBCs are the core soldiers of your immune system. A spike usually means your body is actively fighting off a foreign invader (like a virus or bacteria), whereas a drop makes you more susceptible to infections."
  },
  {
    id: "cbc-rbc",
    name: "Red Blood Cell Count (RBC)",
    category: "Complete Blood Count (CBC)",
    normalRange: "Male: 4.3 - 5.9 million/mcL | Female: 3.5 - 5.5 million/mcL",
    meaningHigh: "Known as erythrocytosis or polycythemia. Can be triggered by chronic hypoxia (COPD, high altitudes), dehydration, or a primary bone marrow disorder.",
    meaningLow: "Commonly represents anemia. Leads to decreased oxygen delivery to cells, causing fatigue, weakness, and pale skin.",
    educationalInterpretation: "RBCs contain hemoglobin, which holds onto oxygen like a sponge. Having too few leaves you feeling chronically exhausted due to cellular oxygen starvation."
  },
  {
    id: "hba1c",
    name: "Hemoglobin A1c (HbA1c)",
    category: "Metabolic / Blood Sugar",
    normalRange: "Normal: < 5.7% | Prediabetes: 5.7% - 6.4% | Diabetes: >= 6.5%",
    meaningHigh: "Indicates poor long-term glucose control over the past 90 days. High levels signify persistent hyperglycemia, which increases risk of neuropathy, retinopathy, and heart disease.",
    meaningLow: "Can indicate recurrent hypoglycemia, hemolytic anemia, or recent blood loss where new red cells dilute the HbA1c average.",
    educationalInterpretation: "Unlike daily finger pricks, HbA1c captures a 3-month video of your average blood glucose because sugar chemically binds to red blood cells for their entire 120-day lifespan."
  },
  {
    id: "lipid-ldl",
    name: "Low-Density Lipoprotein (LDL) Cholesterol",
    category: "Lipid Profile",
    normalRange: "Optimal: < 100 mg/dL | High: 160 - 180 mg/dL | Very High: >= 190 mg/dL",
    meaningHigh: "Significantly elevates the risk of atheromatous plaque accumulation in coronary and carotid arteries, potentially leading to a stroke or heart attack.",
    meaningLow: "Very low levels (rare) can occur in severe malnutrition, severe liver disease, or genetic disorders, but generally a low level is highly desirable.",
    educationalInterpretation: "Known as the 'bad cholesterol,' LDL acts as a delivery truck that deposits cholesterol into the walls of your blood vessels. If there's too much, it causes narrow, stiff arteries."
  },
  {
    id: "lipid-hdl",
    name: "High-Density Lipoprotein (HDL) Cholesterol",
    category: "Lipid Profile",
    normalRange: "Male: > 40 mg/dL | Female: > 50 mg/dL | Excellent: > 60 mg/dL",
    meaningHigh: "Associated with a lower risk of cardiovascular disease. High levels are protective against heart attacks.",
    meaningLow: "Increases cardiovascular risk. Often seen in physical inactivity, heavy smoking, or metabolic syndrome.",
    educationalInterpretation: "Often called 'good cholesterol', HDL is a clean-up crew that picks up excess cholesterol from your bloodstream and returns it to your liver to be broken down and excreted."
  },
  {
    id: "kidney-creatinine",
    name: "Serum Creatinine",
    category: "Kidney Function Test (KFT)",
    normalRange: "0.6 to 1.2 mg/dL",
    meaningHigh: "Suggests impaired kidney filtration. May indicate chronic kidney disease, acute renal injury, severe dehydration, or muscle breakdown.",
    meaningLow: "Can be seen in very low muscle mass, muscular dystrophy, severe liver disease, or extreme malnutrition.",
    educationalInterpretation: "Creatinine is a normal waste product of daily muscle metabolism. Your kidneys are responsible for filtering it completely. If kidneys slow down, creatinine levels rise in the blood."
  },
  {
    id: "liver-alt",
    name: "Alanine Aminotransferase (ALT)",
    category: "Liver Function Test (LFT)",
    normalRange: "7 to 56 units/liter (U/L)",
    meaningHigh: "Signifies active hepatocyte (liver cell) damage. Common triggers include fatty liver (NASH), viral hepatitis, excessive alcohol use, or medication toxicity.",
    meaningLow: "Very low levels are normal and clinically insignificant.",
    educationalInterpretation: "ALT is an enzyme found mostly inside your liver cells. When the liver is irritated or injured, these cells leak ALT into your bloodstream like an alarm system."
  },
  {
    id: "thyroid-tsh",
    name: "Thyroid Stimulating Hormone (TSH)",
    category: "Thyroid Panel",
    normalRange: "0.4 to 4.0 mIU/L",
    meaningHigh: "Indicates hypothyroidism (underactive thyroid). The brain is screaming for more thyroid hormone by releasing excess TSH.",
    meaningLow: "Indicates hyperthyroidism (overactive thyroid). High free thyroid hormones tell the brain's pituitary gland to stop releasing TSH.",
    educationalInterpretation: "TSH is produced by the brain to control the thyroid gland in your neck. If your thyroid is sluggish, your brain pumps out extra TSH to push it to work harder."
  },
  {
    id: "vit-d",
    name: "25-Hydroxy Vitamin D",
    category: "Vitamin & Mineral Levels",
    normalRange: "Deficient: < 20 ng/mL | Insufficient: 20 - 29 ng/mL | Optimal: 30 - 100 ng/mL",
    meaningHigh: "Vitamin D toxicity (rare, usually from excessive supplement abuse). Can cause hypercalcemia, confusion, and kidney stones.",
    meaningLow: "Indicates vitamin D deficiency. Causes weak bones (osteomalacia/rickets), joint pain, fatigue, and impaired immune defense.",
    educationalInterpretation: "Vitamin D acts more like a hormone than a vitamin, helping your intestines absorb calcium. It's synthesized by sunlight hitting your skin, but many people require dietary supplementation."
  }
];

export interface FirstAidGuide {
  title: string;
  icon: string;
  steps: string[];
  redFlags: string;
}

export const firstAidDb: FirstAidGuide[] = [
  {
    title: "Choking (Heimlich Maneuver)",
    icon: "🗣️",
    steps: [
      "Stand behind the person and wrap your arms around their waist.",
      "Make a fist with one hand and place the thumb side slightly above the navel.",
      "Grasp your fist with your other hand.",
      "Press into the abdomen with a quick, upward thrust.",
      "Repeat thrusts until the blockage is dislodged or the person becomes unconscious (then begin CPR)."
    ],
    redFlags: "Inability to talk, breathe, or cough; turning blue around the lips (cyanosis)."
  },
  {
    title: "Cardiopulmonary Resuscitation (CPR)",
    icon: "🫀",
    steps: [
      "Call emergency services immediately and fetch an AED if nearby.",
      "Place the heel of one hand on the center of the chest (lower half of breastbone).",
      "Interlock your other hand on top, keeping elbows locked.",
      "Compress hard and fast: 100-120 compressions per minute at a depth of 2 inches.",
      "Give 2 rescue breaths after every 30 compressions if trained, or perform compression-only CPR."
    ],
    redFlags: "Unresponsive, no pulse, or not breathing/only gasping."
  },
  {
    title: "Severe Bleeding Control",
    icon: "🩸",
    steps: [
      "Apply direct pressure to the wound with a clean cloth or sterile bandage.",
      "Maintain continuous firm pressure. Do not lift the cloth to check.",
      "Elevate the injured limb above heart level if possible.",
      "If bleeding doesn't stop, apply a second bandage on top. Do not remove the first.",
      "If catastrophic arterial bleeding persists on a limb, apply a tourniquet 2-3 inches above the wound."
    ],
    redFlags: "Blood spurting, cloth soaked through, or victim signs of shock (cold, clammy, dizzy)."
  },
  {
    title: "Anaphylaxis (Severe Allergy)",
    icon: "🐝",
    steps: [
      "Identify the allergen trigger and remove it if possible.",
      "Locate the victim's epinephrine auto-injector (EpiPen).",
      "Press the auto-injector firmly against the outer mid-thigh and hold for 3-10 seconds.",
      "Call emergency services immediately, even if symptoms temporarily improve.",
      "Have the victim lie flat with legs elevated to combat shock."
    ],
    redFlags: "Difficulty breathing, swelling of tongue or throat, hives, dizziness, or fainting."
  },
  {
    title: "Heat Stroke Relief",
    icon: "☀️",
    steps: [
      "Move the person immediately to a cool, shaded, or air-conditioned space.",
      "Cool them rapidly using cold water immersion, wet sheets, ice packs to groin/axillae/neck.",
      "Do NOT give them oral fluids if they are confused or semi-conscious.",
      "Fan them continuously to increase evaporation cooling.",
      "Monitor temperature closely until emergency services arrive."
    ],
    redFlags: "Core body temp > 104°F (40°C), confusion, altered mental state, dry hot skin or profuse sweating."
  }
];
