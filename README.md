# HealthVerse AI

> **Your Personal Health Intelligence Platform**  
> An advanced, AI-powered healthcare dashboard and clinical education portal providing precise symptom analysis, personalized health logs, biometric charting, and MBBS-level interactive medical education.

---

## 📖 Project Overview

**HealthVerse AI** bridges the gap between patient wellness logging and deep clinical intelligence. It serves as both a secure full-stack wellness hub for tracking health metrics, habit compliance, and medications, and an interactive learning portal designed with accurate medical education tools. By harnessing state-of-the-art Generative AI models via the Gemini API, the platform delivers clinical summary insights, localized care pathways, and educational disease breakdowns.

---

## 🌟 Key Features

### 🩺 Clinical-Grade AI Symptom Analyzer
*   **Intelligent Assessment:** Submit multi-symptom histories to generate preliminary differential diagnoses, urgency triage warnings, and clinical summaries.
*   **Triage System:** Features immediate visual risk indicators (Critical, Moderate, Mild) to guide users responsibly.

### 📊 Real-Time Biometric & Wellness Dashboards
*   **Comprehensive Charting:** Beautiful, responsive telemetry visualization using **Recharts** to track blood pressure (Systolic & Diastolic), heart rate, blood glucose levels, sleep hours, water intake, and daily caloric balance.
*   **Personal Profile Syncing:** Dynamic management of age, body specifications (weight, height), active medical records, family history, and lifestyle risk factors.

### 🚶 3D/2D Body Explorer
*   **Interactive Symptom Heatmaps:** Fully interactive anatomical visualizer enabling localized click-to-add symptom selection across regional body sections (Head, Chest, Abdomen, Extremities).

### 📚 MBBS-Level Medical Education Portal
*   **Deep Medical Knowledge:** Structured interactive modules covering pathology, pathophysiology, medical laboratory benchmarks, diagnosis methodologies, and treatment pathways.
*   **Interactive Case Simulation:** Perfect for medical interns, medical students, and curious wellness advocates.

### 💊 Comprehensive Personal Wellness Suite
*   **Medication Tracker:** Secure logging of medication regimes, custom dosages, frequencies, and a checklist for tracking daily compliance.
*   **Habit Tracker & Mood Logs:** Track daily activities (cardio, hydration, sleep, mindfulness) with streak calculators and correlate lifestyle with daily emotional state.

---

## 🛠️ Technology Stack

| Layer | Technology | Key Function |
| :--- | :--- | :--- |
| **Frontend** | React (v18+), Vite, Tailwind CSS, TypeScript | Highly responsive Single Page Application with zero-flicker state updates. |
| **Animations** | Motion (`motion/react`) | Fluid transitions and micro-interactions. |
| **Backend** | Express, Node.js, `tsx` | Secure API layer, routing, and server-side request proxying. |
| **Database** | PostgreSQL, Drizzle ORM | Durable, queryable storage for user states and wellness logs. |
| **Authentication** | Firebase Authentication & Admin SDK | Cross-platform secure session management using JSON Web Tokens (JWT). |
| **Artificial Intelligence** | Google GenAI SDK (`@google/genai`) | High-fidelity clinical reasoning via Gemini. |

---

## 🗄️ Database Design (Entity Relationship Schema)

HealthVerse AI uses a structured PostgreSQL schema configured through **Drizzle ORM** for highly efficient relational queries:

```
                  +--------------------------+
                  |          users           | (Primary Entity)
                  +--------------------------+
                               |
        +----------------------+----------------------+----------------------+
        | (1:1)                | (1:N)                | (1:N)                | (1:N)
+---------------+      +----------------+     +------------------+   +----------------+
| personal_info |      |  health_logs   |     | medication_recs  |   |    mood_logs   |
+---------------+      +----------------+     +------------------+   +----------------+
                       | Date-based     |     | Daily compliance |   | Daily state,   |
                       | biometrics     |     | & dosages        |   | score & notes  |
                       +----------------+     +------------------+   +----------------+
```

### Table Definitions
1.  **`users`**: Records primary identity by mapping unique Firebase Auth `uid` values to relational `email` records.
2.  **`personal_info`**: Stores dense user-authored demographics, body metrics, family medical history, chronic conditions, and allergies.
3.  **`health_metric_logs`**: Tracks daily biometric snapshots (blood pressure, heart rate, blood sugar, hydration, and sleep).
4.  **`medication_records`**: Maintains the customized medication lists, schedules, and active daily compliance checklists.
5.  **`habits`**: Features unique habit tracks coupled with daily streak tracking.
6.  **`mood_logs`**: Logs daily emotional indicators, rating scores, and lifestyle factors.

---

## 📡 Key API Documentation

All write operations requiring client identity must send a Bearer authentication token in the `Authorization` header: `Bearer <Firebase_JWT_Token>`.

### Authentication Sync
*   **`POST /api/auth/sync`**
    *   *Purpose:* Syncs current Firebase user metadata into the PostgreSQL backend and initializes a baseline clinical profile if not present.

### Personal Profile & Wellness
*   **`GET /api/user/personal-info`** -> Fetches the user's demographic profile, medical history, and allergies.
*   **`POST /api/user/personal-info`** -> Performs an upsert update to the personal profile fields.

### Biometrics
*   **`GET /api/user/metrics`** -> Retrieves the user's complete chronological history of health logs.
*   **`POST /api/user/metrics`** -> Commits a new daily wellness snapshot containing biometrics.

### Medications & Wellness Actions
*   **`GET /api/user/medications`** -> Returns the list of active tracking medications.
*   **`POST /api/user/medications`** -> Adds a new medicine tracking schedule.
*   **`POST /api/user/medications/:id/adherence`** -> Updates the taken status for today.
*   **`DELETE /api/user/medications/:id`** -> Discontinues and removes a medication record.

### Generative AI Analysis
*   **`POST /api/gemini/analyze-symptoms`**
    *   *Payload:* `{ symptoms: string, age: number, gender: string, profileSummary?: string }`
    *   *Response:* Returns a structured diagnostic clinical analysis incorporating clinical differentials, risk stratification level, and medical advice guidelines.

---

## ⚙️ Setup & Local Installation

### Prerequisites
*   **Node.js** (v18+)
*   **PostgreSQL** instance configured
*   **Firebase Project** with Authentication enabled

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/healthverse-ai.git
    cd healthverse-ai
    ```

2.  **Install Project Dependencies:**
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables:**
    Create a `.env` file in the root directory and specify the following variables:
    ```env
    # Database Configuration
    DATABASE_URL=postgresql://username:password@localhost:5432/healthverse_db

    # Generative AI Credentials
    GEMINI_API_KEY=your_gemini_api_key_here

    # Firebase Admin Configuration
    # Local files or JSON environment details matching Firebase Applet configs
    ```

4.  **Generate Database Schema & Migrations:**
    Using Drizzle Kit, apply your schemas directly:
    ```bash
    npm run db:push
    ```

5.  **Launch the Development Server:**
    ```bash
    npm run dev
    ```
    The application will launch locally at `http://localhost:3000`.

6.  **Build for Production:**
    ```bash
    npm run build
    ```
    Start the optimized full-stack application using:
    ```bash
    npm run start
    ```

---

## 👤 Recommended Repository Setup

If publishing this platform on a remote repository manager like GitHub, the following layout is recommended:

*   **Repository Name:** `healthverse-ai` or `healthverse-intelligence-platform`
*   **Short Description:** `AI-powered healthcare dashboard and clinical intelligence portal combining biometric tracking, diagnostic symptom analysis, and MBBS-level interactive learning.`
*   **Primary Topics/Tags:** `react`, `typescript`, `express`, `postgresql`, `gemini-api`, `firebase-auth`, `drizzle-orm`, `healthtech`, `medical-education`

---

## 📄 License
This application is distributed under the **MIT License**. Use responsibly and consult real-world certified medical professionals for any medical triage.
