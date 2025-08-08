# Gape Company - Landing Page Institucional

Landing page institucional desenvolvida para a Gape Company, especializada em escalar e-commerces com estratégias de alta conversão.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Supabase** - Backend-as-a-Service para armazenamento de leads
- **Zod** - Validação de schemas
- **Playwright** - Testes E2E
- **Lucide React** - Ícones
- **Google Tag Manager** - Analytics e tracking

## 📋 Funcionalidades

### ✅ Implementadas
- Landing page responsiva com design moderno
- Formulário de contato com validação
- Integração com Supabase para captura de leads
- Rate limiting para proteção da API
- Tracking com GTM e GA4
- Testes E2E com Playwright
- SEO otimizado
- Acessibilidade (WCAG)

### 🔄 Seções da Landing Page
1. **Hero** - Headline principal com CTA
2. **Logos** - Clientes e parceiros
3. **Pillars** - 4 pilares de serviços
4. **Testimonials** - Depoimentos de clientes
5. **Badges & Metrics** - Números e certificações
6. **CTA Form** - Formulário de contato
7. **Footer** - Informações da empresa

## 🛠️ Configuração do Projeto

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no Supabase
- Conta no Google Analytics/Tag Manager

### Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd ladingpagegape
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google Analytics & Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Configure o banco de dados Supabase**

Crie a tabela `leads` no Supabase:

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  whatsapp VARCHAR(20),
  website TEXT,
  segment VARCHAR(100),
  revenue_range VARCHAR(50),
  consent BOOLEAN NOT NULL DEFAULT false,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at);
```

5. **Execute o projeto**
```bash
npm run dev
```

Acesse: http://localhost:3000

## 🧪 Testes

### Testes E2E com Playwright

```bash
# Instalar browsers do Playwright
npx playwright install

# Executar testes
npm run test:e2e

# Executar testes em modo UI
npm run test:e2e:ui

# Executar testes específicos
npx playwright test landing-page.spec.ts
npx playwright test contact-form.spec.ts
```

### Cobertura de Testes
- ✅ Carregamento da landing page
- ✅ Exibição de todas as seções
- ✅ Responsividade mobile
- ✅ SEO e meta tags
- ✅ Acessibilidade básica
- ✅ Formulário de contato
- ✅ Validação de campos
- ✅ Submissão de formulário
- ✅ Tratamento de erros
- ✅ Estados de loading

## 📁 Estrutura do Projeto

```
├── app/
│   ├── api/
│   │   ├── lead/route.ts          # API para captura de leads
│   │   └── healthz/route.ts       # Health check
│   ├── globals.css                # Estilos globais
│   ├── layout.tsx                 # Layout principal
│   └── page.tsx                   # Página inicial
├── components/
│   ├── Hero.tsx                   # Seção hero
│   ├── Logos.tsx                  # Logos de clientes
│   ├── Pillars.tsx                # 4 pilares de serviços
│   ├── Testimonials.tsx           # Depoimentos
│   ├── BadgesMetrics.tsx          # Métricas e selos
│   ├── CTA.tsx                    # Formulário de contato
│   └── Footer.tsx                 # Rodapé
├── content/
│   └── content-map.json           # Mapeamento de conteúdo
├── lib/
│   └── utils/
│       └── gtm.tsx                # Utilitários GTM
├── tests/
│   └── e2e/
│       ├── landing-page.spec.ts   # Testes da landing page
│       └── contact-form.spec.ts   # Testes do formulário
├── docs/
│   └── technical-design.md        # Documento de design técnico
└── hero-variations.md             # Variações do hero para A/B test
```

## 🎨 Design System

### Cores da Marca
```css
--brand-50: #f0f9ff
--brand-100: #e0f2fe
--brand-200: #bae6fd
--brand-300: #7dd3fc
--brand-400: #38bdf8
--brand-500: #0ea5e9  /* Cor principal */
--brand-600: #0284c7
--brand-700: #0369a1
--brand-800: #075985
--brand-900: #0c4a6e
```

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Pesos**: 400, 500, 600, 700

### Componentes Reutilizáveis
- `btn-primary` - Botão principal
- `btn-secondary` - Botão secundário
- `input-field` - Campo de input
- `container-custom` - Container responsivo
- `section-padding` - Padding padrão das seções

## 🔧 API Endpoints

### POST /api/lead
Captura leads do formulário de contato.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "whatsapp": "(11) 99999-9999",
  "website": "https://meusite.com",
  "segment": "Moda",
  "revenueRange": "R$ 100mil - R$ 500mil",
  "consent": true
}
```

**Response (201):**
```json
{
  "message": "Lead cadastrado com sucesso!",
  "id": "uuid"
}
```

**Validações:**
- Nome: obrigatório, 2-100 caracteres
- Email: obrigatório, formato válido, único
- Consentimento: obrigatório
- Rate limit: 5 requests por 15 minutos por IP

### GET /api/healthz
Health check da aplicação.

**Response (200):**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "database": "healthy",
    "api": "healthy"
  },
  "responseTime": "50ms"
}
```

## 📊 Analytics e Tracking

### Google Tag Manager
Eventos configurados:
- `form_submit` - Submissão do formulário
- `generate_lead` - Lead gerado com sucesso
- `page_view` - Visualização de página

### Configuração GTM
1. Crie um container no GTM
2. Configure as tags do GA4
3. Adicione o GTM_ID no `.env.local`

## 🚀 Deploy

### Vercel (Recomendado)

1. **Conecte o repositório no Vercel**
2. **Configure as variáveis de ambiente**
3. **Deploy automático**

### Variáveis de Ambiente para Produção
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🔒 Segurança

- ✅ Rate limiting na API
- ✅ Validação de dados com Zod
- ✅ Sanitização de inputs
- ✅ Headers de segurança
- ✅ HTTPS obrigatório em produção
- ✅ Variáveis de ambiente protegidas

## 📈 Performance

- ✅ Next.js App Router
- ✅ Componentes otimizados
- ✅ Imagens otimizadas
- ✅ CSS-in-JS com Tailwind
- ✅ Lazy loading
- ✅ Compressão automática

## 🎯 SEO

- ✅ Meta tags otimizadas
- ✅ Open Graph
- ✅ Twitter Cards
- ✅ Schema.org markup
- ✅ Sitemap automático
- ✅ URLs semânticas

## 🔄 Próximos Passos

### Melhorias Planejadas
- [ ] Dashboard administrativo
- [ ] Integração com CRM
- [ ] A/B testing automatizado
- [ ] PWA (Progressive Web App)
- [ ] Internacionalização (i18n)
- [ ] Chat bot integrado

### Otimizações
- [ ] Cache Redis para rate limiting
- [ ] CDN para assets estáticos
- [ ] Monitoramento com Sentry
- [ ] Métricas de performance

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é propriedade da Gape Company. Todos os direitos reservados.

## 📞 Suporte

Para dúvidas ou suporte:
- Email: contato@gapecompany.com
- WhatsApp: (11) 99999-9999

---

**Desenvolvido com ❤️ para a Gape Company**# ladingpagegape
