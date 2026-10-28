import React from 'react';
import { Search, ChevronRight, Hash, Mail, ShieldAlert } from 'lucide-react';
import { PolicySection, Language, AppConfig } from '../types/privacy';

interface TableOfContentsProps {
  sections: PolicySection[];
  activeSectionId: string;
  onSelectSection: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  lang: Language;
  config: AppConfig;
  onOpenDeletion: () => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  activeSectionId,
  onSelectSection,
  searchQuery,
  setSearchQuery,
  lang,
  config,
  onOpenDeletion,
}) => {
  const isPt = lang === 'pt';

  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0">
      <div className="sticky top-24 space-y-4">
        {/* Search Box */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isPt
                ? 'Buscar termo (ex: IA, exclusão, LGPD)...'
                : 'Search terms (e.g., AI, deletion, data)...'
            }
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Navigation Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isPt ? 'Índice de Seções' : 'Table of Contents'}</span>
            </h2>
            <span className="text-[11px] text-slate-500 font-mono">
              {sections.length} {isPt ? 'tópicos' : 'topics'}
            </span>
          </div>

          <nav className="space-y-1 max-h-[55vh] overflow-y-auto pr-1">
            {sections.map((section) => {
              const isActive = activeSectionId === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => onSelectSection(section.id)}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-300 font-semibold border-l-2 border-cyan-400 pl-3'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="truncate mr-2">{section.title}</span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isActive ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Info & Deletion Callout */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-4 text-xs space-y-3">
          <div className="flex items-start gap-2.5">
            <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">
                {isPt ? 'Canal Oficial de Atendimento' : 'Official Support Channel'}
              </p>
              <a
                href={`mailto:${config.supportEmail}`}
                className="text-cyan-400 hover:text-cyan-300 underline font-mono text-[11px] break-all block mt-0.5"
              >
                {config.supportEmail}
              </a>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">
              {isPt ? 'Exigência Play Store:' : 'Play Store Requirement:'}
            </span>
            <button
              onClick={onOpenDeletion}
              className="text-red-400 hover:text-red-300 font-semibold underline text-[11px] flex items-center gap-1"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>{isPt ? 'Exclusão Web' : 'Web Deletion'}</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
