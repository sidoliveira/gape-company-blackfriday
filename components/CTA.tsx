'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
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
    
    if (!formData.consent) {
      newErrors.consent = 'Você deve aceitar os termos'
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
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gape-pink/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gape-pink/3 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-0">
          <div className="grid gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left column - Content */}
            <div className="text-white">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-gape-pink/10 border border-gape-pink/20 mb-4 sm:mb-6">
                <span className="text-gape-pink text-xs sm:text-sm font-medium">Consultoria Gratuita</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-white to-gape-gray-light bg-clip-text text-transparent">
                  {ctaContent.headline}
                </span>
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl text-gape-gray-light leading-relaxed mb-8 sm:mb-10">
                {ctaContent.subheadline}
              </p>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center group">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gape-pink/20 to-gape-pink/10 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:from-gape-pink/30 group-hover:to-gape-pink/20 transition-all duration-300">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-gape-pink" />
                  </div>
                  <span className="text-base sm:text-lg font-medium">Consultoria gratuita de 30 minutos</span>
                </div>
                <div className="flex items-center group">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gape-pink/20 to-gape-pink/10 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:from-gape-pink/30 group-hover:to-gape-pink/20 transition-all duration-300">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-gape-pink" />
                  </div>
                  <span className="text-base sm:text-lg font-medium">Análise completa do seu e-commerce</span>
                </div>
                <div className="flex items-center group">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gape-pink/20 to-gape-pink/10 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:from-gape-pink/30 group-hover:to-gape-pink/20 transition-all duration-300">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-gape-pink" />
                  </div>
                  <span className="text-base sm:text-lg font-medium">Estratégia personalizada para seu negócio</span>
                </div>
                <div className="flex items-center group">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gape-pink/20 to-gape-pink/10 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:from-gape-pink/30 group-hover:to-gape-pink/20 transition-all duration-300">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-gape-pink" />
                  </div>
                  <span className="text-base sm:text-lg font-medium">Sem compromisso ou taxas ocultas</span>
                </div>
              </div>
              
              <div className="mt-8 sm:mt-10 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gape-pink/10 to-gape-pink-light/10 rounded-2xl blur-xl" />
                <div className="relative bg-gape-dark/50 backdrop-blur-sm border border-gape-pink/20 rounded-2xl p-4 sm:p-6">
                  <p className="text-sm sm:text-base text-gape-gray-light leading-relaxed">
                    {ctaContent.privacy_note}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right column - Form */}
            <div className="relative">
              {/* Form glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gape-pink/20 to-gape-pink-light/20 rounded-2xl sm:rounded-3xl blur-xl" />
              
              <div className="relative bg-gape-dark/80 backdrop-blur-sm border border-gape-pink/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10">
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {ctaContent.form_intro}
                  </h3>
                  <p className="text-sm sm:text-base text-gape-gray-light">
                    Preencha os dados abaixo e receba sua consultoria gratuita
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
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    {ctaContent.fields.name} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`input-field text-sm sm:text-base ${errors.name ? 'field-error' : ''}`}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && <p className="error-message text-xs sm:text-sm">{errors.name}</p>}
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    {ctaContent.fields.email} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`input-field text-sm sm:text-base ${errors.email ? 'field-error' : ''}`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && <p className="error-message text-xs sm:text-sm">{errors.email}</p>}
                </div>
                
                {/* WhatsApp */}
                <div>
                  <label htmlFor="whatsapp" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    {ctaContent.fields.whatsapp}
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    className="input-field text-sm sm:text-base"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                
                {/* Website */}
                <div>
                  <label htmlFor="website" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    {ctaContent.fields.website}
                  </label>
                  <input
                    type="url"
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="input-field text-sm sm:text-base"
                    placeholder="https://seusite.com.br"
                  />
                </div>
                
                {/* Segment */}
                <div>
                  <label htmlFor="segment" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    {ctaContent.fields.segment}
                  </label>
                  <input
                    type="text"
                    id="segment"
                    value={formData.segment}
                    onChange={(e) => handleInputChange('segment', e.target.value)}
                    className="input-field text-sm sm:text-base"
                    placeholder="Ex: Moda, Eletrônicos, Casa e Decoração"
                  />
                </div>
                
                {/* Revenue Range */}
                <div>
                  <label htmlFor="revenue" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    {ctaContent.fields.revenue}
                  </label>
                  <select
                    id="revenue"
                    value={formData.revenueRange}
                    onChange={(e) => handleInputChange('revenueRange', e.target.value)}
                    className="input-field text-sm sm:text-base"
                  >
                    <option value="">Selecione uma faixa</option>
                    {revenueOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Consent */}
                <div>
                  <label className="flex items-start space-x-2 sm:space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => handleInputChange('consent', e.target.checked)}
                      className="mt-0.5 sm:mt-1 h-3 w-3 sm:h-4 sm:w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-xs sm:text-sm text-gray-600">
                      Aceito receber contato da Gape Company e concordo com a{' '}
                      <a href="#" className="text-brand-600 hover:text-brand-700">
                        Política de Privacidade
                      </a>
                      .
                    </span>
                  </label>
                  {errors.consent && <p className="error-message text-xs sm:text-sm mt-1">{errors.consent}</p>}
                </div>
                
                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base py-3 sm:py-4"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-2" />
                      <span className="text-sm sm:text-base">Enviando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      <span className="text-sm sm:text-base">Agendar Consultoria Gratuita</span>
                    </div>
                  )}
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