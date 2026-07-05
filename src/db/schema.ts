import { pgTable, serial, text, integer, real, timestamp, unique } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 1. Users table linking with Firebase Auth UID
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uid: text("uid").notNull().unique(), // Firebase Auth UID
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// 2. Personal Info table (single record per user, updated incrementally)
export const personalInfo = pgTable("personal_info", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull().unique(),
  name: text("name"),
  age: integer("age"),
  gender: text("gender"),
  height: real("height"),
  weight: real("weight"),
  bloodGroup: text("blood_group"),
  country: text("country"),
  state: text("state"),
  occupation: text("occupation"),
  lifestyle: text("lifestyle"),
  smoking: text("smoking"),
  alcohol: text("alcohol"),
  exercise: text("exercise"),
  foodHabits: text("food_habits"),
  waterIntake: real("water_intake"),
  sleepDuration: real("sleep_duration"),
  existingDiseases: text("existing_diseases"), // JSON array of strings
  medications: text("medications"), // JSON array of strings
  familyHistory: text("family_history"), // JSON array of strings
  allergies: text("allergies"), // JSON array of strings
  chronicConditions: text("chronic_conditions"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 3. Health Metric Logs
export const healthMetricLogs = pgTable("health_metric_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  date: text("date").notNull(), // YYYY-MM-DD
  heartRate: integer("heart_rate"),
  bpSystolic: integer("bp_systolic"),
  bpDiastolic: integer("bp_diastolic"),
  bloodSugar: real("blood_sugar"),
  weight: real("weight"),
  waterIntake: integer("water_intake"), // ml
  sleepHours: real("sleep_hours"),
  stressLevel: integer("stress_level"),
  caloriesBurned: integer("calories_burned"),
  caloriesConsumed: integer("calories_consumed"),
  symptomsCount: integer("symptoms_count"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 4. Medication Tracker Records
export const medicationRecords = pgTable("medication_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  medId: text("med_id").notNull(),
  name: text("name").notNull(),
  dosage: text("dosage"),
  frequency: text("frequency"),
  time: text("time"),
  adherence: text("adherence"), // JSON object of { date: boolean }
  createdAt: timestamp("created_at").defaultNow(),
});

// 5. Vaccine Records
export const vaccineRecords = pgTable("vaccine_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  vaccineId: text("vaccine_id").notNull(),
  name: text("name").notNull(),
  targetGroup: text("target_group"),
  dosesCount: integer("doses_count"),
  dosesReceived: integer("doses_received"),
  status: text("status"),
  nextDueDate: text("next_due_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 6. Habit Tracker Records
export const habits = pgTable("habits", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  habitId: text("habit_id").notNull(),
  name: text("name").notNull(),
  category: text("category"),
  streak: integer("streak").default(0),
  history: text("history"), // JSON object of { date: boolean }
  createdAt: timestamp("created_at").defaultNow(),
}, (t) => [
  unique().on(t.userId, t.habitId)
]);

// 7. Gratitude Journal Entries
export const gratitudeEntries = pgTable("gratitude_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  entryId: text("entry_id").notNull(),
  date: text("date").notNull(), // YYYY-MM-DD
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// 8. Mood Logs
export const moodLogs = pgTable("mood_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  date: text("date").notNull(), // YYYY-MM-DD
  score: integer("score").notNull(),
  notes: text("notes"),
  factors: text("factors"), // JSON array of strings
  createdAt: timestamp("created_at").defaultNow(),
});

// Define relations
export const usersRelations = relations(users, ({ one, many }) => ({
  personalInfo: one(personalInfo, {
    fields: [users.id],
    references: [personalInfo.userId],
  }),
  healthMetricLogs: many(healthMetricLogs),
  medicationRecords: many(medicationRecords),
  vaccineRecords: many(vaccineRecords),
  habits: many(habits),
  gratitudeEntries: many(gratitudeEntries),
  moodLogs: many(moodLogs),
}));

export const personalInfoRelations = relations(personalInfo, ({ one }) => ({
  user: one(users, {
    fields: [personalInfo.userId],
    references: [users.id],
  }),
}));

export const healthMetricLogsRelations = relations(healthMetricLogs, ({ one }) => ({
  user: one(users, {
    fields: [healthMetricLogs.userId],
    references: [users.id],
  }),
}));

export const medicationRecordsRelations = relations(medicationRecords, ({ one }) => ({
  user: one(users, {
    fields: [medicationRecords.userId],
    references: [users.id],
  }),
}));

export const vaccineRecordsRelations = relations(vaccineRecords, ({ one }) => ({
  user: one(users, {
    fields: [vaccineRecords.userId],
    references: [users.id],
  }),
}));

export const habitsRelations = relations(habits, ({ one }) => ({
  user: one(users, {
    fields: [habits.userId],
    references: [users.id],
  }),
}));

export const gratitudeEntriesRelations = relations(gratitudeEntries, ({ one }) => ({
  user: one(users, {
    fields: [gratitudeEntries.userId],
    references: [users.id],
  }),
}));

export const moodLogsRelations = relations(moodLogs, ({ one }) => ({
  user: one(users, {
    fields: [moodLogs.userId],
    references: [users.id],
  }),
}));
