'use client'

import { useState, useRef, useEffect } from 'react'
import { ACTIVITIES } from '@/lib/data'

interface FormState {
  first: string
  last: string
  phone: string
  email: string
  activity: string
  message: string
}

const INITIAL: FormState = {
  first: '', last: '', phone: '', email: '',
  activity: '', message: '',
}

export default function InquiryForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const fieldRef = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    if (!submitted) return
    const timer = setTimeout(() => {
      setSubmitted(false)
      setForm(INITIAL)
    }, 10000)
    return () => clearTimeout(timer)
  }, [submitted])

  const set = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [key]: e.target.value }))
      setErrors(prev => ({ ...prev, [key]: false }))
    }

  const shake = (key: keyof FormState) => {
    const el = fieldRef.current[key]
    if (!el) return
      ; (el as HTMLElement).style.borderColor = 'var(--red)'
      ; (el as HTMLElement).style.animation = 'shakeInput .4s ease'
    setTimeout(() => {
      ; (el as HTMLElement).style.borderColor = ''
        ; (el as HTMLElement).style.animation = ''
    }, 500)
    setErrors(prev => ({ ...prev, [key]: true }))
  }

  const handleSubmit = async () => {
    if (!form.first) { shake('first'); return }
    if (!form.last) { shake('last'); return }
    if (!form.phone) { shake('phone'); return }
    if (!form.email || !form.email.includes('@')) { shake('email'); return }
    if (!form.activity) { shake('activity'); return }

    setLoading(true)
    try {
      const url = process.env.NEXT_PUBLIC_SHEETS_URL
      if (url) {
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(form)
        })
      }
      setSubmitted(true)
    } catch (err) {
      console.error('Submission error:', err)
      setSubmitted(true) // still show success — data might have gone through
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="form-success">
        <div className="suc-icon">✓</div>
        <div className="suc-title">Thank You!</div>
        <p className="suc-sub">
          Your enquiry has been received successfully.<br />
          Our business advisor will contact you within <strong>10 minutes</strong> during working hours.
        </p>
        <div className="suc-contact">
          <a href="tel:+971522330011">Call us: +971 52 233 0011</a>
          <a href="https://wa.me/971522330011" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
        </div>
      </div>
    )
  }

  return (
    <div className="form-wrap">
      <div className="form-head">
        <div className="fh-title">GET EXPERT HELP NOW</div>
        <div className="fh-sub">YOUR ADVISOR WILL CONTACT YOU IN 10 MINUTES</div>
      </div>

      <div className="form-body" id="fBody">
        {/* Name row */}
        <div className="frow">
          <div className="fld">
            <input
              id="f-first"
              type="text"
              placeholder="First Name"
              value={form.first}
              onChange={set('first')}
              ref={el => { fieldRef.current.first = el }}
            />
          </div>
          <div className="fld">
            <input
              id="f-last"
              type="text"
              placeholder="Last Name"
              value={form.last}
              onChange={set('last')}
              ref={el => { fieldRef.current.last = el }}
            />
          </div>
        </div>

        {/* Email */}
        <div className="frow s1">
          <div className="fld">
            <input
              id="f-email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={set('email')}
              ref={el => { fieldRef.current.email = el }}
            />
          </div>
        </div>

        {/* Phone */}
        <div className="frow s1">
          <div className="fld">
            <label htmlFor="f-phone">WHATSAPP NUMBER</label>
            <div className="ph-wrap">
              <div className="ph-pre">🇦🇪 +971</div>
              <input
                id="f-phone"
                type="tel"
                placeholder=""
                value={form.phone}
                onChange={set('phone')}
                ref={el => { fieldRef.current.phone = el }}
              />
            </div>
          </div>
        </div>

        {/* Business activity */}
        <div className="frow s1">
          <div className="fld">
            <label htmlFor="f-act">I'M LOOKING TO:</label>
            <div className="sel-wrap">
              <select
                id="f-act"
                value={form.activity}
                onChange={set('activity')}
                ref={el => { fieldRef.current.activity = el }}
              >
                <option value="" disabled>Select one</option>
                {ACTIVITIES.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="frow s1">
          <div className="fld">
            <label htmlFor="f-msg">MESSAGE (OPTIONAL)</label>
            <textarea
              id="f-msg"
              placeholder="Tell us about your business idea…"
              value={form.message}
              onChange={set('message')}
            />
          </div>
        </div>

        <button
          className={`btn-submit ${loading ? 'btn-loading' : ''}`}
          onClick={handleSubmit}
          type="button"
          disabled={loading}
        >
          {loading ? 'SENDING...' : 'GET MY SETUP PLAN →'}
        </button>
        <div className="form-contact-links">
          <a href="tel:+971522330011" className="fc-link">
            <span className="fc-icon fc-icon--phone">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
              </svg>
            </span>
            Call: +971 52 233 0011
          </a>
          <span className="fc-divider" />
          <a href="https://wa.me/971522330011" target="_blank" rel="noopener noreferrer" className="fc-link">
            <span className="fc-icon fc-icon--wa">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
              </svg>
            </span>
            WhatsApp Us
          </a>
        </div>
        <p className="f-note">*T&amp;Cs Apply · SPC Free Zone Partner Offer</p>
      </div>
    </div>
  )
}
