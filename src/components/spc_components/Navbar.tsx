'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav className={`${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner">
          <Link href="#hero-form" className="nav-logo">
            <img src="/footer-logo.png" alt="Best Solution" className="nav-logo-img" />
          </Link>

          <div className="nav-links">
            <Link href="#benefits" className="nav-a">Benefits</Link>
            <Link href="#included" className="nav-a">Includes</Link>
            <Link href="#steps" className="nav-a">Process</Link>
            <Link href="#why-us" className="nav-a">Why Us</Link>
          </div>

          <div className="nav-right">
            <Link href="#hero-form" className="nav-cta">Get Started</Link>
          </div>

          <button className="nav-burger" aria-label="Menu" onClick={() => setOpen(!open)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer — outside nav to avoid stacking issues */}
      <div className={`nav-drawer ${open ? 'nav-drawer--open' : ''}`}>
        {/* Header row: logo + close */}
        <div className="nd-header">
          <img src="/footer-logo.png" alt="Best Solution" className="nd-logo" />
          <button className="nd-close" aria-label="Close menu" onClick={close}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div className="nd-links">
          <Link href="#benefits" className="nd-link" onClick={close}>Benefits</Link>
          <Link href="#included" className="nd-link" onClick={close}>Includes</Link>
          <Link href="#steps" className="nd-link" onClick={close}>Process</Link>
          <Link href="#why-us" className="nd-link" onClick={close}>Why Us</Link>
        </div>

        {/* CTA */}
        <Link href="#hero-form" className="nd-cta" onClick={close}>
          Get Started
        </Link>
      </div>
    </>
  )
}
