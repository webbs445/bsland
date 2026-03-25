import { BENEFITS } from '@/lib/data'
import ScrollReveal from './ScrollReveal'

export default function BenefitsSection() {
  return (
    <section className="benefits" id="benefits">
      <ScrollReveal className="benefits-intro">
        <div>
          <div className="sec-tag">SPC Free Zone Advantage</div>
          <h2 className="sec-h">
            Every benefit has<br />
            <em>A Real AED Value.</em>
            <strong>Here&apos;s the proof.</strong>
          </h2>
        </div>
        <div className="benefits-intro-right">
          <div className="total-label">Combined Benefits Value</div>
          <div className="total-num">
            <sub>AED</sub>31,000
          </div>
        </div>
      </ScrollReveal>

      <div className="b-grid">
        {BENEFITS.map(({ idx, icon: Icon, value, prefix, title, desc }, i) => {
          const delay = `${[0, 0.07, 0.14, 0.07, 0.14, 0.21][i] ?? 0}s`
          // Split "AED 16,528" → prefix "AED " + number "16,528"
          const numPart = prefix ? value.replace(prefix, '') : value
          return (
            <ScrollReveal key={idx} className="b-card" delay={delay}>
              <div className="b-num">{idx}</div>
              <span className="b-icon">
                <Icon size={32} strokeWidth={1.5} />
              </span>
              <div className="b-val">
                {prefix && <sup>{prefix.trim()}</sup>}
                {numPart}
              </div>
              <div className="b-title">{title}</div>
              <div className="b-desc">{desc}</div>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
