import React, { useState } from "react";
import { 
  Sparkles, 
  Activity, 
  Trash2, 
  Plus, 
  AlertTriangle, 
  ActivityIcon, 
  Heart, 
  ShieldAlert, 
  CheckCircle,
  HelpCircle,
  ChevronRight,
  Info
} from "lucide-react";
import { PersonalInfo, SymptomState, AIAnalysisResult } from "../types";

interface SymptomCheckerTabProps {
  personalInfo: PersonalInfo;
  onAnalyzeSymptoms: (symptoms: SymptomState[]) => Promise<AIAnalysisResult | null>;
  analysisResult: AIAnalysisResult | null;
  loading: boolean;
}

export default function SymptomCheckerTab({
  personalInfo,
  onAnalyzeSymptoms,
  analysisResult,
  loading
}: SymptomCheckerTabProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomState[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Temp form state for adding a single custom or quick symptom
  const [tempCategory, setTempCategory] = useState("General");
  const [tempSymptom, setTempSymptom] = useState("Fever");
  const [tempSeverity, setTempSeverity] = useState<"mild" | "moderate" | "severe">("moderate");
  const [tempDuration, setTempDuration] = useState(2);

  const symptomCategories = {
    General: ["Fever", "Cold", "Cough", "Headache", "Body Pain", "Fatigue", "Weakness", "Chills", "Vomiting", "Nausea", "Dizziness"],
    Heart: ["Chest Pain", "Palpitations", "High BP", "Low BP", "Irregular Heartbeat"],
    Respiratory: ["Shortness of Breath", "Wheezing", "Chronic Cough", "Sore Throat"],
    Kidney: ["Swelling (Edema)", "Flank Pain", "Burning Urination", "Frequent Urination"],
    Liver: ["Jaundice (Yellow Eyes/Skin)", "Right Upper Abdomen Pain", "Clay-colored Stool"],
    Digestive: ["Gastric Bloating", "Acidity/Heartburn", "Nausea/Vomiting", "Constipation", "Diarrhea", "Severe Stomach Ache"],
    Nervous: ["Migraine Aura", "Numbness/Weakness", "Dizziness/Vertigo", "Tremors", "Loss of Balance"],
    Mental: ["Anxiety & Panic", "Depressed Mood", "Severe Stress", "Insomnia"],
    Bones: ["Joint Pain", "Back Pain", "Stiffness", "Muscle Cramps"],
    Hormones: ["Extreme Thirst", "Frequent Urination", "Rapid Weight Change", "Heat/Cold Intolerance"]
  };

  const handleAddSymptom = (symptomName: string, category: string) => {
    // Check if already exists
    if (selectedSymptoms.some(s => s.name === symptomName)) return;

    const newSymptom: SymptomState = {
      category,
      name: symptomName,
      severity: tempSeverity,
      durationDays: tempDuration
    };

    setSelectedSymptoms([...selectedSymptoms, newSymptom]);
  };

  const handleQuickAdd = (symptomName: string, category: string) => {
    handleAddSymptom(symptomName, category);
  };

  const handleRemoveSymptom = (name: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.name !== name));
  };

  const handleUpdateSymptomSeverity = (name: string, severity: "mild" | "moderate" | "severe") => {
    setSelectedSymptoms(selectedSymptoms.map(s => s.name === name ? { ...s, severity } : s));
  };

  const handleUpdateSymptomDuration = (name: string, durationDays: number) => {
    setSelectedSymptoms(selectedSymptoms.map(s => s.name === name ? { ...s, durationDays } : s));
  };

  const handleAnalyzeClick = () => {
    if (selectedSymptoms.length === 0) return;
    onAnalyzeSymptoms(selectedSymptoms);
  };

  // Filter symptoms based on query
  const getAllSymptomOptions = () => {
    const options: { name: string; category: string }[] = [];
    Object.entries(symptomCategories).forEach(([category, list]) => {
      list.forEach(name => {
        if (name.toLowerCase().includes(searchQuery.toLowerCase())) {
          options.push({ name, category });
        }
      });
    });
    return options;
  };

  const filteredOptions = getAllSymptomOptions();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Input Section: Adding and tracking current symptoms */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-5">
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest font-mono">Clinical AI Symptom Checker</span>
              <h2 className="text-xl font-bold text-white mt-0.5">Symptom Logger</h2>
              <p className="text-xs text-slate-400 mt-1">Add your active symptoms, assign their duration and physiological severity, and let the AI analyze possible underlying conditions.</p>
            </div>

            {/* Quick search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search symptoms (e.g., Fever, Chest Pain...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Render search results or quick category selectors */}
            <div className="max-h-52 overflow-y-auto pr-1 space-y-3 bg-slate-900/40 p-3 rounded-xl border border-white/5">
              {searchQuery ? (
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold font-mono block mb-2">Search Results ({filteredOptions.length})</span>
                  {filteredOptions.length > 0 ? (
                    <div className="grid grid-cols-2 gap-1.5">
                      {filteredOptions.slice(0, 12).map((opt) => (
                        <button
                          key={opt.name}
                          onClick={() => handleQuickAdd(opt.name, opt.category)}
                          className="text-left text-xs bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-300 p-2 rounded-lg border border-transparent hover:border-emerald-500/20 transition-all truncate"
                        >
                          + {opt.name}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 italic block">No symptoms match your search. Try adding a general term.</span>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {Object.entries(symptomCategories).slice(0, 4).map(([category, list]) => (
                    <div key={category}>
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold font-mono block mb-1">{category} Indicators</span>
                      <div className="flex flex-wrap gap-1.5">
                        {list.slice(0, 5).map((s) => (
                          <button
                            key={s}
                            onClick={() => handleQuickAdd(s, category)}
                            className="text-[10px] bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-300 px-2 py-1.5 rounded-lg border border-white/5 transition-all"
                          >
                            + {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Active Sympotms Checklist */}
            <div className="space-y-2.5">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold font-mono block">Logged Symptoms ({selectedSymptoms.length})</span>
              {selectedSymptoms.length > 0 ? (
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {selectedSymptoms.map((sym) => (
                    <div key={sym.name} className="bg-slate-900/50 border border-white/5 rounded-xl p-3 flex flex-col gap-2 relative group">
                      <button 
                        onClick={() => handleRemoveSymptom(sym.name)}
                        className="absolute right-2.5 top-2.5 text-slate-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex justify-between items-start pr-6">
                        <div>
                          <span className="text-xs font-bold text-white block">{sym.name}</span>
                          <span className="text-[9px] text-slate-400 uppercase tracking-wider font-mono">{sym.category}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 border-t border-white/5 pt-2">
                        {/* Severity Toggle */}
                        <div className="flex gap-1">
                          {(["mild", "moderate", "severe"] as const).map((sev) => (
                            <button
                              key={sev}
                              type="button"
                              onClick={() => handleUpdateSymptomSeverity(sym.name, sev)}
                              className={`text-[9px] capitalize px-2 py-0.5 rounded transition-all font-semibold ${
                                sym.severity === sev
                                  ? sev === "severe" ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                    : sev === "moderate" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  : "bg-white/5 text-slate-400 border border-transparent"
                              }`}
                            >
                              {sev}
                            </button>
                          ))}
                        </div>

                        {/* Duration input */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-medium">Duration:</span>
                          <input
                            type="number"
                            min="1"
                            max="30"
                            value={sym.durationDays}
                            onChange={(e) => handleUpdateSymptomDuration(sym.name, Number(e.target.value))}
                            className="bg-slate-950 border border-white/10 rounded px-1.5 py-0.5 text-xs text-white text-center w-10 font-mono"
                          />
                          <span className="text-[10px] text-slate-400 font-medium">days</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-slate-900/20 rounded-xl border border-dashed border-white/5">
                  <span className="text-slate-500 text-xs italic block">No active symptoms added to assessment yet. Click above to add.</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5">
            <button
              onClick={handleAnalyzeClick}
              disabled={selectedSymptoms.length === 0 || loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>AI Modeling Clinical Synthesis...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Request AI Symptom Check</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output Section: Display AI Clinical Summary */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          {analysisResult ? (
            <div className="bg-slate-900/60 border border-emerald-500/20 rounded-2xl p-6 shadow-xl h-full flex flex-col justify-between">
              <div className="space-y-5">
                {/* Header info */}
                <div className="flex justify-between items-start border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase font-mono">HEALTHVERSE AI CLINICAL EVALUATION</span>
                    <h3 className="text-lg font-bold text-white mt-1">Diagnostic Exploration Results</h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                      analysisResult.severityLevel === "Emergency" ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
                      : analysisResult.severityLevel === "Severe" ? "bg-red-950/20 text-red-300 border border-red-500/10"
                      : analysisResult.severityLevel === "Moderate" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    }`}>
                      {analysisResult.severityLevel} Severity
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono mt-1">Confidence: {analysisResult.confidenceScore}%</span>
                  </div>
                </div>

                {/* Patient risk narrative / explanation */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-1.5 font-mono">Symptom Synthesis Narrative</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{analysisResult.explanation}</p>
                </div>

                {/* Ranked possible conditions */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-2 font-mono">Ranked Possible Educational Conditions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {analysisResult.conditions?.map((cond, idx) => (
                      <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-white">{cond.name}</span>
                            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                              cond.likelihood === "High" ? "bg-red-500/10 text-red-400" : cond.likelihood === "Moderate" ? "bg-amber-500/10 text-amber-400" : "bg-sky-500/10 text-sky-400"
                            }`}>{cond.likelihood} Likelihood</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-normal">{cond.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations and emergency warnings tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-bold text-emerald-400 font-mono block">Recommended Clinical Specialty</span>
                      <span className="text-sm font-semibold text-white bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 inline-block mt-1">
                        {analysisResult.medicalSpecialty}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-sky-400 font-mono block mb-1">Safe Home Care & Prevention</span>
                      <ul className="space-y-1">
                        {analysisResult.homeCareSuggestions?.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex gap-1.5 items-start leading-snug">
                            <span className="text-sky-400">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-red-950/10 border border-red-500/20 rounded-xl p-4 space-y-2">
                    <div className="flex gap-2 items-center text-red-400 text-xs font-bold uppercase tracking-wider font-mono">
                      <AlertTriangle className="w-4 h-4" />
                      <span>EMERGENCY RED FLAGS</span>
                    </div>
                    <ul className="space-y-1">
                      {analysisResult.emergencySigns?.slice(0, 3).map((sign, idx) => (
                        <li key={idx} className="text-[11px] text-red-300 flex gap-1.5 items-start leading-snug">
                          <span className="text-red-400">•</span>
                          <span>{sign}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-[10px] text-red-400/80 italic pt-1 font-mono leading-tight">
                      {analysisResult.seekImmediateCare}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lab test requests & questions */}
              <div className="border-t border-white/5 mt-5 pt-4 flex flex-col sm:flex-row gap-4 justify-between text-xs text-slate-400">
                <div>
                  <span className="font-semibold text-white">Suggested Lab Screening:</span>{" "}
                  {analysisResult.recommendedTests?.join(", ") || "CBC, Metabolic panels"}
                </div>
                <div className="italic">
                  Recovery Estimate: {analysisResult.recoveryTimeline || "Dependent on diagnostics"}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[350px]">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-4 shadow-inner text-2xl">
                🩺
              </div>
              <h3 className="text-base font-bold text-white mb-2">Diagnostic Consultation Ready</h3>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-6">
                Log one or more active symptoms on the left to activate the Clinical RAG Modeling network. HealthVerse AI will perform high-integrity diagnostic predictions.
              </p>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 max-w-md">
                <span className="text-[10px] font-bold text-red-400 tracking-wider uppercase font-mono block mb-1">CRITICAL HEALTH NOTICE</span>
                <p className="text-[11px] text-red-300 leading-snug">
                  The artificial intelligence results provided here are for health education purposes only. They do not constitute an actual medical prescription or clinical diagnosis. If you exhibit emergency indicators such as severe chest pain, immediately call local emergency services.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
