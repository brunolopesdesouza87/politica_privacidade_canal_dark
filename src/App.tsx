/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ShieldCheck,
  Database,
  Bot,
  Share2,
  Lock,
  UserCheck,
  Trash2,
  Baby,
  RefreshCw,
  Mail,
  FileText,
  Cpu,
  AlertTriangle,
  Award,
  Scale,
  Zap,
  ArrowUp,
  ExternalLink,
  Copy,
  Check,
  Search,
  Sparkles,
} from 'lucide-react';

import { AppConfig, DocumentType, Language, PolicySection } from './types/privacy';
import { defaultConfig } from './data/defaultConfig';
import { getPrivacySectionsPt, getTermsSectionsPt } from './data/privacyContentPt';
import { getPrivacySectionsEn, getTermsSectionsEn } from './data/privacyContentEn';

import { Header } from './components/Header';
import { ComplianceChecklist } from './components/ComplianceChecklist';
import { TableOfContents } from './components/TableOfContents';
import { MarkdownRenderer } from './components/MarkdownRenderer';
import { DataDeletionModal } from './components/DataDeletionModal';
import { VercelPlayStoreGuideModal } from './components/VercelPlayStoreGuideModal';
import { ConfigEditorModal } from './components/ConfigEditorModal';
import { Footer } from './components/Footer';

// Helper icon resolver
const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Database,
  Bot,
  Share2,
  Lock,
  UserCheck,
  Trash2,
  Baby,
  RefreshCw,
  Mail,
  FileText,
  Cpu,
  AlertTriangle,
  Award,
  Scale,
  Zap,
};

export default function App() {
  const [config, setConfig] = useState<AppConfig>(() => {
    try {
      const saved = localStorage.getItem('sanar_stark_privacy_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load saved config', e);
    }
    return defaultConfig;
  });

  const [activeDoc, setActiveDoc] = useState<DocumentType>('privacy');
  const [lang, setLang] = useState<Language>('pt');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSectionId, setActiveSectionId] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Modals
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  const isPt = lang === 'pt';

  // Save config changes
  const handleSaveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('sanar_stark_privacy_config', JSON.stringify(newConfig));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  };

  const handleResetConfig = () => {
    setConfig(defaultConfig);
    try {
      localStorage.removeItem('sanar_stark_privacy_config');
    } catch (e) {
      console.warn('Could not remove from localStorage', e);
    }
  };

  // Get raw sections based on language and doc type
  const rawSections: PolicySection[] = useMemo(() => {
    if (activeDoc === 'privacy') {
      return isPt ? getPrivacySectionsPt(config) : getPrivacySectionsEn(config);
    } else {
      return isPt ? getTermsSectionsPt(config) : getTermsSectionsEn(config);
    }
  }, [activeDoc, lang, config, isPt]);

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return rawSections;
    const q = searchQuery.toLowerCase();
    return rawSections.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.content.toLowerCase().includes(q) ||
        (s.badge && s.badge.toLowerCase().includes(q))
    );
  }, [rawSections, searchQuery]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sectionElements = rawSections
        .map((s) => ({ id: s.id, el: document.getElementById(s.id) }))
        .filter((item) => item.el !== null);

      const scrollPosition = window.scrollY + 180;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveSectionId(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [rawSections]);

  const handleSelectSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : config.websiteUrl;
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white flex flex-col font-sans">
      {/* Header */}
      <Header
        config={config}
        activeDoc={activeDoc}
        setActiveDoc={setActiveDoc}
        lang={lang}
        setLang={setLang}
        onOpenDeletion={() => setIsDeletionModalOpen(true)}
        onOpenGuide={() => setIsGuideModalOpen(true)}
        onOpenConfig={() => setIsConfigModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Compliance Checklist Alert */}
        <ComplianceChecklist
          lang={lang}
          onOpenGuide={() => setIsGuideModalOpen(true)}
          onOpenDeletion={() => setIsDeletionModalOpen(true)}
        />

        {/* Hero Section */}
        <div className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {activeDoc === 'privacy'
                  ? (isPt ? 'Documento Oficial de Privacidade' : 'Official Privacy Policy')
                  : (isPt ? 'Termos e Condições de Uso' : 'Terms of Service')}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {activeDoc === 'privacy'
                ? isPt
                  ? `Política de Privacidade do ${config.appName}`
                  : `${config.appName} Privacy Policy`
                : isPt
                  ? `Termos de Uso do ${config.appName}`
                  : `${config.appName} Terms of Service`}
            </h2>

            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              {isPt
                ? `Esta política estabelece os padrões de governança, tratamento de dados de inteligência artificial, automação de tarefas e segurança da informação aplicáveis ao aplicativo ${config.appName}. Em estrita conformidade com a LGPD e os requisitos do Google Play Console.`
                : `This document outlines data governance, artificial intelligence prompt handling, automation workflows, and information security standards for the ${config.appName} application. Aligned with LGPD, GDPR, and Google Play policies.`}
            </p>

            {/* Micro Metadata Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-slate-400">{isPt ? 'Última Revisão:' : 'Last Updated:'}</span>
                <span className="font-semibold text-white">{config.effectiveDate}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">Google Play Ready</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>HTTPS TLS 1.3 / AES-256</span>
              </div>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 font-semibold transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? (isPt ? 'Copiado!' : 'Copied!') : (isPt ? 'Copiar URL p/ Console' : 'Copy URL')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar TOC + Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Table of Contents */}
          <TableOfContents
            sections={rawSections}
            activeSectionId={activeSectionId}
            onSelectSection={handleSelectSection}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            lang={lang}
            config={config}
            onOpenDeletion={() => setIsDeletionModalOpen(true)}
          />

          {/* Main Body */}
          <div className="flex-1 w-full space-y-6">
            {filteredSections.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800">
                <Search className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">
                  {isPt ? 'Nenhuma seção encontrada' : 'No sections found'}
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  {isPt
                    ? `Nenhum resultado corresponde à busca "${searchQuery}".`
                    : `No content matching "${searchQuery}".`}
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white"
                >
                  {isPt ? 'Limpar filtro' : 'Clear filter'}
                </button>
              </div>
            ) : (
              filteredSections.map((section) => {
                const IconComponent = (section.iconName && iconMap[section.iconName]) || ShieldCheck;
                const isDeletionSection = section.id === 'exclusao-dados';

                return (
                  <article
                    key={section.id}
                    id={section.id}
                    className={`scroll-mt-28 rounded-2xl border transition-all duration-200 p-6 sm:p-8 ${
                      isDeletionSection
                        ? 'bg-slate-900/90 border-red-500/30 shadow-lg shadow-red-950/20'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-xl'
                    }`}
                  >
                    {/* Section Header */}
                    <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-800/80">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                            isDeletionSection
                              ? 'bg-red-500/10 border-red-500/30 text-red-400'
                              : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                            {section.title}
                          </h3>
                        </div>
                      </div>

                      {section.badge && (
                        <span
                          className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                            isDeletionSection
                              ? 'bg-red-500/10 border-red-500/30 text-red-300'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {section.badge}
                        </span>
                      )}
                    </div>

                    {/* Section Content */}
                    <div className="text-slate-300">
                      <MarkdownRenderer content={section.content} />
                    </div>

                    {/* Quick Action inside Deletion Section */}
                    {isDeletionSection && (
                      <div className="mt-6 pt-4 border-t border-red-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-red-950/20 p-4 rounded-xl border border-red-500/20">
                        <div className="text-xs text-red-200">
                          <p className="font-semibold">
                            {isPt
                              ? 'Precisa solicitar a remoção dos seus dados agora?'
                              : 'Need to submit your data deletion request right now?'}
                          </p>
                          <p className="text-slate-400 text-[11px]">
                            {isPt
                              ? 'Atendimento garantido em até 48h pela equipe técnica.'
                              : 'Response processed within 48h.'}
                          </p>
                        </div>
                        <button
                          onClick={() => setIsDeletionModalOpen(true)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-red-900/40 transition-colors shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{isPt ? 'Abrir Formulário de Exclusão' : 'Open Deletion Form'}</span>
                        </button>
                      </div>
                    )}
                  </article>
                );
              })
            )}

            {/* Bottom Play Store Help Banner */}
            <div className="rounded-2xl bg-gradient-to-r from-cyan-950/40 to-indigo-950/40 border border-cyan-500/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-white text-base">
                  {isPt ? 'Pronto para enviar para a Play Store?' : 'Ready to submit to the Play Store?'}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {isPt
                    ? 'Copie este link permanente ou consulte o guia passo a passo para o Google Play Console.'
                    : 'Copy this permanent URL or consult our step-by-step setup guide for the Google Play Console.'}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-md shadow-cyan-900/40 transition-colors"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? (isPt ? 'Copiado!' : 'Copied!') : (isPt ? 'Copiar Link' : 'Copy Link')}</span>
                </button>
                <button
                  onClick={() => setIsGuideModalOpen(true)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{isPt ? 'Ver Guia' : 'View Guide'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white shadow-xl shadow-cyan-950 border border-cyan-400/30 transition-all duration-300"
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Footer */}
      <Footer
        config={config}
        lang={lang}
        setActiveDoc={setActiveDoc}
        onOpenDeletion={() => setIsDeletionModalOpen(true)}
        onOpenGuide={() => setIsGuideModalOpen(true)}
      />

      {/* Modals */}
      <DataDeletionModal
        isOpen={isDeletionModalOpen}
        onClose={() => setIsDeletionModalOpen(false)}
        config={config}
        lang={lang}
      />

      <VercelPlayStoreGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        config={config}
        lang={lang}
      />

      <ConfigEditorModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        config={config}
        onSave={handleSaveConfig}
        onReset={handleResetConfig}
        lang={lang}
      />
    </div>
  );
}
