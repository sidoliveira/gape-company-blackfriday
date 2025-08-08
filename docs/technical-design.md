# Technical Design - Gape Company Landing Page

## Visão Geral

Este documento descreve a arquitetura técnica da nova landing page institucional da Gape Company, baseada na estrutura UX da Pandorium mas com identidade visual e conteúdo próprios da Gape.

## Arquitetura

### Stack Tecnológico
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS com variáveis CSS customizadas
- **Database**: Supabase
- **Analytics**: Google Tag Manager, GA4, Google Ads
- **Testing**: Playwright (E2E)
- **Deploy**: Vercel

### Estrutura de Pastas
```
├── app/
│   ├── api/
│   │   ├── lead/
│   │   │   └── route.ts
│   │   └── healthz/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Hero.tsx
│   ├── Logos.tsx
│   ├── Pillars.tsx
│   ├── Testimonials.tsx
│   ├── BadgesMetrics.tsx
│   ├── CTA.tsx
│   └── Footer.tsx
├── lib/
│   ├── db/
│   │   └── supabase.ts
│   ├── validations/
│   │   └── lead.ts
│   └── utils/
│       ├── gtm.ts
│       └── rate-limit.ts
├── content/
│   └── content-map.json
├── e2e/
│   └── lead.spec.ts
├── docs/
│   └── technical-design.md
└── README.md
```

## Componentes Principais

### 1. Hero Section
- **Arquivo**: `components/Hero.tsx`
- **Funcionalidade**: 
  - Headline principal com 3 variações
  - Subtítulo otimizado para conversão
  - 2 CTAs principais ("Falar com especialista", "Ver cases")
  - Qualificação rápida opcional (dropdown faturamento)

### 2. Logos/Cases
- **Arquivo**: `components/Logos.tsx`
- **Funcionalidade**: Faixa de logos de clientes/parceiros com placeholders

### 3. Pilares/Serviços
- **Arquivo**: `components/Pillars.tsx`
- **Funcionalidade**: 4 cards com ícones, títulos e microcopys orientados a benefícios

### 4. Depoimentos
- **Arquivo**: `components/Testimonials.tsx`
- **Funcionalidade**: Carrossel com foto, nome, cargo e depoimento

### 5. Badges + Métricas
- **Arquivo**: `components/BadgesMetrics.tsx`
- **Funcionalidade**: Selos (Google/Meta Partners) e KPIs da empresa

### 6. CTA + Formulário
- **Arquivo**: `components/CTA.tsx`
- **Funcionalidade**: 
  - Formulário de lead capture
  - Campos: nome, email, WhatsApp, site, segmento, faturamento
  - Validação client-side e server-side
  - Integração com GTM/GA4

### 7. Footer
- **Arquivo**: `components/Footer.tsx`
- **Funcionalidade**: Links legais, dados da empresa, políticas

## API Routes

### POST /api/lead
- **Validação**: Schema Zod
- **Rate Limiting**: Por IP/User-Agent
- **Persistência**: Supabase
- **Analytics**: Disparo de eventos GTM
- **Response**: JSON com status e mensagem

### GET /api/healthz
- **Funcionalidade**: Health check da aplicação
- **Response**: Status da conexão com Supabase

## Schema Supabase

### Tabela: leads
```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(20),
  website VARCHAR(255),
  segment VARCHAR(100),
  revenue_range VARCHAR(50),
  consent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at);
```

## Integração Analytics

### Google Tag Manager
- **Container ID**: Via `NEXT_PUBLIC_GTM_ID`
- **Eventos customizados**:
  - `gtm.formSubmit` (envio de formulário)
  - `generate_lead` (lead qualificado)

### Google Analytics 4
- **Measurement ID**: Via `NEXT_PUBLIC_GA4_ID`
- **Eventos rastreados**:
  - page_view
  - form_submit
  - generate_lead

### Google Ads
- **Conversion ID**: Via `GOOGLE_ADS_CONVERSION_ID`
- **Conversão**: Lead qualificado

## Paleta de Cores (CSS Variables)

```css
:root {
  --brand-50: #eef6ff;
  --brand-100: #d9ecff;
  --brand-200: #b8d9ff;
  --brand-500: #1976d2;
  --brand-600: #155fa8;
  --brand-700: #0f4a82;
  --ink: #0b1220;
  --muted: #5b667a;
  --bg: #ffffff;
  --bg-soft: #f6f9fc;
}
```

## Validação e Rate Limiting

### Schema de Validação (Zod)
```typescript
const leadSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  website: z.string().url().optional(),
  segment: z.string().optional(),
  revenueRange: z.string().optional(),
  consent: z.boolean().refine(val => val === true)
});
```

### Rate Limiting
- **Estratégia**: IP + User-Agent
- **Limite**: 5 submissões por 15 minutos
- **Storage**: In-memory Map (para simplicidade)

## Performance e SEO

### Métricas Lighthouse (Mobile)
- **Performance**: ≥ 90
- **SEO**: ≥ 95
- **Accessibility**: ≥ 95

### Otimizações
- Lazy loading de imagens
- Otimização de fontes (font-display: swap)
- Minimização de CLS
- Compressão de assets
- Critical CSS inline

## Testes E2E

### Cenários Cobertos
1. **Renderização do Hero**: Verificar elementos principais
2. **Envio de Formulário**: Mock Supabase, validar fluxo completo
3. **Eventos Analytics**: Verificar disparo de eventos GTM
4. **Responsividade**: Testes em diferentes viewports

## Variáveis de Ambiente

```env
# Analytics
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXX

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Opcional
NOTIFICATION_EMAIL=leads@gapecompany.com
```

## Fluxo de Dados

1. **Usuário preenche formulário** → Validação client-side
2. **Submit** → POST /api/lead
3. **Validação server-side** → Zod schema
4. **Rate limiting** → Verificação IP/UA
5. **Persistência** → Supabase insert
6. **Analytics** → Disparo eventos GTM/GA4
7. **Response** → Feedback ao usuário

## Considerações de Segurança

- Validação rigorosa de inputs
- Rate limiting para prevenir spam
- Sanitização de dados antes da persistência
- Headers de segurança (CSP, HSTS)
- Não exposição de dados sensíveis no client

## Deploy e CI/CD

### Vercel
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Environment Variables**: Configurar via dashboard
- **Domain**: Custom domain da Gape

### Checklist de Deploy
- [ ] Variáveis de ambiente configuradas
- [ ] Supabase tabela criada
- [ ] GTM container configurado
- [ ] Testes E2E passando
- [ ] Lighthouse scores atingidos
- [ ] DNS configurado

## Monitoramento

- **Health Check**: `/api/healthz`
- **Logs**: Structured logging no POST /api/lead
- **Métricas**: Via Vercel Analytics
- **Erros**: Sentry (opcional, configurar se necessário)

## Limitações e TODOs

- **Scraping**: Dependente de robots.txt e estrutura do site
- **Rate Limiting**: In-memory (considerar Redis para produção)
- **Email Notifications**: Implementação fake (configurar SMTP real)
- **Imagens**: Placeholders (substituir por assets reais)
- **Content**: Baseado em scraping (pode precisar ajustes manuais)