import Link from 'next/link'
import ScrollReveal from './ScrollReveal'

export default function CTASection() {
  return (
    <section className="cta-sec">
      <ScrollReveal className="cta-urgency-flag">
        <span className="cd-live" />
        <span className="cuf-text">
          Limited time — offer ends <strong>31 March 2026</strong>
        </span>
      </ScrollReveal>

      <ScrollReveal delay="0.07s">
        <div className="cta-tag">Ready to Launch?</div>
        <h2 className="cta-h">
          Get Your UAE Business License
          <span className="cta-h-sub">+ AED 31,000 in Benefits</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay="0.14s">
        <p className="cta-p">
          Over{' '}
          <strong>AED 31,000 in real, activatable business benefits</strong> —
          bundled with your license. Zoho, WhatsApp marketing, social media AI,
          website and more. All for just AED 5,750.
        </p>
      </ScrollReveal>

      <ScrollReveal delay="0.2s" className="cta-btns">
        <Link href="#hero-form" className="btn-cta">
          Claim Your License Now &rarr;
        </Link>
        <a
          href="https://wa.me/971522330011"
          className="btn-wa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.116 1.524 5.855L.057 23.888a.5.5 0 0 0 .612.612l6.041-1.467A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a10 10 0 0 1-5.095-1.392l-.363-.214-3.788.919.934-3.694-.235-.381A10 10 0 1 1 12 22z" />
          </svg>
          WhatsApp Us
        </a>
      </ScrollReveal>

      <ScrollReveal delay="0.26s">
        <p className="cta-fine">
          *T&amp;Cs Apply. Offer valid through{' '}
          <mark>31 March 2026</mark>. Subject to SPC Free Zone terms and
          conditions.
        </p>
      </ScrollReveal>
    </section>
  )
}
