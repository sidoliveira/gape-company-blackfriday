import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Logos from '@/components/Logos'
import Pillars from '@/components/Pillars'
import Testimonials from '@/components/Testimonials'
import BadgesMetrics from '@/components/BadgesMetrics'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <CTA />
        <Logos />
        <Pillars />
        <Testimonials />
        <BadgesMetrics />
        <Hero />
        <Footer />
      </main>
    </>
  )
}