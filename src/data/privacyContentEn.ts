import { PolicySection } from '../types/privacy';

export const getPrivacySectionsEn = (config: {
  appName: string;
  developerName: string;
  supportEmail: string;
  dpoEmail: string;
  websiteUrl: string;
  effectiveDate: string;
}): PolicySection[] => [
  {
    id: 'visao-geral',
    title: '1. Overview and Identification',
    iconName: 'ShieldCheck',
    badge: 'Play Store & LGPD/GDPR',
    content: `
This Privacy Policy transparently outlines how the **${config.appName}** application (developed and maintained by **${config.developerName}**) collects, uses, stores, processes, and protects user data.

**${config.appName}** is a platform centered on **Process Automation and Artificial Intelligence**, designed to streamline workflows, orchestrate smart routines, and boost productivity using advanced computing and generative AI models.

We treat your privacy with paramount care. This policy is written in strict compliance with the **Brazilian General Data Protection Law (LGPD - Law 13,709/2018)**, the **General Data Protection Regulation (GDPR)**, and the **Google Play Developer Program Policies (Data Safety & Privacy Guidelines)**.

By downloading, installing, or using **${config.appName}**, you acknowledge that you have read and agreed to the practices outlined in this document.
    `,
  },
  {
    id: 'dados-coletados',
    title: '2. Data We Collect',
    iconName: 'Database',
    badge: 'Play Store Declaration',
    content: `
To enable automation routines and artificial intelligence features, we collect only data strictly necessary for application functionality:

### A. Data Provided Voluntarily by You
* **Account & Profile Details:** If you register or authenticate (e.g. via Google Sign-In), we may collect your name, email address, and profile avatar.
* **Commands, Prompts & Instructions:** Text prompts, automation parameters, triggers, and workflow instructions you intentionally submit for the AI or automation engine to run.
* **Support Inquiries:** Messages, bug reports, and feedback sent directly to **${config.supportEmail}**.

### B. Automatically Collected Data (Diagnostics & Telemetry)
* **Device Technical Specs:** Hardware model, operating system version (Android), anonymous installation identifier, system language, and time zone.
* **Crash Reports & Performance Logs:** Technical diagnostics generated during unexpected application freezes or errors, used exclusively for code fixes and stability improvements.
* **Aggregated Usage Metrics:** Anonymized analytics on which automation features are used most frequently, response latency, and system health.

### C. What We Do NOT Collect
* We do **NOT** collect sensitive biometric data, medical information, or political opinions.
* We do **NOT** track continuous or precise background GPS geolocation.
* We do **NOT** access your private local files, photo library, or microphone unless explicit runtime permission is granted for a specific active feature.
    `,
  },
  {
    id: 'uso-de-ia',
    title: '3. Artificial Intelligence & Automation Data Handling',
    iconName: 'Bot',
    badge: 'AI Ethics & Privacy',
    content: `
Because **${config.appName}** is built around **Artificial Intelligence and Intelligent Automations**, we follow strict data isolation standards:

### A. Purpose of Processing Prompts
Prompts, parameters, and input texts are processed solely to:
1. Generate the requested answers or assemble the designated automation workflow;
2. Link triggers with automated user-defined actions;
3. Perform contextual operations requested explicitly by the user.

### B. No Sale of Data & Model Isolation
* **Zero Commercialization:** Your prompts, files, and outputs are **NEVER sold, rented, or traded** to data brokers or third-party ad networks.
* **Public Model Training Exemption:** Your private data and automation prompts **are not used to train public foundational AI models**, adhering to commercial API privacy and enterprise confidentiality agreements.
    `,
  },
  {
    id: 'compartilhamento-terceiros',
    title: '4. Third-Party Sharing and SDKs',
    iconName: 'Share2',
    badge: 'Audited Providers',
    content: `
We share data with third-party service providers only to the minimal extent necessary to operate cloud infrastructure, security, and diagnostics:

1. **Google Play Services (Google LLC):**
   * Purpose: App package distribution, seamless updates, Google Play App Integrity, and Google Sign-In.
   * Privacy: [Google Privacy Policy](https://policies.google.com/privacy).

2. **Diagnostics and Analytics (Firebase Crashlytics / Google Cloud):**
   * Purpose: Crash monitoring, code stability metrics, and anonymous telemetry.

3. **AI Inference & Cloud Infrastructure Providers:**
   * Purpose: Natural language model inference over secure API endpoints (HTTPS / TLS 1.3).

4. **Web Hosting & Edge Infrastructure (Vercel / Cloud Run):**
   * Purpose: Serving this public privacy policy page and authenticated web dashboard services.
    `,
  },
  {
    id: 'seguranca',
    title: '5. Information Security and Storage',
    iconName: 'Lock',
    badge: 'End-to-End Protection',
    content: `
We implement organizational and technical security measures aligned with modern industry benchmarks:

* **Encryption in Transit:** All communications between the **${config.appName}** mobile client and servers use mandatory **HTTPS with TLS 1.3**.
* **Encryption at Rest:** Databases and persistent volumes utilize bank-grade **AES-256 bit** encryption.
* **Least-Privilege Access:** Operational credentials are kept strictly isolated and access is restricted to verified automated systems.
    `,
  },
  {
    id: 'direitos-usuario',
    title: '6. Your Rights (LGPD & GDPR)',
    iconName: 'UserCheck',
    badge: 'User Rights',
    content: `
Under applicable data protection laws (LGPD Art. 18 and GDPR), you hold the right to:
1. Confirm the existence of data processing and request a copy of your records.
2. Correct inaccurate, incomplete, or out-of-date personal data.
3. Request anonymization, blocking, or deletion of excessive data.
4. Request data portability to another service provider.
5. Withdraw consent at any time without punitive consequences.

To exercise any of these rights, contact our Data Protection Officer at: **${config.dpoEmail}**.
    `,
  },
  {
    id: 'exclusao-dados',
    title: '7. Account and Data Deletion Policy',
    iconName: 'Trash2',
    badge: 'Google Play Mandatory',
    content: `
In compliance with **Google Play's User Data Deletion Policy** and LGPD requirements, we provide an easy, friction-free way to permanently delete your account and all associated data.

### How to Request Deletion:
1. **Inside the App:** Navigate to *Settings > Account & Privacy > Delete Account*.
2. **Web / Email (Without having to reinstall the app):**
   * Click the **"Request Data Deletion"** button on this web page, or email **${config.supportEmail}** with the subject *"Account Deletion - ${config.appName}"*.

### Processing & Timelines:
* **Immediate Deactivation (within 48 hours):** Active sessions are terminated and automation triggers are halted.
* **Permanent Purge (within 15 business days):** All user credentials, automation scripts, and AI prompt histories are permanently erased from primary databases.
* **Statutory Retention Exception:** In accordance with Brazilian Federal Law No. 12,965/2014 (Marco Civil da Internet, Art. 15), connection records (IP, timestamp) must be preserved in confidentiality for the statutory period of 6 months before automated shredding.
    `,
  },
  {
    id: 'criancas',
    title: '8. Children\'s Privacy Protection',
    iconName: 'Baby',
    badge: 'COPPA Compliant',
    content: `
**${config.appName}** is built for professionals, students, and general tech audiences.

* The application is **NOT directed at children under the age of 13**.
* We do not knowingly collect personal data from minors. If you discover that a child has provided us with personal information without parental consent, please alert us immediately at **${config.supportEmail}** and we will promptly delete it.
    `,
  },
  {
    id: 'alteracoes',
    title: '9. Changes to this Privacy Policy',
    iconName: 'RefreshCw',
    badge: 'Live Revision',
    content: `
We may update this policy periodically to reflect feature additions or legal adjustments. Material updates will be highlighted via the **"Last Updated"** date above and communicated within the app when appropriate.
    `,
  },
  {
    id: 'contato',
    title: '10. Contact Information and DPO',
    iconName: 'Mail',
    badge: 'Official Contact',
    content: `
For any questions, requests, or privacy concerns regarding **${config.appName}**:

* **Application:** ${config.appName} (Automation & AI)
* **Developer:** ${config.developerName}
* **Support Email:** [${config.supportEmail}](mailto:${config.supportEmail})
* **DPO Contact:** [${config.dpoEmail}](mailto:${config.dpoEmail})
* **Official URL:** [${config.websiteUrl}](${config.websiteUrl})
* **Effective Date:** ${config.effectiveDate}
    `,
  },
];

export const getTermsSectionsEn = (config: {
  appName: string;
  developerName: string;
  supportEmail: string;
  effectiveDate: string;
}): PolicySection[] => [
  {
    id: 'termos-aceite',
    title: '1. Acceptance of Terms',
    iconName: 'FileText',
    badge: 'Legal Agreement',
    content: `
By downloading, installing, or using **${config.appName}**, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please discontinue using the application.
    `,
  },
  {
    id: 'termos-servico',
    title: '2. Service Scope',
    iconName: 'Cpu',
    badge: 'Automation & AI',
    content: `
**${config.appName}** provides automation workflow builders and AI computational tools. Services are provided on an "as-is" and "as-available" basis.
    `,
  },
  {
    id: 'termos-responsabilidade',
    title: '3. Responsible AI Use',
    iconName: 'AlertTriangle',
    badge: 'User Conduct',
    content: `
Users agree not to utilize **${config.appName}** to create illegal, harmful, harassing, or misleading content, or attempt unauthorized reverse engineering of app infrastructure.
    `,
  },
  {
    id: 'termos-propriedade',
    title: '4. Intellectual Property',
    iconName: 'Award',
    badge: 'Proprietary Rights',
    content: `
All trademarks, UI assets, and application code are the property of **${config.developerName}**. User data remains owned by the respective user.
    `,
  },
];
