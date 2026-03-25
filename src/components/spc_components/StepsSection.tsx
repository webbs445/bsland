import { STEPS } from '@/lib/data'
import ScrollReveal from './ScrollReveal'

export default function StepsSection() {
  return (
    <section className="steps" id="steps">
      <ScrollReveal className="steps-head">
        <div className="sec-tag">Simple Process</div>
        <h2 className="sec-h">
          From enquiry to <em>Trading</em>
          <strong>in days, not weeks.</strong>
        </h2>
      </ScrollReveal>

      <div className="steps-grid">
        {STEPS.map(({ num, title, desc }, i) => (
          <ScrollReveal
            key={num}
            className="step"
            delay={`${(i + 1) * 0.06}s`}
          >
            <div className="step-num">{num}</div>
            <div className="step-text">
              <div className="step-title">{title}</div>
              <div className="step-desc">{desc}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
