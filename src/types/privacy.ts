export interface AppConfig {
  appName: string;
  appSubtitle: string;
  developerName: string;
  supportEmail: string;
  dpoEmail: string;
  websiteUrl: string;
  playStoreUrl: string;
  effectiveDate: string;
  appVersion: string;
}

export type DocumentType = 'privacy' | 'terms';
export type Language = 'pt' | 'en';

export interface PolicySection {
  id: string;
  title: string;
  iconName?: string;
  badge?: string;
  content: string; // Markdown or rich HTML-friendly text
  subsections?: {
    id: string;
    title: string;
    content: string;
  }[];
}
