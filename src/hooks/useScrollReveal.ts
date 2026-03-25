'use client'

import { useRef, useEffect, RefObject } from 'react'

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.08
): RefObject<T | null> {
  const ref = useRef<T>(null)

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
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return ref
}
