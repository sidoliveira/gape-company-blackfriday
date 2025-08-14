'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, ShoppingBag, TrendingUp, BarChart4 } from 'lucide-react'
import contentMap from '@/content/content-map.json'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [animationDirection, setAnimationDirection] = useState('right')
  
  const testimonials = contentMap.testimonials.map(testimonial => testimonial.revised)
  
  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }
  
  const goToPrevious = () => {
    setAnimationDirection('left')
    const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
    goToSlide(newIndex)
  }
  
  const goToNext = () => {
    setAnimationDirection('right')
    const newIndex = (currentIndex + 1) % testimonials.length
    goToSlide(newIndex)
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
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gape-orange/5 to-gape-pink/5 rounded-3xl blur-xl"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gape-orange fill-current" />
                    ))}
                    <span className="ml-2 text-gape-orange font-semibold">5.0</span>
                  </div>
                  
                  {/* Testimonial Text */}
                  <blockquote className="text-xl lg:text-2xl text-white leading-relaxed mb-8 font-light">
                    "{testimonials[currentIndex].text}"
                  </blockquote>
                  
                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gape-orange to-gape-pink rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {testimonials[currentIndex].author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">{testimonials[currentIndex].author}</p>
                      <p className="text-gray-300">{testimonials[currentIndex].position}</p>
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
                  <div className="absolute inset-0 bg-gradient-to-r from-gape-orange to-gape-pink rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-gape-orange/10 to-gape-pink/10 backdrop-blur-sm border border-gape-orange/30 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gape-orange/20 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-gape-orange" />
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">ROI Alcançado</p>
                        <p className="text-white font-bold text-sm">em 90 dias</p>
                      </div>
                    </div>
                    <p className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gape-orange to-gape-pink mb-2">
                      {testimonials[currentIndex].result}
                    </p>
                    <p className="text-gray-300">Retorno sobre Investimento</p>
                  </div>
                </div>
                
                {/* Secondary Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <ShoppingBag className="w-5 h-5 text-gape-orange" />
                      <span className="text-gray-300 text-sm">Vendas</span>
                    </div>
                    <p className="text-2xl font-bold text-white">+340%</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart4 className="w-5 h-5 text-gape-orange" />
                      <span className="text-gray-300 text-sm">Conversão</span>
                    </div>
                    <p className="text-2xl font-bold text-white">+180%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Navigation */}
          <div className="flex items-center justify-center mt-12 lg:mt-16 gap-8">
            <button
              onClick={goToPrevious}
              className="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white transition-all hover:bg-gape-orange/10 hover:border-gape-orange/30 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gape-orange/50"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gape-orange/20 to-gape-pink/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
            </button>
            
            {/* Modern Dots Indicator */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 h-3 bg-gradient-to-r from-gape-orange to-gape-pink rounded-full'
                      : 'w-3 h-3 bg-white/20 hover:bg-white/40 rounded-full'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                >
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gape-orange to-gape-pink rounded-full blur-sm opacity-50"></div>
                  )}
                </button>
              ))}
            </div>
            
            <button
              onClick={goToNext}
              className="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white transition-all hover:bg-gape-orange/10 hover:border-gape-orange/30 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gape-orange/50"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gape-orange/20 to-gape-pink/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials