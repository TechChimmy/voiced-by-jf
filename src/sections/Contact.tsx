'use client'

import { useState } from 'react'

type FormData = {
  name: string
  phone: string
  email: string
  message: string
}

function WaveDecor({ bars = 20, opacity = 0.15, color = '#ffde4f', height = 24 }: {
  bars?: number; opacity?: number; color?: string; height?: number
}) {
  return (
    <div className="flex items-center gap-[2.5px]" style={{ height }}>
      {Array.from({ length: bars }).map((_, i) => (
        <div key={i} style={{
          width: '2px', borderRadius: '2px', background: color, opacity,
          height: `${4 + Math.abs(Math.sin(i * 0.72)) * (height - 6)}px`,
        }} />
      ))}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', phone: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await response.json()
      if (response.ok) {
        setSubmitStatus({ success: true, message: "Message received. I'll be in touch soon." })
        setForm({ name: '', phone: '', email: '', message: '' })
      } else {
        throw new Error(result.error || 'Something went wrong.')
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : 'Unexpected error. Try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <style>{`
        .f-bebas     { font-family:var(--font-fraunces),serif; }
        .f-cormorant { font-family:var(--font-fraunces),serif; }
        .f-dm        { font-family:var(--font-fraunces),serif; }
        .f-tenor     { font-family:var(--font-fraunces),serif; }

        /* Grain */
        .contact-grain::before {
          content:''; position:fixed; inset:0; pointer-events:none; z-index:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity:0.03;
        }

        /* Broadcast channel cards hover */
        .channel-card {
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.25s ease,
                      border-color 0.25s ease,
                      background 0.25s ease;
        }
        .channel-card:hover { transform: translateY(-4px); }

        /* WhatsApp card */
        .channel-wa:hover {
          background: rgba(37,211,102,0.07) !important;
          border-color: rgba(37,211,102,0.35) !important;
          box-shadow: 0 20px 60px rgba(37,211,102,0.12), 0 0 0 1px rgba(37,211,102,0.15) !important;
        }

        /* Email card */
        .channel-email:hover {
          background: rgba(255,222,79,0.06) !important;
          border-color: rgba(255,222,79,0.35) !important;
          box-shadow: 0 20px 60px rgba(255,222,79,0.1), 0 0 0 1px rgba(255,222,79,0.15) !important;
        }

        /* Live pulse dot */
        @keyframes livePulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.8); }
        }
        .live-dot { animation:livePulse 1.4s ease-in-out infinite; }

        /* Pulse ring */
        @keyframes pulseRing {
          0%   { transform:scale(1); opacity:0.6; }
          100% { transform:scale(2.2); opacity:0; }
        }
        .pulse-ring-wa::after {
          content:''; position:absolute; inset:0; border-radius:50%;
          border:1.5px solid rgba(37,211,102,0.5);
          animation:pulseRing 2s cubic-bezier(0.22,1,0.36,1) infinite;
        }
        .pulse-ring-gold::after {
          content:''; position:absolute; inset:0; border-radius:50%;
          border:1.5px solid rgba(255,222,79,0.5);
          animation:pulseRing 2s 0.4s cubic-bezier(0.22,1,0.36,1) infinite;
        }

        /* Input */
        .c-input {
          width:100%;
          background:rgba(255,255,255,0.03);
          border:1px solid rgba(255,222,79,0.1);
          border-radius:12px;
          padding:14px 16px;
          font-family:var(--font-fraunces),serif;
          font-size:13px;
          font-weight:300;
          color:rgba(240,234,216,0.85);
          outline:none;
          transition:border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }
        .c-input::placeholder { color:rgba(240,234,216,0.2); }
        .c-input:focus {
          border-color:rgba(255,222,79,0.4);
          background:rgba(255,222,79,0.03);
          box-shadow:0 0 0 3px rgba(255,222,79,0.06);
        }
        textarea.c-input { resize:none; min-height:130px; }

        /* Submit */
        .submit-btn {
          width:100%; background:#ffde4f; color:#0d0b07;
          border:none; border-radius:12px; padding:15px;
          font-family:var(--font-fraunces),serif;
          font-size:11px; letter-spacing:0.22em; text-transform:uppercase;
          cursor:pointer; font-weight:600;
          transition:background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .submit-btn:hover:not(:disabled) {
          background:#fff;
          transform:scale(1.01);
          box-shadow:0 8px 32px rgba(255,222,79,0.25);
        }
        .submit-btn:disabled { opacity:0.5; cursor:not-allowed; }

        /* Fade up */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fu-1 { animation:fadeUp 0.65s 0.05s ease both; }
        .fu-2 { animation:fadeUp 0.65s 0.15s ease both; }
        .fu-3 { animation:fadeUp 0.65s 0.25s ease both; }
        .fu-4 { animation:fadeUp 0.65s 0.35s ease both; }
        .fu-5 { animation:fadeUp 0.65s 0.45s ease both; }

        /* Divider line */
        .section-rule {
          height:1px;
          background:linear-gradient(90deg,transparent,rgba(255,222,79,0.15) 30%,rgba(255,222,79,0.15) 70%,transparent);
        }
      `}</style>

      <div className="contact-grain relative f-dm min-h-screen" style={{ background: '#0d0b07' }}>

        {/* Ambient glows */}
        <div className="fixed pointer-events-none z-0" style={{
          width: '700px', height: '700px', top: '0', left: '-15%', borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(255,222,79,0.04) 0%,transparent 65%)',
        }} />
        <div className="fixed pointer-events-none z-0" style={{
          width: '500px', height: '500px', bottom: '5%', right: '-5%', borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(37,211,102,0.03) 0%,transparent 70%)',
        }} />

        <div className="relative z-10 max-w-[1100px] mx-auto px-8 xl:px-12 pt-28 pb-20">

          {/* ── PAGE HEADER ── */}
          <div className="fu-1 flex items-center gap-3 mb-6">
            <div style={{ width: '28px', height: '1px', background: 'rgba(255,222,79,0.4)' }} />
            <span className="f-tenor text-[9px] tracking-[0.38em] uppercase"
              style={{ color: 'rgba(255,222,79,0.5)' }}>
              Get in Touch
            </span>
            <div style={{ width: '28px', height: '1px', background: 'rgba(255,222,79,0.4)' }} />
          </div>

          <div className="fu-2 mb-12">
            <h1 className="f-bebas leading-[0.88]"
              style={{ fontSize: 'clamp(56px,9vw,110px)', color: '#f5f0e8', letterSpacing: '0.01em' }}>
              Let's Make It
            </h1>
            <h1 className="f-bebas leading-[0.88]"
              style={{ fontSize: 'clamp(56px,9vw,110px)', letterSpacing: '0.01em' }}>
              <span style={{ color: '#ffde4f' }}>Sound</span>
              <span style={{ color: 'rgba(245,240,232,0.12)', marginLeft: '0.1em' }}>Perfect</span>
            </h1>
          </div>

          {/* ── BROADCAST CHANNELS — big contact buttons ── */}
          <div className="fu-3 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

            {/* WhatsApp */}
            <a
              href="https://wa.me/918073372921"
              target="_blank"
              rel="noopener noreferrer"
              className="channel-card channel-wa relative rounded-2xl overflow-hidden group"
              style={{
                background: 'rgba(37,211,102,0.04)',
                border: '1px solid rgba(37,211,102,0.18)',
                padding: '28px 28px',
                textDecoration: 'none',
              }}
            >
              {/* Background glow blob */}
              <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle,rgba(37,211,102,0.1) 0%,transparent 70%)' }} />

              <div className="relative z-10 flex flex-col gap-5">
                {/* Icon + live badge */}
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <div className="pulse-ring-wa relative w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(37,211,102,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.5 5.5l1.87-1.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                  </div>

                  {/* Live badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)' }}>
                    <div className="live-dot w-1.5 h-1.5 rounded-full" style={{ background: '#25d366' }} />
                    <span className="f-tenor text-[8px] tracking-[0.2em] uppercase"
                      style={{ color: 'rgba(37,211,102,0.8)' }}>
                      Online
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <p className="f-tenor text-[10px] tracking-[0.2em] uppercase mb-2"
                    style={{ color: 'rgba(37,211,102,0.55)' }}>
                    WhatsApp
                  </p>
                  <p className="f-bebas text-[28px] leading-none mb-1"
                    style={{ color: 'rgba(240,234,216,0.9)', letterSpacing: '0.02em' }}>
                    +91 80733 72921
                  </p>
                  <p className="f-dm font-light text-[12px]"
                    style={{ color: 'rgba(240,234,216,0.3)' }}>
                    Tap to open WhatsApp — fastest response
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 transition-all duration-200 group-hover:gap-3">
                  <span className="f-tenor text-[9px] tracking-[0.2em] uppercase"
                    style={{ color: 'rgba(37,211,102,0.6)' }}>
                    Message now
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(37,211,102,0.6)" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:voicedbyjf@gmail.com"
              className="channel-card channel-email relative rounded-2xl overflow-hidden group"
              style={{
                background: 'rgba(255,222,79,0.03)',
                border: '1px solid rgba(255,222,79,0.14)',
                padding: '28px 28px',
                textDecoration: 'none',
              }}
            >
              {/* Background glow blob */}
              <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle,rgba(255,222,79,0.08) 0%,transparent 70%)' }} />

              <div className="relative z-10 flex flex-col gap-5">
                {/* Icon + response badge */}
                <div className="flex items-center justify-between">
                  <div className="pulse-ring-gold relative w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255,222,79,0.08)', border: '1px solid rgba(255,222,79,0.2)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,222,79,0.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,222,79,0.07)', border: '1px solid rgba(255,222,79,0.16)' }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,222,79,0.7)" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                    </svg>
                    <span className="f-tenor text-[8px] tracking-[0.2em] uppercase"
                      style={{ color: 'rgba(255,222,79,0.65)' }}>
                      24h reply
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <p className="f-tenor text-[10px] tracking-[0.2em] uppercase mb-2"
                    style={{ color: 'rgba(255,222,79,0.45)' }}>
                    Email
                  </p>
                  <p className="f-bebas text-[22px] leading-none mb-1"
                    style={{ color: 'rgba(240,234,216,0.9)', letterSpacing: '0.02em' }}>
                    voicedbyjf@gmail.com
                  </p>
                  <p className="f-dm font-light text-[12px]"
                    style={{ color: 'rgba(240,234,216,0.3)' }}>
                    Detailed briefs, project files, scripts welcome
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 transition-all duration-200 group-hover:gap-3">
                  <span className="f-tenor text-[9px] tracking-[0.2em] uppercase"
                    style={{ color: 'rgba(255,222,79,0.5)' }}>
                    Send email
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,222,79,0.5)" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          </div>

          {/* Or divider */}
          <div className="fu-3 flex items-center gap-5 my-10">
            <div className="section-rule flex-1" />
            <span className="f-cormorant italic text-[15px]"
              style={{ color: 'rgba(255,255,255,0.2)' }}>
              or leave a message below
            </span>
            <div className="section-rule flex-1" />
          </div>

          {/* ── FORM ── */}
          <div className="fu-4 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,222,79,0.08)',
            }}>

            {/* Form header bar */}
            <div className="flex items-center justify-between px-8 py-5"
              style={{ borderBottom: '1px solid rgba(255,222,79,0.07)' }}>
              <div className="flex items-center gap-3">
                <WaveDecor bars={16} opacity={0.25} height={18} />
                <span className="f-tenor text-[9px] tracking-[0.3em] uppercase"
                  style={{ color: 'rgba(255,222,79,0.4)' }}>
                  Send a message
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,222,79,0.25)' }} />
                <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,222,79,0.15)' }} />
                <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,222,79,0.08)' }} />
              </div>
            </div>

            <div className="px-8 py-8">

              {/* Status */}
              {submitStatus && (
                <div
                  className="flex items-start gap-3 p-4 rounded-xl mb-6 f-dm text-[13px]"
                  style={{
                    background: submitStatus.success ? 'rgba(37,211,102,0.07)' : 'rgba(255,80,80,0.07)',
                    border: `1px solid ${submitStatus.success ? 'rgba(37,211,102,0.25)' : 'rgba(255,80,80,0.25)'}`,
                    color: submitStatus.success ? 'rgba(100,220,130,0.9)' : 'rgba(255,120,120,0.9)',
                  }}
                >
                  {submitStatus.success ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  )}
                  <div>
                    <p className="font-medium mb-0.5">{submitStatus.success ? 'Message sent!' : 'Something went wrong'}</p>
                    <p style={{ opacity: 0.75 }}>{submitStatus.message}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Name + Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="f-tenor text-[11px] font-bold tracking-[0.28em] uppercase"
                      style={{ color: 'rgba(255,222,79,0.7)' }}>
                      Name <span style={{ color: 'rgba(255,222,79,0.9)' }}>*</span>
                    </label>
                    <input
                      className="c-input"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="f-tenor text-[11px] font-bold tracking-[0.28em] uppercase"
                      style={{ color: 'rgba(255,222,79,0.7)' }}>
                      Phone
                    </label>
                    <input
                      className="c-input"
                      name="phone"
                      placeholder="+91 ..."
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="f-tenor text-[11px] font-bold tracking-[0.28em] uppercase"
                    style={{ color: 'rgba(255,222,79,0.7)' }}>
                    Email <span style={{ color: 'rgba(255,222,79,0.9)' }}>*</span>
                  </label>
                  <input
                    className="c-input"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="f-tenor text-[11px] font-bold tracking-[0.28em] uppercase"
                    style={{ color: 'rgba(255,222,79,0.7)' }}>
                    Message <span style={{ color: 'rgba(255,222,79,0.9)' }}>*</span>
                  </label>
                  <textarea
                    className="c-input"
                    name="message"
                    placeholder="Tell me about your project — genre, tone, deadline, anything..."
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Submit + note row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-btn flex-shrink-0"
                    style={{ width: 'auto', padding: '14px 40px' }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Sending…
                      </span>
                    ) : 'Send Message'}
                  </button>

                  <p className="f-dm font-light text-[12px]"
                    style={{ color: 'rgba(240,234,216,0.2)' }}>
                    I typically respond within 24 hours. No spam, ever.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom waveform footer */}
          <div className="fu-5 flex items-center justify-center gap-4 mt-12 opacity-30">
            <WaveDecor bars={30} opacity={0.6} height={20} />
          </div>

        </div>
      </div>
    </>
  )
}