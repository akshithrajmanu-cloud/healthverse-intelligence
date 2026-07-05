import React, { useState } from "react";
import { 
  Heart, 
  Activity, 
  TrendingUp, 
  Droplet, 
  Moon, 
  AlertTriangle, 
  ChevronRight, 
  Plus, 
  Trash2,
  Calendar,
  Sparkles,
  Award
} from "lucide-react";
import { PersonalInfo, HealthMetricLog } from "../types";

interface DashboardTabProps {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  metricsHistory: HealthMetricLog[];
  setMetricsHistory: React.Dispatch<React.SetStateAction<HealthMetricLog[]>>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRequestReport: () => void;
  reportData: any;
  loadingReport: boolean;
}

export default function DashboardTab({
  personalInfo,
  setPersonalInfo,
  metricsHistory,
  setMetricsHistory,
  activeTab,
  setActiveTab,
  onRequestReport,
  reportData,
  loadingReport
}: DashboardTabProps) {
  const [activeMetric, setActiveMetric] = useState<keyof HealthMetricLog>("heartRate");
  
  // Dialog state for adding a metric log
  const [showAddLog, setShowAddLog] = useState(false);
  const [newLog, setNewLog] = useState<Partial<HealthMetricLog>>({
    heartRate: 72,
    bpSystolic: 120,
    bpDiastolic: 80,
    bloodSugar: 95,
    weight: personalInfo.weight || 70,
    waterIntake: 1500,
    sleepHours: 8,
    stressLevel: 4,
    caloriesBurned: 350,
    caloriesConsumed: 2100,
    symptomsCount: 0
  });

  const latestLog = metricsHistory[metricsHistory.length - 1] || {
    heartRate: 72,
    bpSystolic: 120,
    bpDiastolic: 80,
    bloodSugar: 95,
    weight: personalInfo.weight || 70,
    waterIntake: 1500,
    sleepHours: 8,
    stressLevel: 3,
    caloriesBurned: 350,
    caloriesConsumed: 2000,
    symptomsCount: 0,
    date: new Date().toLocaleDateString()
  };

  // Compute calculated metrics
  const bmi = personalInfo.height > 0 ? (personalInfo.weight / ((personalInfo.height / 100) ** 2)) : 0;
  
  // Calculate dynamic health score
  const calculateHealthScore = () => {
    let score = 75; // Baseline
    
    // Weight / BMI contribution
    if (bmi >= 18.5 && bmi < 25) score += 8;
    else if (bmi >= 25 && bmi < 30) score += 3;
    else score -= 2;

    // Lifestyle contribution
    if (personalInfo.lifestyle === "active") score += 6;
    else if (personalInfo.lifestyle === "moderate") score += 3;

    // Habits
    if (personalInfo.smoking === "non-smoker") score += 6;
    else if (personalInfo.smoking === "heavy") score -= 8;

    if (personalInfo.alcohol === "none") score += 4;
    else if (personalInfo.alcohol === "regular") score -= 5;

    // Water Intake
    if (latestLog.waterIntake >= 2000) score += 4;
    else if (latestLog.waterIntake < 1000) score -= 3;

    // Sleep
    if (latestLog.sleepHours >= 7 && latestLog.sleepHours <= 9) score += 6;
    else score -= 4;

    // Stress
    if (latestLog.stressLevel <= 3) score += 5;
    else if (latestLog.stressLevel >= 7) score -= 6;

    // Normalize
    return Math.max(10, Math.min(100, score));
  };

  const healthScore = calculateHealthScore();

  const handleAddLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dateStr = new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const fullLog: HealthMetricLog = {
      date: dateStr,
      heartRate: Number(newLog.heartRate) || 72,
      bpSystolic: Number(newLog.bpSystolic) || 120,
      bpDiastolic: Number(newLog.bpDiastolic) || 80,
      bloodSugar: Number(newLog.bloodSugar) || 95,
      weight: Number(newLog.weight) || personalInfo.weight || 70,
      waterIntake: Number(newLog.waterIntake) || 1500,
      sleepHours: Number(newLog.sleepHours) || 8,
      stressLevel: Number(newLog.stressLevel) || 4,
      caloriesBurned: Number(newLog.caloriesBurned) || 300,
      caloriesConsumed: Number(newLog.caloriesConsumed) || 2000,
      symptomsCount: Number(newLog.symptomsCount) || 0,
    };

    setMetricsHistory([...metricsHistory, fullLog]);
    
    // Also update personal weight if changed
    if (fullLog.weight !== personalInfo.weight) {
      setPersonalInfo({ ...personalInfo, weight: fullLog.weight });
    }

    setShowAddLog(false);
  };

  // Health assessment questions completion checker
  const completedFieldsCount = () => {
    let count = 0;
    if (personalInfo.name) count++;
    if (personalInfo.age) count++;
    if (personalInfo.gender) count++;
    if (personalInfo.height) count++;
    if (personalInfo.weight) count++;
    if (personalInfo.bloodGroup) count++;
    if (personalInfo.country) count++;
    if (personalInfo.occupation) count++;
    if (personalInfo.lifestyle) count++;
    if (personalInfo.smoking) count++;
    if (personalInfo.alcohol) count++;
    return count;
  };

  // Define metric attributes
  const metricConfigs: { [key in keyof HealthMetricLog]?: { label: string; unit: string; color: string; maxVal: number } } = {
    heartRate: { label: "Heart Rate", unit: "bpm", color: "rgb(239, 68, 68)", maxVal: 150 },
    bpSystolic: { label: "Systolic BP", unit: "mmHg", color: "rgb(59, 130, 246)", maxVal: 200 },
    bpDiastolic: { label: "Diastolic BP", unit: "mmHg", color: "rgb(96, 165, 250)", maxVal: 120 },
    bloodSugar: { label: "Blood Sugar", unit: "mg/dL", color: "rgb(168, 85, 247)", maxVal: 250 },
    weight: { label: "Body Weight", unit: "kg", color: "rgb(16, 185, 129)", maxVal: 150 },
    waterIntake: { label: "Water Intake", unit: "ml", color: "rgb(14, 165, 233)", maxVal: 4000 },
    sleepHours: { label: "Sleep Duration", unit: "hrs", color: "rgb(249, 115, 22)", maxVal: 12 },
    stressLevel: { label: "Stress Level", unit: "/10", color: "rgb(236, 72, 153)", maxVal: 10 },
    caloriesBurned: { label: "Active Calories", unit: "kcal", color: "rgb(234, 179, 8)", maxVal: 1200 },
    caloriesConsumed: { label: "Calorie Intake", unit: "kcal", color: "rgb(99, 102, 241)", maxVal: 4000 }
  };

  // Generate glowing SVG chart lines
  const renderTrendChart = () => {
    const config = metricConfigs[activeMetric];
    if (!config) return null;

    const data = metricsHistory;
    if (data.length === 0) return <div className="text-slate-400 text-xs text-center py-10">No metric logs registered yet.</div>;

    const height = 160;
    const width = 500;
    const padding = 25;

    const maxVal = Math.max(...data.map(d => Number(d[activeMetric]) || 0), 10) * 1.15;
    const minVal = Math.min(...data.map(d => Number(d[activeMetric]) || 0), 0) * 0.85;
    const valRange = maxVal - minVal;

    const points = data.map((d, index) => {
      const x = padding + (index / Math.max(data.length - 1, 1)) * (width - padding * 2);
      const val = Number(d[activeMetric]) || 0;
      const y = height - padding - ((val - minVal) / (valRange || 1)) * (height - padding * 2);
      return { x, y, label: d.date, val };
    });

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaD = points.length > 0 ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z` : '';

    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Current Analytics Focus</span>
            <h3 className="text-lg font-semibold text-white">{config.label} Trend</h3>
          </div>
          <div className="flex flex-wrap gap-1.5 max-w-sm justify-end">
            {(Object.keys(metricConfigs) as Array<keyof HealthMetricLog>).map((key) => (
              <button
                key={key}
                onClick={() => setActiveMetric(key)}
                className={`text-[10px] px-2 py-1 rounded-md transition-all font-medium ${
                  activeMetric === key 
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                    : "bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10 border border-transparent"
                }`}
              >
                {metricConfigs[key]?.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative bg-slate-900/40 rounded-2xl p-4 border border-white/5 shadow-inner">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
            <defs>
              <linearGradient id={`grad-${activeMetric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={config.color} stopOpacity="0.25"/>
                <stop offset="100%" stopColor={config.color} stopOpacity="0.0"/>
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(255,255,255,0.03)" strokeDasharray="3" />
            <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="rgba(255,255,255,0.03)" strokeDasharray="3" />
            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.05)" />

            {/* Area path */}
            {points.length > 1 && (
              <path d={areaD} fill={`url(#grad-${activeMetric})`} />
            )}

            {/* Line path */}
            {points.length > 1 && (
              <path d={pathD} fill="none" stroke={config.color} strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
            )}

            {/* Interactive Circles / Tooltip highlights */}
            {points.map((p, i) => (
              <g key={i} className="group cursor-pointer">
                <circle cx={p.x} cy={p.y} r="4" fill={config.color} stroke="#020617" strokeWidth="2" />
                <circle cx={p.x} cy={p.y} r="8" fill={config.color} className="opacity-0 group-hover:opacity-20 transition-all scale-150" />
                
                {/* Micro-Tooltip on hover */}
                <text x={p.x} y={p.y - 10} textAnchor="middle" fill="#f8fafc" fontSize="9" fontWeight="600" className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 p-1 rounded font-mono">
                  {p.val}
                </text>
              </g>
            ))}

            {/* X Axis Labels */}
            {points.map((p, i) => {
              // Only render some labels to avoid overlapping
              if (points.length > 6 && i % 2 !== 0 && i !== points.length - 1) return null;
              return (
                <text key={i} x={p.x} y={height - 8} textAnchor="middle" fill="rgb(148, 163, 184)" fontSize="8" fontWeight="500" className="font-mono">
                  {p.label}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Risk Alert / Emergency Banner */}
      <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Daily Wellness Guideline</h4>
            <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
              Based on your age of <span className="text-emerald-300 font-medium">{personalInfo.age || "28"}</span> and active lifestyle metrics, you are keeping a highly optimized metabolic pace. Make sure to complete your profile for deep clinical risks.
            </p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button 
            onClick={() => setActiveTab("assessment")}
            className="text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"
          >
            {completedFieldsCount() === 11 ? "Update Health Profile" : "Complete Profile"}
          </button>
          <button 
            onClick={onRequestReport}
            disabled={loadingReport}
            className="text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-3 py-1.5 rounded-lg transition-all shadow-md shadow-emerald-950/20 flex items-center gap-1.5 disabled:opacity-50"
          >
            {loadingReport ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : <Award className="w-3.5 h-3.5" />}
            Generate Intelligence Report
          </button>
        </div>
      </div>

      {/* Main Stats Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Circular score & health vitals summaries */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 font-mono">My Global Health Score</h3>
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="absolute w-full h-full transform -rotate-90">
                  <circle cx="72" cy="72" r="64" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
                  <circle 
                    cx="72" 
                    cy="72" 
                    r="64" 
                    fill="none" 
                    stroke="url(#score-grad)" 
                    strokeWidth="8" 
                    strokeDasharray="402" 
                    strokeDashoffset={402 - (402 * healthScore) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="score-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-white tracking-tight">{healthScore}</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono mt-0.5">WELLNESS</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-center text-slate-300 font-medium">
                {healthScore >= 85 ? (
                  <span className="text-emerald-400">Excellent Physiological Balance</span>
                ) : healthScore >= 70 ? (
                  <span className="text-sky-400">Optimal (Up 2.5% from last log)</span>
                ) : (
                  <span className="text-amber-400">Needs Minor Support</span>
                )}
              </p>
            </div>
          </div>

          <div className="border-t border-white/5 mt-4 pt-4 space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Body Mass Index (BMI)</span>
              <span className="font-mono text-white font-semibold">
                {bmi > 0 ? `${bmi.toFixed(1)} (${bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese"})` : "N/A"}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Active Habits Tracking</span>
              <span className="text-emerald-400 font-semibold font-mono">85% Compliant</span>
            </div>
          </div>
        </div>

        {/* Middle and Right: Vitals grids */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:bg-white/10 transition-all group">
              <div className="flex justify-between items-start">
                <span className="text-xs text-slate-400 font-medium">Heart Pulse</span>
                <Heart className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-white font-mono">{latestLog.heartRate} <span className="text-xs font-normal text-slate-500">bpm</span></div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">Resting: Stable</div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:bg-white/10 transition-all group">
              <div className="flex justify-between items-start">
                <span className="text-xs text-slate-400 font-medium">Blood Pressure</span>
                <Activity className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-white font-mono">{latestLog.bpSystolic}/{latestLog.bpDiastolic} <span className="text-xs font-normal text-slate-500">mmHg</span></div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">Prehypertension: Nil</div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:bg-white/10 transition-all group">
              <div className="flex justify-between items-start">
                <span className="text-xs text-slate-400 font-medium">Glycemia</span>
                <TrendingUp className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-white font-mono">{latestLog.bloodSugar} <span className="text-xs font-normal text-slate-500">mg/dL</span></div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">Fasting Sugar</div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:bg-white/10 transition-all group">
              <div className="flex justify-between items-start">
                <span className="text-xs text-slate-400 font-medium">Hydration Status</span>
                <Droplet className="w-4 h-4 text-sky-300 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-white font-mono">{latestLog.waterIntake} <span className="text-xs font-normal text-slate-500">ml</span></div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">Target: 3,000ml</div>
              </div>
            </div>
          </div>

          {/* Glowing Area Trend Chart */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-sm">
            {renderTrendChart()}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5">
              <p className="text-xs text-slate-400">
                Visualizing <span className="text-white font-semibold font-mono">{metricsHistory.length} longitudinal records</span>.
              </p>
              <button
                onClick={() => setShowAddLog(true)}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5"
              >
                <Plus className="w-3.5 h-3.5" /> Log Daily Vitals
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Report Assessment details if downloaded */}
      {reportData && (
        <div className="bg-slate-900/60 border border-emerald-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase font-mono">HEALTHVERSE AI HEALTH INTELLIGENCE REPORT</span>
              <h3 className="text-lg font-bold text-white mt-1">Summary for {personalInfo.name || "User"}</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Report Reference: #{reportData.reportId || "HV-9038"}</span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
            &ldquo;{reportData.overallAssessment}&rdquo;
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-3 font-mono">Organ System Metrics</h4>
              <div className="space-y-3">
                {reportData.organHealthAnalysis?.map((organ: any, idx: number) => (
                  <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-white">{organ.organ}</span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        organ.score >= 85 ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                      }`}>{organ.score}% - {organ.status}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{organ.remarks}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-3 font-mono">Identified Biological Risks</h4>
                <ul className="space-y-2">
                  {reportData.potentialRisks?.map((risk: string, i: number) => (
                    <li key={i} className="flex gap-2 items-start text-xs text-slate-300 bg-red-950/10 p-2 rounded-lg border border-red-500/10">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-3 font-mono">Actionable Habits Checklist</h4>
                <ul className="space-y-2">
                  {reportData.followupChecklist?.map((item: string, i: number) => (
                    <li key={i} className="flex gap-2.5 items-start text-xs text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Log Dialog Modal */}
      {showAddLog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-950 border border-white/10 rounded-2xl w-full max-w-lg p-6 text-white shadow-2xl relative">
            <h3 className="text-lg font-bold mb-1">Log Daily Physiological Metrics</h3>
            <p className="text-xs text-slate-400 mb-6">Manually input raw clinical levels for instant dashboard charting.</p>
            
            <form onSubmit={handleAddLogSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Heart Pulse (bpm)</label>
                  <input
                    type="number"
                    value={newLog.heartRate}
                    onChange={(e) => setNewLog({ ...newLog, heartRate: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                    placeholder="72"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Blood Sugar (mg/dL)</label>
                  <input
                    type="number"
                    value={newLog.bloodSugar}
                    onChange={(e) => setNewLog({ ...newLog, bloodSugar: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                    placeholder="95"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">BP Systolic (mmHg)</label>
                  <input
                    type="number"
                    value={newLog.bpSystolic}
                    onChange={(e) => setNewLog({ ...newLog, bpSystolic: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                    placeholder="120"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">BP Diastolic (mmHg)</label>
                  <input
                    type="number"
                    value={newLog.bpDiastolic}
                    onChange={(e) => setNewLog({ ...newLog, bpDiastolic: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                    placeholder="80"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Water Intake (ml)</label>
                  <input
                    type="number"
                    value={newLog.waterIntake}
                    onChange={(e) => setNewLog({ ...newLog, waterIntake: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                    placeholder="2000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Sleep Duration (hrs)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newLog.sleepHours}
                    onChange={(e) => setNewLog({ ...newLog, sleepHours: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                    placeholder="8"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Weight Progress (kg)</label>
                  <input
                    type="number"
                    value={newLog.weight}
                    onChange={(e) => setNewLog({ ...newLog, weight: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                    placeholder="70"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Stress Level (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newLog.stressLevel}
                    onChange={(e) => setNewLog({ ...newLog, stressLevel: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                    placeholder="4"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddLog(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md shadow-emerald-950/30"
                >
                  Save Log Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
