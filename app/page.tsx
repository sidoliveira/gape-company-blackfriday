import Hero from '@/components/Hero'
import Logos from '@/components/Logos'
import Pillars from '@/components/Pillars'
import Testimonials from '@/components/Testimonials'
import BadgesMetrics from '@/components/BadgesMetrics'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Logos />
      <Pillars />
      <Testimonials />
      <BadgesMetrics />
      <CTA />
      <Footer />
    </main>
  )
}