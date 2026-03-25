import { STATS } from '@/lib/data'
import ScrollReveal from './ScrollReveal'

export default function StatsStrip() {
  return (
    <div className="stats-strip">
      {STATS.map(({ num, sup, label }, i) => (
        <ScrollReveal
          key={label}
          className="stat-cell"
          delay={`${i * 0.07}s`}
        >
          <span className="stat-n">
            {num}{sup && <sup>{sup}</sup>}
          </span>
          <span className="stat-l">{label}</span>
        </ScrollReveal>
      ))}
    </div>
  )
}
