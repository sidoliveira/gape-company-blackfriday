'use client'

import { useState } from 'react'
import { BarChart3, Users, ShoppingBag, TrendingUp } from 'lucide-react'

const Logos = () => {
  // Real client logos based on the images provided
  const logos = [
    { name: 'Adminer', src: '/images/loja-adminer.png', width: 120, height: 40 },
    { name: 'Alpas Joias', src: '/images/loja-alpas-joias.png', width: 140, height: 40 },
    { name: 'Dom Conrado', src: '/images/loja-dom-conrado.png', width: 100, height: 40 },
    { name: 'Duda Castro', src: '/images/loja-duda-castro.png', width: 130, height: 40 },
    { name: 'Gemany', src: '/images/loja-gemany.png', width: 110, height: 40 },
    { name: 'Kaype Store', src: '/images/loja-kaypestore.png', width: 125, height: 40 },
    { name: 'Modernlar', src: '/images/loja-modernlar.png', width: 135, height: 40 },
    { name: 'Onda Marina', src: '/images/loja-ondamarina.png', width: 120, height: 40 },
    { name: 'Ortopés', src: '/images/loja-ortopés.png', width: 140, height: 40 },
    { name: 'Tudo a Kilo', src: '/images/loja-tudoakilo.png', width: 100, height: 40 },
    { name: 'Vennanci', src: '/images/loja-vennanci.png', width: 130, height: 40 },
  ]

  const [isHovered, setIsHovered] = useState(false)

  // Metrics data with icons
  const metrics = [
    {
      value: '+5 anos',
      label: 'de experiência',
      icon: <BarChart3 className="h-5 w-5 text-gape-pink" />
    },
    {
      value: '+150',
      label: 'clientes atendidos',
      icon: <Users className="h-5 w-5 text-gape-pink" />
    },
    {
      value: '+700 mil',
      label: 'investimento todos os meses',
      icon: <ShoppingBag className="h-5 w-5 text-gape-pink" />
    },
    {
      value: '+15M',
      label: 'de faturamento mensal',
      icon: <TrendingUp className="h-5 w-5 text-gape-pink" />
    }
  ]

  return (
    <section className="section-padding bg-gape-dark-soft border-y border-gape-pink/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gape-white mb-3 sm:mb-4 px-4 sm:px-0">
            Junte-se aos negócios <span className="text-gape-pink">referência em seus segmentos</span> que confiam e crescem com a Gape Company
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gape-gray-light max-w-3xl mx-auto px-4 sm:px-0">
            A Gape Company <span className="text-gape-pink font-semibold">impulsiona o crescimento de negócios</span>, oferecendo soluções confiáveis e estratégicas para quem busca resultados sólidos.
          </p>
        </div>
        
        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-14">
          {metrics.map((metric, index) => (
            <div key={index} className="border border-gape-pink/20 bg-gape-dark/50 backdrop-blur-sm hover:border-gape-pink/40 transition-all duration-300 rounded-xl p-4 sm:p-6 flex flex-col items-center">
              <div className="rounded-full bg-gape-pink/10 p-2 mb-3">
                {metric.icon}
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gape-pink mb-1">
                {metric.value}
              </div>
              <div className="text-gape-gray-light text-xs sm:text-sm text-center">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Logos carousel */}
        <div className="overflow-hidden rounded-lg border border-gape-pink/20 bg-gape-dark/30 backdrop-blur-sm p-6">
          <h3 className="text-center text-sm font-medium text-gape-gray-light uppercase tracking-wider mb-6">
            Empresas que confiam em nosso trabalho
          </h3>
          
          <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={`flex items-center justify-center space-x-8 lg:space-x-12 ${isHovered ? 'animate-pause' : 'animate-scroll'}`}>
              {/* First set of logos */}
              {logos.map((logo, index) => (
                <div
                  key={`logo-1-${index}`}
                  className="flex-shrink-0 opacity-60 transition-opacity duration-300 hover:opacity-100"
                >
                  <div
                    className="flex items-center justify-center rounded-lg border border-gape-pink/20 bg-gape-dark-soft hover:border-gape-pink/40 transition-all duration-300 p-2"
                    style={{ 
                      width: Math.max(80, logo.width * 0.7), 
                      height: Math.max(30, logo.height * 0.7),
                      minWidth: '80px'
                    }}
                  >
                    <img 
                      src={logo.src} 
                      alt={logo.name}
                      className="max-w-full max-h-full object-contain filter brightness-75 hover:brightness-100 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for infinite scroll effect */}
              {logos.map((logo, index) => (
                <div
                  key={`logo-2-${index}`}
                  className="flex-shrink-0 opacity-60 transition-opacity duration-300 hover:opacity-100"
                >
                  <div
                    className="flex items-center justify-center rounded-lg border border-gape-pink/20 bg-gape-dark-soft hover:border-gape-pink/40 transition-all duration-300 p-2"
                    style={{ 
                      width: Math.max(80, logo.width * 0.7), 
                      height: Math.max(30, logo.height * 0.7),
                      minWidth: '80px'
                    }}
                  >
                    <img 
                      src={logo.src} 
                      alt={logo.name}
                      className="max-w-full max-h-full object-contain filter brightness-75 hover:brightness-100 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Note for replacing placeholders */}
          
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-pause {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default Logos