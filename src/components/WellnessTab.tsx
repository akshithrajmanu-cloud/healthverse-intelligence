import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Compass, 
  Activity, 
  Heart, 
  Droplet,
  ChevronRight,
  Smile,
  Meh,
  Frown,
  Check
} from "lucide-react";
import { PersonalInfo } from "../types";
import { useAuth } from "../context/AuthContext.tsx";

interface MedicationItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timeOfDay: string;
  takenToday: boolean;
}

interface WellnessTabProps {
  personalInfo: PersonalInfo;
}

export default function WellnessTab({ personalInfo }: WellnessTabProps) {
  const { token } = useAuth();

  // Medications state
  const [medsList, setMedsList] = useState<MedicationItem[]>([
    { id: "1", name: "Atorvastatin", dosage: "10mg", frequency: "Once Daily", timeOfDay: "Night", takenToday: false },
    { id: "2", name: "Metformin", dosage: "500mg", frequency: "Twice Daily", timeOfDay: "Morning / Night", takenToday: true }
  ]);

  // Mood Logging State
  const [activeMood, setActiveMood] = useState<"excellent" | "neutral" | "fatigued" | "stressed">("neutral");

  // Daily Habits checklist
  const [habits, setHabits] = useState([
    { id: "cardio", name: "30-Min Cardio session", completed: true },
    { id: "water", name: "Sufficient Water Intake (>2L)", completed: false },
    { id: "sleep", name: "8 Hours Restoration Sleep", completed: true },
    { id: "meditation", name: "Deep Diaphragmatic Meditation (10m)", completed: false }
  ]);

  // Add Medication state
  const [newMed, setNewMed] = useState({ name: "", dosage: "", frequency: "Once Daily", timeOfDay: "Morning" });

  // Fetch initial data from Cloud SQL if token is present
  useEffect(() => {
    if (!token) return;

    const fetchWellnessData = async () => {
      try {
        // Fetch Medications
        const medsRes = await fetch("/api/user/medications", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (medsRes.ok) {
          const medsData = await medsRes.json();
          if (medsData) {
            setMedsList(medsData.map((m: any) => ({
              id: m.id.toString(),
              name: m.name,
              dosage: m.dosage || "1 Tab",
              frequency: m.frequency || "Once Daily",
              timeOfDay: m.timeOfDay || "Morning",
              takenToday: m.takenToday || false
            })));
          }
        }

        // Fetch Habits
        const habitsRes = await fetch("/api/user/habits", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (habitsRes.ok) {
          const habitsData = await habitsRes.json();
          if (habitsData && habitsData.length > 0) {
            const currentHabits = [
              { id: "cardio", name: "30-Min Cardio session", completed: false },
              { id: "water", name: "Sufficient Water Intake (>2L)", completed: false },
              { id: "sleep", name: "8 Hours Restoration Sleep", completed: false },
              { id: "meditation", name: "Deep Diaphragmatic Meditation (10m)", completed: false }
            ];

            // Merge completed states
            const updated = currentHabits.map(h => {
              const matched = habitsData.find((dbH: any) => dbH.habitId === h.id);
              return matched ? { ...h, completed: matched.completed } : h;
            });
            setHabits(updated);
          }
        }

        // Fetch Mood logs
        const moodRes = await fetch("/api/user/mood-logs", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (moodRes.ok) {
          const moodData = await moodRes.json();
          if (moodData && moodData.length > 0) {
            // Take the latest mood
            const latestMood = moodData[0].mood;
            if (["excellent", "neutral", "fatigued", "stressed"].includes(latestMood)) {
              setActiveMood(latestMood);
            }
          }
        }

      } catch (err) {
        console.error("Error fetching wellness metrics from Cloud SQL:", err);
      }
    };

    fetchWellnessData();
  }, [token]);

  const handleToggleMed = async (id: string) => {
    const matched = medsList.find(m => m.id === id);
    if (!matched) return;
    const nextTaken = !matched.takenToday;

    setMedsList(medsList.map(m => m.id === id ? { ...m, takenToday: nextTaken } : m));

    if (!token) return;
    try {
      await fetch(`/api/user/medications/${id}/adherence`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ adherence: nextTaken })
      });
    } catch (err) {
      console.error("Failed to update medication adherence in secure database:", err);
    }
  };

  const handleAddMedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMed.name) return;

    const medData = {
      name: newMed.name,
      dosage: newMed.dosage || "1 Tab",
      frequency: newMed.frequency,
      timeOfDay: newMed.timeOfDay,
      takenToday: false
    };

    // Optimistic state update
    const tempId = Date.now().toString();
    setMedsList([...medsList, { ...medData, id: tempId }]);
    setNewMed({ name: "", dosage: "", frequency: "Once Daily", timeOfDay: "Morning" });

    if (!token) return;
    try {
      const res = await fetch("/api/user/medications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(medData)
      });
      if (res.ok) {
        const persistedMed = await res.json();
        // Replace tempId with actual DB ID
        setMedsList(prev => prev.map(m => m.id === tempId ? { ...m, id: persistedMed.id.toString() } : m));
      }
    } catch (err) {
      console.error("Failed to persist medication to Cloud SQL:", err);
    }
  };

  const handleRemoveMed = async (id: string) => {
    setMedsList(medsList.filter(m => m.id !== id));

    if (!token) return;
    try {
      await fetch(`/api/user/medications/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Failed to delete medication from Cloud SQL:", err);
    }
  };

  const handleToggleHabit = async (idx: number) => {
    const updated = [...habits];
    updated[idx].completed = !updated[idx].completed;
    setHabits(updated);

    const targetHabit = updated[idx];
    if (!token) return;
    try {
      await fetch("/api/user/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          habitId: targetHabit.id,
          name: targetHabit.name,
          completed: targetHabit.completed,
          currentStreak: targetHabit.completed ? 1 : 0
        })
      });
    } catch (err) {
      console.error("Failed to sync habit completion with secure database:", err);
    }
  };

  const handleMoodSelect = async (mood: "excellent" | "neutral" | "fatigued" | "stressed") => {
    setActiveMood(mood);

    if (!token) return;
    try {
      await fetch("/api/user/mood-logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ mood })
      });
    } catch (err) {
      console.error("Failed to save mood log with Cloud SQL:", err);
    }
  };

  // Check if medications are compliant
  const totalMeds = medsList.length;
  const takenMeds = medsList.filter(m => m.takenToday).length;
  const medCompliancePercent = totalMeds > 0 ? Math.round((takenMeds / totalMeds) * 100) : 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      
      {/* Left panel: Medication Tracking */}
      <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest font-mono">My Daily Pharmacotherapy</span>
              <h3 className="text-xl font-bold text-white mt-0.5">Medication Tracker</h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
              {medCompliancePercent}% Compliant
            </span>
          </div>

          {/* Quick input form */}
          <form onSubmit={handleAddMedSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-slate-900/40 p-3 rounded-xl border border-white/5">
            <input
              type="text"
              placeholder="Drug name (e.g. Aspirin)"
              value={newMed.name}
              onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
              className="sm:col-span-2 bg-slate-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="Dosage (e.g. 50mg)"
              value={newMed.dosage}
              onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
              className="bg-slate-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs py-1.5 transition-colors shadow flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Drug
            </button>
          </form>

          {/* Medications checklist */}
          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {medsList.map((med) => (
              <div 
                key={med.id} 
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  med.takenToday 
                    ? "bg-emerald-950/15 border-emerald-500/20 opacity-80" 
                    : "bg-slate-900/60 border-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => handleToggleMed(med.id)}
                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      med.takenToday 
                        ? "bg-emerald-500 border-emerald-400 text-slate-950" 
                        : "border-white/20 hover:border-emerald-400"
                    }`}
                  >
                    {med.takenToday && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>
                  <div>
                    <span className={`text-xs font-bold block ${med.takenToday ? "text-slate-400 line-through" : "text-white"}`}>{med.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{med.dosage} • {med.frequency} ({med.timeOfDay})</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleRemoveMed(med.id)}
                  className="text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {medsList.length === 0 && (
              <div className="text-center py-10 text-slate-500 italic text-xs">No active medication schedules logged. Enjoy pristine health!</div>
            )}
          </div>
        </div>

        <div className="bg-emerald-950/10 border border-emerald-500/10 rounded-xl p-3 flex gap-2 items-start">
          <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-400 leading-normal">
            To prevent severe pharmacodynamic interactions, make sure your logged prescription list matches real-world clinical advice. Do not skip scheduled doses.
          </p>
        </div>
      </div>

      {/* Right panel: Habits & Mood Check */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        
        {/* Mood Logging */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-mono">Metabolic Mood Analysis</span>
            <h4 className="text-sm font-bold text-white mt-0.5">Subjective Wellness Level</h4>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => handleMoodSelect("excellent")}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                activeMood === "excellent" 
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                  : "bg-transparent border-white/5 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Smile className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] font-semibold">Energetic</span>
            </button>
            <button
              onClick={() => handleMoodSelect("neutral")}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                activeMood === "neutral" 
                  ? "bg-sky-500/10 border-sky-500/30 text-sky-300 shadow-[0_0_10px_rgba(14,165,233,0.1)]"
                  : "bg-transparent border-white/5 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Smile className="w-5 h-5 text-sky-400" />
              <span className="text-[10px] font-semibold">Stable</span>
            </button>
            <button
              onClick={() => handleMoodSelect("fatigued")}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                activeMood === "fatigued" 
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                  : "bg-transparent border-white/5 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Meh className="w-5 h-5 text-amber-400" />
              <span className="text-[10px] font-semibold">Fatigued</span>
            </button>
            <button
              onClick={() => handleMoodSelect("stressed")}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                activeMood === "stressed" 
                  ? "bg-red-500/10 border-red-500/30 text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
                  : "bg-transparent border-white/5 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Frown className="w-5 h-5 text-red-400" />
              <span className="text-[10px] font-semibold">Stressed</span>
            </button>
          </div>
        </div>

        {/* Daily Habits checklist */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4 flex-1">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-mono">Cognitive Habits Checklist</span>
            <h4 className="text-sm font-bold text-white mt-0.5">Behavioral Milestones</h4>
          </div>

          <div className="space-y-2">
            {habits.map((h, i) => (
              <button
                key={i}
                onClick={() => handleToggleHabit(i)}
                className={`w-full text-left p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  h.completed 
                    ? "bg-white/5 border-emerald-500/20 text-slate-400" 
                    : "bg-slate-900/40 border-white/5 text-white hover:bg-white/5"
                }`}
              >
                <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                  h.completed ? "bg-emerald-500/20 border-emerald-400 text-emerald-400" : "border-white/20"
                }`}>
                  {h.completed && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className={`text-xs ${h.completed ? "line-through text-slate-500" : ""}`}>{h.name}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
