import { DiseaseInfo, EducationLevel } from "../types";

export const diseasesDb: DiseaseInfo[] = [
  {
    id: "diabetes-type-2",
    name: "Type 2 Diabetes Mellitus",
    category: "Hormones / Endocrinology",
    definition: "A chronic metabolic disorder characterized by high blood glucose, insulin resistance, and relative lack of insulin, primarily caused by genetics and lifestyle factors.",
    causes: [
      "Insulin resistance in peripheral tissues (muscles, liver, adipose tissue)",
      "Progressive beta-cell dysfunction in the pancreas",
      "Genetic predisposition combined with obesity, physical inactivity, and poor diet"
    ],
    symptoms: [
      "Polyuria (excessive urination)",
      "Polydipsia (excessive thirst)",
      "Polyphagia (extreme hunger)",
      "Unexplained weight loss",
      "Fatigue and irritability",
      "Blurred vision",
      "Slow-healing sores or frequent infections"
    ],
    diagnosis: [
      "Fasting Plasma Glucose (FPG) >= 126 mg/dL",
      "Oral Glucose Tolerance Test (OGTT) 2-hour value >= 200 mg/dL",
      "Glycated Hemoglobin (HbA1c) >= 6.5%",
      "Random Plasma Glucose >= 200 mg/dL with classical symptoms of hyperglycemia"
    ],
    treatment: [
      "Metformin (First-line pharmacological agent to improve insulin sensitivity)",
      "Sulfonylureas (e.g., Glipizide) or Glinides to stimulate insulin secretion",
      "SGLT2 inhibitors (e.g., Empagliflozin) to promote urinary glucose excretion",
      "GLP-1 receptor agonists (e.g., Semaglutide) to enhance glucose-dependent insulin release",
      "Insulin therapy (when oral medications are insufficient to control HbA1c)"
    ],
    medications: [
      "Biguanides (Metformin)",
      "SGLT2 Inhibitors (Empagliflozin, Dapagliflozin)",
      "GLP-1 Receptor Agonists (Semaglutide, Liraglutide)",
      "DPP-4 Inhibitors (Sitagliptin)",
      "Basal or Bolus Insulin"
    ],
    lifestyleChanges: [
      "A structured exercise regimen (at least 150 minutes per week of moderate-intensity aerobic exercise)",
      "Weight loss goal of 5% to 10% of body weight for overweight individuals",
      "Regular self-monitoring of blood glucose",
      "Routine diabetic eye examinations and daily foot inspections"
    ],
    diet: [
      "Low glycemic index foods, high fiber (vegetables, whole grains, legumes)",
      "Healthy monounsaturated fats (olive oil, avocados, nuts)",
      "Strict control and limitation of refined sugars, sweet beverages, and simple carbohydrates",
      "Portion control and consistent carbohydrate distribution throughout the day"
    ],
    prevention: [
      "Maintaining a healthy body weight with an active physical regimen",
      "Screening individuals with risk factors (such as age > 45, family history, sedentary lifestyle)",
      "Transitioning to a diet low in ultra-processed foods"
    ],
    riskFactors: [
      "Overweight or obesity (BMI >= 25 kg/m2)",
      "Physical inactivity and sedentary job",
      "First-degree relative with type 2 diabetes",
      "History of gestational diabetes or prediabetes",
      "Hypertension (>= 130/80 mmHg) or dyslipidemia"
    ],
    prognosis: "Type 2 diabetes is a progressive but highly manageable condition. With early diagnosis, intensive lifestyle interventions, and adherence to pharmacotherapy, many patients achieve tight glycemic control and successfully delay or prevent microvascular and macrovascular complications.",
    faqs: [
      {
        question: "Can type 2 diabetes be cured?",
        answer: "While there is no permanent cure, many patients achieve 'remission' (normal blood sugar levels without any medications) through intensive weight loss, healthy diet modifications, and routine physical activity."
      },
      {
        question: "What is HbA1c?",
        answer: "HbA1c measures the average percentage of blood glucose bound to hemoglobin over the past 2 to 3 months. It provides an excellent picture of long-term blood sugar control compared to single daily fingersticks."
      }
    ]
  },
  {
    id: "essential-hypertension",
    name: "Essential (Primary) Hypertension",
    category: "Cardiovascular System",
    definition: "An elevation in systemic arterial blood pressure without an identifiable secondary cause, which over time increases the workload on the heart and can damage arteries throughout the body.",
    causes: [
      "Multifactorial etiology including excessive dietary sodium intake",
      "Sympathetic nervous system overactivity",
      "Renin-angiotensin-aldosterone system (RAAS) dysregulation",
      "Arterial stiffness and increased peripheral vascular resistance"
    ],
    symptoms: [
      "Often entirely asymptomatic ('the silent killer')",
      "Occasional morning headaches, particularly in the occipital region (severe cases)",
      "Dizziness or lightheadedness",
      "Tinnitus (ringing in the ears)",
      "Epistaxis (nosebleeds)"
    ],
    diagnosis: [
      "Repeated resting blood pressure measurements >= 130 mmHg systolic or >= 80 mmHg diastolic on 2 or more separate clinical visits",
      "Ambulatory Blood Pressure Monitoring (ABPM) for out-of-office confirmation",
      "Basic laboratory workup (CMP, lipid panel, urinalysis) to rule out end-organ damage or secondary causes"
    ],
    treatment: [
      "First-line agents: ACE inhibitors (e.g., Lisinopril) or ARBs (e.g., Losartan)",
      "Calcium Channel Blockers (e.g., Amlodipine)",
      "Thiazide Diuretics (e.g., Chlorthalidone, Hydrochlorothiazide)",
      "Beta-blockers (typically reserved for compelling indications like heart failure or post-MI)"
    ],
    medications: [
      "ACE Inhibitors (Lisinopril, Enalapril)",
      "Angiotensin II Receptor Blockers (Losartan, Valsartan)",
      "Calcium Channel Blockers (Amlodipine, Nifedipine ER)",
      "Thiazide Diuretics (Chlorthalidone)"
    ],
    lifestyleChanges: [
      "Restricting dietary sodium intake to less than 2,300 mg (ideally 1,500 mg) daily",
      "Regular cardiovascular exercise (e.g., brisk walking 30 mins a day)",
      "Moderating alcohol consumption and complete cessation of tobacco use",
      "Stress management techniques (mindfulness, adequate sleep)"
    ],
    diet: [
      "Adoption of the DASH (Dietary Approaches to Stop Hypertension) eating plan",
      "Rich in potassium-dense foods (bananas, sweet potatoes, leafy greens) to help naturally lower BP",
      "High intake of vegetables, whole grains, and low-fat dairy products",
      "Limiting saturated fats, trans fats, and sodium-heavy processed foods"
    ],
    prevention: [
      "Regular physical activity and weight maintenance",
      "Restricting sodium and maintaining a healthy intake of potassium",
      "Regular blood pressure checks during routine wellness examinations"
    ],
    riskFactors: [
      "Advanced age (progressive stiffening of the aorta and large arteries)",
      "Family history of early hypertension",
      "High-sodium, low-potassium diets",
      "Chronic stress and sleep apnea"
    ],
    prognosis: "Excellent with appropriate therapeutic compliance. Adequate blood pressure control decreases the risk of stroke by 35-40%, myocardial infarction by 20-25%, and heart failure by more than 50%.",
    faqs: [
      {
        question: "Why is high blood pressure called the 'silent killer'?",
        answer: "Because it rarely produces noticeable symptoms until severe damage has already been done to vital organs like the heart, brain, and kidneys over several years."
      },
      {
        question: "Does checking blood pressure at home help?",
        answer: "Yes, home blood pressure monitoring helps track the efficacy of treatments, eliminates 'white-coat hypertension' (anxiety-induced high readings at the clinic), and offers a clearer longitudinal trend."
      }
    ]
  },
  {
    id: "copd",
    name: "Chronic Obstructive Pulmonary Disease (COPD)",
    category: "Respiratory System",
    definition: "A progressive, obstructive lung condition characterized by chronic airflow limitation that is not fully reversible, primarily comprising emphysema (destruction of alveoli) and chronic bronchitis (bronchial inflammation).",
    causes: [
      "Inhalation of noxious gases, overwhelmingly cigarette smoke (tobacco smoke)",
      "Occupational dust, chemicals, and indoor biomass fuel combustion in poorly ventilated areas",
      "Alpha-1 antitrypsin deficiency (rare genetic cause in younger patients)"
    ],
    symptoms: [
      "Progressive, persistent dyspnea (shortness of breath), worse during physical exertion",
      "Chronic productive cough, often with clear, white, or purulent sputum",
      "Expiratory wheezing and chest tightness",
      "Fatigue, weight loss, and muscle wasting in advanced stages",
      "Barrel chest (hyperinflated lungs seen in emphysema)"
    ],
    diagnosis: [
      "Spirometry showing a post-bronchodilator FEV1/FVC ratio < 0.70",
      "Chest X-ray indicating hyperinflation, flattened diaphragms, and increased retrosternal airspace",
      "Arterial Blood Gas (ABG) to assess for hypoxemia or hypercapnia in severe cases"
    ],
    treatment: [
      "Inhaled Bronchodilators: Short-acting (SABA, e.g., Albuterol) or Long-acting (LABA, e.g., Salmeterol)",
      "Inhaled Anticholinergics (LAMA, e.g., Tiotropium)",
      "Inhaled Corticosteroids (ICS, e.g., Fluticasone) for patients with frequent exacerbations",
      "Oxygen therapy (for patients meeting criteria for resting hypoxemia)",
      "Pulmonary rehabilitation and vaccination (Influenza, Pneumococcal, COVID)"
    ],
    medications: [
      "Short-acting Bronchodilators (Albuterol, Ipratropium)",
      "Long-acting Muscarinic Antagonists (Tiotropium, Umeclidinium)",
      "Long-acting Beta2-Agonists (Salmeterol, Formoterol)",
      "Inhaled Corticosteroids (Budesonide, Fluticasone)"
    ],
    lifestyleChanges: [
      "Absolute smoking cessation (the single most effective intervention to halt decline in FEV1)",
      "Enrolling in pulmonary rehabilitation to build physical endurance and breathing efficiency",
      "Avoiding exposure to air pollutants, dusts, and extreme cold temperatures",
      "Practicing pursed-lip breathing to relieve acute episodes of shortness of breath"
    ],
    diet: [
      "Small, frequent meals rich in proteins and healthy fats (reduces breathing workload compared to heavy carbohydrate meals)",
      "Adequate hydration to thin bronchial secretions, facilitating easier clearance",
      "Maintaining an optimal weight; malnourished COPD patients benefit from nutritional shakes"
    ],
    prevention: [
      "Avoiding smoking and secondhand tobacco smoke",
      "Reducing occupational dust and indoor air pollution exposure",
      "Staying up to date with seasonal and pneumococcal vaccinations"
    ],
    riskFactors: [
      "Heavy tobacco exposure (active or passive smoking)",
      "Workplace exposure to dust, chemical fumes, or mining particles",
      "Advanced age",
      "Alpha-1 antitrypsin deficiency"
    ],
    prognosis: "COPD is progressive and irreversible, but its rate of progression can be remarkably decelerated by smoking cessation, proper medical management, and physical conditioning. Exacerbations are the main driver of hospitalization and mortality.",
    faqs: [
      {
        question: "Is COPD the same as asthma?",
        answer: "No. Asthma is an inflammatory airway disease that is mostly reversible and often allergic in nature. COPD is a progressive, mostly irreversible disease characterized by permanent damage to the lungs, typically due to smoking or exposure to toxins."
      },
      {
        question: "What is a COPD exacerbation?",
        answer: "An exacerbation is a sudden, acute worsening of respiratory symptoms (greater shortness of breath, more cough, and changed sputum color) often triggered by a viral or bacterial lung infection, requiring prompt emergency treatment."
      }
    ]
  },
  {
    id: "major-depression",
    name: "Major Depressive Disorder (MDD)",
    category: "Mental Health & Psychiatry",
    definition: "A highly prevalent mental health condition marked by a persistent feeling of sadness, loss of interest in activities (anedonia), fatigue, and cognitive impairments that severely disrupt daily occupational and social functioning.",
    causes: [
      "Monoamine neurotransmitter dysregulation (serotonin, norepinephrine, dopamine)",
      "HPA-axis hyperactivity leading to chronically elevated cortisol",
      "Genetic predisposition combined with adverse childhood experiences, trauma, or chronic life stressors"
    ],
    symptoms: [
      "Depressed mood most of the day, nearly every day",
      "Marked decrease in interest or pleasure in all or almost all activities (anhedonia)",
      "Significant weight change or appetite disruption",
      "Insomnia or hypersomnia",
      "Psychomotor agitation or retardation",
      "Fatigue, loss of energy, and feelings of worthlessness or excessive guilt",
      "Diminished ability to think, concentrate, or make decisions"
    ],
    diagnosis: [
      "Based on DSM-5 clinical criteria requiring 5 or more symptoms during the same 2-week period, with at least one symptom being depressed mood or loss of interest/pleasure",
      "Standard screening tools such as the PHQ-9 (Patient Health Questionnaire-9)",
      "Excluding medical causes like hypothyroidism, vitamin B12 deficiency, or drug side effects"
    ],
    treatment: [
      "Pharmacotherapy: Selective Serotonin Reuptake Inhibitors (SSRIs, e.g., Escitalopram, Sertraline)",
      "Serotonin-Norepinephrine Reuptake Inhibitors (SNRIs, e.g., Duloxetine, Venlafaxine)",
      "Psychotherapy: Cognitive Behavioral Therapy (CBT), Interpersonal Therapy (IPT)",
      "Combination therapy (CBT + SSRI) has demonstrated maximum clinical efficacy",
      "Brain stimulation (ECT, TMS) for treatment-resistant depression"
    ],
    medications: [
      "SSRIs (Sertraline, Escitalopram, Fluoxetine)",
      "SNRIs (Duloxetine, Venlafaxine)",
      "Atypical Antidepressants (Bupropion, Mirtazapine)",
      "Tricyclic Antidepressants (Amitriptyline - rarely used as first-line)"
    ],
    lifestyleChanges: [
      "Regular cardiovascular exercise (proven to stimulate neurogenesis and elevate endorphins)",
      "Adhering to a strict sleep routine and practicing sleep hygiene",
      "Engaging in social support networks, avoiding isolation",
      "Mindfulness meditation and journaling to reduce emotional reactivity"
    ],
    diet: [
      "A balanced, anti-inflammatory Mediterranean diet high in omega-3 fatty acids (fish, walnuts)",
      "Adequate intake of complex carbohydrates to stabilize serotonin production",
      "Restricting alcohol and caffeine, which can exacerbate mood fluctuations and disrupt sleep"
    ],
    prevention: [
      "Early intervention for high-risk individuals experiencing severe stress or trauma",
      "Building resilience through supportive social ties and therapeutic tools",
      "Avoiding substance abuse and practicing stress-reduction methods"
    ],
    riskFactors: [
      "Family history of depression or other psychiatric conditions",
      "Severe life events: loss of a loved one, financial crisis, chronic illness",
      "History of physical, emotional, or sexual abuse",
      "Certain personality traits: low self-esteem, pessimism, or high neuroticism"
    ],
    prognosis: "Highly treatable. Roughly 60-70% of patients respond favorably to their initial antidepressant trial or CBT program, though recurrence is common and may necessitate maintenance therapy.",
    faqs: [
      {
        question: "How long does it take for antidepressants to work?",
        answer: "Most antidepressant medications require 4 to 6 weeks of consistent daily usage before therapeutic benefits on mood and interest are fully appreciated."
      },
      {
        question: "Is depression just 'feeling sad'?",
        answer: "No. Sadness is a normal human emotion that passes with time. Major Depression is a biological and psychological illness involving persistent, pervasive emotional and physical symptoms that impair daily functioning."
      }
    ]
  }
];

export const educationLevelsDb: EducationLevel[] = [
  {
    id: "class8",
    name: "Class 8 Science",
    description: "Introduction to basic human biology, cell structure, micro-organisms, and foundational physiology suitable for junior high school students.",
    subjects: {
      "Human Biology": {
        name: "Human Biology",
        lessons: [
          {
            id: "c8-l1",
            title: "Cell - The Fundamental Unit of Life",
            content: "Every living organism is made up of tiny structural units called cells. In the human body, we have billions of cells specialized for different tasks, such as nerve cells for sending signals and red blood cells for carrying oxygen. Inside the cell, organelles like the nucleus (the cell's brain) and mitochondria (the powerhouses) perform life-sustaining tasks.",
            diagramDescription: "A schematic of a typical animal cell showing the nucleus, cytoplasm, cell membrane, and mitochondria."
          },
          {
            id: "c8-l2",
            title: "Microorganisms: Friend and Foe",
            content: "Microorganisms are tiny living things that cannot be seen with the naked eye. While some bacteria can cause diseases like tuberculosis and cholera (foes), many are beneficial (friends). For instance, bacteria in our gut help digest food, and certain fungi are used to produce antibiotics like penicillin, which kill harmful disease-causing bacteria."
          }
        ],
        flashcards: [
          {
            id: "c8-f1",
            subject: "Human Biology",
            front: "What is called the 'powerhouse of the cell'?",
            back: "The Mitochondrion, because it produces energy for the cell to function."
          },
          {
            id: "c8-f2",
            subject: "Human Biology",
            front: "What is penicillin?",
            back: "An antibiotic medicine derived from a fungus, used to treat bacterial infections."
          }
        ],
        mcqs: [
          {
            id: "c8-q1",
            question: "Which organelle controls all the activities of the cell?",
            options: [
              "Cell Wall",
              "Mitochondria",
              "Nucleus",
              "Chloroplast"
            ],
            correctAnswer: 2,
            explanation: "The nucleus contains genetic material (DNA) and acts as the control center or 'brain' of the cell."
          },
          {
            id: "c8-q2",
            question: "Antibiotics are effective against which of the following?",
            options: [
              "Viruses",
              "Bacteria",
              "Prions",
              "Fungi (specifically systemic)"
            ],
            correctAnswer: 1,
            explanation: "Antibiotics are medications specifically designed to destroy or inhibit the growth of bacteria, not viruses."
          }
        ],
        cases: []
      }
    }
  },
  {
    id: "mbbs-year1",
    name: "MBBS Year 1",
    description: "Rigorous medical concepts in Human Anatomy, Physiology, and Biochemistry designed for first-year medical students.",
    subjects: {
      "Anatomy": {
        name: "Anatomy",
        lessons: [
          {
            id: "m1-l1",
            title: "Coronary Circulation of the Heart",
            content: "The myocardium requires its own continuous oxygen supply delivered by the coronary arteries, which arise directly from the ascending aorta at the left and right aortic sinuses. The Left Main Coronary Artery quickly bifurcates into the Left Anterior Descending (LAD) artery—which runs along the anterior interventricular groove—and the Circumflex artery. The Right Coronary Artery (RCA) supplies the right atrium, right ventricle, and in 85% of people, gives rise to the Posterior Descending Artery (PDA), establishing 'right dominant' circulation.",
            diagramDescription: "Anatomical view of the heart showing left coronary artery, LAD, circumflex, and right coronary artery."
          },
          {
            id: "m1-l2",
            title: "Anatomy of the Nephron",
            content: "The functional unit of the kidney is the nephron. It consists of the renal corpuscle (Bowman's capsule enclosing the glomerulus) and a specialized tubular system. Fluid filtered across the glomerular capillary basement membrane enters Bowman's space, flows through the Proximal Convoluted Tubule (where 65% of water and solutes are reabsorbed), descends into the thin loop of Henle, ascends through the thick ascending limb, reaches the Distal Convoluted Tubule, and finally drains into the Collecting Duct system."
          }
        ],
        flashcards: [
          {
            id: "m1-f1",
            subject: "Anatomy",
            front: "What artery is famously known as the 'widowmaker'?",
            back: "The Left Anterior Descending (LAD) coronary artery, because a sudden, complete blockage here frequently leads to catastrophic anterior wall myocardial infarction."
          },
          {
            id: "m1-f2",
            subject: "Anatomy",
            front: "What determines 'coronary dominance' in cardiac anatomy?",
            back: "Which coronary artery (Right Coronary or Left Circumflex) gives rise to the Posterior Descending Artery (PDA) supplying the posterior interventricular septum."
          }
        ],
        mcqs: [
          {
            id: "m1-q1",
            question: "In 85% of individuals, the Posterior Descending Artery (PDA) arises from which vessel?",
            options: [
              "Left Circumflex Artery",
              "Left Anterior Descending Artery",
              "Right Coronary Artery",
              "Marginal Artery"
            ],
            correctAnswer: 2,
            explanation: "In 'right-dominant' circulation (found in roughly 85% of people), the PDA arises from the Right Coronary Artery."
          }
        ],
        cases: [
          {
            id: "m1-c1",
            title: "Sudden Severe Substernal Chest Pain",
            presentation: "A 55-year-old male with a history of heavy smoking and hyperlipidemia presents to the emergency department with acute-onset, crushing substernal chest pain of 1-hour duration. The pain radiates down his left arm and into his jaw, and is accompanied by profuse diaphoresis and nausea.",
            vitals: {
              temp: "37.0°C",
              bp: "145/92 mmHg",
              hr: "98 bpm",
              rr: "22 breaths/min"
            },
            physicalExam: "The patient appears in severe distress, clutching his chest (Levine's sign). Cardiopulmonary exam shows regular rhythm, no murmurs or S3/S4, and clear lung fields bilaterally.",
            questions: [
              {
                question: "An ECG reveals ST-segment elevation in leads V1 through V4. Blockage of which artery is most likely responsible for this presentation?",
                options: [
                  "Right Coronary Artery",
                  "Left Anterior Descending Artery",
                  "Left Circumflex Artery",
                  "Left Marginal Artery"
                ],
                correctAnswer: 1,
                explanation: "ST elevations in leads V1-V4 indicate an anterior wall myocardial infarction, which is classically caused by occlusion of the Left Anterior Descending (LAD) coronary artery."
              }
            ]
          }
        ]
      }
    }
  },
  {
    id: "mbbs-year2",
    name: "MBBS Year 2",
    description: "Advanced pharmacology, pathology, and microbiology. Understanding the mechanisms of disease and basic pharmacotherapy.",
    subjects: {
      "Pathology": {
        name: "Pathology",
        lessons: [
          {
            id: "m2-l1",
            title: "Atherosclerosis - Pathogenesis",
            content: "Atherosclerosis is a chronic inflammatory response of the arterial wall to endothelial injury. The sequence begins with endothelial dysfunction leading to increased permeability, accumulation of Low-Density Lipoproteins (LDL) in the intima, and subsequent oxidation of these lipids. Monocytes adhere and migrate into the subendothelium, converting into macrophages that engulf oxidized LDL, becoming 'foam cells'. These foam cells secrete cytokines that recruit smooth muscle cells, culminating in the formation of a fibrous cap overlying a lipid core.",
            diagramDescription: "Diagram of an atheromatous plaque showing endothelial injury, macrophage foam cells, lipid core, and smooth muscle cell migration."
          }
        ],
        flashcards: [
          {
            id: "m2-f1",
            subject: "Pathology",
            front: "What is a 'foam cell' in vascular pathology?",
            back: "A macrophage that has internalized vast amounts of oxidized Low-Density Lipoprotein (LDL) within an atheromatous plaque."
          }
        ],
        mcqs: [
          {
            id: "m2-q1",
            question: "Which of the following represents the earliest histologically visible lesion of atherosclerosis?",
            options: [
              "Fibrous Plaque",
              "Fatty Streak",
              "Complicated Blockage",
              "Aneurysmal Dilation"
            ],
            correctAnswer: 1,
            explanation: "Fatty streaks are the earliest lesions of atherosclerosis, composed of intracellular lipid-laden foam cells in the intima."
          }
        ],
        cases: []
      }
    }
  }
];
