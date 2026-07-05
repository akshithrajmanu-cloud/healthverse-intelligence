export interface OrganDetail {
  id: string;
  name: string;
  anatomy: string;
  functions: string[];
  diseases: string[];
  symptoms: string[];
  treatments: string[];
  prevention: string[];
  icon: string;
}

export const anatomyData: { [key: string]: OrganDetail } = {
  brain: {
    id: "brain",
    name: "Brain & Central Nervous System",
    anatomy: "The brain is the command center of the body, weighing about 1.4 kg. It consists of the cerebrum (divided into frontal, parietal, temporal, and occipital lobes), cerebellum (coordination), and brainstem (controls vital functions like breathing).",
    functions: [
      "Processes sensory information from the environment",
      "Controls cognitive abilities including memory, reasoning, emotion, and speech",
      "Regulates voluntary motor movements and involuntary homeostatic systems",
      "Coordinates balance, posture, and muscle tone"
    ],
    diseases: [
      "Ischemic and Hemorrhagic Stroke",
      "Alzheimer's Disease & Dementia",
      "Parkinson's Disease",
      "Migraines & Tension Headaches",
      "Epilepsy & Seizure Disorders"
    ],
    symptoms: [
      "Sudden weakness or numbness on one side of the body",
      "Chronic memory loss and cognitive decline",
      "Resting tremors and muscle rigidity",
      "Severe throbbing head pain, photophobia, and aura",
      "Loss of consciousness or convulsive fits"
    ],
    treatments: [
      "Thrombolytic therapy (tPA) for acute ischemic strokes within 4.5 hours",
      "Cholinesterase inhibitors (Donepezil) for Alzheimer's symptoms",
      "Levodopa/Carbidopa for Parkinson's disease",
      "Triptans or NSAIDs for acute migraine relief",
      "Antiepileptic drugs (Levetiracetam, Valproate)"
    ],
    prevention: [
      "Engage in cognitive exercises and continuous lifelong learning",
      "Perform regular cardiovascular exercise to promote cerebral blood flow",
      "Strictly control hypertension and cholesterol levels",
      "Maintain active social engagement and a Mediterranean diet"
    ],
    icon: "🧠"
  },
  heart: {
    id: "heart",
    name: "Heart & Cardiovascular System",
    anatomy: "A muscular organ about the size of a fist, situated in the mediastinum. It features four chambers: the right and left atria, and the right and left ventricles, separated by valves (tricuspid, pulmonary, mitral, aortic) preventing backflow.",
    functions: [
      "Pumps deoxygenated blood to the lungs via the pulmonary arteries",
      "Pumps oxygenated blood to systemic circulation via the aorta",
      "Generates blood pressure to perfuse vital organs",
      "Regulates cardiac output via heart rate and stroke volume adjustments"
    ],
    diseases: [
      "Coronary Artery Disease (Atherosclerosis)",
      "Myocardial Infarction (Heart Attack)",
      "Heart Failure (Systolic & Diastolic)",
      "Cardiac Arrhythmias (Atrial Fibrillation)"
    ],
    symptoms: [
      "Crushing chest pain radiating to left arm or jaw",
      "Shortness of breath on exertion or lying flat",
      "Rapid, irregular heart palpitations",
      "Unexplained fatigue and ankle swelling (edema)"
    ],
    treatments: [
      "Coronary angioplasty with stent placement",
      "Beta-blockers, ACE inhibitors, and Statin therapy",
      "Antiplatelets (Aspirin, Clopidogrel)",
      "Diuretics (Furosemide) for volume overload"
    ],
    prevention: [
      "Consume a low-sodium, heart-healthy DASH or Mediterranean diet",
      "Stop all smoking and limit alcohol intake",
      "Perform 150+ minutes of moderate-intensity exercise weekly",
      "Regularly monitor resting blood pressure and lipid panels"
    ],
    icon: "❤️"
  },
  lungs: {
    id: "lungs",
    name: "Lungs & Respiratory System",
    anatomy: "The primary respiratory organs located in the thoracic cavity. The right lung has three lobes, while the left has two to accommodate the heart. Consists of bronchi, bronchioles, and approximately 300 million alveoli where gas exchange occurs.",
    functions: [
      "Facilitates the exchange of oxygen into the bloodstream",
      "Removes carbon dioxide waste from the body",
      "Helps regulate physiological acid-base balance (pH)",
      "Filters out tiny blood clots and filters inhaled particulate matter"
    ],
    diseases: [
      "Chronic Obstructive Pulmonary Disease (COPD)",
      "Asthma",
      "Pneumonia & Bronchitis",
      "Pulmonary Fibrosis"
    ],
    symptoms: [
      "Chronic productive or non-productive cough",
      "Dyspnea (shortness of breath) during simple activities",
      "Expiratory wheezing and chest tightness",
      "Fever, chills, and purulent sputum production"
    ],
    treatments: [
      "Inhaled short and long-acting bronchodilators (Albuterol, Salmeterol)",
      "Inhaled corticosteroids (Fluticasone) for inflammation",
      "Antibiotic therapy for bacterial pneumonia",
      "Supplemental oxygen therapy for chronic hypoxemia"
    ],
    prevention: [
      "Strictly avoid smoking and exposure to secondhand smoke",
      "Wear appropriate respirator masks in dusty or hazardous workplaces",
      "Get vaccinated annually for Influenza, Pneumococcal, and COVID-19",
      "Practice deep breathing exercises and maintain aerobic fitness"
    ],
    icon: "🫁"
  },
  liver: {
    id: "liver",
    name: "Liver & Biliary System",
    anatomy: "The largest internal organ, weighing 1.5 kg, located in the right upper quadrant of the abdomen. Divided into major right and left lobes, containing functional units called lobules composed of hepatocytes.",
    functions: [
      "Detoxifies drugs, metabolic waste products, and alcohol",
      "Synthesizes essential plasma proteins (Albumin, Clotting factors)",
      "Produces bile essential for dietary fat emulsification and digestion",
      "Stores glycogen, vitamins (A, D, E, K, B12), and iron"
    ],
    diseases: [
      "Non-Alcoholic Fatty Liver Disease (NAFLD/NASH)",
      "Liver Cirrhosis",
      "Viral Hepatitis (A, B, C, D, E)",
      "Hepatocellular Carcinoma"
    ],
    symptoms: [
      "Jaundice (yellowing of skin and sclera)",
      "Right upper quadrant abdominal pain and swelling (ascites)",
      "Pruritus (severe skin itching)",
      "Dark-colored urine and pale clay-colored stools"
    ],
    treatments: [
      "Lifestyle modifications (weight loss, low-fat diet) for fatty liver",
      "Direct-acting antivirals (DAAs) for Hepatitis C",
      "Avoidance of hepatotoxic agents (Acetaminophen overdose prevention)",
      "Liver transplantation for end-stage liver failure"
    ],
    prevention: [
      "Vaccinate against Hepatitis A and B",
      "Avoid excess alcohol consumption",
      "Exercise regularly and maintain an optimal waist circumference",
      "Avoid sharing needles or unsterile tattooing equipment"
    ],
    icon: "🪵"
  },
  kidneys: {
    id: "kidneys",
    name: "Kidneys & Urinary Tract",
    anatomy: "Two bean-shaped, retroperitoneal organs located on either side of the spine at the level of T12 to L3. Each contains approximately one million microscopic filtering units called nephrons.",
    functions: [
      "Filters metabolic waste products (urea, creatinine) from blood",
      "Regulates fluid and electrolyte balance (Sodium, Potassium, Calcium)",
      "Maintains blood pH and systemic blood pressure (RAAS system)",
      "Secretes Erythropoietin (EPO) to stimulate red blood cell production"
    ],
    diseases: [
      "Chronic Kidney Disease (CKD) from diabetes/hypertension",
      "Nephrolithiasis (Kidney Stones)",
      "Acute Kidney Injury (AKI)",
      "Glomerulonephritis"
    ],
    symptoms: [
      "Bilateral ankle or facial swelling (fluid retention/edema)",
      "Decreased or absent urine output (oliguria)",
      "Flank pain radiating to the groin (classic for kidney stones)",
      "Foamy urine (indicative of protein excretion/proteinuria)"
    ],
    treatments: [
      "Strict glycemic and blood pressure management (using ACE inhibitors)",
      "Dialysis (hemodialysis or peritoneal dialysis) for ESRD",
      "Hydration and pain management for kidney stones",
      "Kidney transplantation"
    ],
    prevention: [
      "Drink adequate water daily (typically 2 to 3 liters)",
      "Avoid long-term, high-dose NSAID (painkiller) abuse",
      "Keep blood pressure below 130/80 mmHg",
      "Maintain a diet moderate in protein and low in sodium"
    ],
    icon: "🍒"
  },
  pancreas: {
    id: "pancreas",
    name: "Pancreas & Endocrine/Exocrine System",
    anatomy: "A lobulated, elongated gland situated retroperitoneally behind the stomach. Divided into head, neck, body, and tail. Contains exocrine acinar cells and endocrine islets of Langerhans.",
    functions: [
      "Synthesizes digestive enzymes (Amylase, Lipase, Trypsinogen)",
      "Produces Insulin to decrease blood glucose levels",
      "Produces Glucagon to increase blood glucose levels",
      "Secretes Sodium Bicarbonate to neutralize acidic stomach chyme"
    ],
    diseases: [
      "Type 1 and Type 2 Diabetes Mellitus",
      "Acute and Chronic Pancreatitis",
      "Pancreatic Adenocarcinoma"
    ],
    symptoms: [
      "Polyuria, polydipsia, and fatigue (uncontrolled diabetes)",
      "Severe epigastric pain radiating directly to the back",
      "Steatorrhea (pale, oily, foul-smelling stools from fat malabsorption)",
      "Painless jaundice and unexplained weight loss"
    ],
    treatments: [
      "Insulin replacement therapy for Type 1 Diabetes",
      "Oral hypoglycemics (Metformin) for Type 2 Diabetes",
      "Pancreatic enzyme replacement therapy (PERT) for exocrine insufficiency",
      "NPO (nothing by mouth), aggressive IV fluids, and pain control for pancreatitis"
    ],
    prevention: [
      "Limit saturated fats and alcohol to reduce pancreatitis risk",
      "Maintain a healthy weight to preserve insulin sensitivity",
      "Eat a fiber-rich, low-processed food diet",
      "Avoid smoking, which is a key risk factor for pancreatic cancer"
    ],
    icon: "🥞"
  },
  digestive: {
    id: "digestive",
    name: "Digestive System (Stomach & Intestines)",
    anatomy: "A continuous muscular tube extending from the mouth to the anus. Key components include the esophagus, stomach (acid digestion), small intestine (duodenum, jejunum, ileum for nutrient absorption), and large intestine (water absorption and waste storage).",
    functions: [
      "Ingests and mechanically breaks down solid food",
      "Chemically digests macromolecules using gastric acid and enzymes",
      "Absorbs essential nutrients, vitamins, minerals, and water",
      "Excretes indigestible waste materials from the body"
    ],
    diseases: [
      "Gastroesophageal Reflux Disease (GERD)",
      "Peptic Ulcer Disease (PUD)",
      "Irritable Bowel Syndrome (IBS)",
      "Inflammatory Bowel Disease (Crohn's & Ulcerative Colitis)",
      "Celiac Disease"
    ],
    symptoms: [
      "Heartburn, regurgitation, and acid reflux",
      "Burning epigastric pain temporarily relieved by food or antacids",
      "Alternating diarrhea, constipation, and abdominal bloating",
      "Hematochezia (blood in stool) or melena (black, tarry stools)"
    ],
    treatments: [
      "Proton Pump Inhibitors (Omeprazole) for acid suppression",
      "Triple therapy (Antibiotics + PPI) for Helicobacter pylori ulcers",
      "Dietary triggers avoidance and fiber supplementation for IBS",
      "Immunomodulators or biologic therapy for Crohn's/Colitis"
    ],
    prevention: [
      "Eat smaller, more frequent meals and avoid lying down for 3 hours post-meal",
      "Adopt a high-fiber diet to support healthy peristalsis and microbiome",
      "Limit the use of NSAID pain relievers, which irritate stomach lining",
      "Incorporate probiotic-dense foods (yogurt, kefir, fermented foods)"
    ],
    icon: "🥣"
  },
  blood_vessels: {
    id: "blood_vessels",
    name: "Blood Vessels & Hematology",
    anatomy: "The tubular network composed of arteries (high pressure, thick elastic walls), capillaries (microscopic, single-cell layer for diffusion), and veins (low pressure, thin walls with one-way valves) spanning the entire body.",
    functions: [
      "Transports oxygen, glucose, hormones, and vitamins to tissues",
      "Returns carbon dioxide and metabolic nitrogenous wastes to excretory organs",
      "Regulates systemic temperature by vasoconstriction or vasodilation",
      "Carries leukocytes and immune proteins to sites of injury or infection"
    ],
    diseases: [
      "Peripheral Artery Disease (PAD)",
      "Deep Vein Thrombosis (DVT)",
      "Aortic Aneurysm",
      "Varicose Veins",
      "Anemia"
    ],
    symptoms: [
      "Intermittent claudication (leg cramping or pain triggered by walking)",
      "Unilateral warm, swollen, red, and painful lower extremity (DVT risk)",
      "Bulging, dark blue veins in the legs",
      "Chronic fatigue, pale conjunctiva, and lightheadedness (anemia)"
    ],
    treatments: [
      "Anticoagulant therapy (Heparin, Warfarin, Apixaban) for DVT",
      "Surgical grafting or endovascular stent repair for aneurysms",
      "Antiplatelets and exercise therapy for peripheral artery disease",
      "Iron, Vitamin B12, or folate supplementation for nutritional anemia"
    ],
    prevention: [
      "Avoid prolonged immobility or sitting during long travel",
      "Practice ankle pumps and compression stocking use in high-risk environments",
      "Maintain active control of diabetes and dyslipidemia to protect endothelium",
      "Ensure rich dietary sources of iron and green leafy vegetables"
    ],
    icon: "🩸"
  }
};
