import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
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
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "sqs6wgndni");
            `,
          }}
        />
        
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '691432732941885');
              fbq('init', '1198397755061770');
              fbq('track', 'PageView');
            `,
          }}
        />
        
        {/* Google Ads Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11127656445"
          strategy="afterInteractive"
        />
        <Script
          id="google-ads-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-11127656445');
              gtag('event', 'conversion', {'send_to': 'AW-11127656445/TshvCI2M8O4YEP2firop'});
            `,
          }}
        />
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
        
        {/* Meta Pixel noscript */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=691432732941885&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1198397755061770&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        
        {children}
      </body>
    </html>
  )
}