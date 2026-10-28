import React, { useState } from 'react';
import { X, Sliders, RotateCcw, Save, Check } from 'lucide-react';
import { AppConfig, Language } from '../types/privacy';

interface ConfigEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  onSave: (newConfig: AppConfig) => void;
  onReset: () => void;
  lang: Language;
}

export const ConfigEditorModal: React.FC<ConfigEditorModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  onReset,
  lang,
}) => {
  const [formData, setFormData] = useState<AppConfig>({ ...config });
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const isPt = lang === 'pt';

  const handleChange = (field: keyof AppConfig, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isPt ? 'Personalizar Dados da Política' : 'Customize Policy Details'}
            </h3>
            <p className="text-xs text-slate-400">
              {isPt
                ? 'Altere o nome do desenvolvedor, e-mails de contato e datas para a sua versão'
                : 'Modify app name, developer info, contact emails, and dates'}
            </p>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                {isPt ? 'Nome do Aplicativo' : 'App Name'}
              </label>
              <input
                type="text"
                value={formData.appName}
                onChange={(e) => handleChange('appName', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                {isPt ? 'Subtítulo / Categoria' : 'App Subtitle'}
              </label>
              <input
                type="text"
                value={formData.appSubtitle}
                onChange={(e) => handleChange('appSubtitle', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                {isPt ? 'Nome da Empresa / Desenvolvedor' : 'Developer / Entity Name'}
              </label>
              <input
                type="text"
                value={formData.developerName}
                onChange={(e) => handleChange('developerName', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                {isPt ? 'Data de Vigência' : 'Effective Date'}
              </label>
              <input
                type="text"
                value={formData.effectiveDate}
                onChange={(e) => handleChange('effectiveDate', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                {isPt ? 'E-mail de Suporte' : 'Support Email'}
              </label>
              <input
                type="email"
                value={formData.supportEmail}
                onChange={(e) => handleChange('supportEmail', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                {isPt ? 'E-mail do DPO / Privacidade' : 'DPO / Privacy Email'}
              </label>
              <input
                type="email"
                value={formData.dpoEmail}
                onChange={(e) => handleChange('dpoEmail', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              {isPt ? 'URL do Website ou Vercel' : 'Website or Vercel URL'}
            </label>
            <input
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => handleChange('websiteUrl', e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onReset();
                setFormData({ ...config });
              }}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {isPt ? 'Restaurar Padrão' : 'Reset Defaults'}
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
              >
                {isPt ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg flex items-center gap-1.5 shadow-lg shadow-cyan-950 transition-colors"
              >
                {savedToast ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {savedToast ? (isPt ? 'Salvo!' : 'Saved!') : (isPt ? 'Salvar Alterações' : 'Save Changes')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
