'use client'

import React, { useRef, useEffect, ReactNode, CSSProperties } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: string
  style?: CSSProperties
  tag?: React.ElementType
}

export default function ScrollReveal({
  children,
  className = '',
  delay,
  style,
  tag: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('on')
          io.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`rv ${className}`.trim()}
      style={{ transitionDelay: delay, ...style }}
    >
      {children}
    </Tag>
  )
}
