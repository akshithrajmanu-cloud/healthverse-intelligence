import { db } from "./index.ts";
import { 
  users, 
  personalInfo, 
  healthMetricLogs, 
  medicationRecords, 
  vaccineRecords, 
  habits, 
  gratitudeEntries, 
  moodLogs 
} from "./schema.ts";
import { eq, desc, and } from "drizzle-orm";

// 1. Fetch User Record by Firebase UID
export async function getUserByUid(uid: string) {
  try {
    const result = await db.select().from(users).where(eq(users.uid, uid));
    return result[0] || null;
  } catch (error) {
    console.error("Database query (getUserByUid) failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

// 2. Personal Info CRUD
export async function getPersonalInfoByUserId(userId: number) {
  try {
    const result = await db.select().from(personalInfo).where(eq(personalInfo.userId, userId));
    return result[0] || null;
  } catch (error) {
    console.error("Database query (getPersonalInfoByUserId) failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function upsertPersonalInfo(userId: number, data: any) {
  try {
    const result = await db.insert(personalInfo)
      .values({
        userId,
        name: data.name,
        age: data.age,
        gender: data.gender,
        height: parseFloat(data.height) || null,
        weight: parseFloat(data.weight) || null,
        bloodGroup: data.bloodGroup,
        country: data.country,
        state: data.state,
        occupation: data.occupation,
        lifestyle: data.lifestyle,
        smoking: data.smoking,
        alcohol: data.alcohol,
        exercise: data.exercise,
        foodHabits: data.foodHabits,
        waterIntake: parseFloat(data.waterIntake) || null,
        sleepDuration: parseFloat(data.sleepDuration) || null,
        existingDiseases: data.existingDiseases ? JSON.stringify(data.existingDiseases) : null,
        medications: data.medications ? JSON.stringify(data.medications) : null,
        familyHistory: data.familyHistory ? JSON.stringify(data.familyHistory) : null,
        allergies: data.allergies ? JSON.stringify(data.allergies) : null,
        chronicConditions: data.chronicConditions,
      })
      .onConflictDoUpdate({
        target: personalInfo.userId,
        set: {
          name: data.name,
          age: data.age,
          gender: data.gender,
          height: parseFloat(data.height) || null,
          weight: parseFloat(data.weight) || null,
          bloodGroup: data.bloodGroup,
          country: data.country,
          state: data.state,
          occupation: data.occupation,
          lifestyle: data.lifestyle,
          smoking: data.smoking,
          alcohol: data.alcohol,
          exercise: data.exercise,
          foodHabits: data.foodHabits,
          waterIntake: parseFloat(data.waterIntake) || null,
          sleepDuration: parseFloat(data.sleepDuration) || null,
          existingDiseases: data.existingDiseases ? JSON.stringify(data.existingDiseases) : null,
          medications: data.medications ? JSON.stringify(data.medications) : null,
          familyHistory: data.familyHistory ? JSON.stringify(data.familyHistory) : null,
          allergies: data.allergies ? JSON.stringify(data.allergies) : null,
          chronicConditions: data.chronicConditions,
          updatedAt: new Date(),
        }
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Database query (upsertPersonalInfo) failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

// 3. Health Metric Logs
export async function getHealthMetricsByUserId(userId: number) {
  try {
    return await db.select()
      .from(healthMetricLogs)
      .where(eq(healthMetricLogs.userId, userId))
      .orderBy(desc(healthMetricLogs.date));
  } catch (error) {
    console.error("Database query (getHealthMetricsByUserId) failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function addHealthMetricLogRecord(userId: number, log: any) {
  try {
    const result = await db.insert(healthMetricLogs)
      .values({
        userId,
        date: log.date,
        heartRate: parseInt(log.heartRate) || null,
        bpSystolic: parseInt(log.bpSystolic) || null,
        bpDiastolic: parseInt(log.bpDiastolic) || null,
        bloodSugar: parseFloat(log.bloodSugar) || null,
        weight: parseFloat(log.weight) || null,
        waterIntake: parseInt(log.waterIntake) || null,
        sleepHours: parseFloat(log.sleepHours) || null,
        stressLevel: parseInt(log.stressLevel) || null,
        caloriesBurned: parseInt(log.caloriesBurned) || null,
        caloriesConsumed: parseInt(log.caloriesConsumed) || null,
        symptomsCount: parseInt(log.symptomsCount) || 0,
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error("Database query (addHealthMetricLogRecord) failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

// 4. Medication Tracker CRUD
export async function getMedicationRecordsByUserId(userId: number) {
  try {
    return await db.select()
      .from(medicationRecords)
      .where(eq(medicationRecords.userId, userId));
  } catch (error) {
    console.error("Database query (getMedicationRecordsByUserId) failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function addMedicationRecord(userId: number, med: any) {
  try {
    const result = await db.insert(medicationRecords)
      .values({
        userId,
        medId: med.id,
        name: med.name,
        dosage: med.dosage,
        frequency: med.frequency,
        time: med.timeOfDay || med.time,
        adherence: JSON.stringify(med.adherence || {}),
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error("Database query (addMedicationRecord) failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function updateMedicationAdherence(userId: number, id: number, adherence: any) {
  try {
    const result = await db.update(medicationRecords)
      .set({ adherence: JSON.stringify(adherence) })
      .where(and(eq(medicationRecords.userId, userId), eq(medicationRecords.id, id)))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Database query (updateMedicationAdherence) failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function deleteMedicationRecord(userId: number, id: number) {
  try {
    await db.delete(medicationRecords)
      .where(and(eq(medicationRecords.userId, userId), eq(medicationRecords.id, id)));
    return true;
  } catch (error) {
    console.error("Database query (deleteMedicationRecord) failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

// 5. Habits Tracker CRUD
export async function getHabitsByUserId(userId: number) {
  try {
    return await db.select()
      .from(habits)
      .where(eq(habits.userId, userId));
  } catch (error) {
    console.error("Database query (getHabitsByUserId) failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function upsertHabitRecord(userId: number, habit: any) {
  try {
    const result = await db.insert(habits)
      .values({
        userId,
        habitId: habit.habitId || habit.id,
        name: habit.name,
        category: habit.category || "general",
        streak: habit.streak || 0,
        history: JSON.stringify(habit.history || {}),
      })
      .onConflictDoUpdate({
        target: [habits.userId, habits.habitId],
        set: {
          streak: habit.streak,
          history: JSON.stringify(habit.history),
        }
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error("Database query (upsertHabitRecord) failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

// 6. Mood Logs CRUD
export async function getMoodLogsByUserId(userId: number) {
  try {
    return await db.select()
      .from(moodLogs)
      .where(eq(moodLogs.userId, userId))
      .orderBy(desc(moodLogs.date));
  } catch (error) {
    console.error("Database query (getMoodLogsByUserId) failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function addMoodLogRecord(userId: number, log: any) {
  try {
    const result = await db.insert(moodLogs)
      .values({
        userId,
        date: log.date,
        score: log.score,
        notes: log.notes,
        factors: JSON.stringify(log.factors || []),
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error("Database query (addMoodLogRecord) failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}
