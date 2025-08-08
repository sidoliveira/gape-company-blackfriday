'use client'

import Script from 'next/script'

export function GTMScript() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  
  if (!gtmId) {
    console.warn('GTM ID not found in environment variables')
    return null
  }

  return (
    <Script
      id="gtm-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `,
      }}
    />
  )
}

// GTM Event tracking functions
export const gtmTrack = {
  formSubmit: (formData: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'gtm.formSubmit',
        formData,
      })
    }
  },
  
  generateLead: (leadData: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'generate_lead',
        leadData,
        value: 1, // Lead value for conversion tracking
        currency: 'BRL',
      })
    }
  },
  
  pageView: (page: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: document.title,
        page_location: window.location.href,
        page_path: page,
      })
    }
  },
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[]
  }
}