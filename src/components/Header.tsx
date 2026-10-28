import React, { useState } from 'react';
import {
  Shield,
  Bot,
  Zap,
  Copy,
  Check,
  Printer,
  Sliders,
  ExternalLink,
  Trash2,
  Globe2,
  FileText,
  BookOpen,
} from 'lucide-react';
import { AppConfig, DocumentType, Language } from '../types/privacy';

interface HeaderProps {
  config: AppConfig;
  activeDoc: DocumentType;
  setActiveDoc: (doc: DocumentType) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenDeletion: () => void;
  onOpenGuide: () => void;
  onOpenConfig: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  activeDoc,
  setActiveDoc,
  lang,
  setLang,
  onOpenDeletion,
  onOpenGuide,
  onOpenConfig,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const isPt = lang === 'pt';

  const handleCopyLink = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : config.websiteUrl;
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
      {/* Top micro bar for Play Store URL quick notice */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-cyan-950 px-4 py-1.5 text-xs border-b border-slate-800/60 hidden sm:flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            {isPt
              ? 'URL Pronta para o Google Play Console & Hospedagem na Vercel'
              : 'Production URL Ready for Google Play Console & Vercel'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenGuide}
            className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 font-medium"
          >
            <span>{isPt ? 'Como colar no Console' : 'Console Setup Guide'}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={onOpenConfig}
            className="text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
          >
            <Sliders className="w-3 h-3" />
            <span>{isPt ? 'Personalizar' : 'Customize'}</span>
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* App Title & Badge */}
        <div className="flex items-center gap-3.5">
          <div className="relative group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-violet-600 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <div className="relative">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 fill-cyan-400/20" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-indigo-400" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>{config.appName}</span>
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                {config.appSubtitle}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>{config.developerName}</span>
              <span>•</span>
              <span>{isPt ? 'Vigência:' : 'Effective:'} {config.effectiveDate}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
          {/* Doc Switcher (Privacy / Terms) */}
          <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center">
            <button
              onClick={() => setActiveDoc('privacy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeDoc === 'privacy'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{isPt ? 'Privacidade' : 'Privacy'}</span>
            </button>
            <button
              onClick={() => setActiveDoc('terms')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeDoc === 'terms'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isPt ? 'Termos' : 'Terms'}</span>
            </button>
          </div>

          {/* Language Switcher */}
          <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center">
            <button
              onClick={() => setLang('pt')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                lang === 'pt'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Português (Brasil)"
            >
              PT
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                lang === 'en'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Copy Play Store Link Button */}
          <button
            onClick={handleCopyLink}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              copiedLink
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-900/30'
            }`}
            title="Copiar URL para o campo do Google Play Console"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {copiedLink
                ? (isPt ? 'Link Copiado!' : 'Link Copied!')
                : (isPt ? 'Copiar Link p/ Play Store' : 'Copy Play Store URL')}
            </span>
            <span className="sm:hidden">{copiedLink ? 'Copiado!' : 'Copiar'}</span>
          </button>

          {/* Data Deletion Request (Play Store 2023+ requirement) */}
          <button
            onClick={onOpenDeletion}
            className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-300 hover:text-red-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Solicitar Exclusão de Dados (Exigência Play Store)"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden lg:inline">{isPt ? 'Excluir Dados' : 'Delete Data'}</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Imprimir / Salvar em PDF"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
