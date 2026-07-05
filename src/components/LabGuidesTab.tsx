import React, { useState } from "react";
import { labTestsDb, firstAidDb, LabTestInfo, FirstAidGuide } from "../data/labGuides";
import { 
  Search, 
  Activity, 
  Plus, 
  AlertTriangle, 
  CheckCircle, 
  ShieldAlert, 
  Info,
  ChevronRight,
  HelpCircle,
  FileText,
  Heart
} from "lucide-react";

export default function LabGuidesTab() {
  const [labSearch, setLabSearch] = useState("");
  const [selectedTestId, setSelectedTestId] = useState<string>("cbc-wbc");

  // Lab interpreter states
  const [userLabValue, setUserLabValue] = useState("");
  const [interpretedResult, setInterpretedResult] = useState<{ status: string; remarks: string; severity: "normal" | "warning" | "danger" } | null>(null);

  // Selected First Aid Protocol index
  const [selectedFirstAidIdx, setSelectedFirstAidIdx] = useState(0);

  const activeTest = labTestsDb.find(t => t.id === selectedTestId) || labTestsDb[0];

  const handleInterpret = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(userLabValue);
    if (isNaN(val)) return;

    let status = "Normal Range";
    let remarks = `Your value of ${val} falls within standard homeostatic adult values for this biomarker. Keep up your excellent physical habits!`;
    let severity: "normal" | "warning" | "danger" = "normal";

    // Smart parsing for common tests
    if (activeTest.id === "cbc-wbc") {
      if (val < 4500) {
        status = "Low WBC Level (Leukopenia)";
        remarks = activeTest.meaningLow;
        severity = "warning";
      } else if (val > 11000) {
        status = "Elevated WBC Level (Leukocytosis)";
        remarks = activeTest.meaningHigh;
        severity = "danger";
      }
    } else if (activeTest.id === "hba1c") {
      if (val < 5.7) {
        status = "Normal HbA1c";
        remarks = "Excellent glucose control! Below 5.7% is considered non-diabetic.";
        severity = "normal";
      } else if (val >= 5.7 && val < 6.5) {
        status = "Prediabetes Range";
        remarks = "HbA1c between 5.7% and 6.4% indicates prediabetes. Focus on low glycemic nutrition and active metabolic habits.";
        severity = "warning";
      } else {
        status = "Diabetes Range Indicator";
        remarks = "HbA1c of 6.5% or higher is indicative of active diabetes. Focus on carbohydrate control and consult medical advice.";
        severity = "danger";
      }
    } else if (activeTest.id === "kidney-creatinine") {
      if (val < 0.6) {
        status = "Low Creatinine";
        remarks = activeTest.meaningLow;
        severity = "warning";
      } else if (val > 1.2) {
        status = "Elevated Creatinine";
        remarks = activeTest.meaningHigh;
        severity = "danger";
      }
    } else if (activeTest.id === "liver-alt") {
      if (val > 56) {
        status = "Elevated ALT (Liver Irritation)";
        remarks = activeTest.meaningHigh;
        severity = "danger";
      }
    } else if (activeTest.id === "thyroid-tsh") {
      if (val < 0.4) {
        status = "Low TSH (Hyperthyroidism)";
        remarks = activeTest.meaningLow;
        severity = "warning";
      } else if (val > 4.0) {
        status = "Elevated TSH (Hypothyroidism)";
        remarks = activeTest.meaningHigh;
        severity = "danger";
      }
    } else if (activeTest.id === "lipid-ldl") {
      if (val > 130) {
        status = "Elevated LDL Cholesterol";
        remarks = activeTest.meaningHigh;
        severity = "danger";
      }
    }

    setInterpretedResult({ status, remarks, severity });
  };

  const handleSelectTest = (id: string) => {
    setSelectedTestId(id);
    setUserLabValue("");
    setInterpretedResult(null);
  };

  // Group tests by category
  const categories: { [key: string]: LabTestInfo[] } = {};
  labTestsDb.forEach(t => {
    if (!categories[t.category]) {
      categories[t.category] = [];
    }
    if (t.name.toLowerCase().includes(labSearch.toLowerCase()) || t.category.toLowerCase().includes(labSearch.toLowerCase())) {
      categories[t.category].push(t);
    }
  });

  return (
    <div className="space-y-6">
      
      {/* Upper Grid: Directory Selector and Interactive Interpreter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left 4-Columns: List of Lab Panels */}
        <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest font-mono">Screening Reference Directory</span>
              <h3 className="text-lg font-bold text-white mt-1">Somatic Lab Panels</h3>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search labs (e.g. Cholesterol, WBC...)"
                value={labSearch}
                onChange={(e) => setLabSearch(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[300px] pr-1">
              {Object.entries(categories).map(([category, list]) => {
                if (list.length === 0) return null;
                return (
                  <div key={category} className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold font-mono px-2 block">{category}</span>
                    <div className="space-y-1">
                      {list.map((test) => {
                        const isActive = selectedTestId === test.id;
                        return (
                          <button
                            key={test.id}
                            onClick={() => handleSelectTest(test.id)}
                            className={`w-full text-left text-xs p-2.5 rounded-xl transition-all border flex items-center justify-between ${
                              isActive
                                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                                : "bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/5"
                            }`}
                          >
                            <span className="font-semibold truncate">{test.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 8-Columns: Lab Profile, Ranges, and Active Interpreter */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {activeTest && (
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 shadow-xl flex-1 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">DIAGNOSTIC TEST PROFILE</span>
                    <h3 className="text-xl font-bold text-white mt-1">{activeTest.name}</h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/15 px-2 py-0.5 rounded">
                    Normal: {activeTest.normalRange}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">Clinical Indication</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        This test measures the biological concentration of {activeTest.name.toLowerCase()} inside human somatic fluids. It is classified under {activeTest.category}.
                      </p>
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-xl border border-white/5">
                      <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold font-mono block">Educational Interpretation</span>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">{activeTest.educationalInterpretation}</p>
                    </div>
                  </div>

                  {/* Interactive Lab Value Analyzer Form */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono block">Lab Value Interpreter</span>
                      <p className="text-[11px] text-slate-400 mt-1">Enter your actual level for automated therapeutic indicators.</p>
                      
                      <form onSubmit={handleInterpret} className="flex gap-2 mt-3">
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Enter Lab Value"
                          value={userLabValue}
                          onChange={(e) => setUserLabValue(e.target.value)}
                          className="bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 flex-1 font-mono"
                        />
                        <button
                          type="submit"
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 rounded-lg py-1.5 transition-colors shadow"
                        >
                          Analyze
                        </button>
                      </form>
                    </div>

                    {interpretedResult ? (
                      <div className={`p-3 rounded-lg border text-xs leading-normal ${
                        interpretedResult.severity === "danger" ? "bg-red-500/10 border-red-500/20 text-red-300"
                        : interpretedResult.severity === "warning" ? "bg-amber-500/10 border-amber-500/20 text-amber-300"
                        : "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                      }`}>
                        <span className="font-bold uppercase tracking-wider font-mono block mb-1">{interpretedResult.status}</span>
                        <p className="leading-snug">{interpretedResult.remarks}</p>
                      </div>
                    ) : (
                      <div className="p-3 bg-slate-900/40 rounded-lg border border-dashed border-white/5 space-y-2">
                        <div>
                          <span className="text-[9px] text-red-400 font-bold uppercase tracking-widest block">If Levels are High</span>
                          <p className="text-[10px] text-slate-400 leading-snug">{activeTest.meaningHigh}</p>
                        </div>
                        <div className="border-t border-white/5 pt-1.5">
                          <span className="text-[9px] text-amber-400 font-bold uppercase tracking-widest block">If Levels are Low</span>
                          <p className="text-[10px] text-slate-400 leading-snug">{activeTest.meaningLow}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-emerald-950/10 border border-emerald-500/10 rounded-xl p-3 flex gap-2 items-start text-[11px] text-slate-400">
                <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-normal">
                  Values fluctuate depending on hydration, diet, and clinical reagents. Always verify results with qualified laboratory diagnostics before establishing therapeutic cycles.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Lower Section: Interactive First Aid Protocol Emergency Guide */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/5 pb-4">
          <div>
            <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest font-mono flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Urgent Red Flag Protocol
            </span>
            <h3 className="text-lg font-bold text-white mt-1">Interactive Emergency First-Aid Directory</h3>
            <p className="text-xs text-slate-400 mt-1">Select an incident below for strict, time-critical operational steps.</p>
          </div>

          <div className="flex flex-wrap gap-1.5 max-w-md justify-end">
            {firstAidDb.map((item, idx) => (
              <button
                key={item.title}
                onClick={() => setSelectedFirstAidIdx(idx)}
                className={`text-[11px] px-3 py-1.5 rounded-xl transition-all border font-semibold ${
                  selectedFirstAidIdx === idx
                    ? "bg-red-500/15 text-red-300 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
                    : "bg-slate-900/40 text-slate-400 border-transparent hover:text-slate-200"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Selected First Aid content */}
        {firstAidDb[selectedFirstAidIdx] && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{firstAidDb[selectedFirstAidIdx].icon}</span>
                  <h4 className="text-sm font-bold text-white">{firstAidDb[selectedFirstAidIdx].title} Action</h4>
                </div>
                <div className="space-y-2 mt-2">
                  <span className="text-[9px] uppercase tracking-wider text-red-400 font-bold font-mono">RED FLAGS</span>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    {firstAidDb[selectedFirstAidIdx].redFlags}
                  </p>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-[11px] text-red-300 mt-4 leading-normal font-medium">
                ⚠️ ALWAYS CALL EMERGENCY SERVICES PRIOR TO FIRST-AID INITIATION.
              </div>
            </div>

            <div className="md:col-span-2 bg-slate-900/40 p-5 rounded-xl border border-white/5 space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold font-mono block">STRICT STEP-BY-STEP EMERGENCY FLOW</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {firstAidDb[selectedFirstAidIdx].steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-white/5 flex gap-3 items-start">
                    <span className="text-red-400 font-bold font-mono text-sm">0{idx+1}.</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
