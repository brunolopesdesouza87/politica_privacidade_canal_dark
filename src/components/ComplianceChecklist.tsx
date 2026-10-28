import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, CheckCircle, ExternalLink, HelpCircle } from 'lucide-react';
import { Language } from '../types/privacy';

interface ComplianceChecklistProps {
  lang: Language;
  onOpenGuide: () => void;
  onOpenDeletion: () => void;
}

export const ComplianceChecklist: React.FC<ComplianceChecklistProps> = ({
  lang,
  onOpenGuide,
  onOpenDeletion,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isPt = lang === 'pt';

  const items = isPt
    ? [
        {
          label: 'URL Pública Acessível sem Login',
          desc: 'Acessível livremente por usuários e robôs avaliadores do Google Play sem bloqueio de tela ou autenticação.',
        },
        {
          label: 'Identificação Clara do App e Desenvolvedor',
          desc: 'Nome do app "Sanar Stark", propósito de automação e dados de contato do desenvolvedor destacados no texto.',
        },
        {
          label: 'Uso de IA e Prompts Detalhado',
          desc: 'Declaração expressa de confidencialidade, não venda de dados e isolamento contra treinamento público sem autorização.',
        },
        {
          label: 'Mapeamento de Terceiros e SDKs',
          desc: 'Google Play Services, Firebase Crashlytics e APIs de inferência devidamente listados com links para suas políticas.',
        },
        {
          label: 'Mecanismo Web de Exclusão de Conta (Obrigatório Play Store)',
          desc: 'Formulário direto web e botão interativo para solicitação de expurgo de dados sem obrigar a reinstalação do app.',
        },
        {
          label: 'Política para Crianças (COPPA & Família)',
          desc: 'Declaração explícita de não direcionamento intencional a menores de 13 anos.',
        },
        {
          label: 'Canal Oficial do Encarregado (DPO / LGPD)',
          desc: 'E-mail oficial de contato para exercício de direitos do titular de dados (Art. 18 da Lei 13.709/2018).',
        },
        {
          label: 'Criptografia em Trânsito (HTTPS / TLS) e Repouso',
          desc: 'Conformidade com a seção de Segurança dos Dados (Data Safety) do Google Play Console.',
        },
      ]
    : [
        {
          label: 'Publicly Accessible URL without Login',
          desc: 'Freely crawlable by Google review bots without paywalls or authentication gates.',
        },
        {
          label: 'Clear App & Developer Identification',
          desc: 'Official "Sanar Stark" app name, automation domain, and developer contact verified.',
        },
        {
          label: 'AI Model & Prompt Handling Clause',
          desc: 'Explicit declaration of confidentiality, zero sale of data, and public model training exemption.',
        },
        {
          label: 'Third-Party Services & SDK Mapping',
          desc: 'Google Play Services, Firebase Diagnostics, and AI inference providers outlined.',
        },
        {
          label: 'Web-Based Account Deletion Pathway (Play Store Requirement)',
          desc: 'Interactive in-page form satisfying Play Store 2023+ requirement to allow data deletion without app reinstallation.',
        },
        {
          label: 'Children\'s Privacy Protection (COPPA)',
          desc: 'Not targeted towards children under 13 years of age.',
        },
        {
          label: 'DPO & Official Contact Channels',
          desc: 'Verified email channel to exercise statutory data rights under LGPD / GDPR.',
        },
        {
          label: 'End-to-End Encryption in Transit (TLS) & Rest',
          desc: 'Matches all Google Play Console Data Safety questionnaire declarations.',
        },
      ];

  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-cyan-950/40 border border-emerald-500/30 p-4 sm:p-5 shadow-lg backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% VERIFICADO
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {isPt ? 'Conformidade Google Play Console & LGPD' : 'Google Play Console & Privacy Compliance'}
              </h3>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {isPt
                ? 'Todos os 8 requisitos obrigatórios do Google Play estão atendidos nesta página.'
                : 'All 8 mandatory Google Play Store policy checkpoints are satisfied.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={onOpenGuide}
            className="px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>{isPt ? 'Como usar no Console' : 'How to use in Console'}</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <span>{isOpen ? (isPt ? 'Recolher' : 'Hide') : (isPt ? 'Ver Checklist' : 'Checklist')}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80 flex items-start gap-2.5"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-200">{item.label}</p>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}

          <div className="col-span-full mt-2 flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px]">
            <span className="text-slate-400">
              {isPt
                ? 'Exigência Play Store: O link de exclusão de dados web deve funcionar sem login.'
                : 'Play Store rule: The web data deletion request must be accessible without login.'}
            </span>
            <button
              onClick={onOpenDeletion}
              className="text-red-400 hover:text-red-300 font-semibold underline"
            >
              {isPt ? 'Testar Mecanismo de Exclusão Web' : 'Test Web Deletion Mechanism'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
