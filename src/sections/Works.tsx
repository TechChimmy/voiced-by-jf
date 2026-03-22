'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'

const works = [
  {
    id: 0,
    tag: '01',
    category: 'Audiobooks',
    image: '/thumb.jpg',
    description: "From gripping non-fiction to immersive fiction, my voice adapts to your narrative's every twist and turn.",
    buttonText: 'Audiobook Samples',
    downloadLink: '/audio/audiobook-sample.mp3',
  },
  {
    id: 1,
    tag: '02',
    category: 'D2C Ads',
    image: '/thumb.jpg',
    description: 'Make your brand relatable and unforgettable with a voiceover that resonates long after that first listen.',
    buttonText: 'Ad Samples',
    downloadLink: '/audio/d2c-sample.mp3',
  },
  {
    id: 2,
    tag: '03',
    category: 'Corporate Videos',
    image: '/thumb.jpg',
    description: "Professional yet personable — tailored to reflect your brand's unique tone and style with earnest delivery.",
    buttonText: 'Corporate Samples',
    downloadLink: '/audio/corporate-sample.mp3',
  },
  {
    id: 3,
    tag: '04',
    category: 'Explainer Videos',
    image: '/thumb.jpg',
    description: 'Complex ideas made simple. Clear, engaging narration that guides your audience from confusion to clarity.',
    buttonText: 'Explainer Samples',
    downloadLink: '/audio/explainer-sample.mp3',
  },
]

export default function Works() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [dir, setDir] = useState(1)

  const go = (i: number) => {
    setDir(i > active ? 1 : -1)
    setActive(i)
    setPlaying(false)
  }
  const next = () => go((active + 1) % works.length)
  const prev = () => go((active - 1 + works.length) % works.length)
  const swipe = useSwipeable({ onSwipedLeft: next, onSwipedRight: prev, trackMouse: true })

  const item = works[active]

  return (
    <>
      <style>{`
        .f-cormorant { font-family: var(--font-fraunces), serif; }
        .f-tenor     { font-family: var(--font-fraunces), serif; }
        .f-dm        { font-family: var(--font-fraunces), serif; }

        /* Waveform */
        @keyframes bar {
          0%,100% { transform: scaleY(0.35); }
          50%      { transform: scaleY(1); }
        }
        .wbar { width:3px; border-radius:3px; background:#0d0b07; transform-origin:bottom; }
        .wbar:nth-child(1){animation:bar 0.75s 0.00s ease-in-out infinite;}
        .wbar:nth-child(2){animation:bar 0.75s 0.12s ease-in-out infinite;}
        .wbar:nth-child(3){animation:bar 0.75s 0.06s ease-in-out infinite;}
        .wbar:nth-child(4){animation:bar 0.75s 0.20s ease-in-out infinite;}
        .wbar:nth-child(5){animation:bar 0.75s 0.09s ease-in-out infinite;}

        /* Card */
        .work-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10);
        }

        /* Play btn */
        .play-btn {
          width: 52px; height: 52px; border-radius: 50%;
          background: #0d0b07;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: none;
          transition: transform 0.2s, background 0.2s;
          flex-shrink: 0;
        }
        .play-btn:hover { transform: scale(1.08); background: #1a1712; }

        /* Download btn */
        .dl-btn {
          width: 40px; height: 40px; border-radius: 50%;
          background: transparent;
          border: 1.5px solid rgba(13,11,7,0.2);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          flex-shrink: 0;
        }
        .dl-btn:hover { border-color: #0d0b07; background: rgba(13,11,7,0.05); }

        /* CTA */
        .cta-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: #0d0b07; color: #ffde4f;
          border: none; border-radius: 100px;
          padding: 11px 22px;
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .cta-btn:hover { background: #2a2015; transform: scale(1.02); }

        /* Nav arrows */
        .nav-arr {
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(13,11,7,0.1);
          border: 1.5px solid rgba(13,11,7,0.15);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          color: #0d0b07;
        }
        .nav-arr:hover { background: rgba(13,11,7,0.15); border-color: rgba(13,11,7,0.35); transform: scale(1.05); }

        /* Progress dot */
        .prog-dot {
          height: 3px; border-radius: 100px;
          background: rgba(13,11,7,0.2);
          cursor: pointer;
          transition: background 0.3s, width 0.35s cubic-bezier(0.22,1,0.36,1);
          flex-shrink: 0;
        }
        .prog-dot.on { background: #0d0b07; width: 24px !important; }
        .prog-dot:not(.on) { width: 6px; }
        .prog-dot:hover:not(.on) { background: rgba(13,11,7,0.4); }

        /* Category tabs */
        .cat-tab {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 16px; border-radius: 100px;
          font-family: 'Tenor Sans', sans-serif;
          font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
          cursor: pointer; border: 1.5px solid transparent;
          transition: all 0.25s;
          white-space: nowrap;
        }
        .cat-tab.on {
          background: #0d0b07; color: #ffde4f;
          border-color: #0d0b07;
        }
        .cat-tab:not(.on) {
          background: #ffffff; color: rgba(13,11,7,0.55);
          border-color: rgba(13,11,7,0.08);
        }
        .cat-tab:not(.on):hover {
          background: #ffffff; color: rgba(13,11,7,0.85);
          border-color: rgba(13,11,7,0.25);
        }

        /* Grain on gold bg */
        .gold-bg::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.04; pointer-events: none; z-index: 0;
        }
      `}</style>

      <section className="gold-bg relative w-full py-20 px-6 md:px-12 overflow-hidden"
        style={{ background: '#ffde4f' }}>

        {/* Subtle radial shadow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,0,0,0.06) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="block w-6 h-px" style={{ background: 'rgba(13,11,7,0.3)' }} />
                <span className="f-tenor text-[9px] tracking-[0.35em] uppercase"
                  style={{ color: 'rgba(13,11,7,0.45)' }}>My Work</span>
              </div>
              <h2 className="f-cormorant font-light"
                style={{ fontSize: 'clamp(40px, 6vw, 64px)', color: '#0d0b07', lineHeight: 0.95 }}>
                Work that<br />
                <em className="italic" style={{ opacity: 0.55 }}>speaks.</em>
              </h2>
            </div>

            {/* Arrow nav */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="nav-arr" onClick={prev}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
              </button>
              <button className="nav-arr" onClick={next}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8" {...swipe}>
            {works.map((w, i) => (
              <button key={w.id} className={`cat-tab ${i === active ? 'on' : ''}`} onClick={() => go(i)}>
                <span style={{ opacity: i === active ? 0.45 : 0.4 }}>{w.tag}</span>
                {w.category}
              </button>
            ))}
          </div>

          {/* Card */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0, y: dir > 0 ? 24 : -24 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, y: dir > 0 ? -24 : 24, transition: { duration: 0.25 } }}
              className="work-card"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">

                {/* Thumbnail */}
                <div className="relative w-full" style={{ minHeight: 260 }}>
                  <Image src={item.image} alt={item.category} fill className="object-cover" />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(13,11,7,0.18) 0%, transparent 60%)' }} />
                  {/* Tag */}
                  <span className="absolute top-4 left-4 f-tenor text-[9px] tracking-[0.28em] uppercase px-3 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(255,222,79,0.92)',
                      color: '#0d0b07',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                    }}>
                    {item.tag} · {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-7 md:p-9">
                  <div>
                    <h3 className="f-cormorant font-light mb-4"
                      style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', color: '#0d0b07', lineHeight: 1.05 }}>
                      {item.category}
                    </h3>
                    <p className="f-dm font-light leading-relaxed mb-8"
                      style={{ fontSize: '14px', color: 'rgba(13,11,7,0.55)' }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Controls */}
                  <div>
                    {/* Divider */}
                    <div className="mb-5 h-px" style={{ background: 'rgba(13,11,7,0.08)' }} />
                    <div className="flex items-center gap-3 flex-wrap">
                      {/* Play */}
                      <button className="play-btn" onClick={() => setPlaying(p => !p)}>
                        {playing ? (
                          <div className="flex items-end gap-[3px]" style={{ height: 18 }}>
                            {[12, 18, 14, 20, 11].map((h, i) => (
                              <span key={i} className="wbar" style={{ height: h }} />
                            ))}
                          </div>
                        ) : (
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="#ffde4f">
                            <path d="M6.5 4.5l13 7.5-13 7.5V4.5z" />
                          </svg>
                        )}
                      </button>

                      {/* Download */}
                      <button className="dl-btn"
                        onClick={() => {
                          const a = document.createElement('a')
                          a.href = item.downloadLink
                          a.download = item.downloadLink.split('/').pop() || 'sample.mp3'
                          a.click()
                        }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                          stroke="rgba(13,11,7,0.5)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                        </svg>
                      </button>

                      {/* CTA */}
                      <button className="cta-btn">
                        {item.buttonText}
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots + counter */}
          <div className="flex items-center gap-3 mt-6">
            {works.map((_, i) => (
              <button key={i} onClick={() => go(i)}
                className={`prog-dot ${i === active ? 'on' : ''}`} />
            ))}
            <span className="f-tenor text-[9px] tracking-[0.25em] ml-2"
              style={{ color: 'rgba(13,11,7,0.35)' }}>
              {String(active + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
            </span>
          </div>

        </div>
      </section>
    </>
  )
}