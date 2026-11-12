# Project: IBPS TCS iON Test Engine & Telegram Creator Studio

## Tech Stack
- React (Vite), Tailwind CSS v4 (`@import "tailwindcss";` in `src/index.css`, NO `tailwind.config.js`), `lucide-react` icons, `zustand` for state management.

## Core Views to Build
1. **Top Mode Switcher (Demo Bar):** Allows switching between:
   - "TCS iON Student Exam View" (The live mock test)
   - "Creator PDF-to-Test Uploader" (Where a Telegram/YouTube teacher pastes raw text/PDF content to generate a test)
   - "AI Exam-Fit Diagnostic Report" (Post-test student & batch analytics)

2. **Strict TCS iON Student Interface:**
   - **Header:** Exam name, Creator Branding Badge ("Curated by Harshal Sir / Reasoning Checklist • Join Telegram"), and countdown timer (e.g., 20:00).
   - **Sub-header:** Section Tabs (Reasoning Ability, Quantitative Aptitude) + Language Dropdown (`English` / `हिन्दी` instant toggle).
   - **Split-Screen Workspace (12-column grid on desktop):**
     - Left 5 cols: Scrollable common passage / Seating Arrangement / Data Interpretation table.
     - Middle 4 cols: Question number, (+1.0, -0.25) marks badge, bilingual question text, and 5 radio options (A, B, C, D, E).
     - Right 3 cols: Candidate profile, Legend, and Question Palette grid (1 to 10) with exact status colors:
       - Answered: Green (`bg-green-600 text-white`)
       - Not Answered: Red (`bg-red-600 text-white`)
       - Not Visited: Light Grey (`bg-gray-100 text-gray-800 border`)
       - Marked for Review: Purple (`bg-purple-600 text-white rounded-full`)
   - **Bottom Bar:** "Mark for Review & Next", "Clear Response", "Save & Next" (Blue primary button), and "Submit Test".

3. **AI Exam-Fit Diagnostic Modal/View:**
   - Displays Best-Suited Exam probabilities (e.g., IBPS Clerk: 86% Ready, IBPS PO Prelims: 64% Ready, SBI PO: 48% Ready).
   - Actionable Effort Gap: Exact marks needed and speed improvement required per question in Weak Zones (e.g., "Cut Circular Seating Arrangement time from 3m 40s to 2m 15s").