'use client'

const Logos = () => {
  // Real client logos based on the images provided
  const logos = [
    { name: 'ADMINER', width: 120, height: 40 },
    { name: 'DOMINAR', width: 140, height: 40 },
    { name: 'MURANO', width: 100, height: 40 },
    { name: 'Nazaré', width: 130, height: 40 },
    { name: 'SunKiDS', width: 110, height: 40 },
    { name: 'WAHANA', width: 125, height: 40 },
    { name: 'ANDRE METRO', width: 135, height: 40 },
  ]

  return (
    <section className="bg-gape-dark-soft py-16 sm:py-20 border-y border-gape-pink/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gape-white mb-3 sm:mb-4 px-4 sm:px-0">
            Junte-se aos negócios <span className="text-gape-pink">referência em seus segmentos</span> que confiam e crescem com a Gape Company
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gape-gray-light max-w-3xl mx-auto px-4 sm:px-0">
            A Gape Company <span className="text-gape-pink font-semibold">impulsiona o crescimento de negócios</span>, oferecendo soluções confiáveis e estratégicas para quem busca resultados sólidos.
          </p>
        </div>
        
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gape-pink mb-1 sm:mb-2">+5 anos</div>
            <div className="text-gape-gray-light text-xs sm:text-sm">de experiência</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gape-pink mb-1 sm:mb-2">+150</div>
            <div className="text-gape-gray-light text-xs sm:text-sm">clientes atendidos</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gape-pink mb-1 sm:mb-2">+700 mil</div>
            <div className="text-gape-gray-light text-xs sm:text-sm">investimento todos os meses</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gape-pink mb-1 sm:mb-2">+15M</div>
            <div className="text-gape-gray-light text-xs sm:text-sm">de faturamento mensal</div>
          </div>
        </div>
        
        {/* Logos carousel */}
        <div className="overflow-hidden">
          <div className="flex animate-scroll items-center justify-center space-x-6 sm:space-x-8 lg:space-x-12 hover:pause">
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div
                key={`logo-1-${index}`}
                className="flex-shrink-0 opacity-40 transition-opacity duration-300 hover:opacity-80"
              >
                <div
                  className="flex items-center justify-center rounded-lg bg-gape-dark border border-gape-pink/10 text-gape-gray-light hover:border-gape-pink/30 transition-all duration-300"
                  style={{ 
                    width: Math.max(80, logo.width * 0.7), 
                    height: Math.max(30, logo.height * 0.7),
                    minWidth: '80px'
                  }}
                >
                  <span className="text-xs sm:text-sm font-medium px-2">{logo.name}</span>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for infinite scroll effect */}
            {logos.map((logo, index) => (
              <div
                key={`logo-2-${index}`}
                className="flex-shrink-0 opacity-40 transition-opacity duration-300 hover:opacity-80"
              >
                <div
                  className="flex items-center justify-center rounded-lg bg-gape-dark border border-gape-pink/10 text-gape-gray-light hover:border-gape-pink/30 transition-all duration-300"
                  style={{ 
                    width: Math.max(80, logo.width * 0.7), 
                    height: Math.max(30, logo.height * 0.7),
                    minWidth: '80px'
                  }}
                >
                  <span className="text-xs sm:text-sm font-medium px-2">{logo.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Note for replacing placeholders */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            * Logos de clientes serão substituídos pelos reais conforme autorização
          </p>
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
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default Logos