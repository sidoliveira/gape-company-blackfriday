'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, ShoppingBag, TrendingUp, BarChart4 } from 'lucide-react'
import contentMap from '@/content/content-map.json'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [animationDirection, setAnimationDirection] = useState('right')
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const testimonials = contentMap.testimonials.map(testimonial => testimonial.revised)
  
  // Auto-play functionality with smooth transitions
  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return
    
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % testimonials.length
      goToSlide(nextIndex, 'right')
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length, currentIndex, isTransitioning])
  
  const goToSlide = (index: number, direction: string = 'right') => {
    if (isTransitioning || index === currentIndex) return
    
    setIsTransitioning(true)
    setAnimationDirection(direction)
    
    // Smooth transition with staggered animations
    setTimeout(() => {
      setCurrentIndex(index)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 300)
    }, 150)
    
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }
  
  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
    goToSlide(newIndex, 'left')
  }
  
  const goToNext = () => {
    const newIndex = (currentIndex + 1) % testimonials.length
    goToSlide(newIndex, 'right')
  }

  return (
    <section id="testimonials" className="section-padding bg-gape-black relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gape-orange/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gape-orange/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-gape-orange/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-1/4 w-2 h-32 bg-gradient-to-b from-gape-orange/20 to-transparent blur-sm"></div>
        <div className="absolute bottom-10 left-1/4 w-2 h-24 bg-gradient-to-t from-gape-orange/15 to-transparent blur-sm"></div>
      </div>
      
      <div className="container-custom relative">
        {/* Modern Header */}
        <div className="mx-auto max-w-4xl text-center px-4 sm:px-0">
          <div className="inline-flex items-center gap-2 bg-gape-orange/10 backdrop-blur-sm border border-gape-orange/20 rounded-full px-6 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-gape-orange" />
            <span className="text-gape-orange font-medium text-sm">Casos de Sucesso</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight">
            Resultados que
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gape-orange to-gape-pink"> Falam por Si</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gape-gray-light leading-relaxed max-w-4xl mx-auto">
            Descubra como transformamos e-commerces em máquinas de vendas através do Google Ads, 
            com nossa metodologia G.A.P.E comprovada por resultados excepcionais.
          </p>
        </div>
        
        {/* Modern Testimonials Layout */}
        <div className="relative mt-12 sm:mt-16 lg:mt-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Main Testimonial */}
            <div className="order-2 lg:order-1">
              <div className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r from-gape-orange/5 to-gape-pink/5 rounded-3xl blur-xl transition-all duration-700 ease-out ${
                  isTransitioning ? 'scale-105 opacity-70' : 'scale-100 opacity-100'
                } group-hover:scale-105 group-hover:opacity-80`}></div>
                <div className={`relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 transition-all duration-500 ease-out transform ${
                  isTransitioning 
                    ? animationDirection === 'right' 
                      ? 'translate-x-8 opacity-0 scale-95' 
                      : '-translate-x-8 opacity-0 scale-95'
                    : 'translate-x-0 opacity-100 scale-100'
                } hover:border-white/20 hover:bg-white/10`}>

                  
                  {/* Testimonial Text */}
                  <blockquote className={`text-xl lg:text-2xl text-white leading-relaxed mb-8 font-light transition-all duration-700 delay-200 ${
                    isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
                  } hover:text-gape-gray-light`}>
                    "{testimonials[currentIndex].text}"
                  </blockquote>
                  
                  {/* Author Info */}
                  <div className={`flex items-center gap-4 transition-all duration-700 delay-300 ${
                    isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
                  }`}>
                    <div className="w-16 h-16 bg-gradient-to-br from-gape-orange to-gape-pink rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-6 hover:shadow-lg hover:shadow-gape-orange/30">
                      <span className="text-white font-bold text-xl transition-all duration-300">
                        {testimonials[currentIndex].author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="transition-all duration-300 hover:translate-x-1">
                      <p className="text-white font-semibold text-lg transition-colors duration-300 hover:text-gape-orange">{testimonials[currentIndex].author}</p>
                      <p className="text-gray-300 transition-colors duration-300 hover:text-white">{testimonials[currentIndex].position}</p>
                    </div>
                  </div>
                </div>
                
                {/* Platform Badge removido */}
              </div>
            </div>
            
            {/* Right Column - Metrics & Results */}
            <div className="order-1 lg:order-2">
              <div className="space-y-6">
                {/* Main Result Card */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gape-orange to-gape-pink rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition-all duration-500 ease-out group-hover:blur-xl"></div>
                  <div className={`relative bg-gradient-to-br from-gape-orange/10 to-gape-pink/10 backdrop-blur-sm border border-gape-orange/30 rounded-2xl p-8 transition-all duration-700 ease-out transform ${
                    isTransitioning 
                      ? animationDirection === 'right' 
                        ? '-translate-x-8 opacity-0 scale-95' 
                        : 'translate-x-8 opacity-0 scale-95'
                      : 'translate-x-0 opacity-100 scale-100'
                  } hover:scale-105 hover:border-gape-orange/50 hover:bg-gradient-to-br hover:from-gape-orange/15 hover:to-gape-pink/15`}>
                    <div className={`flex items-center gap-3 mb-4 transition-all duration-700 delay-100 ${
                      isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                    }`}>
                      <div className="w-12 h-12 bg-gape-orange/20 rounded-xl flex items-center justify-center transition-all duration-500 hover:bg-gape-orange/30 hover:scale-110 hover:rotate-6">
                        <TrendingUp className="w-6 h-6 text-gape-orange transition-all duration-300 hover:scale-110" />
                      </div>
                      <div className="transition-all duration-300 hover:translate-x-1">
                        <p className="text-gray-300 text-sm transition-colors duration-300 hover:text-white">{testimonials[currentIndex].metrics?.main_result_label || "ROI Alcançado"}</p>
                        <p className="text-white font-bold text-sm transition-colors duration-300 hover:text-gape-orange">{testimonials[currentIndex].metrics?.main_result_description || "em 90 dias"}</p>
                      </div>
                    </div>
                    <p className={`text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gape-orange to-gape-pink mb-2 transition-all duration-700 delay-200 transform ${
                      isTransitioning ? 'opacity-0 scale-90 translate-y-6' : 'opacity-100 scale-100 translate-y-0'
                    } hover:scale-105`}>
                      {testimonials[currentIndex].metrics?.main_result || testimonials[currentIndex].result}
                    </p>
                    <p className={`text-gray-300 transition-all duration-700 delay-300 ${
                      isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                    } hover:text-white`}>{testimonials[currentIndex].metrics?.main_result_label || "Retorno sobre Investimento"}</p>
                  </div>
                </div>
                
                {/* Secondary Metrics */}
                <div className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-400 ${
                  isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
                }`}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-gape-orange/10">
                    <div className="flex items-center gap-2 mb-3">
                      <ShoppingBag className="w-5 h-5 text-gape-orange transition-all duration-300 hover:scale-110 hover:rotate-12" />
                      <span className="text-gray-300 text-sm transition-colors duration-300 hover:text-white">{testimonials[currentIndex].metrics?.secondary_metrics?.[0]?.label || "Receita"}</span>
                    </div>
                    <p className="text-2xl font-bold text-white transition-all duration-300 hover:text-gape-orange hover:scale-105">{testimonials[currentIndex].metrics?.secondary_metrics?.[0]?.value || "+420%"}</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-gape-orange/10">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart4 className="w-5 h-5 text-gape-orange transition-all duration-300 hover:scale-110 hover:rotate-12" />
                      <span className="text-gray-300 text-sm transition-colors duration-300 hover:text-white">{testimonials[currentIndex].metrics?.secondary_metrics?.[1]?.label || "Ticket médio"}</span>
                    </div>
                    <p className="text-2xl font-bold text-white transition-all duration-300 hover:text-gape-orange hover:scale-105">{testimonials[currentIndex].metrics?.secondary_metrics?.[1]?.value || "+75%"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Navigation */}
          <div className="flex items-center justify-center mt-12 lg:mt-16 gap-8">
            <button
              onClick={goToPrevious}
              disabled={isTransitioning}
              className="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white transition-all duration-500 hover:bg-gape-orange/10 hover:border-gape-orange/30 hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gape-orange/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="h-6 w-6 transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gape-orange/20 to-gape-pink/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl group-hover:blur-2xl"></div>
            </button>
            
            {/* Modern Dots Indicator */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`relative transition-all duration-500 ease-out transform hover:scale-125 disabled:cursor-not-allowed ${
                    index === currentIndex
                      ? 'w-8 h-3 bg-gradient-to-r from-gape-orange to-gape-pink rounded-full scale-110'
                      : 'w-3 h-3 bg-white/20 hover:bg-white/50 rounded-full hover:-translate-y-1'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                >
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gape-orange to-gape-pink rounded-full blur-sm opacity-60 animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
            
            <button
              onClick={goToNext}
              disabled={isTransitioning}
              className="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white transition-all duration-500 hover:bg-gape-orange/10 hover:border-gape-orange/30 hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gape-orange/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="h-6 w-6 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gape-orange/20 to-gape-pink/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl group-hover:blur-2xl"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials