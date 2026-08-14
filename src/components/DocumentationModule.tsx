import React, { useState } from 'react';
import {
  FileText,
  Download,
  Copy,
  Check,
  Code2,
  Layers,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Cpu,
  Terminal,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import {
  APP_DOCUMENTATION,
  generateMarkdownDocumentation,
  downloadMarkdownDocumentation,
  CodeSnippetItem,
} from '../utils/documentationData';
import { generateAppDocumentationPDF } from '../utils/pdf';

interface DocumentationModuleProps {
  isDarkMode?: boolean;
  onClose?: () => void;
}

type DocSubTab = 'overview' | 'features' | 'architecture' | 'code' | 'markdown';

export const DocumentationModule: React.FC<DocumentationModuleProps> = ({
  isDarkMode = false,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<DocSubTab>('overview');
  const [copiedSnippetIdx, setCopiedSnippetIdx] = useState<number | null>(null);
  const [copiedAllMd, setCopiedAllMd] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const handleCopySnippet = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIdx(idx);
    setTimeout(() => setCopiedSnippetIdx(null), 2500);
  };

  const handleCopyAllMarkdown = () => {
    const md = generateMarkdownDocumentation();
    navigator.clipboard.writeText(md);
    setCopiedAllMd(true);
    setTimeout(() => setCopiedAllMd(false), 2500);
  };

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    try {
      generateAppDocumentationPDF();
    } catch (err) {
      console.error('Error compiling PDF manual:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* --- Main Header Banner Card --- */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDarkMode
            ? 'bg-[#182430] border-[#2A3B4A] text-[#F2EFE7]'
            : 'bg-white border-[#DBEAFE] text-[#0F172A] shadow-lg shadow-blue-900/5'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`p-3 rounded-2xl shrink-0 ${
                isDarkMode ? 'bg-[#E8A33D]/20 text-[#E8A33D]' : 'bg-[#EFF6FF] text-[#2563EB]'
              }`}
            >
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg md:text-xl font-heading font-black tracking-tight">
                  {APP_DOCUMENTATION.meta.title}
                </h2>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                    isDarkMode
                      ? 'bg-[#E8A33D]/20 text-[#E8A33D] border border-[#E8A33D]/30'
                      : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}
                >
                  v{APP_DOCUMENTATION.meta.version}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                    isDarkMode
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  Official Specification
                </span>
              </div>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'}`}>
                Comprehensive system manual, pedagogical rationale, feature breakdown, architecture, and source code reference.
              </p>
            </div>
          </div>

          {/* Quick Download Buttons */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            {/* PDF Download Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className={`px-3.5 py-2 rounded-xl text-xs font-heading font-extrabold flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer ${
                isDarkMode
                  ? 'bg-[#E8A33D] hover:bg-[#D69332] text-[#101820]'
                  : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white'
              }`}
              title="Generate and download multi-page PDF manual"
            >
              <Download className={`w-3.5 h-3.5 ${isGeneratingPdf ? 'animate-bounce' : ''}`} />
              <span>{isGeneratingPdf ? 'Compiling PDF...' : 'Download PDF Manual'}</span>
            </button>

            {/* Markdown Download Button */}
            <button
              onClick={downloadMarkdownDocumentation}
              className={`px-3 py-2 rounded-xl text-xs font-heading font-bold border transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                isDarkMode
                  ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7] hover:bg-[#2A3B4A]'
                  : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] hover:bg-[#EFF6FF]'
              }`}
              title="Download clean Markdown documentation file (.md)"
            >
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <span>Download (.md)</span>
            </button>

            {/* Copy Markdown to Clipboard */}
            <button
              onClick={handleCopyAllMarkdown}
              className={`px-3 py-2 rounded-xl text-xs font-heading font-bold border transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                copiedAllMd
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  : isDarkMode
                  ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7] hover:bg-[#2A3B4A]'
                  : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] hover:bg-[#EFF6FF]'
              }`}
              title="Copy entire documentation markdown text"
            >
              {copiedAllMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAllMd ? 'Copied!' : 'Copy Doc'}</span>
            </button>
          </div>
        </div>

        {/* Documentation Sub-Tab Navigation */}
        <div
          className={`flex items-center gap-1 mt-5 p-1 rounded-xl border overflow-x-auto ${
            isDarkMode ? 'bg-[#141E28] border-[#2A3B4A]' : 'bg-[#F1F5F9] border-[#E2E8F0]'
          }`}
        >
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 min-w-[110px] py-1.5 px-3 rounded-lg text-xs font-heading font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? isDarkMode
                  ? 'bg-[#E8A33D] text-[#101820]'
                  : 'bg-[#2563EB] text-white shadow-sm'
                : isDarkMode
                ? 'text-[#9AA5AE] hover:text-[#E8A33D]'
                : 'text-[#475569] hover:text-[#2563EB]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Overview & Purpose</span>
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className={`flex-1 min-w-[110px] py-1.5 px-3 rounded-lg text-xs font-heading font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'features'
                ? isDarkMode
                  ? 'bg-[#E8A33D] text-[#101820]'
                  : 'bg-[#2563EB] text-white shadow-sm'
                : isDarkMode
                ? 'text-[#9AA5AE] hover:text-[#E8A33D]'
                : 'text-[#475569] hover:text-[#2563EB]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>All Features</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex-1 min-w-[110px] py-1.5 px-3 rounded-lg text-xs font-heading font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'architecture'
                ? isDarkMode
                  ? 'bg-[#E8A33D] text-[#101820]'
                  : 'bg-[#2563EB] text-white shadow-sm'
                : isDarkMode
                ? 'text-[#9AA5AE] hover:text-[#E8A33D]'
                : 'text-[#475569] hover:text-[#2563EB]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture & Stack</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex-1 min-w-[110px] py-1.5 px-3 rounded-lg text-xs font-heading font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'code'
                ? isDarkMode
                  ? 'bg-[#E8A33D] text-[#101820]'
                  : 'bg-[#2563EB] text-white shadow-sm'
                : isDarkMode
                ? 'text-[#9AA5AE] hover:text-[#E8A33D]'
                : 'text-[#475569] hover:text-[#2563EB]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Core Code Snippets</span>
          </button>

          <button
            onClick={() => setActiveTab('markdown')}
            className={`flex-1 min-w-[110px] py-1.5 px-3 rounded-lg text-xs font-heading font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'markdown'
                ? isDarkMode
                  ? 'bg-[#E8A33D] text-[#101820]'
                  : 'bg-[#2563EB] text-white shadow-sm'
                : isDarkMode
                ? 'text-[#9AA5AE] hover:text-[#E8A33D]'
                : 'text-[#475569] hover:text-[#2563EB]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Markdown View</span>
          </button>
        </div>
      </div>

      {/* --- SUB-TAB 1: OVERVIEW & PURPOSE --- */}
      {activeTab === 'overview' && (
        <div className="space-y-4 animate-fade-in">
          <div
            className={`p-5 rounded-2xl border ${
              isDarkMode
                ? 'bg-[#182430] border-[#2A3B4A] text-[#F2EFE7]'
                : 'bg-white border-[#DBEAFE] text-[#0F172A]'
            }`}
          >
            <h3 className="text-base font-heading font-black mb-2 flex items-center gap-2">
              <BookOpen className={`w-4 h-4 ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}`} />
              <span>Executive Summary & Educational Vision</span>
            </h3>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-[#D0D7DE]' : 'text-[#334155]'}`}>
              {APP_DOCUMENTATION.overview.summary}
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border ${
              isDarkMode
                ? 'bg-[#182430] border-[#2A3B4A] text-[#F2EFE7]'
                : 'bg-white border-[#DBEAFE] text-[#0F172A]'
            }`}
          >
            <h3 className="text-base font-heading font-black mb-3 flex items-center gap-2">
              <Sparkles className={`w-4 h-4 ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}`} />
              <span>Key Pedagogical Objectives</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {APP_DOCUMENTATION.overview.purpose.map((item, idx) => {
                const [title, desc] = item.split(': ');
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
                      isDarkMode
                        ? 'bg-[#1F2E3C] border-[#2A3B4A]'
                        : 'bg-[#F8FAFC] border-[#E2E8F0]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-black text-[10px] shrink-0 mt-0.5 ${
                        isDarkMode
                          ? 'bg-[#E8A33D]/20 text-[#E8A33D]'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-heading font-extrabold">{title}</h4>
                      <p className={`text-[11px] leading-normal mt-0.5 ${isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'}`}>
                        {desc || title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* --- SUB-TAB 2: COMPLETE FEATURE MATRIX --- */}
      {activeTab === 'features' && (
        <div className="space-y-4 animate-fade-in">
          {APP_DOCUMENTATION.featureMatrix.map((cat, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border ${
                isDarkMode
                  ? 'bg-[#182430] border-[#2A3B4A] text-[#F2EFE7]'
                  : 'bg-white border-[#DBEAFE] text-[#0F172A]'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase ${
                    isDarkMode ? 'bg-[#E8A33D]/20 text-[#E8A33D]' : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  Section 2.{idx + 1}
                </span>
                <h3 className="text-sm md:text-base font-heading font-bold">{cat.category}</h3>
              </div>

              <div className="space-y-2">
                {cat.features.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                      isDarkMode
                        ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#D0D7DE]'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#334155]'
                    }`}
                  >
                    <ChevronRight className={`w-4 h-4 shrink-0 mt-0.5 ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}`} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- SUB-TAB 3: ARCHITECTURE & TECH STACK --- */}
      {activeTab === 'architecture' && (
        <div className="space-y-4 animate-fade-in">
          {/* Tech Stack Table Card */}
          <div
            className={`p-5 rounded-2xl border ${
              isDarkMode
                ? 'bg-[#182430] border-[#2A3B4A] text-[#F2EFE7]'
                : 'bg-white border-[#DBEAFE] text-[#0F172A]'
            }`}
          >
            <h3 className="text-base font-heading font-black mb-3 flex items-center gap-2">
              <Layers className={`w-4 h-4 ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}`} />
              <span>Technology Stack Specifications</span>
            </h3>

            <div className="divide-y divide-gray-200 dark:divide-[#2A3B4A] rounded-xl border overflow-hidden">
              {APP_DOCUMENTATION.techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                    idx % 2 === 0
                      ? isDarkMode ? 'bg-[#141E28]' : 'bg-[#F8FAFC]'
                      : isDarkMode ? 'bg-[#182430]' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#2563EB] dark:text-[#E8A33D]">
                      {tech.name}
                    </span>
                  </div>
                  <span className={`text-xs ${isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'}`}>
                    {tech.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Data Flow Card */}
          <div
            className={`p-5 rounded-2xl border ${
              isDarkMode
                ? 'bg-[#182430] border-[#2A3B4A] text-[#F2EFE7]'
                : 'bg-white border-[#DBEAFE] text-[#0F172A]'
            }`}
          >
            <h3 className="text-base font-heading font-black mb-2 flex items-center gap-2">
              <ShieldCheck className={`w-4 h-4 ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}`} />
              <span>Security, Privacy & Offline-First Persistence</span>
            </h3>
            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'}`}>
              The application executes in a zero-leakage, client-side container runtime. Passwords are never sent across network sockets; instead, they undergo browser-native SHA-256 digesting via the W3C Web Cryptography API. State persistence across sessions utilizes fault-tolerant JSON serialization in LocalStorage, preventing accidental data loss during network dropouts or browser refreshes.
            </p>
          </div>
        </div>
      )}

      {/* --- SUB-TAB 4: CORE CODE SNIPPETS --- */}
      {activeTab === 'code' && (
        <div className="space-y-4 animate-fade-in">
          {APP_DOCUMENTATION.codeSnippets.map((snippet: CodeSnippetItem, idx: number) => {
            const isCopied = copiedSnippetIdx === idx;
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border ${
                  isDarkMode
                    ? 'bg-[#182430] border-[#2A3B4A] text-[#F2EFE7]'
                    : 'bg-white border-[#DBEAFE] text-[#0F172A]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-sm font-heading font-black">{snippet.title}</h3>
                    <p className={`text-xs font-mono ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}`}>
                      {snippet.file}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopySnippet(snippet.code, idx)}
                    className={`self-start sm:self-center px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                      isCopied
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                        : isDarkMode
                        ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7] hover:bg-[#2A3B4A]'
                        : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] hover:bg-[#EFF6FF]'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Copy Snippet'}</span>
                  </button>
                </div>

                <p className={`text-xs mb-3 ${isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'}`}>
                  {snippet.description}
                </p>

                {/* Code Block */}
                <div className="relative rounded-xl overflow-hidden border border-[#2A3B4A]">
                  <div className="bg-[#101820] px-4 py-2 text-[10px] font-mono text-[#9AA5AE] border-b border-[#2A3B4A] flex items-center justify-between">
                    <span>{snippet.language.toUpperCase()}</span>
                    <span>{snippet.file}</span>
                  </div>
                  <pre className="p-4 bg-[#0B1117] text-[#E6EDF3] text-xs font-mono overflow-x-auto leading-relaxed">
                    <code>{snippet.code}</code>
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- SUB-TAB 5: RAW MARKDOWN PREVIEW --- */}
      {activeTab === 'markdown' && (
        <div
          className={`p-5 rounded-2xl border space-y-3 ${
            isDarkMode
              ? 'bg-[#182430] border-[#2A3B4A] text-[#F2EFE7]'
              : 'bg-white border-[#DBEAFE] text-[#0F172A]'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-heading font-black flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-500" />
              <span>Full Generated Markdown Spec</span>
            </h3>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyAllMarkdown}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {copiedAllMd ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAllMd ? 'Copied Markdown' : 'Copy All'}</span>
              </button>

              <button
                onClick={downloadMarkdownDocumentation}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border flex items-center gap-1.5 cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7]'
                    : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A]'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save .md</span>
              </button>
            </div>
          </div>

          <pre
            className={`p-4 rounded-xl text-xs font-mono leading-relaxed overflow-x-auto max-h-[500px] border ${
              isDarkMode
                ? 'bg-[#0E1720] border-[#2A3B4A] text-[#C9D1D9]'
                : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#1E293B]'
            }`}
          >
            {generateMarkdownDocumentation()}
          </pre>
        </div>
      )}
    </div>
  );
};
