import React, { useState } from "react";
import { PersonalInfo, HealthMetricLog } from "../types";
import { 
  Apple, 
  Dumbbell, 
  Droplet, 
  Plus, 
  Check, 
  Sparkles, 
  AlertCircle, 
  TrendingUp, 
  Compass, 
  Calculator,
  ChevronRight,
  ChevronDown
} from "lucide-react";

interface NutritionTabProps {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  metricsHistory: HealthMetricLog[];
  setMetricsHistory: React.Dispatch<React.SetStateAction<HealthMetricLog[]>>;
}

export default function NutritionTab({
  personalInfo,
  setPersonalInfo,
  metricsHistory,
  setMetricsHistory
}: NutritionTabProps) {
  const latestLog = metricsHistory[metricsHistory.length - 1] || {
    caloriesConsumed: 2000,
    caloriesBurned: 350,
    waterIntake: 1500,
    weight: personalInfo.weight || 70,
  };

  // State for nutrition inputs
  const [mealInput, setMealInput] = useState({ name: "", calories: 350, protein: 20, carbs: 40, fat: 10 });
  const [exerciseInput, setExerciseInput] = useState({ name: "", calories: 250, duration: 30 });
  const [loggedMeals, setLoggedMeals] = useState([
    { name: "Avocado Toast & Eggs", calories: 420, protein: 18, carbs: 35, fat: 15 },
    { name: "Grilled Salmon & Quinoa", calories: 550, protein: 42, carbs: 45, fat: 18 }
  ]);
  const [loggedWorkouts, setLoggedWorkouts] = useState([
    { name: "Running (Intervals)", calories: 300, duration: 25 },
    { name: "Strength Training", calories: 200, duration: 40 }
  ]);

  // Calorie Calculators
  // Basal Metabolic Rate (BMR) - Harris-Benedict Equation
  const calculateBMR = () => {
    const { age = 28, gender = "male", weight = 70, height = 175 } = personalInfo;
    if (gender === "male") {
      return 88.36 + (13.4 * weight) + (4.8 * height) - (5.78 * age);
    } else {
      return 447.59 + (9.25 * weight) + (3.1 * height) - (4.33 * age);
    }
  };

  const bmr = calculateBMR();

  // Total Daily Energy Expenditure (TDEE) based on lifestyle
  const getTDEEMultiplier = () => {
    switch (personalInfo.lifestyle) {
      case "active": return 1.55;
      case "moderate": return 1.375;
      case "sedentary": default: return 1.2;
    }
  };

  const tdee = Math.round(bmr * getTDEEMultiplier());

  // Macros target splits based on lifestyle (40% carb, 30% protein, 30% fat)
  const targetProtein = Math.round((tdee * 0.3) / 4);
  const targetCarbs = Math.round((tdee * 0.4) / 4);
  const targetFats = Math.round((tdee * 0.3) / 9);

  // Totals of logged values
  const totalCaloriesConsumed = loggedMeals.reduce((acc, m) => acc + m.calories, 0);
  const totalProteinConsumed = loggedMeals.reduce((acc, m) => acc + m.protein, 0);
  const totalCarbsConsumed = loggedMeals.reduce((acc, m) => acc + m.carbs, 0);
  const totalFatsConsumed = loggedMeals.reduce((acc, m) => acc + m.fat, 0);

  const totalCaloriesBurned = loggedWorkouts.reduce((acc, w) => acc + w.calories, 0);

  // Quick logging helpers
  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealInput.name) return;

    const newMeal = { ...mealInput };
    setLoggedMeals([...loggedMeals, newMeal]);

    // Update global context metrics history (latest log)
    const updatedHistory = [...metricsHistory];
    if (updatedHistory.length > 0) {
      const idx = updatedHistory.length - 1;
      updatedHistory[idx].caloriesConsumed = (updatedHistory[idx].caloriesConsumed || 0) + newMeal.calories;
      setMetricsHistory(updatedHistory);
    }

    setMealInput({ name: "", calories: 350, protein: 20, carbs: 40, fat: 10 });
  };

  const handleAddWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exerciseInput.name) return;

    const newWorkout = { ...exerciseInput };
    setLoggedWorkouts([...loggedWorkouts, newWorkout]);

    // Update global context metrics
    const updatedHistory = [...metricsHistory];
    if (updatedHistory.length > 0) {
      const idx = updatedHistory.length - 1;
      updatedHistory[idx].caloriesBurned = (updatedHistory[idx].caloriesBurned || 0) + newWorkout.calories;
      setMetricsHistory(updatedHistory);
    }

    setExerciseInput({ name: "", calories: 250, duration: 30 });
  };

  const handleLogWater = (amountMl: number) => {
    const updatedHistory = [...metricsHistory];
    if (updatedHistory.length > 0) {
      const idx = updatedHistory.length - 1;
      updatedHistory[idx].waterIntake = (updatedHistory[idx].waterIntake || 0) + amountMl;
      setMetricsHistory(updatedHistory);
    }
  };

  // Chronic Disease Clinical Recommendation logic
  const getClinicalNutritionAdvice = () => {
    const chronic = (personalInfo.chronicConditions || "").toLowerCase();
    
    if (chronic.includes("diabet") || chronic.includes("sugar")) {
      return {
        title: "Clinically Screened: Diabetic Profile",
        tip: "Keep carbohydrates under 45% of total macros. Prioritize complex, low-glycemic sources (oats, legumes) and lean protein to prevent extreme postprandial glucose spikes.",
        badge: "Low GI Diet"
      };
    } else if (chronic.includes("hypertension") || chronic.includes("heart") || chronic.includes("pressure")) {
      return {
        title: "Clinically Screened: Cardiovascular Profile",
        tip: "Strictly restrict dietary sodium to under 1,500mg daily. Prioritize DASH dietary guidelines, potassium-rich foods (bananas, spinach, avocados), and magnesium to maintain safe vascular resistance.",
        badge: "Low Sodium / DASH"
      };
    } else if (chronic.includes("kidney") || chronic.includes("renal")) {
      return {
        title: "Clinically Screened: Nephrological Profile",
        tip: "Consult nephrology about specific protein limitations. Restrict dietary potassium and phosphorus. Ensure strict water titration matches output metrics to avoid vascular load.",
        badge: "Low Potassium/Phos"
      };
    } else {
      return {
        title: "Standard Preventative Wellness Profile",
        tip: "Prioritize diverse micronutrient intake through whole vegetables and essential fatty acids (omega-3). Balance dietary carbs and proteins 40/30 to support steady insulin release.",
        badge: "Whole-Food Balanced"
      };
    }
  };

  const clinicalAdvice = getClinicalNutritionAdvice();

  return (
    <div className="space-y-6">
      
      {/* Upper Grid: Quick Summary Vitals & Clinical Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Metabolic Energy Target Card */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Calorie Target Calculator</span>
            <h3 className="text-lg font-bold text-white mt-1">Metabolic Rate (TDEE)</h3>
            <p className="text-xs text-slate-400 mt-1">Derived using the Harris-Benedict equations customized to your somatic activity.</p>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-slate-900/40 p-3 rounded-xl border border-white/5">
                <span className="text-[10px] text-slate-500 font-bold block font-mono uppercase">BMR Baseline</span>
                <span className="text-xl font-bold text-white font-mono">{Math.round(bmr)} <span className="text-xs font-normal text-slate-500">kcal</span></span>
              </div>
              <div className="bg-slate-900/40 p-3 rounded-xl border border-white/5">
                <span className="text-[10px] text-slate-500 font-bold block font-mono uppercase">TDEE Target</span>
                <span className="text-xl font-bold text-emerald-400 font-mono">{tdee} <span className="text-xs font-normal text-emerald-600">kcal</span></span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 mt-4 pt-4 space-y-3">
            <span className="text-[9px] uppercase text-slate-400 font-bold font-mono tracking-widest block">Clinical Macro Goals</span>
            <div className="grid grid-cols-3 gap-2 text-xs text-center font-mono">
              <div className="bg-slate-950 p-2 rounded">
                <span className="text-[9px] text-slate-500 block">PROTEIN</span>
                <span className="text-white font-semibold">{totalProteinConsumed}/{targetProtein}g</span>
              </div>
              <div className="bg-slate-950 p-2 rounded">
                <span className="text-[9px] text-slate-500 block">CARBS</span>
                <span className="text-white font-semibold">{totalCarbsConsumed}/{targetCarbs}g</span>
              </div>
              <div className="bg-slate-950 p-2 rounded">
                <span className="text-[9px] text-slate-500 block">FATS</span>
                <span className="text-white font-semibold">{totalFatsConsumed}/{targetFats}g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Dietary Recommendation Notification */}
        <div className="lg:col-span-7 bg-slate-900/50 border border-emerald-500/25 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-2.5 items-center">
                <span className="text-2xl">🥗</span>
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">{clinicalAdvice.title}</h4>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-300 font-bold font-mono px-2 py-0.5 rounded border border-emerald-500/20 mt-1 inline-block">
                    {clinicalAdvice.badge} Recommended
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {clinicalAdvice.tip}
            </p>
          </div>

          <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>Hydration Checklist: drink <span className="text-sky-400 font-bold font-mono">3,000ml</span> daily</span>
            <div className="flex gap-1">
              <button 
                onClick={() => handleLogWater(250)}
                className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2.5 py-1 rounded hover:bg-sky-500/20 transition-all font-mono"
              >
                +250ml Glass
              </button>
              <button 
                onClick={() => handleLogWater(750)}
                className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2.5 py-1 rounded hover:bg-sky-500/20 transition-all font-mono"
              >
                +750ml Bottle
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Logging Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Diet Logging */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Apple className="w-4 h-4 text-emerald-400" /> Logged Meals & Calorie Intake
            </h4>
            <span className="text-xs text-emerald-400 font-mono font-bold">Total: {totalCaloriesConsumed} kcal</span>
          </div>

          <form onSubmit={handleAddMeal} className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-900/40 p-3 rounded-xl border border-white/5">
            <input
              type="text"
              placeholder="Meal (e.g., Oatmeal)"
              value={mealInput.name}
              onChange={(e) => setMealInput({ ...mealInput, name: e.target.value })}
              className="sm:col-span-2 bg-slate-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="number"
              placeholder="Calories"
              value={mealInput.calories}
              onChange={(e) => setMealInput({ ...mealInput, calories: Number(e.target.value) })}
              className="bg-slate-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="number"
              placeholder="Protein (g)"
              value={mealInput.protein}
              onChange={(e) => setMealInput({ ...mealInput, protein: Number(e.target.value) })}
              className="bg-slate-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="number"
              placeholder="Carbs (g)"
              value={mealInput.carbs}
              onChange={(e) => setMealInput({ ...mealInput, carbs: Number(e.target.value) })}
              className="bg-slate-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs py-1 transition-colors shadow flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Log Meal
            </button>
          </form>

          {/* List of meals */}
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {loggedMeals.map((meal, idx) => (
              <div key={idx} className="bg-slate-900/50 p-2.5 rounded-xl border border-white/5 flex justify-between items-center text-xs">
                <div>
                  <span className="font-semibold text-white block">{meal.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">P: {meal.protein}g / C: {meal.carbs}g / F: {meal.fat}g</span>
                </div>
                <span className="font-mono text-emerald-400 font-bold">{meal.calories} kcal</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workout & Aerobic Activity Logging */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-sky-400" /> Logged Exercises & Workouts
            </h4>
            <span className="text-xs text-sky-400 font-mono font-bold">Burned: {totalCaloriesBurned} kcal</span>
          </div>

          <form onSubmit={handleAddWorkout} className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-900/40 p-3 rounded-xl border border-white/5">
            <input
              type="text"
              placeholder="Exercise (e.g., Squats)"
              value={exerciseInput.name}
              onChange={(e) => setExerciseInput({ ...exerciseInput, name: e.target.value })}
              className="sm:col-span-2 bg-slate-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
            <input
              type="number"
              placeholder="Calories"
              value={exerciseInput.calories}
              onChange={(e) => setExerciseInput({ ...exerciseInput, calories: Number(e.target.value) })}
              className="bg-slate-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
            <input
              type="number"
              placeholder="Mins"
              value={exerciseInput.duration}
              onChange={(e) => setExerciseInput({ ...exerciseInput, duration: Number(e.target.value) })}
              className="bg-slate-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
            <div className="sm:col-span-2 text-[10px] text-slate-500 flex items-center italic">
              *Burning calories lowers cardiovascular risk scores.
            </div>
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-xs py-1 transition-colors shadow flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Log Workout
            </button>
          </form>

          {/* List of workouts */}
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {loggedWorkouts.map((workout, idx) => (
              <div key={idx} className="bg-slate-900/50 p-2.5 rounded-xl border border-white/5 flex justify-between items-center text-xs">
                <div>
                  <span className="font-semibold text-white block">{workout.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">Duration: {workout.duration} mins</span>
                </div>
                <span className="font-mono text-sky-400 font-bold">-{workout.calories} kcal</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
