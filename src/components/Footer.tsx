import React from 'react';
import { ShieldCheck, Heart, Mail, ExternalLink, Zap } from 'lucide-react';
import { AppConfig, Language, DocumentType } from '../types/privacy';

interface FooterProps {
  config: AppConfig;
  lang: Language;
  setActiveDoc: (doc: DocumentType) => void;
  onOpenDeletion: () => void;
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  lang,
  setActiveDoc,
  onOpenDeletion,
  onOpenGuide,
}) => {
  const isPt = lang === 'pt';
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 mt-16 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Zap className="w-4 h-4 fill-cyan-400/20" />
              </div>
              <span className="font-bold text-white text-base">{config.appName}</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">
                {config.appSubtitle}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-md">
              {isPt
                ? `Página oficial de conformidade jurídica e segurança da informação do aplicativo ${config.appName}, focada em automação de tarefas e inteligência artificial generativa. Em conformidade com o Google Play Console e a Lei Geral de Proteção de Dados (LGPD).`
                : `Official privacy and security compliance documentation for ${config.appName}, an automation and generative artificial intelligence application. Compliant with Google Play Store policies and LGPD.`}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              {isPt ? 'Documentos Legais' : 'Legal Documents'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveDoc('privacy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {isPt ? 'Política de Privacidade' : 'Privacy Policy'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveDoc('terms');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {isPt ? 'Termos de Uso' : 'Terms of Service'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDeletion}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  {isPt ? 'Solicitar Exclusão de Dados' : 'Request Data Deletion'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGuide}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {isPt ? 'Guia Play Console & Vercel' : 'Play Store Setup Guide'}
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Contact */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              {isPt ? 'Contato & DPO' : 'Contact & DPO'}
            </h4>
            <p className="text-xs text-slate-400">
              {isPt ? 'Desenvolvedor:' : 'Developer:'} <span className="text-slate-200">{config.developerName}</span>
            </p>
            <p className="text-xs text-slate-400">
              {isPt ? 'Suporte:' : 'Support:'}{' '}
              <a href={`mailto:${config.supportEmail}`} className="text-cyan-400 hover:underline">
                {config.supportEmail}
              </a>
            </p>
            <p className="text-xs text-slate-400">
              {isPt ? 'Canal DPO:' : 'DPO Channel:'}{' '}
              <a href={`mailto:${config.dpoEmail}`} className="text-cyan-400 hover:underline">
                {config.dpoEmail}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {year} {config.appName} — {config.developerName}. {isPt ? 'Todos os direitos reservados.' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isPt ? 'Conformidade LGPD (Lei 13.709/18)' : 'LGPD & GDPR Compliant'}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
