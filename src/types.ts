export interface PersonalInfo {
  name: string;
  age: number;
  gender: string;
  height: number; // cm
  weight: number; // kg
  bloodGroup: string;
  country: string;
  state: string;
  occupation: string;
  lifestyle: string; // active, sedentary, moderate
  smoking: string; // non-smoker, occasional, heavy
  alcohol: string; // none, occasional, regular
  exercise: string; // none, 1-2 days, 3-5 days, daily
  foodHabits: string; // vegetarian, vegan, non-vegetarian, balanced
  waterIntake: number; // liters/day
  sleepDuration: number; // hours/day
  existingDiseases: string[];
  medications: string[];
  familyHistory: string[];
  allergies: string[];
  chronicConditions?: string;
}

export interface SymptomState {
  category: string;
  name: string;
  severity: "mild" | "moderate" | "severe";
  durationDays: number;
}

export interface HealthMetricLog {
  date: string;
  heartRate: number;
  bpSystolic: number;
  bpDiastolic: number;
  bloodSugar: number;
  weight: number;
  waterIntake: number; // ml
  sleepHours: number;
  stressLevel: number; // 1-10
  caloriesBurned: number;
  caloriesConsumed: number;
  symptomsCount: number;
}

export interface AIAnalysisResult {
  conditions: {
    name: string;
    likelihood: string; // "High", "Moderate", "Low"
    description: string;
  }[];
  severityLevel: "Low" | "Moderate" | "Severe" | "Emergency";
  confidenceScore: number; // 0-100
  explanation: string;
  riskFactors: string[];
  lifestyleCauses: string[];
  complications: string[];
  emergencySigns: string[];
  medicalSpecialty: string;
  homeCareSuggestions: string[];
  preventionTips: string[];
  recommendedTests: string[];
  doctorQuestions: string[];
  recoveryTimeline: string;
  seekImmediateCare: string;
}

export interface DiseaseInfo {
  id: string;
  name: string;
  category: string;
  definition: string;
  causes: string[];
  symptoms: string[];
  diagnosis: string[];
  treatment: string[];
  medications: string[]; // broad categories only
  lifestyleChanges: string[];
  diet: string[];
  prevention: string[];
  riskFactors: string[];
  prognosis: string;
  faqs: { question: string; answer: string }[];
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of options
  explanation: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  diagramUrl?: string;
  diagramDescription?: string;
}

export interface ClinicalCase {
  id: string;
  title: string;
  presentation: string;
  vitals: {
    temp: string;
    bp: string;
    hr: string;
    rr: string;
  };
  physicalExam: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export interface SubjectModule {
  name: string;
  lessons: Lesson[];
  flashcards: Flashcard[];
  mcqs: MCQQuestion[];
  cases: ClinicalCase[];
}

export interface EducationLevel {
  id: string;
  name: string;
  description: string;
  subjects: {
    [subjectName: string]: SubjectModule;
  };
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string; // "Once daily", "Twice daily", "As needed", etc.
  time: string; // "08:00", etc.
  adherence: { [date: string]: boolean };
}

export interface VaccineRecord {
  id: string;
  name: string;
  targetGroup: string; // "Childhood", "Adult", "COVID", "Travel", etc.
  dosesCount: number;
  dosesReceived: number;
  status: "Completed" | "Pending" | "Overdue";
  nextDueDate?: string;
}

export interface Habit {
  id: string;
  name: string;
  category: "hydration" | "mental" | "exercise" | "nutrition" | "sleep";
  streak: number;
  history: { [date: string]: boolean };
}

export interface GratitudeEntry {
  id: string;
  date: string;
  content: string;
}

export interface MoodLog {
  date: string;
  score: number; // 1-5 (Terrible to Amazing)
  notes: string;
  factors: string[]; // "Sleep", "Exercise", "Work", etc.
}
