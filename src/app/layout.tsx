import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Best Solution® — Business Setup in Dubai | DED & Free Zone Experts",
  description: "Set up your company in Dubai in 2–5 days. 100% foreign ownership, Mainland LLC, Free Zone, Golden Visa & PRO services. Authorized DED & Free Zone Channel Partner.",
  keywords: "business setup Dubai, company formation UAE, free zone setup, mainland LLC, golden visa Dubai, DED authorized, PRO services UAE, corporate banking Dubai",
  metadataBase: new URL("https://business.best-solution.ae"),
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://business.best-solution.ae",
    title: "Best Solution® — Business Setup in Dubai",
    description: "Authorized DED & Free Zone Channel Partner. Set up your company in Dubai in 2–5 days. 100% foreign ownership available.",
    siteName: "Best Solution Business Setup",
    images: [{ url: "/logo.webp", width: 600, height: 200, alt: "Best Solution Business Setup Dubai" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Solution® — Business Setup in Dubai",
    description: "Authorized DED & Free Zone Channel Partner. Set up your company in Dubai in 2–5 days.",
    images: ["/logo.webp"],
  },
  icons: {
    icon: "/fav.webp",
    shortcut: "/fav.webp",
    apple: "/fav.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Consent Mode v2 — default BEFORE GTM loads */}
        <Script
          id="gtm-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                functionality_storage: 'granted',
                personalization_storage: 'denied',
                security_storage: 'granted',
                wait_for_update: 500
              });
              // Restore consent for returning visitors
              var c = localStorage.getItem('cookie-consent');
              if (c === 'accepted') {
                gtag('consent', 'update', {
                  ad_storage: 'granted',
                  ad_user_data: 'granted',
                  ad_personalization: 'granted',
                  analytics_storage: 'granted',
                  functionality_storage: 'granted',
                  personalization_storage: 'granted'
                });
              }
            `,
          }}
        />
        {/* Stape GTM — head loader */}
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://marktmen.best-solution.ae/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-5VWSND9M');`,
          }}
        />
        {/* GTM — client-side (web) container */}
        <Script
          id="gtm-web"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-MLFW9XR');`,
          }}
        />
      </head>
      <body className={`${dmSans.variable} antialiased`}>
        {/* Stape GTM — noscript fallback */}
        <noscript>
          <iframe
            src="https://marktmen.best-solution.ae/ns.html?id=GTM-5VWSND9M"
            height="0" width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* GTM Web — noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MLFW9XR"
            height="0" width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
