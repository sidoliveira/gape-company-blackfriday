'use client'

import { Award } from 'lucide-react'

const BadgesMetrics = () => {
  
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
        { name: 'VTEX', logo: '/images/vtex-logo.svg' },
        { name: 'Loja Integrada', logo: '/images/logo-loja-integrada.png' },
        { name: 'Nuvem Shop', logo: '/images/logo-loga-nuvem.png' }
      ]
    }
  ]

  return (
    <section className="section-padding bg-gape-dark relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-primary/5 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-brand-primary/5 to-brand-600/5 rounded-full blur-3xl" />
        <div className="absolute top-10 right-1/4 w-2 h-32 bg-gradient-to-b from-brand-primary/20 to-transparent blur-sm" />
        <div className="absolute bottom-10 left-1/4 w-2 h-24 bg-gradient-to-t from-brand-primary/15 to-transparent blur-sm" />
        {/* Floating elements */}
        <div className="absolute top-1/3 left-1/6 w-4 h-4 bg-brand-primary/30 rounded-full animate-bounce delay-500" />
        <div className="absolute bottom-1/3 right-1/6 w-3 h-3 bg-brand-primary/30 rounded-full animate-bounce delay-1000" />
      </div>
      
      <div className="container-custom relative">
        {/* Enhanced Badges Section */}
        <div>
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary/10 to-brand-600/10 backdrop-blur-sm border border-brand-primary/20 rounded-full px-6 py-3 mb-6">
              <Award className="w-4 h-4 text-brand-primary/90" />
              <span className="text-brand-primary/90 font-medium text-sm">Certificações Oficiais</span>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Parceiros Oficiais das
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-600 to-brand-primary"> Maiores Plataformas</span>
            </h3>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Certificações que garantem acesso às melhores ferramentas e suporte técnico especializado.
              <span className="block mt-2 text-brand-primary/90 font-semibold">Seu investimento em mãos certificadas.</span>
            </p>
          </div>
          
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl transition-all duration-500 hover:border-white/20 hover:shadow-3xl hover:-translate-y-4 hover:scale-105"
              >
                {/* Enhanced Platform Logos */}
                <div className="mb-8">
                  {badge.platforms ? (
                    // Multiple platform logos with modern grid layout
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {badge.platforms.map((platform, platformIndex) => (
                        <div key={platformIndex} className="relative group/platform">
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-600/20 rounded-2xl blur-lg opacity-0 group-hover/platform:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative h-16 w-16 mx-auto rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-xl group-hover/platform:shadow-2xl group-hover/platform:scale-110 transition-all duration-300">
                            <img 
                              src={platform.logo} 
                              alt={platform.name}
                              className="h-8 w-8 object-contain filter brightness-90 group-hover/platform:brightness-110 transition-all duration-300"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Single platform logo with enhanced design
                    <div className="relative group/single mx-auto w-fit">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-600/20 rounded-3xl blur-xl opacity-0 group-hover/single:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative h-20 w-20 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl group-hover/single:shadow-3xl group-hover/single:scale-110 transition-all duration-500">
                        <img 
                          src={badge.logo} 
                          alt={badge.name}
                          className="h-10 w-10 object-contain filter brightness-90 group-hover/single:brightness-110 transition-all duration-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Enhanced Badge Title and Description */}
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand-primary group-hover:to-brand-600 group-hover:bg-clip-text transition-all duration-500 leading-tight">
                    {badge.name}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300 text-sm font-medium">
                    {badge.description}
                  </p>
                  
                  {/* Decorative line */}
                  <div className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-600 rounded-full mx-auto opacity-60 group-hover:opacity-100 group-hover:w-24 transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Note about certifications */}
          <div className="mt-12 text-center">
            {/* Parágrafo removido */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BadgesMetrics