/**
 * ERC Academy English Tense Quiz & Grammar Master
 * Complete Comprehensive Application Documentation & Code Reference
 */

export interface CodeSnippetItem {
  title: string;
  file: string;
  description: string;
  language: string;
  code: string;
}

export const APP_DOCUMENTATION = {
  meta: {
    title: "ERC Academy — English Tense Quiz & Grammar Master",
    version: "2.4.0",
    releaseDate: "2026-08-14",
    institution: "ERC Academy / English Resource Center",
    author: "Pedagogical Systems Engineering Team",
    repositoryType: "Single-Page Application (React 18 + Vite + TypeScript)",
    license: "Educational Institutional License",
  },

  overview: {
    summary:
      "The ERC Academy English Tense Quiz & Grammar Master is an enterprise-grade interactive pedagogical web platform designed for English language academies, secondary schools, university ESL/EFL programs, and competitive language exams (IELTS, TOEFL, Cambridge FCE/CAE). It combines active recall, spaced repetition principles, round-robin multiplayer competition, real-time analytics, and instant diagnostic feedback across 20+ specialized grammar categories.",
    purpose: [
      "Targeted Grammar Mastery: Systematically remediate chronic English grammar errors identified in classical ESL research (e.g., F.G. French's common error taxonomy, Fitikides preposition pairings, and confused word pairs).",
      "Dynamic Multi-Player Turn Rotation: Facilitate interactive classroom participation and team competition via a round-robin rotation engine that tracks individual player scores and turn indicators.",
      "Dual Examination Pedagogy: Offer both Instant Feedback Mode (for iterative learning with instant rationale notes) and Exam / Test Mode (feedback held until final score report for authentic assessment).",
      "Administrative Security & User Governance: Client-side cryptographic gating with SHA-256 password hashing, user provisioning, privilege assignment (Admin/Teacher/Student), and real-time account status toggles (Active/Disabled).",
      "Instant Vector PDF Export: Programmatically generate vector-based PDF diagnostic reports, student scorecards, and printable classroom worksheets with zero print-dialog friction.",
      "Accessibility & Zero-Lag UX: Responsive light and high-contrast dark mode with zero external server dependencies, instant local persistence, and offline-first resiliency.",
    ],
  },

  featureMatrix: [
    {
      category: "Grammar & Curriculum Engine",
      features: [
        "20+ Deep Grammar Categories: Present/Past/Future Continuous, Present/Past/Future Perfect, Perfect Continuous, Phrasal Verbs, Prepositions, Confused Words, Conditionals & Wishes, Passive Voice & Causatives, Negative Inversion, Reported Speech, Relative Clauses, and Modal Verbs.",
        "Over 3,200+ Lines of Curated Content: Handcrafted question banks with plausible distractors designed to pinpoint specific conceptual misconceptions.",
        "Educational Rationale Notes: Every question contains pedagogical grammar notes that explain the exact rule, signal words, or formula applied.",
        "Randomized Item Delivery: Fisher-Yates shuffle algorithms ensure unique question orders for each practice attempt.",
      ],
    },
    {
      category: "Multiplayer & Session Control",
      features: [
        "1 to 6 Player Support: Accommodates solo self-study or collaborative classroom teams with distinct player avatar themes and custom names.",
        "Round-Robin Rotation: Intelligent turn cycling automatically routes each question to the active player while tracking individual accuracy %.",
        "Custom Quiz Length: Presets for 5, 10, 15, 20, 25, 30 questions, or unlimited practice until the question pool is exhausted.",
        "Configurable Speed Timer: Untimed mode for deep contemplation or timed countdowns (10s, 15s, 20s, 30s) per question with warning animations.",
        "Immediate vs. Post-Exam Feedback: Switch between instant answer breakdowns or summative post-test scorecards.",
      ],
    },
    {
      category: "User Access & Security Governance",
      features: [
        "Cryptographic Authentication: Client-side SHA-256 hashing via native Web Crypto API (`crypto.subtle.digest`).",
        "Role-Based Access: Assign roles (Administrator, Teacher, Student) with designated administrative rights.",
        "Dynamic Account Management: Create, edit passwords, search, and delete user profiles with ease.",
        "Instant Access Disabling: Administrators can disable compromised or inactive accounts with real-time UI login gating.",
        "Encrypted Credentials Storage: Hashed credentials persisted securely in browser storage without exposing plain-text keys.",
      ],
    },
    {
      category: "Analytics & Vector PDF Export",
      features: [
        "Vector-Based PDF Generator: Directly compiles professional A4 report cards and printable tests using `jsPDF`.",
        "Historical Attempt Archive: Automatically records session date, players, final score, question count, and elapsed time.",
        "Search & Filtering: Instant search through past session records by player name or date.",
        "Visual Leaderboard: Medal badges (🥇, 🥈, 🥉), accuracy percentages, and score breakdowns.",
      ],
    },
    {
      category: "UI/UX & Design System",
      features: [
        "Dual Aesthetic Themes: Tailored Light Mode (Royal Blue & Slate) and Dark Mode (Warm Amber & Charcoal).",
        "Mathematical Spacing & Clean Typography: High-contrast typography paired with smooth micro-interactions.",
        "Full Mobile & Tablet Responsiveness: Touch-friendly 44px minimum tap targets with adaptive layout grids.",
        "Zero-Lag Client Architecture: Built with Vite + React 18 for instantaneous state updates and offline capability.",
      ],
    },
  ],

  techStack: [
    { name: "React 18", role: "Component hierarchy, hooks (useState, useEffect, useMemo, useRef), and UI rendering" },
    { name: "TypeScript 5", role: "Strict compile-time typing, enum tagging, and interface contracts" },
    { name: "Vite", role: "Blazing fast build system, module bundler, and local development environment" },
    { name: "Tailwind CSS", role: "Utility-first responsive styling, color tokens, and animation utilities" },
    { name: "Lucide React", role: "Clean, consistent iconography across all modules and status badges" },
    { name: "jsPDF", role: "Client-side vector PDF document compilation for reports and printable tests" },
    { name: "Web Crypto API", role: "Native browser-level SHA-256 asynchronous cryptographic hashing" },
  ],

  codeSnippets: [
    {
      title: "1. Client-Side Cryptographic Authentication & Account Management",
      file: "src/utils/crypto.ts",
      language: "typescript",
      description: "Uses browser native Web Crypto API for SHA-256 password hashing and verifies user credentials against role and status rules.",
      code: `export async function hashSHA256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hexHash;
}

export async function verifyCredentialsDetailed(
  usernameInput: string,
  passwordInput: string
): Promise<LoginResult> {
  const accounts = await getUserAccounts();
  const cleanUsername = usernameInput.trim().toLowerCase();
  const inputPassHash = await hashSHA256(passwordInput);

  const matchedUser = accounts.find(u => u.username.toLowerCase() === cleanUsername);
  if (!matchedUser) return { success: false, reason: 'invalid' };

  // Enforce account status check
  if (matchedUser.status === 'disabled') {
    return { success: false, reason: 'disabled', user: matchedUser };
  }

  // Verify SHA-256 cryptographic match
  if (matchedUser.passwordHash === inputPassHash) {
    const nowStr = new Date().toISOString();
    const updated = accounts.map(u =>
      u.id === matchedUser.id ? { ...u, lastLogin: nowStr } : u
    );
    await saveUserAccounts(updated);
    return { success: true, user: { ...matchedUser, lastLogin: nowStr } };
  }

  return { success: false, reason: 'invalid' };
}`,
    },
    {
      title: "2. Round-Robin Turn Rotation & Scoring Engine",
      file: "src/components/QuizScreen.tsx",
      language: "typescript",
      description: "Controls the active turn assignment, time limit countdown, answer verification, and state transition between players.",
      code: `const handleAnswerSelect = (index: number) => {
  if (isAnswerLocked) return;
  setIsAnswerLocked(true);
  clearInterval(timerRef.current!);

  const isCorrect = index === currentQuestion.correct;
  const activePlayer = players[currentPlayerIndex];

  // Update real-time player score tracking
  setPlayerScores(prev => ({
    ...prev,
    [activePlayer]: {
      score: isCorrect ? (prev[activePlayer]?.score || 0) + 1 : (prev[activePlayer]?.score || 0),
      total: (prev[activePlayer]?.total || 0) + 1
    }
  }));

  // Branch behavior based on Instant Feedback vs Exam Mode
  if (settings.feedbackMode === 'instant') {
    setShowExplanation(true);
  } else {
    advanceToNextQuestion();
  }
};

const advanceToNextQuestion = () => {
  if (questionIndex + 1 >= quizQuestions.length) {
    onCompleteQuiz(generateSessionReport());
  } else {
    setQuestionIndex(prev => prev + 1);
    // Cycle turn to next player in round-robin order
    setCurrentPlayerIndex(prev => (prev + 1) % players.length);
    setIsAnswerLocked(false);
    setShowExplanation(false);
  }
};`,
    },
    {
      title: "3. Vector PDF Document Generator",
      file: "src/utils/pdf.ts",
      language: "typescript",
      description: "Constructs clean multi-page A4 PDF documents with custom coordinates, color palettes, headers, and tables.",
      code: `export function generateQuizPDF(session: QuizSession): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Render Header Banner
  doc.setFillColor(16, 24, 32);
  doc.rect(margin, y, contentWidth, 24, 'F');
  doc.setTextColor(242, 239, 231);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('ERC ACADEMY — TENSE PRACTICE REPORT', margin + 6, y + 10);

  // Render Score Leaderboard
  session.players.forEach((player, idx) => {
    const accuracy = Math.round((player.score / session.totalQuestions) * 100);
    doc.text(\`\${idx + 1}. \${player.name} — \${player.score}/\${session.totalQuestions} (\${accuracy}%)\`, margin + 4, y);
    y += 8;
  });

  doc.save(\`tense-quiz-\${Date.now()}.pdf\`);
}`,
    },
    {
      title: "4. Resilient Local Storage Serialization",
      file: "src/utils/storage.ts",
      language: "typescript",
      description: "Provides type-safe JSON persistence with error trapping, default fallback values, and corruption recovery.",
      code: `export function safeGet<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(\`Error reading key "\${key}" from localStorage:\`, error);
    return defaultValue;
  }
}

export function safeSet<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(\`Error writing key "\${key}" to localStorage:\`, error);
    return false;
  }
}`,
    },
  ],
};

/**
 * Generate Complete Markdown Documentation String
 */
export function generateMarkdownDocumentation(): string {
  const doc = APP_DOCUMENTATION;

  let md = `# ${doc.meta.title}
**Version:** ${doc.meta.version} | **Release Date:** ${doc.meta.releaseDate} | **Institution:** ${doc.meta.institution}
**Architecture:** ${doc.meta.repositoryType} | **License:** ${doc.meta.license}

---

## 1. Executive Summary & Pedagogical Purpose

${doc.overview.summary}

### Core Pedagogical Objectives
${doc.overview.purpose.map((p) => `- ${p}`).join('\n')}

---

## 2. Comprehensive Feature Specification Matrix

`;

  doc.featureMatrix.forEach((cat, idx) => {
    md += `### 2.${idx + 1} ${cat.category}\n`;
    cat.features.forEach((f) => {
      md += `- ${f}\n`;
    });
    md += `\n`;
  });

  md += `---

## 3. Technology Stack & Architectural Specifications

| Component / Layer | Technology | Operational Responsibility |
| :--- | :--- | :--- |
`;

  doc.techStack.forEach((tech) => {
    md += `| **${tech.name}** | \`${tech.name}\` | ${tech.role} |\n`;
  });

  md += `\n---

## 4. Core Source Code Implementations & Architecture

`;

  doc.codeSnippets.forEach((snippet, idx) => {
    md += `### 4.${idx + 1} ${snippet.title}
*File: \`${snippet.file}\`*
${snippet.description}

\`\`\`${snippet.language}
${snippet.code}
\`\`\`

`;
  });

  md += `---

## 5. Deployment & Execution Guide

### Local Development
1. Clone repository or open in container workspace.
2. Install dependencies: \`npm install\`
3. Run development server: \`npm run dev\` (Binds to \`http://0.0.0.0:3000\`)

### Production Build
1. Compile assets: \`npm run build\`
2. Output directory: \`dist/\` (Production static single-page application)

---
*© ${new Date().getFullYear()} ERC Academy. All rights reserved.*
`;

  return md;
}

/**
 * Trigger browser download of Markdown Documentation file
 */
export function downloadMarkdownDocumentation(): void {
  const mdContent = generateMarkdownDocumentation();
  const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `ERC-Academy-Documentation-v2.4.0.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
