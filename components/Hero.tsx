'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ArrowRight, BarChart2, ShoppingCart, TrendingUp, Phone, Mail, Award, Star, X, Target } from 'lucide-react'
import contentMap from '@/content/content-map.json'

const Hero = () => {
  const [selectedRevenue, setSelectedRevenue] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  const heroContent = contentMap.hero.revised
  const revenueOptions = contentMap.cta_form.revised.revenue_options

  useEffect(() => {
    // Add animation delay for elements to appear
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleCTAClick = (ctaType: 'primary' | 'secondary') => {
    // GTM tracking will be added here
    if (ctaType === 'primary') {
      // Scroll to form
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Scroll to testimonials/cases
      document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gape-dark py-12 lg:py-16">
      
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gape-dark via-gape-dark-soft to-brand-primary/3" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 right-[10%] h-64 w-64 rounded-full bg-brand-primary/8 blur-3xl animate-pulse" 
             style={{animationDuration: '8s'}} />
        <div className="absolute bottom-1/4 left-[5%] h-72 w-72 rounded-full bg-brand-primary/4 blur-3xl animate-pulse" 
             style={{animationDuration: '12s'}} />
             
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] sm:min-h-[80vh]">
          {/* Left content */}
          <div className="text-left">
            {/* Badge */}
            <div className={`mb-6 inline-flex items-center px-4 py-1.5 rounded-full bg-gape-orange/10 border border-gape-orange/30 text-gape-orange text-sm font-bold transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
              Operação Black Friday: 50% OFF • Vagas Limitadas
            </div>
            
            {/* Main headline */}
            <h1 className={`text-3xl font-bold tracking-tight text-gape-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
              <span className="block">Vamos salvar a sua</span>
              <span className="block text-gape-orange">Black Friday</span>
              <span className="block">a tempo de vender mais.</span>
            </h1>
            
            {/* Subheadline */}
            <p className={`mt-4 sm:mt-6 max-w-2xl text-base leading-7 text-gape-gray-light sm:text-lg sm:leading-8 lg:text-xl transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
              Oferta Black Friday com <span className="text-gape-orange font-semibold">50% OFF</span> para poucas vagas. Estratégia de resgate e escala feita por especialistas em E-commerce para você não perder a data mais importante do ano.
            </p>
          
            {/* CTA buttons */}
            <div className={`mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
              <button
                onClick={() => handleCTAClick('primary')}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold text-gape-white bg-gradient-to-r from-gape-orange to-gape-pink rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gape-orange/25"
              >
                Quero salvar minha Black Friday
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
              <button
                onClick={() => handleCTAClick('secondary')}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium text-gape-orange border border-gape-orange/30 rounded-lg hover:bg-gape-orange/10 transition-all duration-300"
              >
                Ver oferta e vagas
              </button>
            </div>
            
            {/* Social proof */}
            <div className={`mt-8 sm:mt-10 flex items-center gap-3 sm:gap-4 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center">
                <img 
                  src="/images/fotos-cliente-head.webp" 
                  alt="Clientes satisfeitos da Gape Company" 
                  className="img-height-4rem sm:h-24 w-auto rounded-lg"
                />
              </div>
              <div className="text-gape-gray-light">
                <span className="text-brand-primary/90 font-semibold text-sm sm:text-base">150+</span>
                <span className="text-xs sm:text-sm block">Cases de Sucesso. O próximo pode ser o seu.</span>
              </div>
            </div>
          </div>
          
          {/* Right content - Dashboard mockup */}
          <div className={`relative hidden md:block lg:block mt-8 lg:mt-0 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary/15 to-brand-600/15 rounded-2xl blur-lg opacity-50 animate-pulse" style={{animationDuration: '3s'}}></div>
            
            <div className="relative bg-gape-dark-soft/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl border border-brand-primary/20">
              {/* Mock dashboard header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gape-gray text-sm">Dashboard • Gape Company</div>
              </div>
              
              {/* Performance summary */}
              <div className="mb-6 p-4 bg-gape-dark/50 rounded-lg border border-brand-primary/10">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gape-white">Desempenho da Campanha</h3>
                  <div className="inline-flex items-center px-2 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary/90 text-xs">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +24.8%
                  </div>
                </div>
                
                {/* Mini chart */}
                <div className="h-16 w-full flex items-end gap-1">
                  {[35, 45, 30, 60, 25, 45, 40, 50, 55, 70, 45, 60, 75].map((height, i) => (
                    <div 
                      key={i} 
                      className="h-full flex-1 flex items-end"
                    >
                      <div 
                        className="w-full bg-brand-primary/70 rounded-sm" 
                        style={{height: `${height}%`}}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mock metrics */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gape-dark/30 rounded-lg border border-brand-primary/10">
                  <div>
                    <div className="text-gape-gray text-sm">Alcance</div>
                    <div className="text-brand-primary/90 text-2xl font-bold">32.984</div>
                  </div>
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary/90">
                    <BarChart2 className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gape-dark/30 rounded-lg border border-brand-primary/10">
                  <div>
                    <div className="text-gape-gray text-sm">Cliques</div>
                    <div className="text-brand-primary/90 text-2xl font-bold">1.350</div>
                  </div>
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary/90">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gape-dark/30 rounded-lg border border-brand-primary/10">
                  <div>
                    <div className="text-gape-gray text-sm">Vendas</div>
                    <div className="text-brand-primary/90 text-2xl font-bold">R$ 50.256,97</div>
                  </div>
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary/90">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                </div>
              </div>
              
              {/* Mock notification */}
              <div className="mt-6 p-3 bg-brand-primary/10 border border-brand-primary/20 rounded-lg">
                <div className="text-brand-primary/90 text-sm">Quando começar de fato a escalar para resultados ainda melhores?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero