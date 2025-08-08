'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import contentMap from '@/content/content-map.json'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
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
    const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
    goToSlide(newIndex)
  }
  
  const goToNext = () => {
    const newIndex = (currentIndex + 1) % testimonials.length
    goToSlide(newIndex)
  }

  return (
    <section id="testimonials" className="section-padding bg-gape-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gape-pink/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gape-pink/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative">
        {/* Section header */}
        <div className="mx-auto max-w-4xl text-center px-4 sm:px-0">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-gape-pink/10 border border-gape-pink/20 mb-4 sm:mb-6">
            <span className="text-gape-pink text-xs sm:text-sm font-medium">Depoimentos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 sm:mb-6">
            O que Nossos
            <span className="block bg-gradient-to-r from-gape-pink to-gape-pink-light bg-clip-text text-transparent">
              Clientes Dizem
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gape-gray-light leading-relaxed">
            Resultados reais de e-commerces que transformaram seus negócios conosco.
          </p>
        </div>
        
        {/* Testimonials carousel */}
        <div className="mt-12 sm:mt-16 lg:mt-20 relative px-4 sm:px-0">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="mx-auto max-w-4xl">
                    <div className="relative">
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-gape-pink/20 to-gape-pink-light/20 rounded-2xl sm:rounded-3xl blur-xl" />
                      
                      <div className="relative bg-gape-dark/80 backdrop-blur-sm border border-gape-pink/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
                        {/* Stars */}
                        <div className="flex justify-center mb-6 sm:mb-8">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 sm:h-6 sm:w-6 text-gape-pink fill-current mx-0.5 sm:mx-1" />
                          ))}
                        </div>
                        
                        {/* Testimonial text */}
                        <blockquote className="text-center">
                          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed text-white font-light italic">
                            "{testimonial.text}"
                          </p>
                        </blockquote>
                        
                        {/* Author info */}
                        <div className="mt-8 sm:mt-10 flex flex-col items-center">
                          {/* Avatar placeholder */}
                          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-br from-gape-pink to-gape-pink-light flex items-center justify-center text-white font-bold text-lg sm:text-xl mb-4 sm:mb-6 shadow-lg shadow-gape-pink/25">
                            {testimonial.author.charAt(0) || 'C'}
                          </div>
                          
                          <div className="text-center">
                            <p className="font-bold text-white text-base sm:text-lg">{testimonial.author}</p>
                            <p className="text-gape-gray-light mb-3 sm:mb-4 text-sm sm:text-base">{testimonial.position}</p>
                            
                            {/* Result highlight */}
                            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-gape-pink/20 to-gape-pink-light/20 border border-gape-pink/30 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gape-pink">
                              <svg className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {testimonial.result}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-gape-dark/80 backdrop-blur-sm border border-gape-pink/20 p-2 sm:p-3 lg:p-4 shadow-lg transition-all duration-300 hover:bg-gape-dark hover:border-gape-pink/40 hover:shadow-gape-pink/25 focus:outline-none focus:ring-2 focus:ring-gape-pink focus:ring-offset-2 focus:ring-offset-gape-black"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-gape-pink" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-gape-dark/80 backdrop-blur-sm border border-gape-pink/20 p-2 sm:p-3 lg:p-4 shadow-lg transition-all duration-300 hover:bg-gape-dark hover:border-gape-pink/40 hover:shadow-gape-pink/25 focus:outline-none focus:ring-2 focus:ring-gape-pink focus:ring-offset-2 focus:ring-offset-gape-black"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-gape-pink" />
          </button>
        </div>
        
        {/* Dots indicator */}
        <div className="mt-8 sm:mt-12 flex justify-center space-x-2 sm:space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gape-pink w-6 sm:w-8 shadow-lg shadow-gape-pink/50'
                  : 'bg-gape-gray-light/30 w-2 sm:w-3 hover:bg-gape-gray-light/50'
              }`}
              aria-label={`Ir para depoimento ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials