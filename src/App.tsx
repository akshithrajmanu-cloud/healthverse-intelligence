import React, { useState, useEffect } from "react";
import { 
  Heart, 
  Activity, 
  User, 
  BookOpen, 
  Apple, 
  Smile, 
  FileText, 
  Sparkles,
  ShieldAlert,
  ArrowRight,
  MessageSquare,
  HelpCircle,
  Stethoscope,
  ChevronRight,
  BrainCircuit,
  Settings,
  Flame,
  AlertTriangle,
  X,
  LogOut
} from "lucide-react";

import { useAuth } from "./context/AuthContext.tsx";
import { PersonalInfo, HealthMetricLog, SymptomState, AIAnalysisResult } from "./types";
import DashboardTab from "./components/DashboardTab";
import BodyExplorerTab from "./components/BodyExplorerTab";
import SymptomCheckerTab from "./components/SymptomCheckerTab";
import EducationTab from "./components/EducationTab";
import NutritionTab from "./components/NutritionTab";
import WellnessTab from "./components/WellnessTab";
import LabGuidesTab from "./components/LabGuidesTab";
import AssistantChat from "./components/AssistantChat";
import AssessmentForm from "./components/AssessmentForm";
import LoginPage from "./components/LoginPage";

export default function App() {
  const { user, token, logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("healthverse_logged_in") === "true";
  });
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [showChatDrawer, setShowChatDrawer] = useState(false);

  // Core User states
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "Dr. Raghav",
    age: 28,
    gender: "male",
    height: 175,
    weight: 71,
    bloodGroup: "O+",
    country: "India",
    occupation: "Medical Intern",
    lifestyle: "moderate",
    smoking: "non-smoker",
    alcohol: "occasional",
    existingDiseases: ["Mild seasonal asthma"],
    medications: [],
    familyHistory: [],
    allergies: [],
    chronicConditions: "Mild seasonal asthma"
  });

  // Sample medical vitals history for plotting trend lines beautifully
  const [metricsHistory, setMetricsHistory] = useState<HealthMetricLog[]>([
    { date: "Jun 28", heartRate: 74, bpSystolic: 122, bpDiastolic: 81, bloodSugar: 98, weight: 72, waterIntake: 1800, sleepHours: 7, stressLevel: 5, caloriesBurned: 200, caloriesConsumed: 2200, symptomsCount: 0 },
    { date: "Jun 29", heartRate: 72, bpSystolic: 120, bpDiastolic: 80, bloodSugar: 94, weight: 71.8, waterIntake: 2200, sleepHours: 7.5, stressLevel: 4, caloriesBurned: 350, caloriesConsumed: 2100, symptomsCount: 0 },
    { date: "Jun 30", heartRate: 75, bpSystolic: 125, bpDiastolic: 83, bloodSugar: 102, weight: 71.5, waterIntake: 1500, sleepHours: 6.2, stressLevel: 6, caloriesBurned: 150, caloriesConsumed: 2400, symptomsCount: 1 },
    { date: "Jul 01", heartRate: 70, bpSystolic: 118, bpDiastolic: 78, bloodSugar: 90, weight: 71.2, waterIntake: 2600, sleepHours: 8, stressLevel: 3, caloriesBurned: 400, caloriesConsumed: 1950, symptomsCount: 0 },
    { date: "Jul 02", heartRate: 68, bpSystolic: 115, bpDiastolic: 75, bloodSugar: 88, weight: 71, waterIntake: 3000, sleepHours: 8.5, stressLevel: 2, caloriesBurned: 500, caloriesConsumed: 1800, symptomsCount: 0 },
  ]);

  // Sync state with database if authenticated
  useEffect(() => {
    if (!token) return;

    const fetchDBData = async () => {
      try {
        const infoRes = await fetch("/api/user/personal-info", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (infoRes.ok) {
          const infoData = await infoRes.json();
          if (infoData) {
            setPersonalInfo({
              name: infoData.name || "",
              age: infoData.age || 28,
              gender: infoData.gender || "male",
              height: infoData.height || 175,
              weight: infoData.weight || 71,
              bloodGroup: infoData.bloodGroup || "O+",
              country: infoData.country || "India",
              state: infoData.state || "",
              occupation: infoData.occupation || "",
              lifestyle: infoData.lifestyle || "moderate",
              smoking: infoData.smoking || "non-smoker",
              alcohol: infoData.alcohol || "occasional",
              exercise: infoData.exercise || "none",
              foodHabits: infoData.foodHabits || "balanced",
              waterIntake: infoData.waterIntake || 2,
              sleepDuration: infoData.sleepDuration || 8,
              existingDiseases: infoData.existingDiseases ? JSON.parse(infoData.existingDiseases) : [],
              medications: infoData.medications ? JSON.parse(infoData.medications) : [],
              familyHistory: infoData.familyHistory ? JSON.parse(infoData.familyHistory) : [],
              allergies: infoData.allergies ? JSON.parse(infoData.allergies) : [],
              chronicConditions: infoData.chronicConditions || ""
            });
          }
        }

        const metricsRes = await fetch("/api/user/metrics", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (metricsRes.ok) {
          const metricsData = await metricsRes.json();
          if (metricsData && metricsData.length > 0) {
            const mappedHistory = metricsData.map((m: any) => ({
              date: m.date,
              heartRate: m.heartRate || 72,
              bpSystolic: m.bpSystolic || 120,
              bpDiastolic: m.bpDiastolic || 80,
              bloodSugar: m.bloodSugar || 90,
              weight: m.weight || 71,
              waterIntake: m.waterIntake || 2000,
              sleepHours: m.sleepHours || 8,
              stressLevel: m.stressLevel || 5,
              caloriesBurned: m.caloriesBurned || 200,
              caloriesConsumed: m.caloriesConsumed || 2000,
              symptomsCount: m.symptomsCount || 0
            }));
            setMetricsHistory(mappedHistory);
          }
        }
      } catch (err) {
        console.error("Error loading secure DB data:", err);
      }
    };

    fetchDBData();
  }, [token]);

  // Database upsert handlers
  const handleUpdatePersonalInfo = async (updated: PersonalInfo) => {
    setPersonalInfo(updated);
    if (!token) return;
    try {
      await fetch("/api/user/personal-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updated)
      });
    } catch (err) {
      console.error("Failed to sync profile to secure database:", err);
    }
  };

  const handleUpdateMetricsHistory = async (updated: HealthMetricLog[] | ((prev: HealthMetricLog[]) => HealthMetricLog[])) => {
    let nextHistory: HealthMetricLog[];
    if (typeof updated === "function") {
      nextHistory = updated(metricsHistory);
    } else {
      nextHistory = updated;
    }
    setMetricsHistory(nextHistory);

    if (!token) return;
    // Find the new entry
    const newEntry = nextHistory.find(item => !metricsHistory.some(prevItem => prevItem.date === item.date && prevItem.heartRate === item.heartRate));
    if (newEntry) {
      try {
        await fetch("/api/user/metrics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(newEntry)
        });
      } catch (err) {
        console.error("Failed to sync health metrics to secure database:", err);
      }
    }
  };

  // AI Diagnostic / Symptom Check states
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [loadingSymptomCheck, setLoadingSymptomCheck] = useState(false);

  // AI Intelligence Global Report states
  const [reportData, setReportData] = useState<any>(null);
  const [loadingReport, setLoadingReport] = useState(false);

  // Core callback: RAG / Clinical symptom checks via Gemini backend proxy
  const handleAnalyzeSymptoms = async (symptoms: SymptomState[]): Promise<AIAnalysisResult | null> => {
    setLoadingSymptomCheck(true);
    setAiAnalysis(null);

    try {
      const response = await fetch("/api/gemini/analyze-symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms, personalInfo })
      });

      if (!response.ok) {
        throw new Error("Symptom synthesis request failed.");
      }

      const data: AIAnalysisResult = await response.json();
      setAiAnalysis(data);
      return data;
    } catch (err: any) {
      console.error(err);
      alert("Error contacting medical AI model. Make sure the server is configured properly.");
      return null;
    } finally {
      setLoadingSymptomCheck(false);
    }
  };

  // Core callback: AI global wellness intelligence report compiling
  const handleRequestReport = async () => {
    setLoadingReport(true);
    setReportData(null);

    try {
      const response = await fetch("/api/gemini/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personalInfo, metricsHistory })
      });

      if (!response.ok) {
        throw new Error("Intelligence compilation failed.");
      }

      const data = await response.json();
      setReportData(data);
    } catch (err) {
      console.error(err);
      alert("Failed compiling report. Configure your API key in development.");
    } finally {
      setLoadingReport(false);
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <Activity className="w-4 h-4" /> },
    { id: "body-explorer", label: "Body Explorer", icon: <BrainCircuit className="w-4 h-4" /> },
    { id: "symptom-checker", label: "Symptom Checker", icon: <Stethoscope className="w-4 h-4" /> },
    { id: "education", label: "Medical Education", icon: <BookOpen className="w-4 h-4" /> },
    { id: "nutrition", label: "Nutrition & Fitness", icon: <Apple className="w-4 h-4" /> },
    { id: "wellness", label: "Wellness Tracker", icon: <Smile className="w-4 h-4" /> },
    { id: "lab-guides", label: "Lab Values & Emergency", icon: <FileText className="w-4 h-4" /> },
    { id: "assessment", label: "Health Profile", icon: <User className="w-4 h-4" /> }
  ];

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} userEmail="amugaddaraghavarv@gmail.com" />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-white">
      
      {/* Absolute Header: Warning Clinical Disclaimer */}
      <div className="bg-red-950/20 border-b border-red-500/20 px-4 py-2 text-center text-[11px] text-red-300 font-medium tracking-wide">
        🚨 <span className="font-bold uppercase font-mono">Educational Disclaimer:</span> This application is developed strictly as a clinical simulation and study tool. It does not provide medical diagnoses, prescriptions, or replace formal professional evaluations. In emergencies, call 911 immediately.
      </div>

      {/* Main Navbar */}
      <header className="border-b border-white/10 bg-slate-950 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-emerald-400">
              <span className="text-white text-lg font-black font-mono">HV</span>
            </div>
            <div>
              <h1 className="text-base font-extrabold text-white tracking-tight">HealthVerse AI</h1>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest font-mono">Somatic & Academic Intelligence</span>
            </div>
          </div>

          {/* Collapsible Chat companion and Settings */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowChatDrawer(true)}
              className="relative text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/25 px-3 py-1.5 rounded-xl transition-all flex items-center gap-2 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Ask AI Companion</span>
              <span className="absolute -top-1.5 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </button>

            {/* Logout Lock Action */}
            <button
              onClick={() => {
                localStorage.removeItem("healthverse_logged_in");
                setIsLoggedIn(false);
              }}
              className="text-xs font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/15 border border-red-500/25 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:border-red-500/40"
              title="Lock Console"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock Console</span>
            </button>
          </div>

        </div>
      </header>

      {/* Primary Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
        
        {/* Left Hand Sidebar Navigation Controls */}
        <aside className="lg:w-64 shrink-0 flex flex-col gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider px-2 font-mono">Somatic Modules</span>
            
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    activeTab === item.id 
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.05)]"
                      : "bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <span className={`${activeTab === item.id ? "text-emerald-400" : "text-slate-500"}`}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Quick Stats sidebar footer */}
          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 space-y-3 hidden lg:block">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold font-mono">Intern Vitals Sync</span>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Intern:</span>
                <span className="text-white font-mono font-semibold">{personalInfo.name || "Raghav"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Physiology:</span>
                <span className="text-emerald-400 font-mono font-semibold">Stable Vitals</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Dynamic Canvas Workspace based on active state */}
        <main className="flex-1">
          {activeTab === "dashboard" && (
            <DashboardTab
              personalInfo={personalInfo}
              setPersonalInfo={handleUpdatePersonalInfo}
              metricsHistory={metricsHistory}
              setMetricsHistory={handleUpdateMetricsHistory}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onRequestReport={handleRequestReport}
              reportData={reportData}
              loadingReport={loadingReport}
            />
          )}

          {activeTab === "body-explorer" && (
            <BodyExplorerTab />
          )}

          {activeTab === "symptom-checker" && (
            <SymptomCheckerTab
              personalInfo={personalInfo}
              onAnalyzeSymptoms={handleAnalyzeSymptoms}
              analysisResult={aiAnalysis}
              loading={loadingSymptomCheck}
            />
          )}

          {activeTab === "education" && (
            <EducationTab personalInfo={personalInfo} />
          )}

          {activeTab === "nutrition" && (
            <NutritionTab
              personalInfo={personalInfo}
              setPersonalInfo={handleUpdatePersonalInfo}
              metricsHistory={metricsHistory}
              setMetricsHistory={handleUpdateMetricsHistory}
            />
          )}

          {activeTab === "wellness" && (
            <WellnessTab personalInfo={personalInfo} />
          )}

          {activeTab === "lab-guides" && (
            <LabGuidesTab />
          )}

          {activeTab === "assessment" && (
            <AssessmentForm
              personalInfo={personalInfo}
              setPersonalInfo={handleUpdatePersonalInfo}
              onSubmitSuccess={() => {
                setActiveTab("dashboard");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}
        </main>

      </div>

      {/* Floating Sliding AI Companion Tray */}
      {showChatDrawer && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-slate-950 h-full flex flex-col justify-between border-l border-white/10 text-white relative animate-slide-in">
            <button 
              onClick={() => setShowChatDrawer(false)}
              className="absolute top-3 left-[-45px] bg-slate-950 p-2.5 rounded-l-xl border-l border-t border-b border-white/10 text-slate-400 hover:text-white transition-all shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 p-4 flex flex-col justify-between h-full overflow-hidden">
              <AssistantChat />
            </div>
          </div>
        </div>
      )}

      {/* Universal footer */}
      <footer className="border-t border-white/10 bg-slate-950 mt-12 py-6 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-mono">
          <span>© 2026 HealthVerse AI Simulations. All rights reserved.</span>
          <span className="mt-2 sm:mt-0">Academic & Training Core Edition 2.5</span>
        </div>
      </footer>

    </div>
  );
}
