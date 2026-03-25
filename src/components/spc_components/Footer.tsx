export default function Footer() {
  return (
    <footer>
      {/* Decorative elements */}
      <div className="ft-topline" />
      <div className="ft-glow" />
      <div className="ft-fade" />
      <div className="ft-watermark">
        <span>Best Solution</span>
      </div>

      <div className="ft-inner">
        {/* CTA banner */}
        <div className="ft-cta">
          <div className="ft-cta-text">
            <span className="ft-cta-tag">Ready to Begin?</span>
            <h2 className="ft-cta-h">
              Start Your<br />
              <span className="ft-cta-outline">Dubai Journey.</span>
            </h2>
          </div>
          <a href="#hero-form" className="ft-cta-btn">
            Speak to an Expert
            <span className="ft-cta-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>

        {/* Main grid */}
        <div className="ft-grid">
          {/* Brand column */}
          <div className="ft-brand">
            <img src="/footer-logo.png" alt="Best Solution" className="ft-logo" />
            <p className="ft-desc">
              We don&apos;t just process paperwork; we build foundations. Over 2,500
              entrepreneurs trust us to navigate the UAE&apos;s corporate landscape
              with speed, transparency, and elite expertise.
            </p>
            <div className="ft-socials">
              <a href="https://www.facebook.com/bestsolutionHQ/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="https://www.instagram.com/bestsolutionhq/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/bestsolutionhq/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://www.youtube.com/bestsolutionhq/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" /></svg>
              </a>
            </div>
          </div>

          {/* Expertise column */}
          <div className="ft-col">
            <h4 className="ft-col-title">Expertise</h4>
            <ul className="ft-col-list">
              <li><a href="#">Mainland Setup</a></li>
              <li><a href="#">Free Zone Setup</a></li>
              <li><a href="#">Golden Visa</a></li>
              <li><a href="#">PRO Services</a></li>
              <li><a href="#">Corporate Banking</a></li>
              <li><a href="#">Tax &amp; Accounting</a></li>
            </ul>
          </div>

          {/* Offices column */}
          <div className="ft-offices">
            <h4 className="ft-col-title">Offices</h4>
            <div className="ft-office">
              <span className="ft-office-tag">Dubai HQ</span>
              <p className="ft-office-addr">
                Office 906, Capital Golden Tower<br />Business Bay, Dubai, UAE
              </p>
              <a href="tel:+971522330011" className="ft-office-phone">+971 52 233 0011</a>
              <a href="mailto:info@best-solution.ae" className="ft-office-email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
                info@best-solution.ae
              </a>
            </div>
            <div className="ft-office-divider" />
            <div className="ft-office">
              <span className="ft-office-tag">Egypt Office</span>
              <p className="ft-office-addr">
                Hyde Park New Cairo<br />Cairo, Egypt
              </p>
              <a href="mailto:info@best-solution.ae" className="ft-office-email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
                info@best-solution.ae
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="ft-bar">
          <div className="ft-bar-left">
            <span className="ft-copy">&copy; 2026 Best Solution Business Setup</span>
            <span className="ft-bar-dot" />
            <span className="ft-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              Authorized Partner
            </span>
          </div>
          <span className="ft-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
            </svg>
            Most Trusted Partner
          </span>
        </div>
      </div>
    </footer>
  )
}
