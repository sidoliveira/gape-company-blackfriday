import { Mail, Phone, MapPin, Linkedin, Instagram, Target, TrendingUp, Award, Shield, Zap, BarChart3, Users, Globe } from 'lucide-react'
import contentMap from '@/content/content-map.json'
import Logo from './Logo'

const Footer = () => {
  const footerContent = contentMap.footer.revised
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gape-black border-t border-gape-orange/20 relative overflow-hidden">
      {/* Enhanced Background decorative elements */}
      <div className="absolute inset-0">
        {/* Gradient spheres */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-gape-orange/10 to-gape-pink/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/8 to-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-br from-green-500/6 to-yellow-500/4 rounded-full blur-3xl" />
        
        {/* Floating gradient lines */}
        <div className="absolute top-20 right-10 w-32 h-0.5 bg-gradient-to-r from-transparent via-gape-orange/30 to-transparent rotate-45 animate-pulse" />
        <div className="absolute bottom-32 left-20 w-24 h-0.5 bg-gradient-to-r from-transparent via-gape-pink/20 to-transparent -rotate-12" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      
      <div className="container-custom relative">
        {/* Main footer content */}
        <div className="section-padding">
          <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Enhanced Company info */}
            <div className="lg:col-span-2">
              <div className="mb-6 sm:mb-8">
                <div className="mb-4 sm:mb-6">
                  <Logo variant="white" width={140} height={42} className="sm:w-[160px] sm:h-[48px]" />
                </div>
                
                {/* Results badge removido */}
                
                <p className="text-gape-gray-light leading-relaxed text-base sm:text-lg mb-6">
                  Especialistas em Google Ads para e-commerces. Transformamos tráfego em vendas com estratégias data-driven e metodologia G.A.P.E. comprovada.
                </p>
                
                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                    <div className="flex items-center justify-center mb-1">
                      <Target className="h-4 w-4 text-gape-orange mr-1" />
                      <span className="text-lg font-bold text-white">98%</span>
                    </div>
                    <span className="text-xs text-gray-400">Taxa de Sucesso</span>
                  </div>
                  <div className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-gape-orange mr-1" />
                      <span className="text-lg font-bold text-white">200+</span>
                    </div>
                    <span className="text-xs text-gray-400">E-commerces</span>
                  </div>
                  <div className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className="h-4 w-4 text-gape-orange mr-1" />
                      <span className="text-lg font-bold text-white">5x</span>
                    </div>
                    <span className="text-xs text-gray-400">Crescimento</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center group">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 group-hover:bg-gape-orange/20 group-hover:scale-110 transition-all duration-300 border border-white/20">
                    <Mail className="h-5 w-5 text-gape-orange group-hover:text-white" />
                  </div>
                  <div>
                    <a 
                      href="mailto:contato@gapecompany.com"
                      className="text-base text-white hover:text-gape-orange transition-colors duration-300 font-semibold block"
                    >
                      contato@gapecompany.com
                    </a>
                    <span className="text-sm text-gray-400">Resposta em até 2h</span>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 group-hover:bg-gape-orange/20 group-hover:scale-110 transition-all duration-300 border border-white/20">
                    <Phone className="h-5 w-5 text-gape-orange group-hover:text-white" />
                  </div>
                  <div>
                    <a 
                      href="tel:+5511999999999"
                      className="text-base text-white hover:text-gape-orange transition-colors duration-300 font-semibold block"
                    >
                      (11) 99999-9999
                    </a>
                    <span className="text-sm text-gray-400">WhatsApp disponível</span>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 mt-1 group-hover:bg-gape-orange/20 group-hover:scale-110 transition-all duration-300 border border-white/20">
                    <MapPin className="h-5 w-5 text-gape-orange group-hover:text-white" />
                  </div>
                  <div>
                    <span className="text-base text-white font-semibold block">
                      {footerContent.address}
                    </span>
                    <span className="text-sm text-gray-400">Atendimento presencial</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Services */}
            <div>
              <h4 className="text-lg font-bold bg-gradient-to-r from-white to-gape-orange bg-clip-text text-transparent mb-6 flex items-center">
                <Zap className="h-5 w-5 text-gape-orange mr-2" />
                Especialidades Google Ads
              </h4>
              <ul className="space-y-4">
                <li>
                  <a href="#pillars" className="text-sm text-gray-300 hover:text-white transition-colors duration-300 flex items-center group p-2 rounded-lg hover:bg-white/5">
                    <div className="w-8 h-8 bg-gape-orange/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gape-orange/30 transition-colors duration-300">
                      <Target className="w-4 h-4 text-gape-orange" />
                    </div>
                    <div>
                      <span className="font-medium block">Campanhas de Performance</span>
                      <span className="text-xs text-gray-500">Shopping, Search & Display</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#pillars" className="text-sm text-gray-300 hover:text-white transition-colors duration-300 flex items-center group p-2 rounded-lg hover:bg-white/5">
                    <div className="w-8 h-8 bg-gape-orange/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gape-orange/30 transition-colors duration-300">
                      <BarChart3 className="w-4 h-4 text-gape-orange" />
                    </div>
                    <div>
                      <span className="font-medium block">Análise & Otimização</span>
                      <span className="text-xs text-gray-500">Data-driven decisions</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#pillars" className="text-sm text-gray-300 hover:text-white transition-colors duration-300 flex items-center group p-2 rounded-lg hover:bg-white/5">
                    <div className="w-8 h-8 bg-gape-orange/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gape-orange/30 transition-colors duration-300">
                      <Globe className="w-4 h-4 text-gape-orange" />
                    </div>
                    <div>
                      <span className="font-medium block">Expansão Internacional</span>
                      <span className="text-xs text-gray-500">Mercados globais</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#pillars" className="text-sm text-gray-300 hover:text-white transition-colors duration-300 flex items-center group p-2 rounded-lg hover:bg-white/5">
                    <div className="w-8 h-8 bg-gape-orange/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gape-orange/30 transition-colors duration-300">
                      <Shield className="w-4 h-4 text-gape-orange" />
                    </div>
                    <div>
                      <span className="font-medium block">Auditoria Completa</span>
                      <span className="text-xs text-gray-500">Diagnóstico gratuito</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Enhanced Quick links */}
            <div>
              <h4 className="text-lg font-bold bg-gradient-to-r from-white to-gape-orange bg-clip-text text-transparent mb-6">
                Navegação
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#hero" className="text-sm text-gray-300 hover:text-white transition-all duration-300 flex items-center group p-2 rounded-lg hover:bg-white/5">
                    <div className="w-2 h-2 bg-gape-orange rounded-full mr-3 opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                    <span className="font-medium">Início</span>
                  </a>
                </li>
                <li>
                  <a href="#pillars" className="text-sm text-gray-300 hover:text-white transition-all duration-300 flex items-center group p-2 rounded-lg hover:bg-white/5">
                    <div className="w-2 h-2 bg-gape-orange rounded-full mr-3 opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                    <span className="font-medium">Metodologia G.A.P.E.</span>
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-sm text-gray-300 hover:text-white transition-all duration-300 flex items-center group p-2 rounded-lg hover:bg-white/5">
                    <div className="w-2 h-2 bg-gape-orange rounded-full mr-3 opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                    <span className="font-medium">Cases de Sucesso</span>
                  </a>
                </li>
                <li>
                  <a href="#contact-form" className="text-sm text-gray-300 hover:text-white transition-all duration-300 flex items-center group p-2 rounded-lg hover:bg-white/5">
                    <div className="w-2 h-2 bg-gape-orange rounded-full mr-3 opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                    <span className="font-medium">Consultoria Gratuita</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition-all duration-300 flex items-center group p-2 rounded-lg hover:bg-white/5">
                    <div className="w-2 h-2 bg-gape-orange rounded-full mr-3 opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                    <span className="font-medium">Política de Privacidade</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition-all duration-300 flex items-center group p-2 rounded-lg hover:bg-white/5">
                    <div className="w-2 h-2 bg-gape-orange rounded-full mr-3 opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                    <span className="font-medium">Termos de Uso</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Enhanced Social media and bottom bar */}
        <div className="border-t border-gape-orange/20 py-8">
          <div className="flex flex-col items-center justify-between space-y-6 lg:flex-row lg:space-y-0">
            {/* Enhanced Social media */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400 font-medium mr-2">Siga-nos:</span>
              <a 
                href="https://linkedin.com/company/gapecompany"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gape-orange hover:bg-gape-orange/20 hover:scale-110 hover:text-white transition-all duration-300 group border border-white/20"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a 
                href="https://instagram.com/gapecompany"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gape-orange hover:bg-gape-orange/20 hover:scale-110 hover:text-white transition-all duration-300 group border border-white/20"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
            
            {/* Enhanced Copyright */}
            <div className="text-center">
              <p className="text-base font-semibold text-white mb-1">
                © {currentYear} {footerContent.company_name}. Todos os direitos reservados.
              </p>
              <p className="text-sm text-gray-400">
                {footerContent.legal_name} - CNPJ: {footerContent.cnpj}
              </p>
            </div>
            
            {/* Enhanced Certifications */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gape-orange hover:bg-gape-orange/20 hover:scale-110 hover:text-white transition-all duration-300 group border border-white/20">
                <img 
                  src="/images/google-logo.svg" 
                  alt="Google Partner" 
                  className="h-5 w-auto filter brightness-90 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-blue-400 hover:bg-blue-500/20 hover:scale-110 hover:text-white transition-all duration-300 group border border-white/20">
                <img 
                  src="/images/meta-logo.svg" 
                  alt="Meta Business Partner" 
                  className="h-5 w-auto filter brightness-90 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer