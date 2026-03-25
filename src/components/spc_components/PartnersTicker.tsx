'use client'

import { useRef } from 'react'
import { PARTNERS } from '@/lib/data'

export default function PartnersTicker() {
  const innerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (innerRef.current) innerRef.current.style.animationPlayState = 'paused'
  }
  const handleMouseLeave = () => {
    if (innerRef.current) innerRef.current.style.animationPlayState = 'running'
  }

  // Duplicate for seamless loop
  const all = [...PARTNERS, ...PARTNERS]

  return (
    <div className="partners">
      <p className="partners-tag">
        Strategic Partners · Powering Your Business Ecosystem
      </p>
      <div
        className="ticker-outer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="ticker-inner" ref={innerRef}>
          {all.map((name, i) => (
            <span key={`${name}-${i}`} className="t-item">
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
