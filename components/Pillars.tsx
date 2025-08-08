'use client'

import { BarChart3, Target, Palette, TrendingUp } from 'lucide-react'
import contentMap from '@/content/content-map.json'

const Pillars = () => {
  const pillarsData = contentMap.pillars
  
  const icons = {
    strategy: BarChart3,
    data: Target,
    traffic: TrendingUp,
    creative: Palette,
  }
  
  const iconKeys = ['strategy', 'data', 'traffic', 'creative'] as const

  return (
    <section className="section-padding bg-gape-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gape-pink/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gape-pink/3 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative">
        {/* Section header */}
        <div className="mx-auto max-w-4xl text-center px-4 sm:px-0">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-gape-pink/10 border border-gape-pink/20 mb-4 sm:mb-6">
            <span className="text-gape-pink text-xs sm:text-sm font-medium">Metodologia G.A.P.E</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 sm:mb-6">
            Como Transformamos seu
            <span className="block bg-gradient-to-r from-gape-pink to-gape-pink-light bg-clip-text text-transparent">
              E-commerce
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gape-gray-light leading-relaxed">
            Nossa metodologia comprovada combina estratégia, dados e execução para 
            entregar resultados consistentes e escaláveis.
          </p>
        </div>
        
        {/* Pillars grid */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-0">
          {pillarsData.map((pillar, index) => {
            const IconComponent = icons[iconKeys[index]]
            const pillarContent = pillar.revised
            
            return (
              <div
                key={index}
                className="group relative rounded-2xl bg-gape-dark/50 backdrop-blur-sm border border-gape-pink/10 p-6 sm:p-8 transition-all duration-500 hover:border-gape-pink/30 hover:-translate-y-2 hover:bg-gape-dark/80"
              >
                {/* Icon */}
                <div className="mb-4 sm:mb-6">
                  <div className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-gape-pink/20 to-gape-pink/10 border border-gape-pink/20 group-hover:from-gape-pink/30 group-hover:to-gape-pink/20 transition-all duration-300">
                    <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-gape-pink" />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-gape-pink-light transition-colors duration-300">
                  {pillarContent.title}
                </h3>
                
                <p className="text-gape-gray-light mb-4 sm:mb-6 leading-relaxed text-sm">
                  {pillarContent.description}
                </p>
                
                {/* Benefit highlight */}
                <div className="inline-flex items-center text-sm font-medium text-gape-pink">
                  <div className="mr-2 h-2 w-2 rounded-full bg-gape-pink animate-pulse" />
                  {pillarContent.benefit}
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gape-pink/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            )
          })}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center px-4 sm:px-0">
          <div className="relative inline-block w-full max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-gape-pink/20 to-gape-pink-light/20 rounded-2xl blur-xl" />
            <div className="relative bg-gape-dark/80 backdrop-blur-sm border border-gape-pink/20 rounded-2xl p-6 sm:p-8 mx-auto">
              <p className="text-lg sm:text-xl text-white mb-2 font-semibold">
                Pronto para ter uma equipe completa trabalhando no seu sucesso?
              </p>
              <p className="text-sm sm:text-base text-gape-gray-light mb-6 sm:mb-8">
                Descubra como nossa metodologia G.A.P.E pode transformar seu e-commerce
              </p>
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gape-pink to-gape-pink-light text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-gape-pink/25 transition-all duration-300 hover:-translate-y-1 text-sm sm:text-base"
              >
                Falar com Especialista
                <svg className="ml-2 h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pillars