import jsPDF from 'jspdf';
import { QuizSession } from '../types';

/**
 * PDF Report Generator
 * 
 * Programmatically builds a clean PDF report using jsPDF, bypassing browser print dialogs.
 * Direct save triggers a clean file download.
 */
export function generateQuizPDF(session: QuizSession): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  let y = margin;

  // Colors
  const darkBg: [number, number, number] = [16, 24, 32];
  const amberColor: [number, number, number] = [232, 163, 61];
  const tealColor: [number, number, number] = [79, 184, 166];
  const redColor: [number, number, number] = [217, 83, 79];
  const textDark: [number, number, number] = [40, 50, 60];
  const textDim: [number, number, number] = [110, 120, 130];

  // Helper for adding new page if y exceeds threshold
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      // Header accent line on new page
      doc.setDrawColor(...amberColor);
      doc.setLineWidth(0.8);
      doc.line(margin, y, pageWidth - margin, y);
      y += 6;
    }
  };

  // --- Header Card ---
  doc.setFillColor(...darkBg);
  doc.rect(margin, y, contentWidth, 24, 'F');

  doc.setTextColor(242, 239, 231);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('IN PROGRESS — TENSE PRACTICE REPORT', margin + 6, y + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(154, 165, 174);
  const formattedDate = new Date(session.date).toLocaleString();
  const mins = Math.floor(session.elapsedSeconds / 60);
  const secs = session.elapsedSeconds % 60;
  const timeStr = `${mins}m ${secs}s`;
  doc.text(`Date: ${formattedDate}   |   Duration: ${timeStr}   |   Questions: ${session.totalQuestions}`, margin + 6, y + 18);

  y += 30;

  // --- Leaderboard Section ---
  doc.setTextColor(...textDark);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('1. Player Performance & Leaderboard', margin, y);
  y += 6;

  // Draw Leaderboard Table Header
  doc.setFillColor(240, 243, 246);
  doc.rect(margin, y, contentWidth, 8, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 70, 80);

  doc.text('Rank', margin + 4, y + 5.5);
  doc.text('Player Name', margin + 20, y + 5.5);
  doc.text('Score', margin + 85, y + 5.5);
  doc.text('Accuracy', margin + 115, y + 5.5);
  doc.text('Missed', margin + 150, y + 5.5);

  y += 8;

  // Table rows
  doc.setFont('helvetica', 'normal');
  const sortedPlayers = [...session.players].sort((a, b) => b.correct - a.correct);

  sortedPlayers.forEach((player, idx) => {
    checkPageBreak(8);

    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y, contentWidth, 7, 'F');
    }

    doc.setTextColor(...textDark);
    doc.text(`#${idx + 1}`, margin + 4, y + 5);
    doc.text(player.name, margin + 20, y + 5);

    const playerTotal = player.correct + player.wrong;
    const accuracy = playerTotal > 0 ? Math.round((player.correct / playerTotal) * 100) : 0;

    doc.text(`${player.correct} / ${playerTotal}`, margin + 85, y + 5);
    doc.text(`${accuracy}%`, margin + 115, y + 5);
    doc.text(`${player.wrong}`, margin + 150, y + 5);

    y += 7;
  });

  y += 8;

  // --- Missed Questions Review Section ---
  checkPageBreak(15);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...textDark);
  doc.text(`2. Error Review & Grammar Notes (${session.missedQuestions.length} missed)`, margin, y);
  y += 6;

  if (session.missedQuestions.length === 0) {
    checkPageBreak(15);
    doc.setFillColor(235, 248, 245);
    doc.rect(margin, y, contentWidth, 12, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...tealColor);
    doc.text('Perfect score! Zero errors recorded during this practice run.', margin + 6, y + 7.5);
    y += 18;
  } else {
    session.missedQuestions.forEach((mq, idx) => {
      // Estimate height needed for question card
      const qLines = doc.splitTextToSize(`Q${idx + 1}: ${mq.questionText}`, contentWidth - 12);
      const noteLines = doc.splitTextToSize(`Grammar Note: ${mq.note}`, contentWidth - 12);
      
      const cardHeight = 16 + (qLines.length * 4) + 10 + (noteLines.length * 4);

      checkPageBreak(cardHeight + 4);

      // Card border and background
      doc.setDrawColor(220, 226, 232);
      doc.setFillColor(252, 253, 254);
      doc.roundedRect(margin, y, contentWidth, cardHeight, 2, 2, 'FD');

      let cardY = y + 5;

      // Question text
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(20, 30, 40);
      doc.text(qLines, margin + 6, cardY);
      cardY += qLines.length * 4.5 + 2;

      // Player and answers row
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);

      doc.setTextColor(...textDim);
      doc.text(`Player on the spot: `, margin + 6, cardY);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...textDark);
      doc.text(mq.playerName, margin + 35, cardY);

      cardY += 5;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...redColor);
      doc.text(`Chosen (Incorrect): ${mq.chosenAnswer}`, margin + 6, cardY);

      doc.setTextColor(...tealColor);
      doc.setFont('helvetica', 'bold');
      doc.text(`Correct: ${mq.correctAnswer}`, margin + 95, cardY);

      cardY += 6;

      // Grammar note box inside card
      doc.setFillColor(245, 247, 250);
      doc.rect(margin + 4, cardY - 2, contentWidth - 8, noteLines.length * 4 + 4, 'F');

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(70, 80, 95);
      doc.text(noteLines, margin + 6, cardY + 2);

      y += cardHeight + 4;
    });
  }

  // --- Footer Page Numbers ---
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(140, 150, 160);
    doc.text(`"In Progress" English Tense Practice Quiz — Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 8, { align: 'center' });
  }

  // Save PDF to trigger browser file download
  const dateStr = new Date(session.date).toISOString().slice(0, 10);
  doc.save(`tense-quiz-${dateStr}.pdf`);
}

/**
 * Generate Complete Application Documentation PDF
 * Builds a publication-quality multi-page PDF covering purpose, features, architecture, and code snippets.
 */
export function generateAppDocumentationPDF(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  let y = margin;

  // Visual Theme Colors
  const darkBg: [number, number, number] = [16, 24, 32];
  const amberColor: [number, number, number] = [232, 163, 61];
  const blueColor: [number, number, number] = [37, 99, 235];
  const textDark: [number, number, number] = [15, 23, 42];
  const textDim: [number, number, number] = [71, 85, 105];

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin - 12) {
      doc.addPage();
      y = margin;
      // Header accent on subsequent pages
      doc.setDrawColor(...amberColor);
      doc.setLineWidth(0.8);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;
    }
  };

  // --- 1. Cover / Executive Header Banner ---
  doc.setFillColor(...darkBg);
  doc.rect(margin, y, contentWidth, 28, 'F');

  doc.setTextColor(242, 239, 231);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('ERC ACADEMY: SYSTEM & PEDAGOGY SPECIFICATION', margin + 6, y + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(232, 163, 61);
  doc.text('English Tense Quiz & Grammar Master  |  Comprehensive Documentation & Code Manual', margin + 6, y + 17);

  doc.setTextColor(154, 165, 174);
  doc.setFontSize(7.5);
  doc.text(`Version: 2.4.0  |  Generated: ${new Date().toLocaleDateString()}  |  Stack: React 18 + TypeScript + Vite + Tailwind`, margin + 6, y + 23);

  y += 36;

  // --- 2. Executive Summary & Purpose ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...textDark);
  doc.text('1. App Purpose & Pedagogical Methodology', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...textDim);

  const summary =
    'The ERC Academy English Tense Quiz & Grammar Master is an interactive pedagogical web application developed for ESL/EFL academies, secondary education, and exam preparation (IELTS, TOEFL, FCE). It addresses chronic grammatical pitfalls, tense discrimination, and preposition collocation errors identified in classical linguistics research through active recall, spaced item randomisation, and real-time turn-based multiplayer mechanics.';

  const summaryLines = doc.splitTextToSize(summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 4.2 + 4;

  // Key Objectives Bullet Points
  const objectives = [
    'Remediation of Chronic Errors: Focus on high-frequency error pairs (e.g. borrow/lend, steal/rob, past perfect vs simple past).',
    'Interactive Round-Robin Multiplayer: Turn-based engagement for classroom pods with individual player score accountability.',
    'Dual Assessment Modes: Instant Feedback Mode (explains grammatical rationale immediately) vs Exam Mode (summative results).',
    'Client-Side Security: Native Web Crypto SHA-256 password hashing and role-based access control (Admin, Teacher, Student).',
    'Offline-First & Zero Friction: Vector-grade instant PDF reporting and resilient client persistence.',
  ];

  objectives.forEach((obj) => {
    checkPageBreak(8);
    const objLines = doc.splitTextToSize(`• ${obj}`, contentWidth - 4);
    doc.text(objLines, margin + 2, y);
    y += objLines.length * 3.8 + 1.5;
  });

  y += 4;

  // --- 3. Complete Feature Breakdown Matrix ---
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...textDark);
  doc.text('2. Comprehensive Feature Matrix', margin, y);
  y += 5;

  const features = [
    {
      cat: 'Grammar Modules',
      items: '20+ specialized categories, 3,200+ lines of vetted question banks, detailed explanation notes, and distractor analysis.',
    },
    {
      cat: 'Multiplayer Engine',
      items: '1-6 players with custom color identifiers, smart turn rotation, individual accuracy tracking, and leaderboard rankings.',
    },
    {
      cat: 'Timer & Pace Control',
      items: 'Configurable countdowns (10s, 15s, 20s, 30s) or untimed mode; question counts from 5 to 30 or full pool practice.',
    },
    {
      cat: 'User Access Governance',
      items: 'SHA-256 hashed authentication, dynamic account creation, password resets, active/disabled status gating, and user search.',
    },
    {
      cat: 'Vector PDF Engine',
      items: 'One-click client-side PDF generation for test reports, student scorecards, and complete technical manuals.',
    },
    {
      cat: 'Responsive Theme UX',
      items: 'Dual-theme engine (Tailwind Royal Blue light mode & Warm Amber charcoal dark mode) designed for mobile, tablet, and desktop.',
    },
  ];

  features.forEach((f) => {
    checkPageBreak(12);
    doc.setFillColor(248, 250, 252);
    doc.rect(margin, y, contentWidth, 8.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...blueColor);
    doc.text(f.cat, margin + 2, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...textDark);
    const itemLines = doc.splitTextToSize(f.items, contentWidth - 45);
    doc.text(itemLines, margin + 42, y + 5);
    y += 10.5;
  });

  y += 4;

  // --- 4. Technical Architecture & Tech Stack ---
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...textDark);
  doc.text('3. Technical Architecture & Technology Stack', margin, y);
  y += 5;

  const techRows = [
    ['React 18 & Hooks', 'Component trees, state lifecycles (useState, useEffect, useMemo, useRef)'],
    ['TypeScript 5', 'Static typing, data models (UserAccount, QuizSession, Question), enum contracts'],
    ['Vite', 'Ultra-fast HMR dev server and optimized production build output'],
    ['Tailwind CSS', 'Responsive utility classes, theme tokens, fluid typography, and custom animations'],
    ['Web Crypto API', 'Native browser-level SHA-256 password hashing without third-party heavy dependencies'],
    ['jsPDF', 'Pure client-side programmatic vector PDF canvas drawing and report compilation'],
  ];

  techRows.forEach(([tech, role]) => {
    checkPageBreak(6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...textDark);
    doc.text(`• ${tech}:`, margin + 2, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textDim);
    doc.text(role, margin + 40, y);
    y += 4.5;
  });

  y += 4;

  // --- 5. Core Code Implementations (Key Snippets) ---
  checkPageBreak(35);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...textDark);
  doc.text('4. Core Code Highlights & Implementation Patterns', margin, y);
  y += 6;

  // Snippet 1: Cryptographic Authentication
  checkPageBreak(40);
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...blueColor);
  doc.text('A. Web Crypto SHA-256 Password Verification (src/utils/crypto.ts)', margin + 3, y + 4.2);
  y += 8;

  const code1 = [
    "export async function hashSHA256(text: string): Promise<string> {",
    "  const encoder = new TextEncoder();",
    "  const data = encoder.encode(text.trim());",
    "  const hashBuffer = await crypto.subtle.digest('SHA-256', data);",
    "  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');",
    "}",
    "",
    "export async function verifyCredentialsDetailed(username: string, pass: string): Promise<LoginResult> {",
    "  const accounts = await getUserAccounts();",
    "  const user = accounts.find(u => u.username.toLowerCase() === username.trim().toLowerCase());",
    "  if (!user) return { success: false, reason: 'invalid' };",
    "  if (user.status === 'disabled') return { success: false, reason: 'disabled', user };",
    "  const passHash = await hashSHA256(pass);",
    "  return user.passwordHash === passHash ? { success: true, user } : { success: false, reason: 'invalid' };",
    "}"
  ];

  doc.setFillColor(20, 28, 38);
  doc.rect(margin, y, contentWidth, code1.length * 3.4 + 4, 'F');
  doc.setFont('courier', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(242, 239, 231);
  code1.forEach((line, i) => {
    doc.text(line, margin + 3, y + 3.8 + i * 3.4);
  });
  y += code1.length * 3.4 + 8;

  // Snippet 2: Round Robin Quiz Turn Advancement
  checkPageBreak(40);
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...blueColor);
  doc.text('B. Multiplayer Round-Robin Turn Advancement (src/components/QuizScreen.tsx)', margin + 3, y + 4.2);
  y += 8;

  const code2 = [
    "const advanceToNextQuestion = () => {",
    "  if (questionIndex + 1 >= quizQuestions.length) {",
    "    onCompleteQuiz(generateSessionReport());",
    "  } else {",
    "    setQuestionIndex(prev => prev + 1);",
    "    // Cycle active player index in round-robin order",
    "    setCurrentPlayerIndex(prev => (prev + 1) % players.length);",
    "    setIsAnswerLocked(false);",
    "    setShowExplanation(false);",
    "  }",
    "};"
  ];

  doc.setFillColor(20, 28, 38);
  doc.rect(margin, y, contentWidth, code2.length * 3.4 + 4, 'F');
  doc.setFont('courier', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(242, 239, 231);
  code2.forEach((line, i) => {
    doc.text(line, margin + 3, y + 3.8 + i * 3.4);
  });
  y += code2.length * 3.4 + 8;

  // --- Footer Page Numbers ---
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(140, 150, 160);
    doc.text(
      `ERC Academy Documentation Manual — v2.4.0 — Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 7,
      { align: 'center' }
    );
  }

  doc.save('ERC-Academy-App-Documentation-v2.4.0.pdf');
}

