'use client'

import { Zap } from 'lucide-react'
import Logo from './Logo'

const Header = () => {
  const handleCTAClick = () => {
    // Scroll to form
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-gape-dark/95 via-gape-dark/90 to-gape-dark/95 backdrop-blur-xl border-b border-brand-primary/20 shadow-lg">
      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          {/* Logo and tagline */}
          <div className="flex items-center gap-4">
            <Logo variant="white" width={140} height={42} className="sm:w-[160px] sm:h-[48px]" />
            <div className="hidden lg:block">
              <div className="text-xs text-brand-primary/90 font-medium">ESPECIALISTAS EM</div>
              <div className="text-sm text-gape-white font-semibold">Google Ads para E-commerce</div>
            </div>
          </div>
          
          {/* Navigation and CTA */}
          <div className="flex items-center gap-6">
            {/* Quick CTA */}
            <button
              onClick={handleCTAClick}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/90 to-brand-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-primary/25 transition-all duration-300 hover:scale-105"
            >
              <Zap className="h-4 w-4" />
              Consultoria Gratuita
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header