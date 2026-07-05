import React from "react";
import { PersonalInfo } from "../types";
import { CheckCircle, Info, Sparkles, User, Settings, Shield } from "lucide-react";

interface AssessmentFormProps {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  onSubmitSuccess: () => void;
}

export default function AssessmentForm({
  personalInfo,
  setPersonalInfo,
  onSubmitSuccess
}: AssessmentFormProps) {

  const handleInputChange = (key: keyof PersonalInfo, value: any) => {
    setPersonalInfo(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSuccess();
  };

  return (
    <div className="max-w-3xl mx-auto bg-slate-900/40 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="flex items-center gap-3 border-b border-white/5 pb-5 mb-6">
        <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center">
          <User className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest font-mono">Personal Wellness Setup</span>
          <h2 className="text-xl font-bold text-white mt-0.5">Somatic Health Questionnaire</h2>
          <p className="text-xs text-slate-400 mt-1">Configure your physical traits, habits, and clinical risks for tailored AI modeling outputs.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Somatic / General demographics */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono border-b border-white/5 pb-1">01. Demographics & Traits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase font-mono">Full Name</label>
              <input
                type="text"
                value={personalInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="E.g. Dr. Raghav"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase font-mono">Age (Years)</label>
              <input
                type="number"
                min="1"
                max="120"
                value={personalInfo.age || ""}
                onChange={(e) => handleInputChange("age", Number(e.target.value))}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                placeholder="28"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase font-mono">Biological Gender</label>
              <select
                value={personalInfo.gender}
                onChange={(e) => handleInputChange("gender", e.target.value as any)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase font-mono">Height (cm)</label>
              <input
                type="number"
                value={personalInfo.height || ""}
                onChange={(e) => handleInputChange("height", Number(e.target.value))}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                placeholder="175"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase font-mono">Weight (kg)</label>
              <input
                type="number"
                value={personalInfo.weight || ""}
                onChange={(e) => handleInputChange("weight", Number(e.target.value))}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                placeholder="70"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase font-mono">Blood Group</label>
              <select
                value={personalInfo.bloodGroup}
                onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
              >
                <option value="O+">O Pos (O+)</option>
                <option value="O-">O Neg (O-)</option>
                <option value="A+">A Pos (A+)</option>
                <option value="A-">A Neg (A-)</option>
                <option value="B+">B Pos (B+)</option>
                <option value="B-">B Neg (B-)</option>
                <option value="AB+">AB Pos (AB+)</option>
                <option value="AB-">AB Neg (AB-)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase font-mono">Country of Residence</label>
              <input
                type="text"
                value={personalInfo.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="India"
              />
            </div>
          </div>
        </div>

        {/* Chronic Conditions & Lifestyle Habits */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono border-b border-white/5 pb-1">02. Chronic Diagnostics & Habits</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase font-mono">Pre-existing Medical Issues</label>
              <input
                type="text"
                value={personalInfo.chronicConditions}
                onChange={(e) => handleInputChange("chronicConditions", e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="E.g. Type 2 Diabetes, Mild Hypertension, Asthma"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase font-mono">Occupation / Job Strain</label>
              <input
                type="text"
                value={personalInfo.occupation}
                onChange={(e) => handleInputChange("occupation", e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="E.g. Software Engineer, Teacher"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase font-mono">Activity Strain Level</label>
              <select
                value={personalInfo.lifestyle}
                onChange={(e) => handleInputChange("lifestyle", e.target.value as any)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
              >
                <option value="sedentary">Sedentary (No Exercise)</option>
                <option value="moderate">Moderate (1-3 times weekly)</option>
                <option value="active">Active Athletics (Daily)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase font-mono">Smoking Profile</label>
              <select
                value={personalInfo.smoking}
                onChange={(e) => handleInputChange("smoking", e.target.value as any)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
              >
                <option value="non-smoker">Non-smoker</option>
                <option value="moderate">Moderate Smoker</option>
                <option value="heavy">Heavy Smoker</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase font-mono">Alcohol Frequency</label>
              <select
                value={personalInfo.alcohol}
                onChange={(e) => handleInputChange("alcohol", e.target.value as any)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
              >
                <option value="none">No Alcohol (Abstinent)</option>
                <option value="occasional">Occasional Drinker</option>
                <option value="regular">Regular Drinker</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-emerald-950/15 border border-emerald-500/20 rounded-xl p-4 flex gap-3 items-start text-xs text-slate-300">
          <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block">Medical Data Security & HIPAA Standards</span>
            <p className="leading-snug text-slate-400 mt-1">
              Your logged demographics, somatic metrics, and vitals are kept entirely within secure, client-side session memories. No diagnostic data is logged persistently to static servers.
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs tracking-wider uppercase transition-all shadow-md shadow-emerald-950/30 flex items-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" /> Save Profile Configurations
          </button>
        </div>

      </form>
    </div>
  );
}
