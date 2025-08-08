'use client'

import { Award, Users, TrendingUp, Clock } from 'lucide-react'
import contentMap from '@/content/content-map.json'

const BadgesMetrics = () => {
  const metrics = contentMap.metrics.revised
  
  const metricsData = [
    {
      icon: Users,
      value: metrics.clients,
      label: metrics.clients_label,
      description: 'E-commerces de diversos segmentos'
    },
    {
      icon: TrendingUp,
      value: metrics.revenue,
      label: metrics.revenue_label,
      description: 'Resultado comprovado em vendas'
    },
    {
      icon: Clock,
      value: metrics.experience,
      label: metrics.experience_label,
      description: 'Expertise consolidada no mercado'
    },
    {
      icon: Award,
      value: metrics.team,
      label: metrics.team_label,
      description: 'Time dedicado por cliente'
    }
  ]
  
  // Badges with platform logos
  const badges = [
    {
      name: 'Google Partner',
      description: 'Certificação Google Ads',
      verified: true,
      logo: '/images/google.avif'
    },
    {
      name: 'Meta Business Partner',
      description: 'Parceiro oficial Meta',
      verified: true,
      logo: '/images/meta.avif'
    },
    {
      name: 'E-commerce Platforms',
      description: 'Especialista em múltiplas plataformas',
      verified: true,
      platforms: [
        { name: 'Shopify', logo: '/images/shopify-logo.svg' },
        { name: 'WooCommerce', logo: '/images/woocommerce-logo.svg' },
        { name: 'Tray', logo: '/images/tray-logo.png' },
        { name: 'VTEX', logo: '/images/vtex-logo.svg' }
      ]
    }
  ]

  return (
    <section className="section-padding bg-gape-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gape-pink/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gape-pink/3 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-gape-pink/10 border border-gape-pink/20 mb-4 sm:mb-6">
            <span className="text-gape-pink text-xs sm:text-sm font-medium">Resultados Comprovados</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 sm:mb-6">
            Números que Comprovam
            <span className="block bg-gradient-to-r from-gape-pink to-gape-pink-dark bg-clip-text text-transparent">
              Nossa Expertise
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gape-gray-light leading-relaxed px-4 sm:px-0">
            Resultados consistentes e parcerias estratégicas que garantem o sucesso do seu projeto.
          </p>
        </div>
        
        {/* Metrics grid */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {metricsData.map((metric, index) => {
            const IconComponent = metric.icon
            
            return (
              <div
                key={index}
                className="group text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gape-dark-soft/50 border border-gape-pink/10 hover:border-gape-pink/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gape-pink/10"
              >
                <div className="mx-auto mb-4 sm:mb-6 inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-gape-pink to-gape-pink-dark shadow-lg group-hover:shadow-xl group-hover:shadow-gape-pink/30 transition-all duration-300">
                  <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2">
                  {metric.value}
                </div>
                
                <div className="text-base sm:text-lg font-semibold text-gape-pink mb-2">
                  {metric.label}
                </div>
                
                <div className="text-xs sm:text-sm text-gape-gray-light">
                  {metric.description}
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Badges section */}
        <div className="mt-20 sm:mt-24 lg:mt-32">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-gape-pink/10 border border-gape-pink/20 mb-4 sm:mb-6">
              <span className="text-gape-pink text-xs sm:text-sm font-medium">Certificações</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
              Parcerias e
              <span className="block bg-gradient-to-r from-gape-pink to-gape-pink-dark bg-clip-text text-transparent">
                Certificações
              </span>
            </h3>
            <p className="text-base sm:text-lg text-gape-gray-light leading-relaxed max-w-2xl mx-auto px-4 sm:px-0">
              Reconhecimento oficial das principais plataformas do mercado digital.
            </p>
          </div>
          
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-gape-dark-soft to-gape-dark border border-gape-pink/20 p-4 sm:p-6 lg:p-8 shadow-xl transition-all duration-300 hover:border-gape-pink/40 hover:shadow-2xl hover:shadow-gape-pink/20 hover:-translate-y-2"
              >
                {/* Verification status */}
                {badge.verified ? (
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 inline-flex items-center rounded-full bg-green-500/20 border border-green-500/30 px-2 sm:px-3 py-1 text-xs font-medium text-green-400">
                    ✓ Verificado
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 inline-flex items-center rounded-full bg-yellow-500/20 border border-yellow-500/30 px-2 sm:px-3 py-1 text-xs font-medium text-yellow-400">
                    ⏳ Verificando
                  </div>
                )}
                
                {/* Badge icon with platform logo */}
                <div className="mb-4 sm:mb-6">
                  {badge.platforms ? (
                    // Multiple platform logos for E-commerce Specialist - horizontal layout
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 flex-wrap">
                      {badge.platforms.map((platform, platformIndex) => (
                        <div key={platformIndex} className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-gape-dark border border-gape-pink/10 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:border-gape-pink/30 transition-all duration-300 opacity-60 hover:opacity-100">
                          <img 
                            src={platform.logo} 
                            alt={platform.name}
                            className="h-5 w-5 sm:h-6 sm:w-6 object-contain filter brightness-75 group-hover:brightness-100 transition-all duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Single platform logo
                    <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl bg-gape-dark border border-gape-pink/10 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:border-gape-pink/30 transition-all duration-300 mx-auto">
                      <img 
                        src={badge.logo} 
                        alt={badge.name}
                        className="h-6 w-6 sm:h-8 sm:w-8 object-contain filter brightness-75 group-hover:brightness-100 transition-all duration-300"
                      />
                    </div>
                  )}
                </div>
                
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                  {badge.name}
                </h4>
                
                <p className="text-gape-gray-light text-xs sm:text-sm leading-relaxed">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Note about certifications */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gape-gray">
              * Certificações em processo de verificação e atualização
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BadgesMetrics