import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GTMScript } from '@/lib/utils/gtm'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gape Company - Aceleradora de E-commerce | Estratégias de Alta Conversão',
  description: 'Transforme seu e-commerce em uma máquina de vendas. +150 clientes, R$80M+ em vendas geradas. Time especializado em tráfego pago e estratégias de conversão.',
  keywords: 'e-commerce, tráfego pago, marketing digital, conversão, vendas online, google ads, facebook ads',
  authors: [{ name: 'Gape Company' }],
  creator: 'Gape Company',
  publisher: 'Gape Company',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gapecompany.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Gape Company - Aceleradora de E-commerce',
    description: 'Transforme seu e-commerce em uma máquina de vendas. +150 clientes, R$80M+ em vendas geradas.',
    url: 'https://gapecompany.com',
    siteName: 'Gape Company',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gape Company - Aceleradora de E-commerce',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gape Company - Aceleradora de E-commerce',
    description: 'Transforme seu e-commerce em uma máquina de vendas. +150 clientes, R$80M+ em vendas geradas.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <GTMScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1976d2" />
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}