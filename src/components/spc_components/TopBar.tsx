'use client'

import React from 'react'
import { useCountdown, getDaysLabel } from '@/hooks/useCountdown'

const STATIC_ITEMS = [
  // '☽ Ramadan Kareem',
  'UAE Business License from AED 5,750',
  'AED 31,000 in Benefits',
  '__DAYS__',               // placeholder — replaced with live days
  '100% Foreign Ownership',
  '5 Activities · One License',
  'Free Website + WhatsApp Package',
]

export default function TopBar() {
  const { daysNum, isExpired } = useCountdown()
  const daysLabel = getDaysLabel(daysNum, isExpired)

  // Build two copies for the seamless ticker loop
  const items = [...STATIC_ITEMS, ...STATIC_ITEMS].map((text, i) =>
    text === '__DAYS__' ? daysLabel : text
  )

  return (
    <div className="topbar" role="marquee" aria-hidden="true">
      <div className="topbar-track">
        {items.map((text, i) => (
          <React.Fragment key={i}>
            <span suppressHydrationWarning>{text}</span>
            <span className="dot">✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
