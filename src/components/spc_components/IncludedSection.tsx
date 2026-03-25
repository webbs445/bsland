import { FEATURES } from '@/lib/data'
import ScrollReveal from './ScrollReveal'

export default function IncludedSection() {
  return (
    <section className="included" id="included">
      {/* Left — feature list */}
      <div>
        <ScrollReveal><div className="sec-tag">License Inclusions</div></ScrollReveal>

        <ScrollReveal delay="0.06s">
          <h2 className="sec-h">
            Not just a license —<br />
            <em>A Complete</em>
            <strong>Business Foundation.</strong>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay="0.1s">
          <p style={{ fontSize: '17px', color: 'var(--muted-1)', lineHeight: 1.6, marginTop: 20, fontWeight: 400, maxWidth: 560 }}>
            Your SPC Free Zone license comes with the full infrastructure to operate from
            day one — bank account, tax registration, payments, logistics and more.
          </p>
        </ScrollReveal>

        <ScrollReveal delay="0.15s" className="feat-list">
          {FEATURES.map(({ icon: Icon, name, sub }) => (
            <div key={name} className="feat">
              <div className="feat-ic">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <div className="feat-info">
                <div className="feat-name">{name}</div>
                <div className="feat-sub">{sub}</div>
              </div>
              <span className="feat-check">✓</span>
            </div>
          ))}
        </ScrollReveal>
      </div>

      {/* Right — big stat cards */}
      <div>
        <ScrollReveal><div className="sec-tag">Key Highlights</div></ScrollReveal>

        <ScrollReveal delay="0.1s" className="big-cards">
          <div className="big-card">
            <div className="big-n">5</div>
            <div className="big-title">Business Activities on One License</div>
            <div className="big-desc">
              Pick any 5 — consulting, trading, e-commerce, services, import/export.
              All under one single license, zero restrictions.
            </div>
          </div>
          <div className="big-card alt">
            <div className="big-n">100%</div>
            <div className="big-title">Foreign Ownership</div>
            <div className="big-desc">
              No local sponsor required. Full ownership, full control.
              Your business — entirely yours from day one.
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
