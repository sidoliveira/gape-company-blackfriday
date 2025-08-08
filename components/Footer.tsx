import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react'
import contentMap from '@/content/content-map.json'
import Logo from './Logo'

const Footer = () => {
  const footerContent = contentMap.footer.revised
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gape-black border-t border-gape-pink/10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gape-pink/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gape-pink/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative px-4 sm:px-0">
        {/* Main footer content */}
        <div className="py-12 sm:py-16">
          <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Company info */}
            <div className="lg:col-span-2">
              <div className="mb-6 sm:mb-8">
                <div className="mb-4 sm:mb-6">
                  <Logo variant="white" width={140} height={42} className="sm:w-[160px] sm:h-[48px]" />
                </div>
                <p className="text-gape-gray-light leading-relaxed text-base sm:text-lg">
                  Aceleramos o crescimento de e-commerces com estratégias data-driven e foco em ROI. Soluções completas para quem busca resultados sólidos e escaláveis.
                </p>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center group">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gape-pink/20 to-gape-pink/10 rounded-lg flex items-center justify-center mr-3 sm:mr-4 group-hover:from-gape-pink/30 group-hover:to-gape-pink/20 transition-all duration-300">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gape-pink" />
                  </div>
                  <a 
                    href="mailto:contato@gapecompany.com"
                    className="text-sm sm:text-base text-gape-gray-light hover:text-gape-pink transition-colors duration-300 font-medium"
                  >
                    contato@gapecompany.com
                  </a>
                </div>
                
                <div className="flex items-center group">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gape-pink/20 to-gape-pink/10 rounded-lg flex items-center justify-center mr-3 sm:mr-4 group-hover:from-gape-pink/30 group-hover:to-gape-pink/20 transition-all duration-300">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gape-pink" />
                  </div>
                  <a 
                    href="tel:+5511999999999"
                    className="text-sm sm:text-base text-gape-gray-light hover:text-gape-pink transition-colors duration-300 font-medium"
                  >
                    (11) 99999-9999
                  </a>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gape-pink/20 to-gape-pink/10 rounded-lg flex items-center justify-center mr-3 sm:mr-4 mt-0.5 sm:mt-1 group-hover:from-gape-pink/30 group-hover:to-gape-pink/20 transition-all duration-300">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gape-pink" />
                  </div>
                  <span className="text-sm sm:text-base text-gape-gray-light font-medium">
                    {footerContent.address}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-white to-gape-pink bg-clip-text text-transparent mb-4 sm:mb-6">
                Serviços
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a href="#pillars" className="text-sm sm:text-base text-gape-gray-light hover:text-gape-pink transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gape-pink rounded-full mr-2 sm:mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Estratégia de E-commerce
                  </a>
                </li>
                <li>
                  <a href="#pillars" className="text-sm sm:text-base text-gape-gray-light hover:text-gape-pink transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gape-pink rounded-full mr-2 sm:mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Análise de Mercado
                  </a>
                </li>
                <li>
                  <a href="#pillars" className="text-sm sm:text-base text-gape-gray-light hover:text-gape-pink transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gape-pink rounded-full mr-2 sm:mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Criação de Criativos
                  </a>
                </li>
                <li>
                  <a href="#pillars" className="text-sm sm:text-base text-gape-gray-light hover:text-gape-pink transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gape-pink rounded-full mr-2 sm:mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Acompanhamento de Resultados
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Quick links */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-white to-gape-pink bg-clip-text text-transparent mb-4 sm:mb-6">
                Links Rápidos
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a href="#hero" className="text-sm sm:text-base text-gape-gray-light hover:text-gape-pink transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gape-pink rounded-full mr-2 sm:mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Início
                  </a>
                </li>
                <li>
                  <a href="#pillars" className="text-sm sm:text-base text-gape-gray-light hover:text-gape-pink transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gape-pink rounded-full mr-2 sm:mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-sm sm:text-base text-gape-gray-light hover:text-gape-pink transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gape-pink rounded-full mr-2 sm:mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Depoimentos
                  </a>
                </li>
                <li>
                  <a href="#contact-form" className="text-sm sm:text-base text-gape-gray-light hover:text-gape-pink transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gape-pink rounded-full mr-2 sm:mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm sm:text-base text-gape-gray-light hover:text-gape-pink transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gape-pink rounded-full mr-2 sm:mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm sm:text-base text-gape-gray-light hover:text-gape-pink transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gape-pink rounded-full mr-2 sm:mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Termos de Uso
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Social media and bottom bar */}
        <div className="border-t border-gape-pink/10 py-6 sm:py-8">
          <div className="flex flex-col items-center justify-between space-y-4 sm:space-y-6 md:flex-row md:space-y-0">
            {/* Social media */}
            <div className="flex space-x-3 sm:space-x-4">
              <a 
                href="https://linkedin.com/company/gapecompany"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gape-pink/20 to-gape-pink/10 rounded-lg flex items-center justify-center text-gape-pink hover:from-gape-pink/30 hover:to-gape-pink/20 hover:scale-110 transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a 
                href="https://instagram.com/gapecompany"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gape-pink/20 to-gape-pink/10 rounded-lg flex items-center justify-center text-gape-pink hover:from-gape-pink/30 hover:to-gape-pink/20 hover:scale-110 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
            
            {/* Copyright */}
            <div className="text-center text-gape-gray-light">
              <p className="text-sm sm:text-base font-medium">
                © {currentYear} {footerContent.company_name}. Todos os direitos reservados.
              </p>
              <p className="text-xs sm:text-sm mt-1 sm:mt-2 opacity-75">
                {footerContent.legal_name} - CNPJ: {footerContent.cnpj}
              </p>
            </div>
            
            {/* Certifications */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="px-2 py-1.5 sm:px-3 sm:py-2 bg-gradient-to-r from-gape-pink/10 to-gape-pink/5 rounded-lg border border-gape-pink/20">
                <span className="text-xs text-gape-pink font-medium">Google Partner</span>
              </div>
              <div className="px-2 py-1.5 sm:px-3 sm:py-2 bg-gradient-to-r from-gape-pink/10 to-gape-pink/5 rounded-lg border border-gape-pink/20">
                <span className="text-xs text-gape-pink font-medium">Meta Business Partner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer