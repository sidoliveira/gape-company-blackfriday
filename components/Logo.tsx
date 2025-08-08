'use client'

import Image from 'next/image'

interface LogoProps {
  variant?: 'white' | 'color'
  width?: number
  height?: number
  className?: string
}

const Logo = ({ 
  variant = 'white', 
  width = 120, 
  height = 36, 
  className = '' 
}: LogoProps) => {
  const logoSrc = variant === 'white' 
    ? '/images/gape-logo-white.webp' 
    : '/images/gape-logo-color.webp'

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src={logoSrc}
        alt="Gape Company"
        width={width}
        height={height}
        priority
        className="h-auto w-auto"
      />
    </div>
  )
}

export default Logo