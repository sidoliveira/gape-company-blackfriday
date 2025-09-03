# Configuração do N8N para o Formulário

## Implementação Concluída

O formulário foi implementado com todas as funcionalidades solicitadas:

### ✅ Funcionalidades Implementadas

1. **Validação Completa de Campos**
   - Nome completo (obrigatório)
   - E-mail (obrigatório + validação de formato)
   - WhatsApp (validação de formato quando preenchido)
   - Segmento da empresa (obrigatório)
   - Mensagens de erro claras e específicas
   - Foco automático no primeiro campo com erro

2. **Captura de UTMs**
   - utm_source
   - utm_medium
   - utm_campaign
   - utm_term
   - utm_content

3. **Dados Adicionais Enviados**
   - Timestamp da submissão
   - URL da página
   - User Agent
   - Referrer

4. **Integração com N8N**
   - Envio via POST para webhook
   - Tratamento de erros
   - Fallback para API local

## 🔧 Configuração Necessária

### Passo 1: Configurar Webhook no N8N

1. Acesse seu painel do N8N
2. Crie um novo workflow
3. Adicione um nó "Webhook"
4. Configure o webhook para receber dados via POST
5. Copie a URL do webhook gerada

### Passo 2: Atualizar a URL no Código

No arquivo `/components/CTA.tsx`, linha ~98, substitua:

```typescript
// URL do webhook do n8n - substitua pela URL real do seu webhook
const n8nWebhookUrl = 'https://seu-n8n-webhook-url.com/webhook/form-submission'
```

Por:

```typescript
// URL do webhook do n8n
const n8nWebhookUrl = 'SUA_URL_REAL_DO_N8N_AQUI'
```

### Passo 3: Estrutura dos Dados Enviados

O webhook receberá os seguintes dados:

```json
{
  "name": "Nome do usuário",
  "email": "email@exemplo.com",
  "whatsapp": "(11) 99999-9999",
  "website": "https://site.com",
  "segment": "Ecommerce com Estoque",
  "revenueRange": "R$ 10.000 - R$ 50.000",
  "consent": true,
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "campanha-teste",
  "utm_term": "termo",
  "utm_content": "conteudo",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "page_url": "http://localhost:3000",
  "user_agent": "Mozilla/5.0...",
  "referrer": "https://google.com"
}
```

## 🎯 Como Testar

1. Acesse o formulário no navegador
2. Tente enviar sem preencher campos obrigatórios
3. Verifique se as validações aparecem
4. Preencha corretamente e envie
5. Verifique se os dados chegam no N8N

## 🔍 Debugging

Para verificar se os dados estão sendo enviados:

1. Abra o DevTools do navegador (F12)
2. Vá na aba "Network"
3. Envie o formulário
4. Procure pela requisição para o webhook do N8N
5. Verifique os dados enviados e a resposta

## 📝 Próximos Passos

1. Configure o webhook no N8N
2. Atualize a URL no código
3. Configure o fluxo de automação no N8N (envio de e-mails, integração com CRM, etc.)
4. Teste em produção

---

**Nota**: O formulário também mantém a integração com a API local (`/api/lead`) como fallback, garantindo que os dados não sejam perdidos mesmo se houver problemas com o N8N.