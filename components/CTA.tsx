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
  const revenueOptions = ctaContent.revenue_options
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Track form submission
      gtmTrack.formSubmit(formData)
      
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
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
      } else {
        throw new Error('Erro ao enviar formulário')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <section id="contact-form" className="section-padding bg-gape-black relative overflow-hidden">
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
                    <div className="text-2xl font-black text-green-400 mb-1">500+</div>
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
                      className={`w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all duration-300 ${errors.email ? 'border-red-500/50 ring-2 ring-red-500/20' : ''}`}
                      placeholder="seu@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-sm font-medium">{errors.email}</p>}
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
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all duration-300"
                      placeholder="(11) 99999-9999"
                    />
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
                    Segmento do E-commerce
                  </label>
                  <input
                    type="text"
                    id="segment"
                    value={formData.segment}
                    onChange={(e) => handleInputChange('segment', e.target.value)}
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all duration-300"
                    placeholder="Ex: Moda, Eletrônicos, Casa e Decoração"
                  />
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
                        <span className="text-white font-bold text-lg">Quero Minha Consultoria Gratuita</span>
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