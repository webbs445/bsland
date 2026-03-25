'use client'

import { useCountdown } from '@/hooks/useCountdown'

export default function CountdownTimer() {
  const { days, hrs, mins, secs, isUrgent } = useCountdown()

  const urgentStyle = isUrgent ? { color: 'var(--red)' } : undefined

  const cells = [
    { id: 'cd-d', val: days, label: 'Days' },
    { id: 'cd-h', val: hrs,  label: 'Hrs'  },
    { id: 'cd-m', val: mins, label: 'Min'  },
    { id: 'cd-s', val: secs, label: 'Sec'  },
  ]

  return (
    <div className="cd-strip">
      <div className="cd-label">
        <span className="cd-live" />
        Offer Countdown
      </div>
      <div className="cd-boxes">
        {cells.map(({ id, val, label }) => (
          <div key={id} className="cd-box">
            <span suppressHydrationWarning className="cd-n" id={id} style={urgentStyle}>{val}</span>
            <span className="cd-u">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
