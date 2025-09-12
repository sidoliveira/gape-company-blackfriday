'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Rocket, Target, TrendingUp, Zap, ShoppingCart, BarChart3, Users, Clock } from 'lucide-react'
import contentMap from '@/content/content-map.json'
import { gtmTrack } from '@/lib/utils/gtm'

interface FormData {
  name: string
  email: string
  whatsapp: string
  website: string
  segment: string
  revenueRange: string
  consent: boolean
}

interface FormErrors {
  [key: string]: string
}

const CTA = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    whatsapp: '',
    website: '',
    segment: '',
    revenueRange: '',
    consent: false
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const ctaContent = contentMap.cta_form.revised
  
  // Opções de faturamento atualizadas
  const revenueOptions = [
    'Abaixo de R$ 20 mil',
    'R$ 20 mil - R$ 40 mil',
    'R$ 40 mil - R$ 100 mil',
    'Acima de R$ 100 mil'
  ]
  
  // Função para mapear valores de faturamento com UUIDs
  const mapFaturamento = (faturamento: string) => {
    const mapping = {
      'Abaixo de R$ 20 mil': '695596f6-e44a-45ee-b4a8-530ab508bfda',
      'R$ 20 mil - R$ 40 mil': '4d513d2a-1c5c-4eb6-8e59-a102113ef6e5',
      'R$ 40 mil - R$ 100 mil': 'eb6aa77a-5f62-4d49-ac62-e7071dc8606a',
      'Acima de R$ 100 mil': '95a22bad-0010-40b9-8cf1-38950adc9665'
    }
    return mapping[faturamento as keyof typeof mapping] || '695596f6-e44a-45ee-b4a8-530ab508bfda'
  }
  
  // Função para mapear valores de segmento com UUIDs
  const mapSegmento = (segmento: string) => {
    const mapping = {
      'ecommerce-estoque': '7faee7d4-a626-43c0-8c25-7a6b1f11219a',
      'dropshipping': '5b603319-9d31-43bc-b37a-f2c72f566d1c',
      'venda-servico': '226e4ad1-71f8-49ac-b154-466b2b998f3d',
      'outros': '46a41189-5a6d-42f6-8102-ab98f141642d'
    }
    return mapping[segmento as keyof typeof mapping] || '46a41189-5a6d-42f6-8102-ab98f141642d'
  }
  
  // Função para obter parâmetros UTM da URL
  const getUTMParams = () => {
    const urlParams = new URLSearchParams(window.location.search)
    return {
      utm_source: urlParams.get('utm_source') || 'none',
      utm_medium: urlParams.get('utm_medium') || 'none',
      utm_campaign: urlParams.get('utm_campaign') || 'none',
      utm_term: urlParams.get('utm_term') || 'none',
      utm_content: urlParams.get('utm_content') || 'none'
    }
  }

  // Função para validar WhatsApp
  const validateWhatsApp = (whatsapp: string): boolean => {
    const cleanWhatsApp = whatsapp.replace(/\D/g, '')
    return cleanWhatsApp.length >= 10 && cleanWhatsApp.length <= 15
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Por favor, digite seu nome completo.'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, digite seu e-mail.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor, digite um e-mail válido.'
    }

    if (formData.whatsapp.trim() && !validateWhatsApp(formData.whatsapp)) {
      newErrors.whatsapp = 'Por favor, digite um número de WhatsApp válido.'
    }

    if (!formData.segment) {
      newErrors.segment = 'Por favor, selecione o seguimento da sua empresa.'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Função para enviar dados para o n8n
  const submitFormToN8N = async (): Promise<boolean> => {
    try {
      const utm = getUTMParams()
      const segmentoUuid = mapSegmento(formData.segment)
      const faturamentoUuid = mapFaturamento(formData.revenueRange)
      
      const submissionData = {
        nome: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        segmento_empresa: segmentoUuid,
        url_site: formData.website,
        faturamento_mensal: faturamentoUuid,
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        utm_term: utm.utm_term,
        utm_content: utm.utm_content,
        faturamento_uuid: mapFaturamento(formData.revenueRange),
        segmento_uuid: segmentoUuid,
        consent: formData.consent,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        referrer: document.referrer || 'none'
      }

      // URL do webhook do n8n
      const n8nWebhookUrl = 'https://n8n.gapecompany.com/webhook/0b0dcd65-f207-4eb2-a27a-42c93e4faaeb'
      
      // Construir URL com parâmetros GET
      const urlParams = new URLSearchParams()
      Object.entries(submissionData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          urlParams.append(key, String(value))
        }
      })
      
      const fullUrl = `${n8nWebhookUrl}?${urlParams.toString()}`
      
      const response = await fetch(fullUrl, {
        method: 'GET'
      })

      if (response.ok) {
        return true
      } else {
        throw new Error(`Erro na resposta do servidor: ${response.status}`)
      }
    } catch (error) {
      console.error('Erro ao enviar para n8n:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      // Focar no primeiro campo com erro
      const firstErrorField = Object.keys(errors)[0]
      const element = document.getElementById(firstErrorField)
      if (element) {
        element.focus()
      }
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Track form submission
      gtmTrack.formSubmit(formData)
      
      // Enviar para n8n
      await submitFormToN8N()
      
      // Também enviar para a API local (se existir)
      try {
        await fetch('/api/lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
      } catch (apiError) {
        console.warn('Erro na API local (não crítico):', apiError)
      }
      
      setSubmitStatus('success')
      gtmTrack.generateLead(formData)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        website: '',
        segment: '',
        revenueRange: '',
        consent: false
      })
      setErrors({})
      
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const formatPhoneNumber = (value: string): string => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '')
    
    // Limita a 11 dígitos
    const limitedNumbers = numbers.slice(0, 11)
    
    // Aplica a máscara (XX) XXXXX-XXXX
    if (limitedNumbers.length <= 2) {
      return limitedNumbers
    } else if (limitedNumbers.length <= 7) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`
    }
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    let processedValue = value
    
    // Aplica formatação específica para o campo WhatsApp
    if (field === 'whatsapp' && typeof value === 'string') {
      processedValue = formatPhoneNumber(value)
    }
    
    // Aplica formatação específica para o campo Website
    if (field === 'website' && typeof value === 'string') {
      // Se o usuário começar a digitar e não tiver protocolo, adiciona https://
      if (value.length > 0 && !value.startsWith('http://') && !value.startsWith('https://')) {
        processedValue = 'https://' + value
      }
    }
    
    setFormData(prev => ({ ...prev, [field]: processedValue }))
    
    // Limpar erro quando usuário começar a digitar
    if (field === 'email') {
      setErrors(prev => ({ ...prev, email: '' }))
    } else {
      // Clear error when user starts typing in other fields
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }))
      }
    }
  }

  const handleEmailBlur = (email: string) => {
    if (email.length > 0 && !validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'E-mail inválido' }))
    } else {
      setErrors(prev => ({ ...prev, email: '' }))
    }
  }

  return (
    <section id="contact-form" className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gape-black relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient spheres */}
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-gradient-to-br from-gape-orange/20 to-gape-pink/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/15 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-green-500/10 to-gape-orange/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        
        {/* Floating gradient lines */}
        <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-gape-orange/30 to-transparent animate-pulse" />
        <div className="absolute bottom-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-pulse" style={{animationDelay: '1.5s'}} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:50px_50px] opacity-30" />
      </div>
      
      <div className="container-custom relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-0">
          <div className="grid gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Enhanced Left Column - Content */}
            <div className="text-white">
              {/* Modern badge with icon */}
              <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-gape-orange/20 to-gape-pink/20 border border-gape-orange/30 mb-6 backdrop-blur-sm">
                <Rocket className="h-4 w-4 text-gape-orange" />
                <span className="text-gape-orange text-sm font-bold">CONSULTORIA GRATUITA</span>
              </div>
              
              {/* Enhanced headline */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-gape-orange to-white bg-clip-text text-transparent">
                  Multiplique Suas Vendas
                </span>
                <br />
                <span className="text-white">
                  com Google Ads
                </span>
              </h2>
              
              {/* Enhanced subheadline */}
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-10 font-medium">
                Descubra como nossa metodologia G.A.P.E pode transformar seu e-commerce em uma máquina de vendas no Google Ads
              </p>
              
              {/* Enhanced Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start group">
                  <div className="relative flex-shrink-0 w-14 h-14 bg-gradient-to-br from-gape-orange/30 to-gape-pink/20 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-gape-orange/20 to-gape-pink/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Clock className="relative h-7 w-7 text-gape-orange" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">30 Minutos</h4>
                    <p className="text-sm text-gray-400">Consultoria gratuita focada em resultados</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="relative flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500/30 to-purple-500/20 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <BarChart3 className="relative h-7 w-7 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Análise Completa</h4>
                    <p className="text-sm text-gray-400">Auditoria detalhada do seu e-commerce</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="relative flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500/30 to-emerald-500/20 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Target className="relative h-7 w-7 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Estratégia G.A.P.E</h4>
                    <p className="text-sm text-gray-400">Metodologia personalizada para seu negócio</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="relative flex-shrink-0 w-14 h-14 bg-gradient-to-br from-yellow-500/30 to-orange-500/20 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Zap className="relative h-7 w-7 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Sem Compromisso</h4>
                    <p className="text-sm text-gray-400">100% gratuito, sem taxas ocultas</p>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Stats and Privacy Section */}
              <div className="mt-10 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-black text-gape-orange mb-1">+300%</div>
                    <div className="text-xs text-gray-400 font-medium">ROI Médio</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-blue-400 mb-1">24h</div>
                    <div className="text-xs text-gray-400 font-medium">Resposta</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-green-400 mb-1">150+</div>
                    <div className="text-xs text-gray-400 font-medium">E-commerces</div>
                  </div>
                </div>
                

              </div>
            </div>
            
            {/* Enhanced Right Column - Form */}
            <div className="relative">
              {/* Enhanced Form Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-600/15 rounded-3xl blur-2xl" />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/8 to-brand-primary/15 rounded-3xl blur-xl" />
              
              {/* Glassmorphism Form Container */}
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 lg:p-10 shadow-2xl">
                {/* Form Header with Icon */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-primary/30 to-brand-primary/20 rounded-2xl mb-4">
                    <Users className="h-8 w-8 text-brand-primary/90" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">
                    Comece Agora
                  </h3>
                  <p className="text-gray-300 font-medium">
                    Preencha os dados e receba sua consultoria gratuita
                  </p>
                </div>

              
              {submitStatus === 'success' && (
                <div className="mb-4 sm:mb-6 rounded-lg bg-green-50 p-3 sm:p-4 border border-green-200">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2" />
                    <span className="text-sm sm:text-base text-green-800 font-medium">
                      Formulário enviado com sucesso! Entraremos em contato em breve.
                    </span>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-4 sm:mb-6 rounded-lg bg-red-50 p-3 sm:p-4 border border-red-200">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-2" />
                    <span className="text-sm sm:text-base text-red-800 font-medium">
                      Erro ao enviar formulário. Tente novamente.
                    </span>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Enhanced Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-bold text-white">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all duration-300 ${errors.name ? 'border-red-500/50 ring-2 ring-red-500/20' : ''}`}
                      placeholder="Digite seu nome completo"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-sm font-medium">{errors.name}</p>}
                </div>
                
                {/* Enhanced Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-bold text-white">
                    E-mail Profissional *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onBlur={(e) => handleEmailBlur(e.target.value)}
                      className={`w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all duration-300 ${errors.email ? 'border-red-500/50 ring-2 ring-red-500/20' : ''}`}
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                
                {/* Enhanced Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* WhatsApp */}
                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="block text-sm font-bold text-white">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      className={`w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all duration-300 ${errors.whatsapp ? 'border-red-500/50 ring-2 ring-red-500/20' : ''}`}
                      placeholder="(11) 99999-9999"
                    />
                    {errors.whatsapp && <p className="text-red-400 text-sm font-medium">{errors.whatsapp}</p>}
                  </div>
                  
                  {/* Website */}
                  <div className="space-y-2">
                    <label htmlFor="website" className="block text-sm font-bold text-white">
                      Site do E-commerce
                    </label>
                    <input
                      type="url"
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all duration-300"
                      placeholder="https://seusite.com.br"
                    />
                  </div>
                </div>
                
                {/* Segment */}
                <div className="space-y-2">
                  <label htmlFor="segment" className="block text-sm font-bold text-white">
                    Seguimento da Sua empresa
                  </label>
                  <select
                    id="segment"
                    value={formData.segment}
                    onChange={(e) => handleInputChange('segment', e.target.value)}
                    className={`w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all duration-300 appearance-none cursor-pointer ${errors.segment ? 'border-red-500/50 ring-2 ring-red-500/20' : ''}`}
                  >
                    <option value="" className="bg-gray-800 text-white">Selecione o seguimento da sua empresa</option>
                    <option value="ecommerce-estoque" className="bg-gray-800 text-white">Ecommerce com Estoque</option>
                    <option value="dropshipping" className="bg-gray-800 text-white">Dropshipping</option>
                    <option value="venda-servico" className="bg-gray-800 text-white">Venda de serviço</option>
                    <option value="outros" className="bg-gray-800 text-white">Outros</option>
                  </select>
                  {errors.segment && <p className="text-red-400 text-sm font-medium">{errors.segment}</p>}
                </div>
                
                {/* Revenue Range */}
                <div className="space-y-2">
                  <label htmlFor="revenue" className="block text-sm font-bold text-white">
                    Faturamento Mensal
                  </label>
                  <select
                    id="revenue"
                    value={formData.revenueRange}
                    onChange={(e) => handleInputChange('revenueRange', e.target.value)}
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-gray-800 text-white">Selecione uma faixa de faturamento</option>
                    {revenueOptions.map((option, index) => (
                      <option key={index} value={option} className="bg-gray-800 text-white">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                

                
                {/* Enhanced Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full group overflow-hidden rounded-2xl bg-gradient-to-r from-brand-primary to-brand-600 p-1 transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <div className="relative bg-gradient-to-r from-brand-primary to-brand-600 rounded-xl px-8 py-4 transition-all duration-300 group-hover:from-brand-600 group-hover:to-brand-primary">
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        <span className="text-white font-bold text-lg">Enviando...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <Rocket className="h-5 w-5 text-white group-hover:animate-pulse" />
                        <span className="text-white font-bold text-lg">Enviar</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/50 to-brand-600/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </button>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA