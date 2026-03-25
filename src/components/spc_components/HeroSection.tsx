import { CHIPS, STATS } from '@/lib/data'
import CountdownTimer from './CountdownTimer'
import InquiryForm from './InquiryForm'

export default function HeroSection() {
  return (
    <section className="hero-wrap" id="top">
      {/* Background decorations — full viewport width */}
      <div className="hero-tile" aria-hidden="true" />
      <div className="g1" aria-hidden="true" />
      <div className="g2" aria-hidden="true" />
      <div className="g3" aria-hidden="true" />

      {/* Constrained content grid */}
      <div className="hero">
        {/* ── LEFT ── */}
        <div className="hero-l">
          <div className="r-badge">
            <span className="r-badge-moon">☽</span>
            <span className="r-badge-text">Ramadan Special · SPC Free Zone Partner</span>
          </div>

          <h1 className="h1">
            <span className="l1">Your UAE</span>
            <span className="l2">Business</span>
            <span className="l3">Starts Here.</span>
          </h1>

          {/* ── Price block with strikethrough + highlighted price ── */}
          <div className="price-block">
            <div className="price-old-row">
              <span className="price-old">AED 6,875</span>
              <span className="price-save-badge">SAVE AED 1,125</span>
            </div>
            <div className="price-highlight">
              <span className="price-cur">AED</span>
              <span className="price-num">5,750</span>
            </div>
          </div>

          <div className="value-pill">
            <span className="vp-icon">🎁</span>
            <span className="vp-text">
              <strong>AED 31,000</strong>
              in exclusive partner benefits included free
            </span>
          </div>

          <div className="chips">
            {CHIPS.map((chip) => (
              <span key={chip.label} className="chip">
                <svg className="chip-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={chip.icon} />
                </svg>
                {chip.label}
              </span>
            ))}
          </div>

          {/* Inline stats like reference */}
          <div className="hero-inline-stats">
            {STATS.map((s) => (
              <div key={s.label} className="hi-stat">
                <span className="hi-num">{s.num}{s.sup}</span>
                <span className="hi-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — countdown + form panel ── */}
        <div className="hero-r" id="hero-form">
          {/* CountdownTimer is a client component */}
          <CountdownTimer />

          <div className="deadline-flag">
            <span className="cd-live" />
            <span className="df-text">
              Offer ends <strong>31 March 2026</strong> — limited slots
            </span>
          </div>

          {/* InquiryForm is a client component */}
          <InquiryForm />
        </div>
      </div>
    </section>
  )
}
