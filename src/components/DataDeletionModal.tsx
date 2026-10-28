import React, { useState } from 'react';
import { X, Trash2, AlertTriangle, CheckCircle2, Copy, Send, ShieldAlert, ArrowRight } from 'lucide-react';
import { AppConfig, Language } from '../types/privacy';

interface DataDeletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  lang: Language;
}

export const DataDeletionModal: React.FC<DataDeletionModalProps> = ({
  isOpen,
  onClose,
  config,
  lang,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [deleteDataScope, setDeleteDataScope] = useState<'all' | 'prompts_only'>('all');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isPt = lang === 'pt';

  const mailSubject = encodeURIComponent(
    isPt
      ? `[Exclusão de Dados] Solicitação - ${config.appName} (${email})`
      : `[Data Deletion] Request - ${config.appName} (${email})`
  );

  const mailBody = encodeURIComponent(
    isPt
      ? `Olá equipe de suporte do ${config.appName},

Venho por meio deste solicitar formalmente a exclusão da minha conta e de todos os meus dados pessoais associados ao aplicativo ${config.appName}, conforme os termos da LGPD e as políticas do Google Play.

Detalhes da Solicitação:
- Nome completo: ${name || 'Não informado'}
- E-mail associado à conta: ${email}
- Escopo da exclusão: ${deleteDataScope === 'all' ? 'Exclusão completa de conta e todos os dados' : 'Exclusão de prompts e histórico de automações apenas'}
- Motivo (opcional): ${reason || 'Não informado'}

Declaro ciência de que esta ação é irreversível e que meus fluxos e créditos serão desativados.

Atenciosamente,
${name || email}`
      : `Hello ${config.appName} Support Team,

I hereby formally request the deletion of my account and all associated personal data in ${config.appName}, pursuant to applicable privacy laws and Google Play policies.

Request details:
- Full Name: ${name || 'N/A'}
- Registered Email: ${email}
- Deletion Scope: ${deleteDataScope === 'all' ? 'Complete deletion of account and all data' : 'AI prompts & automation logs only'}
- Reason: ${reason || 'N/A'}

I acknowledge this action is permanent.

Regards,
${name || email}`
  );

  const mailtoLink = `mailto:${config.supportEmail}?subject=${mailSubject}&body=${mailBody}`;

  const handleCopyText = () => {
    const rawText = isPt
      ? `Solicitação de Exclusão de Dados - ${config.appName}\nNome: ${name || 'Não informado'}\nE-mail: ${email}\nEscopo: ${deleteDataScope}\nMotivo: ${reason || 'N/A'}`
      : `Data Deletion Request - ${config.appName}\nName: ${name || 'N/A'}\nEmail: ${email}\nScope: ${deleteDataScope}\nReason: ${reason || 'N/A'}`;

    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    // Open email client
    window.location.href = mailtoLink;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-red-500/30 rounded-2xl shadow-2xl shadow-red-950/40 p-6 sm:p-8 text-slate-100 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
            <Trash2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
              {isPt ? 'Exigência Google Play & LGPD' : 'Google Play & Privacy Law'}
            </span>
            <h3 className="text-xl font-bold text-white">
              {isPt ? 'Solicitação de Exclusão de Conta e Dados' : 'Account & Data Deletion Request'}
            </h3>
          </div>
        </div>

        {!submitted ? (
          <>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {isPt
                ? `Você pode solicitar a exclusão definitiva da sua conta no aplicativo ${config.appName} e de todo o histórico associado (prompts de IA, rotinas de automação e dados de perfil) sem precisar reinstalar o app.`
                : `You may request the permanent deletion of your ${config.appName} account and all associated data (AI prompt history, automation workflows, and profile info) without reinstalling the app.`}
            </p>

            {/* Warning Box */}
            <div className="bg-red-950/30 border border-red-500/20 rounded-xl p-3.5 mb-5 flex items-start gap-3 text-xs text-red-200">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-300 mb-0.5">
                  {isPt ? 'Atenção: Ação Irreversível' : 'Warning: Irreversible Action'}
                </p>
                <p>
                  {isPt
                    ? 'A remoção expurgará permanentemente seus dados em até 15 dias úteis. Conforme o Marco Civil da Internet (Lei 12.965/14, Art. 15), logs de conexão são retidos sob sigilo pelo período legal obrigatório de 6 meses.'
                    : 'Data is permanently purged within 15 business days. Statutory security logs are retained strictly under judicial protection for 6 months as required by law.'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {isPt ? 'E-mail cadastrado no aplicativo (Obrigatório)*' : 'Registered App Email (Required)*'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu-email@exemplo.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {isPt ? 'Nome completo (opcional)' : 'Full name (optional)'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {isPt ? 'Escopo da exclusão desejada' : 'Desired Deletion Scope'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label
                    onClick={() => setDeleteDataScope('all')}
                    className={`cursor-pointer border rounded-lg p-3 transition-all flex flex-col justify-between ${
                      deleteDataScope === 'all'
                        ? 'border-red-500 bg-red-950/20 text-white'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-semibold text-slate-200">
                      {isPt ? 'Exclusão Total' : 'Total Deletion'}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1">
                      {isPt ? 'Conta, histórico de IA, credenciais e automações' : 'Account, AI logs, credentials & workflows'}
                    </span>
                  </label>

                  <label
                    onClick={() => setDeleteDataScope('prompts_only')}
                    className={`cursor-pointer border rounded-lg p-3 transition-all flex flex-col justify-between ${
                      deleteDataScope === 'prompts_only'
                        ? 'border-cyan-500 bg-cyan-950/20 text-white'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-semibold text-slate-200">
                      {isPt ? 'Apenas Prompts & IA' : 'AI Prompts Only'}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1">
                      {isPt ? 'Limpar apenas histórico de conversas e execuções' : 'Clear conversation and execution logs only'}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {isPt ? 'Motivo (opcional)' : 'Reason (optional)'}
                </label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={
                    isPt
                      ? 'Ex: Não utilizo mais o aplicativo, privacidade, etc.'
                      : 'E.g., No longer using the service, privacy preference, etc.'
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-400 transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  disabled={!email}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isPt ? 'Enviar Solicitação via E-mail' : 'Send Request via Email'}
                </button>

                <button
                  type="button"
                  onClick={handleCopyText}
                  className="py-2.5 px-4 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-800 hover:bg-slate-750 text-slate-200 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {copied
                    ? isPt ? 'Copiado!' : 'Copied!'
                    : isPt ? 'Copiar Texto' : 'Copy Text'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">
              {isPt ? 'Solicitação Iniciada com Sucesso!' : 'Request Successfully Initiated!'}
            </h4>
            <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
              {isPt
                ? `O cliente de e-mail foi acionado para envio ao canal oficial (${config.supportEmail}). Nossa equipe processará a desativação em até 48h e a eliminação completa em até 15 dias.`
                : `Your email client was triggered to send to ${config.supportEmail}. Our team will deactivate your account within 48h and complete data purge within 15 days.`}
            </p>
            <div className="flex justify-center gap-3">
              <a
                href={mailtoLink}
                className="py-2 px-4 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                {isPt ? 'Abrir E-mail Novamente' : 'Open Email Again'}
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                {isPt ? 'Concluir' : 'Finish'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
