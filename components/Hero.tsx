'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import contentMap from '@/content/content-map.json'
import Logo from './Logo'

const Hero = () => {
  const [selectedRevenue, setSelectedRevenue] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  const heroContent = contentMap.hero.revised
  const revenueOptions = contentMap.cta_form.revised.revenue_options

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
    <section className="relative min-h-screen overflow-hidden bg-gape-dark pt-16 pb-12 sm:pb-16 lg:pt-24 lg:pb-28">
      {/* Header with Logo */}
      <header className="absolute top-0 left-0 right-0 z-10 bg-gape-dark/80 backdrop-blur-sm border-b border-gape-pink/10">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <Logo variant="white" width={120} height={36} className="sm:w-[140px] sm:h-[42px]" />
        </div>
      </header>
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-br from-gape-dark via-gape-dark-soft to-gape-pink/10" />
        {/* Geometric shapes */}
        <div className="absolute top-20 right-10 h-32 w-32 rounded-full bg-gape-pink/20 blur-xl" />
        <div className="absolute bottom-20 left-10 h-48 w-48 rounded-full bg-gape-pink/10 blur-2xl" />
      </div>
      
      <div className="container mx-auto px-4 relative mt-16 sm:mt-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] sm:min-h-[80vh]">
          {/* Left content */}
          <div className="text-left">
            {/* Main headline */}
            <h1 className="text-3xl font-bold tracking-tight text-gape-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              <span className="block">Acelere o crescimento do seu</span>
              <span className="block text-gape-pink">E-commerce</span>
              <span className="block">com quem sabe como fazer.</span>
            </h1>
            
            {/* Subheadline */}
            <p className="mt-4 sm:mt-6 max-w-2xl text-base leading-7 text-gape-gray-light sm:text-lg sm:leading-8 lg:text-xl">
              O caminho para o sucesso do seu E-commerce já foi traçado. Só falta você se juntar aos <span className="text-gape-pink font-semibold">+150 E-commerces</span> que já alcançaram <span className="text-gape-pink font-semibold">+R$0 milhões em vendas.</span>
            </p>
          
          {/* CTA button */}
            <div className="mt-6 sm:mt-8">
              <button
                onClick={() => handleCTAClick('primary')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-gape-white bg-gape-pink rounded-lg hover:bg-gape-pink-dark transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Quero crescer meu E-commerce
              </button>
            </div>
            
            {/* Social proof */}
            <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gape-pink border-2 border-gape-dark flex items-center justify-center text-xs font-bold text-gape-white">+</div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-400 border-2 border-gape-dark"></div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-500 border-2 border-gape-dark"></div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-600 border-2 border-gape-dark"></div>
              </div>
              <div className="text-gape-gray-light">
                <span className="text-gape-pink font-semibold text-sm sm:text-base">+150</span><br />
                <span className="text-xs sm:text-sm">Cases de Sucesso. O próximo pode ser o seu.</span>
              </div>
            </div>
          </div>
          
          {/* Right content - Dashboard mockup */}
          <div className="relative hidden md:block lg:block mt-8 lg:mt-0">
            <div className="relative bg-gape-dark-soft rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl border border-gape-pink/20">
              {/* Mock dashboard header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-gape-gray text-sm">Painel Gape Company</div>
              </div>
              
              {/* Mock metrics */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gape-dark rounded-lg border border-gape-pink/10">
                  <div>
                    <div className="text-gape-gray text-sm">Alcance</div>
                    <div className="text-gape-white text-2xl font-bold">32.984</div>
                  </div>
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-red-500 rounded"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gape-dark rounded-lg border border-gape-pink/10">
                  <div>
                    <div className="text-gape-gray text-sm">Cliques</div>
                    <div className="text-gape-white text-2xl font-bold">350</div>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-orange-500 rounded"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gape-dark rounded-lg border border-gape-pink/10">
                  <div>
                    <div className="text-gape-gray text-sm">Vendas</div>
                    <div className="text-gape-pink text-2xl font-bold">50.256,97</div>
                  </div>
                  <div className="w-12 h-12 bg-gape-pink/20 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-gape-pink rounded"></div>
                  </div>
                </div>
              </div>
              
              {/* Mock notification */}
              <div className="mt-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="text-green-400 text-sm">Quando começar de fato a escalar para resultados ainda melhores?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero