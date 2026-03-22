'use client'

import Image from 'next/image'
import { useState } from 'react'

const images = [
  { src: '/thumb.jpg', label: 'The Booth' },
  { src: '/thumb.jpg', label: 'The Setup' },
  { src: '/thumb.jpg', label: 'The Gear' },
  { src: '/thumb.jpg', label: 'The Space' },
]

export default function Studio() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [tapped, setTapped] = useState<number | null>(0) // mobile tap state, first open by default

  const handleTap = (i: number) => {
    setTapped(prev => (prev === i ? null : i))
  }

  return (
    <>
      <style>{`
        .f-cormorant { font-family: var(--font-fraunces), serif; }
        .f-tenor     { font-family: var(--font-fraunces), serif; }
        .f-dm        { font-family: var(--font-fraunces), serif; }

        /* ── DESKTOP: horizontal film panel expand ── */
        .film-panel {
          flex: 1;
          transition: flex 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          min-width: 60px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .film-panel.expanded { flex: 4; }
        .film-panel:first-child { border-radius: 20px 0 0 20px; }
        .film-panel:last-child  { border-radius: 0 20px 20px 0; }

        /* Panel overlay */
        .panel-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(13,11,7,0.96) 0%, rgba(13,11,7,0.3) 50%, rgba(13,11,7,0.1) 100%);
          transition: background 0.5s;
        }
        .film-panel.expanded .panel-overlay {
          background: linear-gradient(to top, rgba(13,11,7,0.88) 0%, rgba(13,11,7,0.1) 60%, rgba(13,11,7,0.0) 100%);
        }

        /* Vertical label (collapsed) */
        .v-label {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(-90deg);
          white-space: nowrap;
          opacity: 1;
          transition: opacity 0.3s;
          z-index: 20;
        }
        .film-panel.expanded .v-label { opacity: 0; pointer-events: none; }

        /* Bottom content (expanded) */
        .panel-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 28px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.4s 0.15s, transform 0.4s 0.15s;
          z-index: 20;
        }
        .film-panel.expanded .panel-content {
          opacity: 1;
          transform: translateY(0);
        }

        /* Gold number */
        .panel-num {
          position: absolute;
          top: 20px; right: 20px;
          z-index: 20;
          transition: opacity 0.3s;
        }

        /* CTA pill */
        .studio-cta {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(255,222,79,0.3);
          border-radius: 100px;
          padding: 10px 20px;
          background: transparent;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .studio-cta:hover {
          background: rgba(255,222,79,0.08);
          border-color: rgba(255,222,79,0.6);
        }

        /* Grain */
        .studio-grain::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.025; pointer-events: none;
        }

        /* ══════════════════════════════
           MOBILE ONLY: vertical stack
        ══════════════════════════════ */
        .film-panel-mobile {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          border-radius: 16px;
          /* collapsed height */
          height: 60px;
          transition: height 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          flex-shrink: 0;
        }
        .film-panel-mobile.expanded-mobile {
          height: 300px;
        }

        /* Collapsed: horizontal label strip */
        .h-label {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          opacity: 1;
          transition: opacity 0.25s;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .film-panel-mobile.expanded-mobile .h-label {
          opacity: 0;
          pointer-events: none;
        }

        /* Expanded: bottom content (mobile) */
        .panel-content-mobile {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 20px 20px 22px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.35s 0.18s, transform 0.35s 0.18s;
          z-index: 20;
          background: linear-gradient(to top, rgba(13,11,7,0.92) 0%, transparent 100%);
        }
        .film-panel-mobile.expanded-mobile .panel-content-mobile {
          opacity: 1;
          transform: translateY(0);
        }

        /* Mobile panel overlay */
        .panel-overlay-mobile {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(13,11,7,0.9) 0%, rgba(13,11,7,0.4) 60%, rgba(13,11,7,0.15) 100%);
          transition: background 0.4s;
        }
        .film-panel-mobile.expanded-mobile .panel-overlay-mobile {
          background: linear-gradient(to top, rgba(13,11,7,0.82) 0%, rgba(13,11,7,0.1) 70%, rgba(13,11,7,0.0) 100%);
        }

        /* Gold left accent bar — mobile */
        .accent-bar-mobile {
          position: absolute;
          left: 0; top: 10px; bottom: 10px;
          width: 2px;
          border-radius: 2px;
          background: linear-gradient(180deg, transparent, #ffde4f 30%, #ffde4f 70%, transparent);
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 30;
        }
        .film-panel-mobile.expanded-mobile .accent-bar-mobile {
          opacity: 1;
        }
      `}</style>

      <section className="studio-grain relative w-full bg-[#0d0b07] py-10 px-6 md:px-12 overflow-hidden">

        {/* Top edge */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(255,222,79,0.2) 40%,rgba(255,222,79,0.2) 60%,transparent)' }} />

        <div className="max-w-6xl mx-auto">

          {/* ── Header ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-px bg-[rgba(255,222,79,0.4)]" />
                <span className="f-tenor text-[9px] tracking-[0.38em] uppercase text-[rgba(255,222,79,0.5)]">
                  Behind the mic
                </span>
              </div>
              <h2 className="f-cormorant font-light leading-[0.92] text-[#f0ead8]"
                style={{ fontSize: 'clamp(36px, 5.5vw, 64px)' }}>
                My<br />
                <em className="italic" style={{ color: '#ffde4f' }}>Studio.</em>
              </h2>
            </div>

            <div className="flex flex-col justify-end gap-3">
              <p className="f-dm font-light leading-relaxed text-[rgba(240,234,216,0.4)]"
                style={{ fontSize: '14px', maxWidth: 340 }}>
                Professional-grade audio from my own home studio. No booking, no waiting — just
                broadcast-ready recordings delivered when you need them.
              </p>

              <div className="flex items-center gap-6">
                {[['48hr', 'Turnaround'], ['100%', 'Home Studio']].map(([val, label]) => (
                  <div key={label}>
                    <p className="f-cormorant font-light text-[#ffde4f] leading-none"
                      style={{ fontSize: '22px' }}>{val}</p>
                    <p className="f-tenor text-[8px] tracking-[0.22em] uppercase text-[rgba(240,234,216,0.28)] mt-0.5">{label}</p>
                  </div>
                ))}

                <div className="w-px h-8 bg-[rgba(255,222,79,0.12)]" />

                <button className="studio-cta">
                  <span className="w-6 h-6 rounded-full bg-[#ffde4f] flex items-center justify-center flex-shrink-0">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0d0b07" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                  <span className="f-tenor text-[9px] tracking-[0.18em] uppercase text-[rgba(240,234,216,0.55)]">
                    Tour
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* ── DESKTOP: Expanding Film Panels (unchanged) ── */}
          <div className="hidden md:flex h-[320px] gap-2">
            {images.map((img, i) => (
              <div
                key={i}
                className={`film-panel ${hovered === i ? 'expanded' : ''}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <Image src={img.src} alt={img.label} fill className="object-cover" />
                <div className="panel-overlay" />
                <div className="panel-num">
                  <span className="f-tenor text-[10px] tracking-[0.2em]"
                    style={{ color: 'rgba(255,222,79,0.4)' }}>
                    0{i + 1}
                  </span>
                </div>
                <div className="v-label">
                  <span className="f-tenor text-[9px] tracking-[0.25em] uppercase"
                    style={{ color: 'rgba(240,234,216,0.45)' }}>
                    {img.label}
                  </span>
                </div>
                <div
                  className="absolute left-0 top-8 bottom-8 w-[2px] z-30 rounded-full transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(180deg, transparent, #ffde4f 30%, #ffde4f 70%, transparent)',
                    opacity: hovered === i ? 1 : 0,
                  }}
                />
                <div className="panel-content">
                  <p className="f-tenor text-[8px] tracking-[0.28em] uppercase mb-2"
                    style={{ color: 'rgba(255,222,79,0.5)' }}>
                    {img.label}
                  </p>
                  <p className="f-cormorant italic font-light text-[#f0ead8]"
                    style={{ fontSize: '26px', lineHeight: 1.1 }}>
                    Where the magic<br />happens.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── MOBILE: Vertical tap-to-expand panels ── */}
          <div className="flex md:hidden flex-col gap-2">
            {images.map((img, i) => (
              <div
                key={i}
                className={`film-panel-mobile ${tapped === i ? 'expanded-mobile' : ''}`}
                onClick={() => handleTap(i)}
              >
                <Image src={img.src} alt={img.label} fill className="object-cover object-center" />

                {/* Overlay */}
                <div className="panel-overlay-mobile" />

                {/* Gold left accent bar */}
                <div className="accent-bar-mobile" />

                {/* Index number */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="f-tenor text-[10px] tracking-[0.2em]"
                    style={{ color: 'rgba(255,222,79,0.45)' }}>
                    0{i + 1}
                  </span>
                </div>

                {/* Collapsed: horizontal label + arrow */}
                <div className="h-label">
                  <span className="f-tenor text-[10px] tracking-[0.22em] uppercase"
                    style={{ color: 'rgba(240,234,216,0.55)' }}>
                    {img.label}
                  </span>
                  <svg
                    width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,222,79,0.5)" strokeWidth="2" strokeLinecap="round"
                    style={{ transform: tapped === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                {/* Expanded: bottom content */}
                <div className="panel-content-mobile">
                  <p className="f-tenor text-[8px] tracking-[0.28em] uppercase mb-2"
                    style={{ color: 'rgba(255,222,79,0.55)' }}>
                    {img.label}
                  </p>
                  <p className="f-cormorant italic font-light text-[#f0ead8]"
                    style={{ fontSize: '24px', lineHeight: 1.1 }}>
                    Where the magic<br />happens.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Filmstrip perforations decorative strip ── */}
          <div className="flex items-center gap-2 mt-3 px-1 overflow-hidden">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-6 h-2 rounded-sm border border-[rgba(255,222,79,0.08)] bg-[rgba(255,222,79,0.02)]" />
            ))}
          </div>

        </div>

        {/* Bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(255,222,79,0.15) 50%,transparent)' }} />

      </section>
    </>
  )
}