import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";
import { getOrCreateUser } from "./src/db/users.ts";
import {
  getUserByUid,
  getPersonalInfoByUserId,
  upsertPersonalInfo,
  getHealthMetricsByUserId,
  addHealthMetricLogRecord,
  getMedicationRecordsByUserId,
  addMedicationRecord,
  updateMedicationAdherence,
  deleteMedicationRecord,
  getHabitsByUserId,
  upsertHabitRecord,
  getMoodLogsByUserId,
  addMoodLogRecord
} from "./src/db/queries.ts";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely with the correct header for telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Authentication & Database Synchronization Endpoint
app.post("/api/auth/sync", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    const email = req.user?.email || "anonymous@healthverse.com";
    if (!uid) {
      return res.status(400).json({ error: "Missing Firebase user identity" });
    }

    // Sync user in PostgreSQL
    const userRecord = await getOrCreateUser(uid, email);

    // Fetch existing personal info
    let infoRecord = await getPersonalInfoByUserId(userRecord.id);
    if (!infoRecord) {
      // Create initial default record
      infoRecord = await upsertPersonalInfo(userRecord.id, {
        name: req.user?.name || "Dr. Raghav",
        age: 28,
        gender: "male",
        height: 175,
        weight: 71,
        bloodGroup: "O+",
        country: "India",
        state: "",
        occupation: "Medical Intern",
        lifestyle: "moderate",
        smoking: "non-smoker",
        alcohol: "occasional",
        exercise: "none",
        foodHabits: "balanced",
        waterIntake: 2,
        sleepDuration: 8,
        existingDiseases: ["Mild seasonal asthma"],
        medications: [],
        familyHistory: [],
        allergies: [],
        chronicConditions: "Mild seasonal asthma"
      });
    }

    res.json({ user: userRecord, personalInfo: infoRecord });
  } catch (error: any) {
    console.error("Auth sync route error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Personal Info GET
app.get("/api/user/personal-info", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const userRecord = await getUserByUid(uid);
    if (!userRecord) return res.status(404).json({ error: "User not found" });

    const infoRecord = await getPersonalInfoByUserId(userRecord.id);
    res.json(infoRecord);
  } catch (error: any) {
    console.error("GET personal-info error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Personal Info POST (Upsert)
app.post("/api/user/personal-info", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const userRecord = await getUserByUid(uid);
    if (!userRecord) return res.status(404).json({ error: "User not found" });

    const updatedRecord = await upsertPersonalInfo(userRecord.id, req.body);
    res.json(updatedRecord);
  } catch (error: any) {
    console.error("POST personal-info error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Health Metrics GET
app.get("/api/user/metrics", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const userRecord = await getUserByUid(uid);
    if (!userRecord) return res.status(404).json({ error: "User not found" });

    const logs = await getHealthMetricsByUserId(userRecord.id);
    res.json(logs);
  } catch (error: any) {
    console.error("GET metrics error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Health Metrics POST
app.post("/api/user/metrics", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const userRecord = await getUserByUid(uid);
    if (!userRecord) return res.status(404).json({ error: "User not found" });

    const newLog = await addHealthMetricLogRecord(userRecord.id, req.body);
    res.json(newLog);
  } catch (error: any) {
    console.error("POST metrics error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Medications GET
app.get("/api/user/medications", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const userRecord = await getUserByUid(uid);
    if (!userRecord) return res.status(404).json({ error: "User not found" });

    const meds = await getMedicationRecordsByUserId(userRecord.id);
    res.json(meds);
  } catch (error: any) {
    console.error("GET medications error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Medications POST
app.post("/api/user/medications", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const userRecord = await getUserByUid(uid);
    if (!userRecord) return res.status(404).json({ error: "User not found" });

    const newMed = await addMedicationRecord(userRecord.id, req.body);
    res.json(newMed);
  } catch (error: any) {
    console.error("POST medications error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Medications Adherence Update (POST)
app.post("/api/user/medications/:id/adherence", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const userRecord = await getUserByUid(uid);
    if (!userRecord) return res.status(404).json({ error: "User not found" });

    const medId = parseInt(req.params.id);
    const updatedMed = await updateMedicationAdherence(userRecord.id, medId, req.body.adherence);
    res.json(updatedMed);
  } catch (error: any) {
    console.error("Update medication adherence error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Medications DELETE
app.delete("/api/user/medications/:id", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const userRecord = await getUserByUid(uid);
    if (!userRecord) return res.status(404).json({ error: "User not found" });

    const medId = parseInt(req.params.id);
    await deleteMedicationRecord(userRecord.id, medId);
    res.json({ success: true });
  } catch (error: any) {
    console.error("DELETE medication error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Habits GET
app.get("/api/user/habits", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const userRecord = await getUserByUid(uid);
    if (!userRecord) return res.status(404).json({ error: "User not found" });

    const userHabits = await getHabitsByUserId(userRecord.id);
    res.json(userHabits);
  } catch (error: any) {
    console.error("GET habits error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Habits POST (Upsert)
app.post("/api/user/habits", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const userRecord = await getUserByUid(uid);
    if (!userRecord) return res.status(404).json({ error: "User not found" });

    const savedHabit = await upsertHabitRecord(userRecord.id, req.body);
    res.json(savedHabit);
  } catch (error: any) {
    console.error("POST habits error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Mood Logs GET
app.get("/api/user/mood-logs", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const userRecord = await getUserByUid(uid);
    if (!userRecord) return res.status(404).json({ error: "User not found" });

    const logs = await getMoodLogsByUserId(userRecord.id);
    res.json(logs);
  } catch (error: any) {
    console.error("GET mood logs error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Mood Logs POST
app.post("/api/user/mood-logs", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const userRecord = await getUserByUid(uid);
    if (!userRecord) return res.status(404).json({ error: "User not found" });

    const newMoodLog = await addMoodLogRecord(userRecord.id, req.body);
    res.json(newMoodLog);
  } catch (error: any) {
    console.error("POST mood log error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 1. Symptom checker & clinical summary endpoint
app.post("/api/gemini/analyze-symptoms", async (req, res) => {
  try {
    const { personalInfo, symptoms } = req.body;
    
    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ error: "No symptoms provided for analysis." });
    }

    const prompt = `
      Please perform an educational health risk assessment based on the following patient profile and current symptoms:
      
      PATIENT PROFILE:
      - Name: ${personalInfo.name || "Anonymous"}
      - Age: ${personalInfo.age || "Unknown"}
      - Gender: ${personalInfo.gender || "Unknown"}
      - Height: ${personalInfo.height || "Unknown"} cm
      - Weight: ${personalInfo.weight || "Unknown"} kg
      - Blood Group: ${personalInfo.bloodGroup || "Unknown"}
      - Location: ${personalInfo.state || "N/A"}, ${personalInfo.country || "N/A"}
      - Occupation: ${personalInfo.occupation || "N/A"}
      - Lifestyle Habits: Lifestyle is ${personalInfo.lifestyle || "N/A"}, Smoking: ${personalInfo.smoking || "N/A"}, Alcohol: ${personalInfo.alcohol || "N/A"}, Exercise: ${personalInfo.exercise || "N/A"}
      - Nutrition & Water: Food: ${personalInfo.foodHabits || "N/A"}, Water Intake: ${personalInfo.waterIntake || "N/A"} L/day, Sleep: ${personalInfo.sleepDuration || "N/A"} hrs/day
      - Existing Conditions: ${personalInfo.existingDiseases?.join(", ") || "None"}
      - Current Medications: ${personalInfo.medications?.join(", ") || "None"}
      - Family History: ${personalInfo.familyHistory?.join(", ") || "None"}
      - Allergies: ${personalInfo.allergies?.join(", ") || "None"}

      CURRENT SYMPTOMS:
      ${symptoms.map((s: any) => `- ${s.name} (${s.category}): Severity: ${s.severity}, Duration: ${s.durationDays} days`).join("\n")}

      CRITICAL SAFETY DIRECTION: Include a clear medical disclaimer stating that this is for educational and informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Provide home care tips and preventive measures.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are HealthVerse AI, an advanced, highly knowledgeable medical educator and clinical symptom analyzer. Evaluate the input, offer ranked possible educational conditions, list risk factors, and strongly emphasize safety markers. Do not prescribe specific medicines, only general classes of therapy.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            conditions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Possible educational condition name" },
                  likelihood: { type: Type.STRING, description: "Likelihood rank: High, Moderate, or Low" },
                  description: { type: Type.STRING, description: "Brief scientific description of the condition" }
                },
                required: ["name", "likelihood", "description"]
              }
            },
            severityLevel: { type: Type.STRING, description: "One of: Low, Moderate, Severe, Emergency" },
            confidenceScore: { type: Type.INTEGER, description: "Confidence score percentage (0-100)" },
            explanation: { type: Type.STRING, description: "Detailed medical explanation of symptoms and how they correlate" },
            riskFactors: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Relevant clinical risk factors identified" },
            lifestyleCauses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lifestyle triggers or environmental causes" },
            complications: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Possible physiological complications if untreated" },
            emergencySigns: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Emergency red flags that demand immediate ER attention" },
            medicalSpecialty: { type: Type.STRING, description: "The specific clinical specialty of doctor recommended to consult" },
            homeCareSuggestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Safe supportive measures (rest, fluids, etc.)" },
            preventionTips: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Primary preventive actions to take" },
            recommendedTests: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Common medical or lab tests typically requested by physicians for this" },
            doctorQuestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Thoughtful questions the user should ask their doctor" },
            recoveryTimeline: { type: Type.STRING, description: "General prognosis and expected recovery duration" },
            seekImmediateCare: { type: Type.STRING, description: "Explicit safety guidance on when to seek immediate medical care" }
          },
          required: [
            "conditions", "severityLevel", "confidenceScore", "explanation",
            "riskFactors", "lifestyleCauses", "complications", "emergencySigns",
            "medicalSpecialty", "homeCareSuggestions", "preventionTips",
            "recommendedTests", "doctorQuestions", "recoveryTimeline", "seekImmediateCare"
          ]
        }
      }
    });

    if (!response.text) {
      throw new Error("No response text received from Gemini.");
    }

    const data = JSON.parse(response.text.trim());
    res.json(data);
  } catch (error: any) {
    console.error("Symptom assessment error:", error);
    res.status(500).json({ error: "Failed to perform symptom assessment.", details: error.message });
  }
});

// 2. Chatbot assistant endpoint
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Standard Chat initialization
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: `You are the HealthVerse AI Assistant, a friendly and accurate medical educator. 
        Explain medical terminology, diseases, lab reports, and healthy behaviors in clear, encouraging, accessible language.
        ALWAYS include a brief notice stating that you are an educational bot, not a doctor, and users must consult medical professionals for diagnostics or treatments.
        If asked about symptoms, suggest using the platform's Symptom Checker tab. Keep responses well-structured with bullet points.`
      }
    });

    // Feed prior history into chat state if available to preserve context
    if (history && history.length > 0) {
      // Warm up chat history manually if needed, or simply append a structured context in the prompt.
      // To keep it highly compatible and simple, we send the history along inside the message block:
    }

    const contextPrompt = history && history.length > 0 
      ? `CONVERSATION HISTORY:\n${history.map((h: any) => `${h.role === "user" ? "User" : "Assistant"}: ${h.text}`).join("\n")}\n\nUser's new message: ${message}`
      : message;

    const response = await chat.sendMessage({ message: contextPrompt });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to process chat message.", details: error.message });
  }
});

// 3. Nutrition meal plan generator
app.post("/api/gemini/generate-diet", async (req, res) => {
  try {
    const { personalInfo, goal } = req.body;

    const prompt = `
      Design a custom, highly detailed educational diet plan and nutritional guideline based on:
      Goal: ${goal || "General Health & Balanced Energy"}
      Name: ${personalInfo.name || "User"}
      Age: ${personalInfo.age || "Unknown"}
      Gender: ${personalInfo.gender || "Unknown"}
      Height: ${personalInfo.height || "N/A"} cm
      Weight: ${personalInfo.weight || "N/A"} kg
      Lifestyle: ${personalInfo.lifestyle || "N/A"}
      Exercise frequency: ${personalInfo.exercise || "N/A"}
      Food preference: ${personalInfo.foodHabits || "Balanced / Omnivore"}
      Underlying Health Conditions: ${personalInfo.existingDiseases?.join(", ") || "None"}
      Allergies: ${personalInfo.allergies?.join(", ") || "None"}

      Provide a 1-day sample full-meal breakdown (Breakfast, Snack 1, Lunch, Snack 2, Dinner), target macros (approximate Calories, Protein in grams, Carbs, Fats), important hydration advice, micro-nutrient requirements (Vitamins & Minerals relevant to goal), and 3 absolute foods/habits to avoid.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the HealthVerse AI Chief Clinical Nutritionist. Provide pristine structured dietary templates. Avoid prescribing actual clinical therapy but explain nutritional science beautifully.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            targetMacros: {
              type: Type.OBJECT,
              properties: {
                calories: { type: Type.STRING },
                protein: { type: Type.STRING },
                carbohydrates: { type: Type.STRING },
                fats: { type: Type.STRING }
              },
              required: ["calories", "protein", "carbohydrates", "fats"]
            },
            meals: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING },
                  mealName: { type: Type.STRING },
                  items: { type: Type.ARRAY, items: { type: Type.STRING } },
                  educationalBenefit: { type: Type.STRING }
                },
                required: ["time", "mealName", "items", "educationalBenefit"]
              }
            },
            micronutrients: { type: Type.ARRAY, items: { type: Type.STRING } },
            hydrationAdvise: { type: Type.STRING },
            avoidList: { type: Type.ARRAY, items: { type: Type.STRING } },
            summary: { type: Type.STRING }
          },
          required: ["title", "targetMacros", "meals", "micronutrients", "hydrationAdvise", "avoidList", "summary"]
        }
      }
    });

    if (!response.text) {
      throw new Error("No response text received from Gemini.");
    }

    res.json(JSON.parse(response.text.trim()));
  } catch (error: any) {
    console.error("Diet generation error:", error);
    res.status(500).json({ error: "Failed to generate nutritional plan.", details: error.message });
  }
});

// 4. Generate Comprehensive Health PDF Report Data
app.post("/api/gemini/generate-report", async (req, res) => {
  try {
    const { personalInfo, recentMetrics, recentSymptoms, wellnessScore } = req.body;

    const prompt = `
      Generate a final, structured Health Intelligence Report summary for ${personalInfo.name || "Anonymous User"}.
      Age: ${personalInfo.age || "N/A"}, Gender: ${personalInfo.gender || "N/A"}, BMI: ${(personalInfo.weight / ((personalInfo.height/100) ** 2)).toFixed(1) || "N/A"}.
      Wellness & Habits Score: ${wellnessScore || "78"}/100.
      Recent symptoms entered: ${recentSymptoms?.map((s: any) => s.name).join(", ") || "None log in this session"}.
      Last recorded vitals - Blood Pressure: ${recentMetrics?.bpSystolic || 120}/${recentMetrics?.bpDiastolic || 80} mmHg, Heart Rate: ${recentMetrics?.heartRate || 72} bpm, Sleep Hours: ${recentMetrics?.sleepHours || 7.5} hours.

      Review their nutrition, fitness levels, mental status, and general risks.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the HealthVerse AI Medical Reviewing Officer. Write a beautifully polished summary of organ scores, health risks, habits, and direct recommendations. Be objective, scientific, and highlight the medical education aspect.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reportId: { type: Type.STRING },
            date: { type: Type.STRING },
            organHealthAnalysis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  organ: { type: Type.STRING },
                  score: { type: Type.INTEGER },
                  status: { type: Type.STRING },
                  remarks: { type: Type.STRING }
                },
                required: ["organ", "score", "status", "remarks"]
              }
            },
            overallAssessment: { type: Type.STRING },
            potentialRisks: { type: Type.ARRAY, items: { type: Type.STRING } },
            lifestyleRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            followupChecklist: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["reportId", "date", "organHealthAnalysis", "overallAssessment", "potentialRisks", "lifestyleRecommendations", "followupChecklist"]
        }
      }
    });

    if (!response.text) {
      throw new Error("No response text received from Gemini.");
    }

    res.json(JSON.parse(response.text.trim()));
  } catch (error: any) {
    console.error("Report generation error:", error);
    res.status(500).json({ error: "Failed to generate health intelligence report.", details: error.message });
  }
});


// Configure Vite middleware in development, and static file serving in production
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated successfully.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve client-side React routes via index.html
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static production assets mounted from:", distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[HealthVerse Server] running perfectly on http://localhost:${PORT}`);
  });
}

setupServer();
