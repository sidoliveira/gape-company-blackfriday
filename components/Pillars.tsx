'use client'

import { BarChart3, Target, Palette, TrendingUp, ArrowRight } from 'lucide-react'
import contentMap from '@/content/content-map.json'

// SVG Filter for glass effect
const GlassFilter = () => (
  <svg style={{ display: 'none' }}>
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.005"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="20"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
)

// Glass Effect Component
const GlassCard = ({ 
  children, 
  className = '', 
  hoverEffect = true 
}: { 
  children: React.ReactNode; 
  className?: string; 
  hoverEffect?: boolean;
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl backdrop-blur-sm border border-gape-pink/10 ${
        hoverEffect ? 'transition-all duration-500 hover:border-gape-pink/30 hover:-translate-y-2 hover:shadow-lg hover:shadow-gape-pink/5 group' : ''
      } ${className}`}
    >
      <div
        className="absolute inset-0 z-0 overflow-hidden rounded-2xl opacity-30"
        style={{
          backdropFilter: "blur(3px)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

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
      <GlassFilter />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gape-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gape-pink/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gape-pink/5 rounded-full blur-3xl" />
        
        {/* Animated gradient lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gape-pink to-transparent" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-gape-pink to-transparent" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-gape-pink to-transparent" />
        </div>
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
        <div className="mt-12 sm:mt-16 lg:mt-20 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-0">
          {pillarsData.map((pillar, index) => {
            const IconComponent = icons[iconKeys[index]]
            const pillarContent = pillar.revised
            
            return (
              <GlassCard key={index} className="bg-gape-dark/50 h-full">
                <div className="p-6 sm:p-8">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-gape-pink/20 to-gape-pink/10 border border-gape-pink/20 group-hover:from-gape-pink/30 group-hover:to-gape-pink/20 transition-all duration-300">
                      <IconComponent className="h-7 w-7 text-gape-pink" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gape-pink-light transition-colors duration-300">
                    {pillarContent.title}
                  </h3>
                  
                  <p className="text-gape-gray-light mb-6 leading-relaxed">
                    {pillarContent.description}
                  </p>
                  
                  {/* Benefit highlight */}
                  <div className="inline-flex items-center text-sm font-medium text-gape-pink">
                    <div className="mr-2 h-2 w-2 rounded-full bg-gape-pink animate-pulse" />
                    {pillarContent.benefit}
                  </div>
                </div>
              </GlassCard>
            )
          })}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-20 text-center px-4 sm:px-0">
          <GlassCard className="max-w-3xl mx-auto bg-gape-dark/30" hoverEffect={false}>
            <div className="p-8 sm:p-10">
              <h3 className="text-xl sm:text-2xl text-white mb-3 font-semibold">
                Pronto para ter uma equipe completa trabalhando no seu sucesso?
              </h3>
              <p className="text-gape-gray-light mb-8 max-w-2xl mx-auto">
                Descubra como nossa metodologia G.A.P.E pode transformar seu e-commerce e 
                impulsionar seus resultados com tráfego qualificado do Google Ads
              </p>
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gape-pink to-gape-pink-light text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-gape-pink/25 transition-all duration-300 hover:-translate-y-1 group"
              >
                Falar com Especialista
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}

export default Pillars