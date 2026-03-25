import ScrollReveal from './ScrollReveal'
import Image from 'next/image'

const REASONS = [
  {
    icon: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z|m9 12 2 2 4-4',
    title: 'Authorized Government Channel Partner',
    desc: 'We walk into DED and Free Zone offices to submit on your behalf — because they\'ve authorized us to. No middlemen. No delays. Direct partnership.',
  },
  {
    icon: 'M3 3h7v7H3z|M14 3h7v7h-7z|M14 14h7v7h-7z|M3 14h7v7H3z',
    title: 'You\'ll Never Step Inside a Government Office',
    desc: 'We prepare, review, and submit every document. From trade name to final license — you never stand in a queue or chase a clerk.',
  },
  {
    icon: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z|m9 12 2 2 4-4',
    title: 'Your Personal Assets Stay Legally Protected',
    desc: 'We guide you to the structure that ring-fences your personal wealth from business risk. LLC, FZE, or Professional — protection always comes first.',
  },
  {
    icon: 'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z',
    title: 'Licensed in 2 Days, Not Weeks',
    desc: 'Our channel partnership means priority processing. While others wait, your application moves through dedicated fast-track channels.',
  },
  {
    icon: 'm21 21-4.34-4.34|M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z',
    title: 'The Price We Quote Is the Price You Pay',
    desc: 'Every dirham explained upfront. Government fees, service charges, visa costs — all transparent before you commit. Zero hidden fees. Guaranteed.',
  },
]

export default function WhyUsSection() {
  return (
    <section className="why-us" id="why-us">
      <div className="why-grid">
        {/* Left — heading + image placeholder */}
        <div className="why-l">
          <ScrollReveal>
            <span className="sec-tag">Why Best Solution®</span>
          </ScrollReveal>

          <ScrollReveal delay="0.06s">
            <h2 className="why-h">
              We Don&apos;t Just Advise,<br />
              We Act <em>On Your Behalf</em>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay="0.12s">
            <p className="why-sub">
              Every concern you have about setting up in Dubai?
              We&apos;ve already solved it — 2,500 times.
            </p>
          </ScrollReveal>

          <ScrollReveal delay="0.18s">
            <div className="why-img-card group">
              <div className="why-img-overlay" />
              <Image 
                src="/team.jpg" 
                alt="Best Solution Management Team" 
                fill
                className="why-img"
              />
              <div className="why-img-glow" />
              
              <div className="why-img-inner">
                <div className="why-img-badge">
                  <span className="why-badge-dot" />
                  <span className="why-badge-text">Dubai Headquarters</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right — reasons list */}
        <div className="why-r">
          {REASONS.map((r, i) => (
            <ScrollReveal key={r.title} delay={`${i * 0.08}s`} className="why-item">
              <div className="why-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {r.icon.split('|').map((d, j) => (
                    <path key={j} d={d} />
                  ))}
                </svg>
              </div>
              <div className="why-info">
                <h3 className="why-name">{r.title}</h3>
                <p className="why-desc">{r.desc}</p>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal delay="0.5s" className="why-cta-row">
            <a href="#hero-form" className="why-btn-primary">
              Start Business Today
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a href="tel:+971522330011" className="why-btn-ghost">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
              </svg>
              Speak to an Advisor
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
