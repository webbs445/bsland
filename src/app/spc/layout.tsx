import type { Metadata } from 'next'
import { Playfair_Display, Sora, DM_Mono } from 'next/font/google'
import './globals.css'
import TopBar from '@/components/spc_components/TopBar'

/* ─── Fonts ──────────────────────────────────────────────────────────────── */
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--fw-display',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--fw-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--fw-mono',
  display: 'swap',
})

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Best Solution® — SPC Offer',
  description:
    'Get your UAE Business License for just AED 5,750 this Ramadan. Unlock AED 31,000+ in exclusive benefits — free Zoho suite, WhatsApp marketing, website hosting and more. Limited to 31 March 2026.',
  openGraph: {
    title: 'Best Solution® — SPC Offer',
    description: 'UAE Business License + AED 31,000 in benefits. Offer ends 31 March 2026.',
    type: 'website',
    locale: 'en_AE',
  },
}

/* ─── Layout ─────────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${playfair.variable} ${sora.variable} ${dmMono.variable}`}>
      {/* Topbar ticker with live countdown — client-only */}
      <TopBar />
      {children}
    </div>
  )
}
