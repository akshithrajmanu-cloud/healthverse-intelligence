import React, { useState } from "react";
import { anatomyData, OrganDetail } from "../data/anatomyData";
import { Sparkles, Heart, Activity, ActivityIcon, Plus, Info, ShieldAlert, BookOpen } from "lucide-react";

export default function BodyExplorerTab() {
  const [selectedOrganKey, setSelectedOrganKey] = useState<string>("brain");
  const organDetails: OrganDetail = anatomyData[selectedOrganKey] || anatomyData.brain;

  const organsList = [
    { key: "brain", label: "Brain & Nervous System", icon: "🧠", color: "bg-purple-500" },
    { key: "heart", label: "Heart & Circulation", icon: "❤️", color: "bg-red-500" },
    { key: "lungs", label: "Lungs & Respiration", icon: "🫁", color: "bg-sky-500" },
    { key: "liver", label: "Liver & Metabolism", icon: "🪵", color: "bg-amber-600" },
    { key: "kidneys", label: "Kidneys & Excretion", icon: "🍒", color: "bg-emerald-500" },
    { key: "pancreas", label: "Pancreas & Hormones", icon: "🥞", color: "bg-yellow-500" },
    { key: "digestive", label: "Digestive Tract", icon: "🥣", color: "bg-teal-500" },
    { key: "blood_vessels", label: "Blood Vessel Network", icon: "🩸", color: "bg-rose-600" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-stretch">
      
      {/* 3D-Like Anatomy Schematic Canvas */}
      <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-between relative min-h-[450px]">
        <div className="w-full text-left">
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest font-mono">Anatomical Human Explorer</span>
          <h2 className="text-xl font-bold text-white mt-1">Somatic Organ Map</h2>
          <p className="text-xs text-slate-400 mt-1">Select an organ hotspot or list node to query medical structures.</p>
        </div>

        {/* Dynamic Interactive SVG Human Body Outline */}
        <div className="relative w-full max-w-xs flex-1 flex items-center justify-center my-6">
          <svg viewBox="0 0 200 400" className="h-[320px] text-slate-800 drop-shadow-[0_0_20px_rgba(255,255,255,0.02)]">
            {/* Outline body shape */}
            <path 
              fill="rgba(255, 255, 255, 0.03)" 
              stroke="rgba(255, 255, 255, 0.15)" 
              strokeWidth="2"
              d="M100,20 C112,20 122,30 122,45 C122,60 112,70 100,70 C88,70 78,60 78,45 C78,30 88,20 100,20 M100,75 C130,75 145,95 145,130 L145,200 L130,200 L130,380 L112,380 L112,240 L88,240 L88,380 L70,380 L70,200 L55,200 L55,130 C55,95 70,75 100,75" 
            />

            {/* Organ Hotspots with glows */}
            {/* Brain */}
            <g onClick={() => setSelectedOrganKey("brain")} className="cursor-pointer group">
              <circle cx="100" cy="45" r={selectedOrganKey === "brain" ? "12" : "8"} className="fill-purple-500/20 stroke-purple-400 stroke-2 transition-all duration-300 group-hover:scale-125" />
              <circle cx="100" cy="45" r="4" className="fill-purple-400" />
              <text x="100" y="48" fontSize="6" textAnchor="middle" className="fill-white pointer-events-none opacity-0 group-hover:opacity-100 font-mono">BRAIN</text>
            </g>

            {/* Heart */}
            <g onClick={() => setSelectedOrganKey("heart")} className="cursor-pointer group">
              <circle cx="97" cy="115" r={selectedOrganKey === "heart" ? "12" : "8"} className="fill-red-500/20 stroke-red-400 stroke-2 transition-all duration-300 group-hover:scale-125" />
              <circle cx="97" cy="115" r="4" className="fill-red-400" />
            </g>

            {/* Lungs */}
            <g onClick={() => setSelectedOrganKey("lungs")} className="cursor-pointer group">
              <ellipse cx="108" cy="120" rx={selectedOrganKey === "lungs" ? "10" : "7"} ry={selectedOrganKey === "lungs" ? "12" : "9"} className="fill-sky-500/20 stroke-sky-400 stroke-2 transition-all duration-300 group-hover:scale-125" />
              <circle cx="112" cy="120" r="3" className="fill-sky-400" />
            </g>

            {/* Liver */}
            <g onClick={() => setSelectedOrganKey("liver")} className="cursor-pointer group">
              <path d="M 85 142 L 100 142 L 95 152 Z" className="fill-amber-500/20 stroke-amber-400 stroke-2 cursor-pointer transition-all duration-300 group-hover:scale-125" />
              <circle cx="92" cy="144" r={selectedOrganKey === "liver" ? "10" : "7"} className="fill-amber-500/10 stroke-amber-500/40" />
              <circle cx="92" cy="144" r="3" className="fill-amber-500" />
            </g>

            {/* Pancreas */}
            <g onClick={() => setSelectedOrganKey("pancreas")} className="cursor-pointer group">
              <circle cx="100" cy="155" r={selectedOrganKey === "pancreas" ? "10" : "7"} className="fill-yellow-500/20 stroke-yellow-400 stroke-2 transition-all duration-300 group-hover:scale-125" />
              <circle cx="100" cy="155" r="3" className="fill-yellow-400" />
            </g>

            {/* Digestive */}
            <g onClick={() => setSelectedOrganKey("digestive")} className="cursor-pointer group">
              <circle cx="100" cy="178" r={selectedOrganKey === "digestive" ? "14" : "10"} className="fill-teal-500/20 stroke-teal-400 stroke-2 transition-all duration-300 group-hover:scale-125" />
              <circle cx="100" cy="178" r="4" className="fill-teal-400" />
            </g>

            {/* Kidneys */}
            <g onClick={() => setSelectedOrganKey("kidneys")} className="cursor-pointer group">
              <circle cx="88" cy="165" r={selectedOrganKey === "kidneys" ? "10" : "7"} className="fill-emerald-500/20 stroke-emerald-400 stroke-2 transition-all duration-300 group-hover:scale-125" />
              <circle cx="112" cy="165" r={selectedOrganKey === "kidneys" ? "10" : "7"} className="fill-emerald-500/20 stroke-emerald-400 stroke-2 transition-all duration-300 group-hover:scale-125" />
              <circle cx="88" cy="165" r="3" className="fill-emerald-400" />
              <circle cx="112" cy="165" r="3" className="fill-emerald-400" />
            </g>

            {/* Blood vessels */}
            <g onClick={() => setSelectedOrganKey("blood_vessels")} className="cursor-pointer group">
              {/* Lines running down limbs */}
              <line x1="70" y1="200" x2="70" y2="350" stroke="rgba(244,63,94,0.3)" strokeWidth="1.5" />
              <line x1="130" y1="200" x2="130" y2="350" stroke="rgba(244,63,94,0.3)" strokeWidth="1.5" />
              <circle cx="130" cy="270" r={selectedOrganKey === "blood_vessels" ? "10" : "6"} className="fill-rose-500/20 stroke-rose-400 stroke-2 transition-all" />
              <circle cx="130" cy="270" r="3" className="fill-rose-400" />
            </g>
          </svg>

          {/* Floating tags */}
          <div className="absolute top-2 right-2 flex flex-col items-end gap-1.5 font-mono text-[9px] text-slate-500">
            <span className="bg-white/5 px-1.5 py-0.5 rounded text-emerald-400 border border-emerald-500/10">Interactive Nodes Online</span>
            <span>Scale: 1 : 1 Somatic</span>
          </div>
        </div>

        {/* List Selector buttons */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-2">
          {organsList.map((organ) => (
            <button
              key={organ.key}
              onClick={() => setSelectedOrganKey(organ.key)}
              className={`flex items-center gap-2 text-[11px] font-medium p-2 rounded-xl transition-all border ${
                selectedOrganKey === organ.key
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                  : "bg-white/5 text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/10"
              }`}
            >
              <span>{organ.icon}</span>
              <span className="truncate">{organ.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Somatic Organ Details Panel */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* Anatomy Description Box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3.5 border-b border-white/5 pb-4 mb-4">
              <div className="text-3xl bg-slate-900 p-3 rounded-2xl border border-white/5">
                {organDetails.icon}
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">SELECTED STRUCTURE</span>
                <h3 className="text-xl font-bold text-white">{organDetails.name}</h3>
              </div>
            </div>

            {/* Core anatomical profile */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5 font-mono">Anatomical Overview</h4>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">{organDetails.anatomy}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5 font-mono">Primary Physiological Functions</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {organDetails.functions.map((func, i) => (
                    <li key={i} className="flex gap-2 items-start bg-slate-900/30 p-2 rounded-lg border border-white/5">
                      <span className="text-emerald-400 font-bold font-mono">0{i+1}.</span>
                      <span>{func}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-emerald-950/10 border border-emerald-500/10 rounded-xl p-3 flex gap-2.5 items-start mt-4">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-400 leading-normal">
              Physiological structures displayed above provide standard anatomical references. Blockages or dysfunction trigger clear pathological symptoms visible in the adjacent grids.
            </p>
          </div>
        </div>

        {/* Pathology & Management grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3 font-mono">Associated Diseases & Symptoms</h4>
            <div className="space-y-3">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold font-mono">Typical Conditions</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {organDetails.diseases.map((d, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 bg-red-950/10 text-red-300 rounded border border-red-500/10 font-medium">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/5 pt-2">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold font-mono">Associated Symptoms</span>
                <ul className="space-y-1.5 mt-1.5">
                  {organDetails.symptoms.map((s, i) => (
                    <li key={i} className="text-xs text-slate-300 flex gap-2 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></div>
                      <span className="truncate">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3 font-mono">Therapy Classes & Prevention</h4>
            <div className="space-y-3">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold font-mono">General Therapy Actions</span>
                <ul className="space-y-1 mt-1">
                  {organDetails.treatments.map((t, i) => (
                    <li key={i} className="text-xs text-slate-300 flex gap-2 items-start leading-snug">
                      <span className="text-sky-400 font-mono">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-white/5 pt-2">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold font-mono">Evidence-Based Prevention</span>
                <ul className="space-y-1 mt-1">
                  {organDetails.prevention.map((p, i) => (
                    <li key={i} className="text-xs text-slate-300 flex gap-2 items-start leading-snug">
                      <span className="text-emerald-400 font-mono">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
