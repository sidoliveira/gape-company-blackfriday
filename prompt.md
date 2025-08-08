Você é um desenvolvedor front-end sênior + UX writer com foco em conversão para e-commerce/serviços B2B.

Objetivo:
Criar uma nova landing page institucional para a Gape Company com a mesma hierarquia/UX da https://www.pandorium.com.br (apenas como referência estrutural), usando a identidade e paleta de cores da https://gapecompany.com/. 
Antes de escrever a copy, faça scraping da Gape para coletar TODOS os textos públicos (menus, headlines, subtítulos, bullets, CTAs, FAQs, rodapé, etc.) e reaproveite-os, reescrevendo quando necessário, mantendo tom/voz e claims verídicos.

⚠️ Compliance de scraping:
- Respeite robots.txt e somente conteúdo público renderizado no cliente/servidor.
- Sem dados pessoais. Sem copiar imagens/marcas de terceiros sem permissão.
- Se algum bloco estiver bloqueado, me peça para colar manualmente os trechos faltantes.

Stack:
- Next.js 14 (App Router)
- Tailwind CSS com variáveis CSS (paleta Gape)
- Supabase (tabela `leads`) para armazenar envios do formulário
- API route POST `/api/lead` com validação Zod e rate limit básico
- Integrações: Google Tag Manager (GTM), GA4 e Google Ads (placeholders + README)
- Deploy target: Vercel

Paleta (CSS vars):
:root{
  --brand-50:#eef6ff; --brand-100:#d9ecff; --brand-200:#b8d9ff;
  --brand-500:#1976d2; --brand-600:#155fa8; --brand-700:#0f4a82;
  --ink:#0b1220; --muted:#5b667a; --bg:#ffffff; --bg-soft:#f6f9fc;
}

Escopo do Scraping (https://gapecompany.com/):
1) Mapear rotas públicas de nível 1–2 (Home e páginas institucionais relacionadas).
2) Extrair:
   - Títulos (H1–H3), parágrafos, bullets, CTAs, FAQs, métricas, depoimentos, rodapé.
   - Navegação (menus, submenus) e microcopys (labels de formulário, placeholders).
3) Entregar um arquivo `content/content-map.json` com chaves por seção e o texto bruto + versão reescrita:
   {
     "hero": { "raw": "...", "revised": "..." },
     "value_props": [...],
     "testimonials": [...],
     "metrics": [...],
     "cta": { ... },
     "footer": { ... }
   }
4) Identificar lacunas (ex.: selos/parcerias, cases, números sensíveis) e marcar com TODO + recomendações.

Layout (inspirado em pandorium.com.br, sem copiar conteúdo):
1) **Hero**: headline objetiva, subtítulo e 2 CTAs (“Falar com especialista”, “Ver cases”).
2) **Qualificação rápida** (opcional): dropdown de faixa de faturamento.
3) **Faixa de logos/cases** (placeholders + slots).
4) **Pilares/Serviços**: 4 cards com ícone, título e microcopy orientada a benefícios.
5) **Depoimentos**: carrossel com foto/nome/cargo (usar placeholders e slots).
6) **Badges + Métricas**: selos (Google/Meta) e KPIs (usar valores reais da Gape quando disponíveis no scraping).
7) **CTA final + Formulário**: campos (nome, e-mail, WhatsApp, site, segmento, faturamento) + consent.
8) **Rodapé**: dados legais e links (Privacy/ToS/Cookies).

Conteúdo & Copywriting:
- Basear-se no scraping da Gape para manter tom/voz/claims.
- Reescrever para leitura escaneável (títulos fortes, subtítulos claros, bullets de benefício, prova social).
- Incluir variantes de headlines (3 opções), CTAs (3 opções), e 3 versões de hero-subheadline.
- Garantir conformidade com políticas do Google Ads (sem promessas enganosas, claims verificáveis).

Funcional:
- `/api/lead`: validação Zod, Rate-limit básico (ex.: IP/UA), gravação no Supabase (tabela `leads`).
- Notificação opcional por e-mail (deixe função/fake adapter + instruções no README).
- GTM/GA4/Google Ads: inserir containers/IDs via `.env`; disparar `gtm.formSubmit` e um evento `generate_lead`.

Qualidade:
- ESLint + Prettier
- Testes e2e (Playwright) cobrindo: render do hero, envio do formulário (mock Supabase), firing de evento.
- Lighthouse (mobile): Performance ≥ 90, SEO ≥ 95, A11y ≥ 95. Otimize imagens, fonte e CLS.
- Observabilidade: `/healthz` + logs estruturados no POST.

Entregáveis:
1) `docs/technical-design.md` (arquitetura, rotas, componentes, fluxos, schema Supabase, eventos GTM/GA4).
2) `content/content-map.json` (scraping bruto + versão reescrita por seção).
3) Projeto Next.js + Tailwind com tokens de cores e componentes:
   - `components/Hero.tsx`, `Logos.tsx`, `Pillars.tsx`, `Testimonials.tsx`, `BadgesMetrics.tsx`, `CTA.tsx`, `Footer.tsx`.
4) API route `/api/lead` + `lib/db/supabase.ts` (dotenv).
5) `e2e/lead.spec.ts` (Playwright).
6) `README.md` com:
   - Setup local
   - Variáveis de ambiente (`NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA4_ID`, `GOOGLE_ADS_CONVERSION_ID`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`)
   - Deploy Vercel
   - Como substituir placeholders (logos, depoimentos, selos)
   - Limitações do scraping e como atualizar `content-map`.

Fluxo de Trabalho (passo a passo):
1) Confirme entendimento e riscos do scraping.
2) Gere `docs/technical-design.md`.
3) Execute scraping e produza `content/content-map.json` (raw + revised).
4) Apresente 3 variações de Hero (headline/subheadline/CTA).
5) Scaffolding do projeto e implementação das seções.
6) Formulário + API + Supabase + testes e2e.
7) Otimizações de performance + checklist Lighthouse.
8) Entrega final com README e instruções de deploy.

Critérios de aceite:
- Build funcionando local e pronto para Vercel.
- `content-map.json` completo e referenciado pelos componentes.
- Teste e2e principal passando.
- Sem textos copiados da Pandorium (apenas estrutura/UX como referência).
