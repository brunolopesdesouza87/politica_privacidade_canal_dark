import { PolicySection } from '../types/privacy';

export const getPrivacySectionsPt = (config: {
  appName: string;
  developerName: string;
  supportEmail: string;
  dpoEmail: string;
  websiteUrl: string;
  effectiveDate: string;
}): PolicySection[] => [
  {
    id: 'visao-geral',
    title: '1. Visão Geral e Identificação',
    iconName: 'ShieldCheck',
    badge: 'LGPD & Play Store',
    content: `
Esta Política de Privacidade descreve de maneira transparente como o aplicativo **${config.appName}** (desenvolvido e mantido por **${config.developerName}**) coleta, utiliza, armazena, processa e protege os dados dos seus usuários.

O **${config.appName}** é uma plataforma focada em **Automação de Processos e Inteligência Artificial**, projetada para otimizar fluxos de trabalho, orquestrar rotinas inteligentes e potencializar a produtividade por meio de tecnologias avançadas de computação e modelos generativos.

Levamos a privacidade de seus dados com a máxima seriedade. Esta política foi redigida em estrita conformidade com a **Lei Geral de Proteção de Dados Pessoais do Brasil (LGPD - Lei nº 13.709/2018)**, o **Marco Civil da Internet (Lei nº 12.965/2014)** e as **Diretrizes de Segurança de Dados e Conteúdo do Google Play Console**.

Ao baixar, instalar ou utilizar o aplicativo **${config.appName}**, você declara ter lido e compreendido as práticas descritas neste documento.
    `,
  },
  {
    id: 'dados-coletados',
    title: '2. Dados que Coletamos',
    iconName: 'Database',
    badge: 'Declaração Play Store',
    content: `
Para viabilizar as rotinas de automação e os recursos de inteligência artificial, coletamos apenas os dados estritamente necessários para o funcionamento adequado da aplicação:

### A. Dados Fornecidos Voluntariamente pelo Usuário
* **Informações de Cadastro e Perfil:** Caso você crie uma conta, poderemos coletar seu nome, endereço de e-mail e foto de perfil (quando integrado com Google Sign-In ou login social).
* **Entradas de Comandos, Prompts e Instruções:** Textos, parâmetros de automação, gatilhos (triggers) e mensagens que você digita ou configura intencionalmente para que a IA ou o motor de automação execute.
* **Comunicações de Suporte:** Mensagens, feedbacks e relatórios de problemas enviados diretamente para nossa equipe através do e-mail oficial **${config.supportEmail}**.

### B. Dados Coletados Automaticamente (Telemetria e Diagnóstico)
* **Informações Técnicas do Dispositivo:** Modelo de hardware, versão do sistema operacional Android, identificadores anônimos de instalação, idioma do sistema e fuso horário.
* **Logs de Desempenho e Falhas (Crash Reports):** Registros técnicos gerados quando ocorre um travamento ou lentidão inesperada, utilizados exclusivamente para correções de bugs e aprimoramento da estabilidade do app.
* **Métricas de Uso e Interação:** Dados agregados e anonimizados sobre quais fluxos de automação são mais utilizados, tempo de resposta das solicitações e frequência de uso.

### C. O que NÃO Coletamos
* **NÃO** coletamos dados biométricos sensíveis, informações de saúde, opiniões políticas ou dados sensíveis nos termos do Art. 5º, II da LGPD.
* **NÃO** rastreamos sua geolocalização contínua ou precisa em segundo plano.
* **NÃO** acessamos seus arquivos locais, fotos ou microfone a menos que você conceda permissão explícita no momento exato de uso de uma funcionalidade específica.
    `,
  },
  {
    id: 'uso-de-ia',
    title: '3. Tratamento em Inteligência Artificial e Automação',
    iconName: 'Bot',
    badge: 'Compromisso Ético de IA',
    content: `
Como o **${config.appName}** é um aplicativo centralizado em **Inteligência Artificial e Automações Inteligentes**, adotamos salvaguardas adicionais para o processamento de modelos:

### A. Finalidade do Processamento de Prompts
Os comandos, parâmetros e textos enviados aos assistentes de IA são processados com o único propósito de:
1. Gerar a resposta requerida ou estruturar o plano de automação solicitado;
2. Conectar gatilhos com as ações automáticas configuradas pelo usuário;
3. Realizar análises contextuais solicitadas expressamente pelo titular.

### B. Não Venda de Dados e Privacidade dos Modelos
* **Nunca comercializamos seus dados:** Seus prompts, dados de entrada, históricos e automações **JAMAIS** serão vendidos, alugados ou cedidos a corretores de dados (data brokers) ou anunciantes terceiros.
* **Treinamento de Modelos Públicos:** Suas informações pessoais e prompts confidenciais **não são utilizados para treinar modelos públicos de linguagem**, respeitando os termos de isolamento e privacidade corporativa dos provedores de infraestrutura de IA.

### C. Transparência Algorítmica e Supervisão Humana
Resultados gerados por modelos de inteligência artificial são de natureza probabilística. Recomendamos que o usuário revise decisões de automação críticas (como envio de mensagens em massa ou operações financeiras) antes de sua execução definitiva.
    `,
  },
  {
    id: 'compartilhamento-terceiros',
    title: '4. Compartilhamento de Dados com Terceiros',
    iconName: 'Share2',
    badge: 'Prestadores Verificados',
    content: `
O **${config.appName}** compartilha dados com prestadores de serviço terceirizados apenas na extensão mínima indispensável para operar a infraestrutura em nuvem, autenticação e diagnósticos:

1. **Google Play Services (Google LLC):**
   * Finalidade: Distribuição segura do app, processamento de atualizações, integridade do pacote (Google Play App Integrity) e autenticação segura via Google Sign-In.
   * Política: [Política de Privacidade do Google](https://policies.google.com/privacy).

2. **Serviços de Diagnóstico e Métricas (Firebase Crashlytics / Google Cloud):**
   * Finalidade: Monitoramento de falhas técnicas, relatórios de estabilidade de código e tráfego de rede anônimo.

3. **Provedores de Modelos e APIs de Inteligência Artificial:**
   * Finalidade: Execução de inferências de linguagem natural e computação neural através de conexões de API seguras (HTTPS TLS 1.3), processadas sob contratos rígidos de confidencialidade de dados.

4. **Hospedagem e Redes de Distribuição (Vercel / Cloud Run):**
   * Finalidade: Hospedagem da página oficial de privacidade, painéis web e servidores proxy de conexão segura.

5. **Exigências Legais e Cumprimento de Ordens Judiciais:**
   * Caso formalmente requisitado por autoridades judiciais competentes no âmbito da legislação brasileira vigente (Art. 15 do Marco Civil da Internet).
    `,
  },
  {
    id: 'seguranca',
    title: '5. Segurança da Informação e Armazenamento',
    iconName: 'Lock',
    badge: 'Criptografia Ponta a Ponta',
    content: `
Adotamos medidas técnicas, administrativas e organizacionais alinhadas com os padrões mais modernos de segurança da informação:

* **Criptografia em Trânsito:** Todo e qualquer tráfego de dados entre o aplicativo **${config.appName}** e nossos servidores ocorre obrigatoriamente através do protocolo seguro HTTPS com criptografia **TLS 1.3**.
* **Criptografia em Repouso:** Bancos de dados e mídias de armazenamento utilizam algoritmos de criptografia de nível bancário (**AES-256 bits**).
* **Princípio do Menor Privilégio:** Apenas sistemas automatizados e pessoal técnico rigorosamente autorizado possuem credenciais de acesso restrito a ambientes operacionais.
* **Auditorias e Monitoramento:** Realizamos testes regulares de vulnerabilidade para prevenir acessos não autorizados, perdas acidentais ou alterações indevidas.
    `,
  },
  {
    id: 'direitos-usuario',
    title: '6. Seus Direitos como Titular (LGPD Art. 18 & GDPR)',
    iconName: 'UserCheck',
    badge: 'Seus Direitos',
    content: `
Em conformidade com o artigo 18 da **LGPD (Lei nº 13.709/2018)**, você, como titular dos dados pessoais, tem o direito de solicitar a qualquer momento e de forma facilitada:

1. **Confirmação e Acesso:** Saber se tratamos dados seus e solicitar uma cópia legível de tais informações.
2. **Correção de Dados:** Retificar dados incompletos, inexatos ou desatualizados.
3. **Anonimização, Bloqueio ou Eliminação:** Solicitar o expurgo de dados desnecessários ou tratados em desconformidade com a legislação.
4. **Portabilidade:** Receber seus dados em formato estruturado e interoperável para transferência a outro serviço.
5. **Revogação do Consentimento:** Retirar a qualquer instante seu consentimento para tratamentos baseados nessa hipótese legal.
6. **Informação sobre Compartilhamento:** Saber exatamente com quais entidades públicas ou privadas compartilhamos dados.

Para exercer qualquer um dos seus direitos, basta enviar uma mensagem direta para nosso canal de privacidade: **${config.dpoEmail}**.
    `,
  },
  {
    id: 'exclusao-dados',
    title: '7. Política e Mecanismo de Exclusão de Conta e Dados',
    iconName: 'Trash2',
    badge: 'Obrigatório Google Play',
    content: `
Em pleno cumprimento à **Política de Exclusão de Dados de Usuários do Google Play Console** e à LGPD, garantimos um método simples, transparente e sem burocracias para que você possa solicitar a remoção completa de sua conta e de todos os dados associados.

### Como solicitar a exclusão:
1. **Pelo Aplicativo:** Acesse *Configurações do Perfil > Privacidade e Segurança > Excluir Minha Conta*.
2. **Pela Web / E-mail (Sem necessidade de reinstalar o app):**
   * Você pode clicar no botão **"Solicitar Exclusão de Dados"** disponível nesta própria página web, ou enviar um e-mail para **${config.supportEmail}** com o assunto *"Exclusão de Conta - ${config.appName}"*, informando o e-mail cadastrado no aplicativo.

### O que acontece após a solicitação:
* **Remoção Imediata (até 48 horas):** Sua conta é desativada, sessões ativas são revogadas e o acesso aos fluxos de automação é cancelado.
* **Exclusão Definitiva (em até 15 dias):** Todos os seus registros pessoais, históricos de prompts de IA, configurações personalizadas de automação e preferências são purgados permanentemente de nossos bancos de dados principais.
* **Exceções de Retenção Legal:** Conforme exigido expressamente pelo **Artigo 15 da Lei Federal nº 12.965/2014 (Marco Civil da Internet)**, manteremos pelo prazo estritamente legal de **6 (seis) meses** os registros de data, hora e IP de acesso à aplicação sob sigilo rigoroso, findo o qual serão destruídos.
    `,
  },
  {
    id: 'criancas',
    title: '8. Proteção à Privacidade de Crianças e Adolescentes',
    iconName: 'Baby',
    badge: 'COPPA & Play Store',
    content: `
O aplicativo **${config.appName}** é projetado e destinado para o público em geral, com foco em profissionais, estudantes e entusiastas de tecnologia e automação.

* O aplicativo **NÃO é intencionalmente direcionado a crianças menores de 13 anos de idade** (ou a idade mínima legal de consentimento em sua jurisdição).
* Não coletamos conscientemente dados de crianças. Caso tomemos conhecimento de que dados de um menor foram coletados inadvertidamente sem o consentimento comprovado dos pais ou responsáveis legais, providenciaremos a exclusão imediata e irreversível dessas informações dos nossos servidores.
* Se você for pai, mãe ou responsável legal e identificar que seu filho nos forneceu dados pessoais, entre em contato imediatamente através de **${config.supportEmail}**.
    `,
  },
  {
    id: 'alteracoes',
    title: '9. Atualizações e Alterações desta Política',
    iconName: 'RefreshCw',
    badge: 'Versão Vigente',
    content: `
Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças tecnológicas no **${config.appName}**, inclusão de novos recursos de automação/IA, ou adequações a novas exigências regulatórias.

* Toda alteração relevante será indicada pela data da **"Última Atualização"** no topo desta página.
* Em caso de modificações substanciais que afetem os direitos do usuário, notificaremos você de forma visível dentro do aplicativo ou por e-mail antes que tais alterações entrem em vigor.
* Recomendamos a visita periódica a este link oficial permanente mantido publicamente para consulta.
    `,
  },
  {
    id: 'contato',
    title: '10. Contato e Encarregado de Proteção de Dados (DPO)',
    iconName: 'Mail',
    badge: 'Canal Oficial',
    content: `
Se você tiver qualquer dúvida, sugestão, elogio, ou desejar fazer uma solicitação sobre esta Política de Privacidade ou sobre o tratamento dos seus dados no **${config.appName}**, estamos à inteira disposição:

* **Aplicativo:** ${config.appName} (Automação & Inteligência Artificial)
* **Desenvolvedor / Responsável:** ${config.developerName}
* **E-mail de Suporte e Atendimento:** [${config.supportEmail}](mailto:${config.supportEmail})
* **Canal do Encarregado pelo Tratamento de Dados (DPO):** [${config.dpoEmail}](mailto:${config.dpoEmail})
* **Site / Link Oficial permanente:** [${config.websiteUrl}](${config.websiteUrl})
* **Data da Última Atualização:** ${config.effectiveDate}
    `,
  },
];

export const getTermsSectionsPt = (config: {
  appName: string;
  developerName: string;
  supportEmail: string;
  effectiveDate: string;
}): PolicySection[] => [
  {
    id: 'termos-aceite',
    title: '1. Aceitação dos Termos',
    iconName: 'FileText',
    badge: 'Vínculo Jurídico',
    content: `
Ao acessar, instalar ou utilizar o aplicativo **${config.appName}**, você concorda em cumprir integralmente estes Termos de Uso e todas as leis e regulamentos aplicáveis. Caso discorde de qualquer disposição, solicitamos que não utilize o aplicativo.
    `,
  },
  {
    id: 'termos-servico',
    title: '2. Descrição dos Serviços de Automação e IA',
    iconName: 'Cpu',
    badge: 'Escopo do App',
    content: `
O **${config.appName}** fornece ferramentas de produtividade, criação de fluxos de automação e integração com modelos de Inteligência Artificial para auxílio em tarefas computacionais e operacionais.

O serviço é disponibilizado "no estado em que se encontra" (as-is), e nos esforçamos para garantir o mais alto nível de disponibilidade, estabilidade e precisão.
    `,
  },
  {
    id: 'termos-responsabilidade',
    title: '3. Uso Responsável da Inteligência Artificial',
    iconName: 'AlertTriangle',
    badge: 'Regras de Uso',
    content: `
O usuário compromete-se a:
1. **Não utilizar** o **${config.appName}** para fins ilícitos, geração de conteúdo malicioso, assédio, disseminação de desinformação intencional ou violação de propriedade intelectual de terceiros.
2. Reconhecer que respostas geradas por IA podem conter imprecisões ocasionais (alucinações do modelo) e que o usuário deve aplicar senso crítico antes de tomar decisões críticas ou irreversíveis baseadas nelas.
3. Não tentar realizar engenharia reversa, invasão, sobrecarga deliberada da infraestrutura ou burla de restrições de segurança do aplicativo.
    `,
  },
  {
    id: 'termos-propriedade',
    title: '4. Propriedade Intelectual',
    iconName: 'Award',
    badge: 'Direitos Autorais',
    content: `
A marca, design de interface, código-fonte, arquitetura de software e logotipo do **${config.appName}** pertencem exclusivamente a **${config.developerName}** e são protegidos pelas leis de direitos autorais e propriedade industrial.

O conteúdo e os dados gerados exclusivamente pelas instruções do usuário permanecem sob titularidade e responsabilidade do próprio usuário.
    `,
  },
  {
    id: 'termos-foro',
    title: '5. Legislação Aplicável e Foro',
    iconName: 'Scale',
    badge: 'Legislação Brasileira',
    content: `
Estes Termos são regidos e interpretados de acordo com a legislação da República Federativa do Brasil. Para dirimir eventuais controvérsias decorrentes destes Termos, as partes elegem a comarca do domicílio do consumidor ou a legislação aplicável. Em caso de dúvidas, contate **${config.supportEmail}**.
    `,
  },
];
