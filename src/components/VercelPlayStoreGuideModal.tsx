import React, { useState } from 'react';
import { X, ExternalLink, Check, Copy, ArrowRight, ShieldCheck, Terminal, UploadCloud, Smartphone } from 'lucide-react';
import { AppConfig, Language } from '../types/privacy';

interface VercelPlayStoreGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  lang: Language;
}

export const VercelPlayStoreGuideModal: React.FC<VercelPlayStoreGuideModalProps> = ({
  isOpen,
  onClose,
  config,
  lang,
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<'vercel' | 'playstore' | 'datasafety'>('vercel');

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : config.websiteUrl;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/50 p-6 sm:p-8 text-slate-100 my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Guia Prático Passo a Passo
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Como Publicar na Vercel e Usar no Google Play Console
            </h3>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab('vercel')}
            className={`pb-3 px-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'vercel'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            1. Deploy na Vercel
          </button>
          <button
            onClick={() => setActiveTab('playstore')}
            className={`pb-3 px-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'playstore'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            2. Google Play Console
          </button>
          <button
            onClick={() => setActiveTab('datasafety')}
            className={`pb-3 px-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'datasafety'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            3. Segurança dos Dados (Data Safety)
          </button>
        </div>

        {/* Tab 1: Vercel */}
        {activeTab === 'vercel' && (
          <div className="space-y-4 text-sm text-slate-300">
            <p className="leading-relaxed">
              Você pode hospedar esta página de política gratuitamente e em segundos na <strong>Vercel</strong> para ter uma URL rápida com certificado SSL automático (ex: <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded">https://sanar-stark.vercel.app</code>):
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">A</span>
                Opção Recomendada (Via GitHub + Vercel Dashboard):
              </h4>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-slate-300">
                <li>Suba este projeto para um repositório no seu GitHub.</li>
                <li>Acesse <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">vercel.com</a> e clique em <strong>"Add New... &gt; Project"</strong>.</li>
                <li>Importe o repositório do GitHub.</li>
                <li>A Vercel detectará automaticamente o framework como <strong>Vite</strong>.</li>
                <li>Clique em <strong>"Deploy"</strong>. Em cerca de 30 segundos sua URL permanente estará no ar!</li>
              </ol>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Opção Rápida via Terminal (Vercel CLI):
              </h4>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-xs text-cyan-300 flex items-center justify-between border border-slate-800">
                <span>npm i -g vercel &amp;&amp; vercel --prod</span>
                <button
                  onClick={() => handleCopy('npm i -g vercel && vercel --prod')}
                  className="text-slate-400 hover:text-white"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 space-y-2 text-xs">
              <h4 className="font-semibold text-amber-300">
                ⚠️ Solução para o erro "Command npm install exited with 1":
              </h4>
              <p className="text-slate-300">
                No painel da Vercel, acesse <strong>Settings &gt; General &gt; Build &amp; Development Settings</strong>. Ative o botão <strong>OVERRIDE</strong> no campo <strong>Install Command</strong> e cole:
              </p>
              <div className="bg-slate-900 p-2 rounded font-mono text-cyan-300 flex items-center justify-between border border-slate-800">
                <span>npm install --legacy-peer-deps</span>
                <button
                  onClick={() => handleCopy('npm install --legacy-peer-deps')}
                  className="text-slate-400 hover:text-white"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Play Store */}
        {activeTab === 'playstore' && (
          <div className="space-y-4 text-sm text-slate-300">
            <p className="leading-relaxed">
              No <strong>Google Play Console</strong>, a Política de Privacidade é um requisito obrigatório para enviar o app para análise e publicação:
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <h4 className="font-semibold text-white">Passo a Passo no Console:</h4>
              <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
                <li>
                  Acesse o <a href="https://play.google.com/console" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">Google Play Console</a> e selecione seu aplicativo <strong>Sanar Stark</strong>.
                </li>
                <li>
                  No menu lateral esquerdo, role até a seção <strong>"Política e programas"</strong> e clique em <strong>"Conteúdo do app" (App Content)</strong>.
                </li>
                <li>
                  Procure por <strong>"Política de privacidade"</strong> e clique em <strong>"Iniciar"</strong> ou <strong>"Gerenciar"</strong>.
                </li>
                <li>
                  Cole o link da sua página da Vercel no campo <strong>"URL da política de privacidade"</strong>:
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      readOnly
                      value={currentUrl}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-cyan-300 font-mono"
                    />
                    <button
                      onClick={() => handleCopy(currentUrl)}
                      className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedUrl ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </li>
                <li>
                  Clique em <strong>"Salvar"</strong> no canto inferior direito. Pronto! O Google verificará a URL automaticamente.
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Tab 3: Data Safety */}
        {activeTab === 'datasafety' && (
          <div className="space-y-4 text-sm text-slate-300">
            <p className="leading-relaxed">
              O Google Play exige preencher a seção <strong>"Segurança dos Dados" (Data Safety)</strong>. Abaixo estão as respostas exatas compatíveis com esta política para o <strong>Sanar Stark (Automação & IA)</strong>:
            </p>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
                <span className="font-semibold text-white block mb-1">
                  1. O app coleta ou compartilha algum dado de usuário?
                </span>
                <span className="text-emerald-400 font-medium">Resposta: SIM</span>
                <p className="text-slate-400 text-xs mt-1">
                  (Para fins de funcionamento do app, diagnósticos e automação).
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
                <span className="font-semibold text-white block mb-1">
                  2. Todos os dados coletados pelo app são criptografados em trânsito?
                </span>
                <span className="text-emerald-400 font-medium">Resposta: SIM</span>
                <p className="text-slate-400 text-xs mt-1">
                  (Todo o tráfego utiliza conexões criptografadas HTTPS / TLS).
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
                <span className="font-semibold text-white block mb-1">
                  3. O app oferece aos usuários uma forma de solicitar a exclusão de dados?
                </span>
                <span className="text-emerald-400 font-medium">Resposta: SIM</span>
                <p className="text-slate-400 text-xs mt-1">
                  (Obrigatório pela nova diretriz do Google! Esta página web possui o formulário e e-mail direto para exclusão).
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
                <span className="font-semibold text-white block mb-1">
                  4. Tipos de dados a marcar:
                </span>
                <ul className="list-disc pl-4 text-xs text-slate-300 space-y-1 mt-1">
                  <li><strong>Informações pessoais:</strong> E-mail e Nome (se houver login/cadastro) — finalidade: funcionalidade do app e gerenciamento de conta.</li>
                  <li><strong>Atividade no app:</strong> Interações no app (prompts e rotinas de automação) — finalidade: funcionalidade do app.</li>
                  <li><strong>Informações de desempenho:</strong> Diagnósticos de falhas (Crashlytics) — finalidade: análise e correção de bugs.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center">
          <div className="text-xs text-slate-400">
            Dúvidas? Suporte oficial: <strong className="text-slate-300">{config.supportEmail}</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Entendi / Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
