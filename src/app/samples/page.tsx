'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

type Sample = {
  title: string
  description: string
  src: string
  video: string
  duration: string
}

type GenreSamples = { [genre: string]: Sample[] }

const samplesByGenre: GenreSamples = {
  'Audiobooks': [
    { title: 'Emotional Fiction – Ch.1', description: 'Rich character voices and emotional depth for gripping storytelling.', src: '/audio/audiobook-1.mp3', video: '/video/audiobook-1.mp4', duration: '2:45' },
    { title: 'Thriller Teaser', description: 'Suspense-filled delivery with perfect pacing and tension-building.', src: '/audio/audiobook-2.mp3', video: '/video/audiobook-2.mp4', duration: '1:30' },
    { title: 'Fantasy Worldbuilding', description: 'Epic narration bringing magical worlds to life.', src: '/audio/audiobook-3.mp3', video: '/video/audiobook-3.mp4', duration: '3:15' },
  ],
  'D2C Ads': [
    { title: 'Energy Drink Launch', description: 'Bold and dynamic tone that hooks the audience instantly.', src: '/audio/d2c-1.mp3', video: '/video/d2c-1.mp4', duration: '0:45' },
    { title: 'Soft Sell – Skincare', description: 'Gentle, persuasive voice with warmth that builds trust.', src: '/audio/d2c-2.mp3', video: '/video/d2c-2.mp4', duration: '1:00' },
    { title: 'Luxury Showcase', description: 'Sophisticated and elegant delivery for high-end products.', src: '/audio/d2c-3.mp3', video: '/video/d2c-3.mp4', duration: '1:15' },
  ],
  'Corporate': [
    { title: 'Annual Report Summary', description: 'Professional, clear and authoritative for corporate communications.', src: '/audio/corp-1.mp3', video: '/video/corp-1.mp4', duration: '2:15' },
    { title: 'Product Training', description: 'Engaging instructional tone that keeps audiences informed.', src: '/audio/corp-2.mp3', video: '/video/corp-2.mp4', duration: '3:30' },
    { title: 'Company Culture', description: 'Warm and inviting tone showcasing company values authentically.', src: '/audio/corp-3.mp3', video: '/video/corp-3.mp4', duration: '2:45' },
  ],
  'E-Learning': [
    { title: 'Science Module', description: 'Clear, articulate delivery perfect for educational content.', src: '/audio/elearn-1.mp3', video: '/video/elearn-1.mp4', duration: '4:00' },
    { title: 'Language Course', description: 'Precise pronunciation with engaging pacing for language learning.', src: '/audio/elearn-2.mp3', video: '/video/elearn-2.mp4', duration: '3:15' },
  ],
  'Video Games': [
    { title: 'Fantasy RPG Character', description: 'Immersive character voice with distinct personality.', src: '/audio/game-1.mp3', video: '/video/game-1.mp4', duration: '1:45' },
    { title: 'Action Game Trailer', description: 'High-energy, dramatic narration for intense gameplay previews.', src: '/audio/game-2.mp3', video: '/video/game-2.mp4', duration: '2:30' },
  ],
}

const genres = Object.keys(samplesByGenre)

const genreColors: Record<string, string> = {
  'Audiobooks': '#ffde4f',
  'D2C Ads': '#ff9f43',
  'Corporate': '#74b9ff',
  'E-Learning': '#55efc4',
  'Video Games': '#a29bfe',
}

function fmt(s: number) {
  if (!s || isNaN(s)) return '0:00'
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

function LiveWave({ playing, color }: { playing: boolean; color: string }) {
  return (
    <div className="flex items-center gap-[2px]" style={{ height: '30px' }}>
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} style={{
          width: '2.5px', borderRadius: '2px', background: color,
          opacity: playing ? 0.8 : 0.18,
          animation: playing ? `waveBar ${0.5 + (i % 6) * 0.07}s ease-in-out infinite alternate` : 'none',
          animationDelay: `${(i * 43) % 380}ms`,
          height: playing ? undefined : `${5 + Math.abs(Math.sin(i * 0.8)) * 14}px`,
          minHeight: '3px', maxHeight: '26px',
        }} />
      ))}
    </div>
  )
}

function Ring({ progress, color, size = 44 }: { progress: number; color: string; size?: number }) {
  const r = (size - 5) / 2
  const circ = 2 * Math.PI * r
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="2.5"
        strokeDasharray={circ} strokeDashoffset={circ - (progress / 100) * circ}
        strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.25s linear' }} />
    </svg>
  )
}

export default function Samples() {
  const [activeGenre, setActiveGenre] = useState(genres[0])
  const [currentSrc, setCurrentSrc] = useState<string | null>(null)
  const [currentSample, setCurrentSample] = useState<Sample | null>(null)
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [currentTime, setCurrentTime] = useState<Record<string, number>>({})
  const [downloading, setDownloading] = useState<string | null>(null)
  const [videoReady, setVideoReady] = useState(false)

  const audioRefs = useRef<Record<string, HTMLAudioElement>>({})
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (currentSrc) {
      audioRefs.current[currentSrc]?.pause()
      setCurrentSrc(null)
      setCurrentSample(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGenre])

  const getAudio = useCallback((src: string) => {
    if (!audioRefs.current[src]) {
      const a = new Audio(src)
      a.preload = 'metadata'
      a.addEventListener('timeupdate', () => {
        const pct = a.duration ? (a.currentTime / a.duration) * 100 : 0
        setProgress(p => ({ ...p, [src]: pct }))
        setCurrentTime(ct => ({ ...ct, [src]: a.currentTime }))
      })
      a.addEventListener('ended', () => {
        setCurrentSrc(null)
        setProgress(p => ({ ...p, [src]: 0 }))
        setCurrentTime(ct => ({ ...ct, [src]: 0 }))
        if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0 }
      })
      audioRefs.current[src] = a
    }
    return audioRefs.current[src]
  }, [])

  const handlePlay = (sample: Sample) => {
    const audio = getAudio(sample.src)
    if (currentSrc === sample.src) {
      audio.pause()
      videoRef.current?.pause()
      setCurrentSrc(null)
    } else {
      if (currentSrc) audioRefs.current[currentSrc]?.pause()
      setVideoReady(false)
      setCurrentSample(sample)
      setCurrentSrc(sample.src)
      if (videoRef.current) {
        videoRef.current.src = sample.video
        videoRef.current.load()
        videoRef.current.oncanplay = () => {
          setVideoReady(true)
          videoRef.current!.play().catch(() => { })
        }
      }
      audio.play()
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentSrc) return
    const audio = audioRefs.current[currentSrc]
    if (!audio) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    audio.currentTime = pct * (audio.duration || 0)
    if (videoRef.current) videoRef.current.currentTime = pct * (videoRef.current.duration || 0)
  }

  const handleDownload = async (sample: Sample) => {
    setDownloading(sample.src)
    try {
      const res = await fetch(sample.src)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = `Jeremy-Francis-${sample.title.replace(/\s+/g, '-')}.mp3`
      a.click(); URL.revokeObjectURL(url)
    } catch {
      const a = document.createElement('a')
      a.href = sample.src; a.download = `Jeremy-Francis-${sample.title.replace(/\s+/g, '-')}.mp3`
      a.click()
    } finally { setTimeout(() => setDownloading(null), 1400) }
  }

  const color = genreColors[activeGenre]
  const samples = samplesByGenre[activeGenre]
  const activePct = currentSrc ? (progress[currentSrc] || 0) : 0

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&family=Tenor+Sans&display=swap');
        .f-bebas     { font-family:'Bebas Neue',sans-serif; }
        .f-cormorant { font-family:'Cormorant Garamond',serif; }
        .f-dm        { font-family:'DM Sans',sans-serif; }
        .f-tenor     { font-family:'Tenor Sans',sans-serif; }

        .page-grain::before {
          content:''; position:absolute; inset:0; pointer-events:none; z-index:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity:0.03;
        }

        @keyframes waveBar {
          from { height:3px; } to { height:24px; }
        }
        @keyframes cardIn {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .card-in { animation:cardIn 0.45s cubic-bezier(0.22,1,0.36,1) both; }

        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
        .fade-in { animation:fadeIn 0.4s ease both; }

        @keyframes videoReveal {
          from { opacity:0; transform:scale(0.98); }
          to   { opacity:1; transform:scale(1); }
        }
        .video-reveal { animation:videoReveal 0.55s cubic-bezier(0.22,1,0.36,1) both; }

        @keyframes pulseRing {
          0%   { transform:scale(1);   opacity:0.7; }
          100% { transform:scale(1.8); opacity:0;   }
        }
        .pulse-ring::after {
          content:''; position:absolute; inset:0; border-radius:50%;
          border:2px solid var(--rc);
          animation:pulseRing 1.4s cubic-bezier(0.22,1,0.36,1) infinite;
        }

        @keyframes recBlink {
          0%,100%{opacity:1;} 50%{opacity:0.15;}
        }
        .rec-dot { animation:recBlink 1s ease-in-out infinite; }

        .scrub-bar:hover .scrub-thumb { opacity:1 !important; }

        .sample-row { transition:background 0.18s, border-color 0.18s; }
        .sample-row:hover { background:rgba(255,255,255,0.04) !important; }

        .scanlines {
          background:repeating-linear-gradient(
            0deg,transparent,transparent 2px,
            rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px
          );
          pointer-events:none;
        }

        .styled-scroll::-webkit-scrollbar { width:3px; }
        .styled-scroll::-webkit-scrollbar-track { background:transparent; }
        .styled-scroll::-webkit-scrollbar-thumb { background:rgba(255,222,79,0.15); border-radius:4px; }
      `}</style>

      <div className="page-grain relative h-screen overflow-hidden f-dm flex flex-col"
        style={{ background: '#0d0b07' }}>

        {/* Ambient glows */}
        <div className="absolute pointer-events-none z-0" style={{
          width: '700px', height: '700px', top: '5%', left: '10%', borderRadius: '50%',
          background: `radial-gradient(circle,${color}0e 0%,transparent 70%)`,
          transition: 'background 0.9s',
        }} />
        <div className="absolute pointer-events-none z-0" style={{
          width: '500px', height: '500px', bottom: '0', right: '5%', borderRadius: '50%',
          background: `radial-gradient(circle,${color}08 0%,transparent 70%)`,
          transition: 'background 0.9s',
        }} />

        {/* ── HEADER ── */}
        <header className="relative z-10 pt-20 pb-4 px-6 xl:px-16 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,222,79,0.07)' }}>
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <p className="f-tenor text-[9px] tracking-[0.38em] uppercase mb-2"
                style={{ color: 'rgba(255,222,79,0.4)' }}>— Director's Cut —</p>
              <h1 className="f-bebas leading-none"
                style={{ fontSize: 'clamp(46px,7vw,84px)', color: '#f5f0e8', letterSpacing: '0.02em' }}>
                Voice<span style={{ color: '#ffde4f' }}>over</span> Showcase
              </h1>
            </div>
            <p className="f-cormorant italic mb-1 sm:text-right max-w-xs"
              style={{ fontSize: 'clamp(14px,1.4vw,17px)', color: 'rgba(200,191,160,0.45)' }}>
              Select a sample. The audio plays — and so does the scene.
            </p>
          </div>
        </header>

        {/* ── GENRE TABS ── */}
        <div className="relative z-10 px-6 xl:px-16 py-3 max-w-[1400px] mx-auto w-full flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="flex gap-2 flex-wrap">
            {genres.map(g => {
              const active = g === activeGenre
              const gc = genreColors[g]
              return (
                <button key={g} onClick={() => setActiveGenre(g)}
                  className="f-tenor text-[10px] tracking-[0.1em] uppercase px-4 py-2 rounded-full transition-all duration-200"
                  style={{
                    background: active ? gc : 'rgba(255,255,255,0.04)',
                    color: active ? '#0d0b07' : 'rgba(255,255,255,0.36)',
                    border: `1px solid ${active ? gc : 'rgba(255,255,255,0.07)'}`,
                    fontWeight: active ? 600 : 400,
                  }}>
                  {g}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── MAIN STAGE ── */}
        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 xl:px-16 py-5
          flex flex-col xl:flex-row gap-5 xl:gap-8 flex-1 min-h-0 overflow-hidden">

          {/* ════ LEFT: TRACK LIST ════ */}
          <div className="w-full xl:w-[520px] flex-shrink-0 flex flex-col min-h-0 h-full">

            <div className="flex items-baseline gap-3 mb-5">
              <h2 className="f-bebas leading-none"
                style={{ fontSize: 'clamp(32px,3.5vw,52px)', color, letterSpacing: '0.03em' }}>
                {activeGenre}
              </h2>
              <span className="f-dm text-[12px]" style={{ color: 'rgba(255,255,255,0.22)' }}>
                {samples.length} sample{samples.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex flex-col gap-3 styled-scroll flex-1 min-h-0 overflow-y-auto pr-1">
              {samples.map((s, si) => {
                const isActive = currentSrc === s.src
                const pct = progress[s.src] || 0
                const isDl = downloading === s.src
                return (
                  <div key={s.src}
                    className="card-in sample-row relative rounded-2xl overflow-hidden cursor-pointer group"
                    style={{
                      animationDelay: `${si * 65}ms`,
                      background: isActive ? 'rgba(255,255,255,0.055)' : 'rgba(255,255,255,0.025)',
                      border: `1px solid ${isActive ? color + '44' : 'rgba(255,255,255,0.06)'}`,
                    }}
                    onClick={() => handlePlay(s)}
                  >
                    {/* Top stripe */}
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                      background: isActive ? color : 'transparent',
                      transition: 'background 0.3s',
                    }} />
                    {/* Bottom progress */}
                    {isActive && (
                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, height: '2px',
                        width: `${pct}%`, background: color, opacity: 0.35,
                        transition: 'width 0.2s linear',
                      }} />
                    )}

                    <div className="flex items-center gap-4 px-5 py-5">
                      {/* Ring + play */}
                      <div className="relative flex-shrink-0" style={{ width: '56px', height: '56px' }}>
                        <Ring progress={pct} color={color} size={56} />
                        <div
                          className={`absolute inset-0 flex items-center justify-center rounded-full ${isActive ? 'pulse-ring' : ''}`}
                          style={{
                            background: isActive ? color : 'rgba(255,255,255,0.07)',
                            // @ts-ignore
                            '--rc': color
                          }}
                        >
                          {isActive ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#0d0b07">
                              <rect x="5" y="4" width="4" height="16" rx="1" />
                              <rect x="15" y="4" width="4" height="16" rx="1" />
                            </svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.65)">
                              <path d="M6 4l14 8-14 8V4z" />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Title + desc */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="f-tenor text-[14px] tracking-[0.08em] uppercase"
                            style={{ color: isActive ? color : 'rgba(245,240,232,0.85)' }}>
                            {s.title}
                          </span>
                          <span className="f-dm font-medium text-[12px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                            {s.duration}
                          </span>
                        </div>
                        <p className="f-dm font-medium text-[13px] leading-relaxed line-clamp-1"
                          style={{ color: 'rgba(200,191,160,0.7)' }}>
                          {s.description}
                        </p>
                      </div>

                      {/* Download */}
                      <button
                        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                        style={{
                          background: isDl ? color : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${isDl ? color : 'rgba(255,255,255,0.08)'}`,
                        }}
                        onClick={e => { e.stopPropagation(); handleDownload(s) }}
                        title="Download"
                      >
                        {isDl ? (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0d0b07" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 3v13M5 16l7 7 7-7" /><path d="M3 21h18" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ════ RIGHT: VIDEO MONITOR ════ */}
          <div className="w-full xl:flex-1 flex flex-col gap-3 min-h-0 h-full">

            {/* CRT Monitor frame */}
            <div
              className="relative rounded-2xl overflow-hidden flex-1 min-h-0"
              style={{
                background: '#050302',
                border: `1px solid ${currentSample ? color + '30' : 'rgba(255,255,255,0.06)'}`,
                boxShadow: currentSample
                  ? `0 0 0 1px ${color}18, 0 40px 90px rgba(0,0,0,0.75), 0 0 80px ${color}14`
                  : '0 24px 64px rgba(0,0,0,0.55)',
                transition: 'border-color 0.6s,box-shadow 0.6s',
              }}
            >
              {/* Scanlines */}
              <div className="scanlines absolute inset-0 z-10" />

              {/* CRT corner brackets */}
              {(['tl', 'tr', 'bl', 'br'] as const).map(c => (
                <div key={c} className="absolute z-20 pointer-events-none" style={{
                  width: '18px', height: '18px',
                  top: c[0] === 't' ? '12px' : undefined,
                  bottom: c[0] === 'b' ? '12px' : undefined,
                  left: c[1] === 'l' ? '12px' : undefined,
                  right: c[1] === 'r' ? '12px' : undefined,
                  borderTop: c[0] === 't' ? `1.5px solid ${color}55` : undefined,
                  borderBottom: c[0] === 'b' ? `1.5px solid ${color}55` : undefined,
                  borderLeft: c[1] === 'l' ? `1.5px solid ${color}55` : undefined,
                  borderRight: c[1] === 'r' ? `1.5px solid ${color}55` : undefined,
                  transition: 'border-color 0.5s',
                }} />
              ))}

              {/* Empty state */}
              {!currentSample && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <p className="f-tenor text-[11px] tracking-[0.26em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.15)' }}>
                    Select a sample to begin
                  </p>
                </div>
              )}

              {/* Video */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted playsInline
                style={{ opacity: currentSample && videoReady ? 1 : 0, transition: 'opacity 0.5s ease' }}
              />

              {/* Loading spinner */}
              {currentSample && !videoReady && (
                <div className="absolute inset-0 flex items-center justify-center z-10 fade-in">
                  <div className="w-9 h-9 rounded-full border-2 animate-spin"
                    style={{ borderColor: `${color}33`, borderTopColor: color }} />
                </div>
              )}

              {/* HUD — top */}
              {currentSample && (
                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 fade-in"
                  style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.7),transparent)' }}>
                  <div className="flex items-center gap-2">
                    <div className="rec-dot w-2 h-2 rounded-full" style={{ background: '#ff4757' }} />
                    <span className="f-tenor text-[9px] tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      Live Preview
                    </span>
                  </div>
                  <span className="f-tenor text-[9px] tracking-[0.14em] uppercase px-2.5 py-1 rounded"
                    style={{ background: `${color}1a`, color, border: `1px solid ${color}33` }}>
                    {activeGenre}
                  </span>
                </div>
              )}

              {/* HUD — bottom */}
              {currentSample && (
                <div className="absolute bottom-0 left-0 right-0 z-20 px-5 pt-8 pb-4 fade-in"
                  style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.88),transparent)' }}>
                  <p className="f-tenor text-[13px] tracking-[0.09em] uppercase mb-2.5" style={{ color }}>
                    {currentSample.title}
                  </p>
                  <div className="flex items-center gap-3">
                    <LiveWave playing={!!currentSrc} color={color} />
                    {/* Scrubber */}
                    <div
                      className="scrub-bar flex-1 relative h-[3px] rounded-full cursor-pointer"
                      style={{ background: 'rgba(255,255,255,0.12)' }}
                      onClick={handleSeek}
                    >
                      <div className="absolute left-0 top-0 h-full rounded-full"
                        style={{ width: `${activePct}%`, background: color, transition: 'width 0.2s linear' }} />
                      <div className="scrub-thumb absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 transition-opacity"
                        style={{ left: `calc(${activePct}% - 6px)`, background: color, boxShadow: `0 0 8px ${color}` }} />
                    </div>
                    <span className="f-dm text-[11px] tabular-nums flex-shrink-0"
                      style={{ color: 'rgba(255,255,255,0.38)', minWidth: '34px' }}>
                      {fmt(currentTime[currentSample.src] || 0)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Controls bar */}
            {currentSample ? (
              <div className="fade-in flex items-center gap-3 px-5 py-4 rounded-2xl flex-wrap"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>

                {/* Play / Pause */}
                <button
                  onClick={() => handlePlay(currentSample)}
                  className="flex items-center gap-2.5 rounded-xl px-5 py-2.5 f-tenor text-[11px] tracking-[0.1em] uppercase transition-all duration-200 hover:opacity-90 active:scale-95 flex-shrink-0"
                  style={{ background: color, color: '#0d0b07', fontWeight: 600 }}>
                  {currentSrc === currentSample.src ? (
                    <><svg width="11" height="11" viewBox="0 0 24 24" fill="#0d0b07"><rect x="5" y="4" width="4" height="16" rx="1" /><rect x="15" y="4" width="4" height="16" rx="1" /></svg>Pause</>
                  ) : (
                    <><svg width="11" height="11" viewBox="0 0 24 24" fill="#0d0b07"><path d="M6 4l14 8-14 8V4z" /></svg>Resume</>
                  )}
                </button>

                {/* Description */}
                <p className="f-dm font-medium flex-1 min-w-0 line-clamp-1"
                  style={{ fontSize: '12px', color: 'rgba(200,191,160,0.85)' }}>
                  {currentSample.description}
                </p>

                {/* Duration */}
                <span className="f-dm font-medium text-[11px] tabular-nums flex-shrink-0"
                  style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {currentSample.duration}
                </span>

                {/* Download */}
                <button
                  onClick={() => handleDownload(currentSample)}
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 f-tenor text-[11px] tracking-[0.1em] uppercase transition-all duration-200 hover:opacity-90 flex-shrink-0"
                  style={{
                    background: downloading === currentSample.src ? color : 'rgba(255,255,255,0.04)',
                    color: downloading === currentSample.src ? '#0d0b07' : 'rgba(255,255,255,0.45)',
                    border: `1px solid ${downloading === currentSample.src ? color : 'rgba(255,255,255,0.07)'}`,
                  }}>
                  {downloading === currentSample.src ? (
                    <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0d0b07" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>Saved</>
                  ) : (
                    <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v13M5 16l7 7 7-7" /><path d="M3 21h18" /></svg>Download</>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center py-6 rounded-2xl"
                style={{ border: '1px dashed rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                <p className="f-cormorant italic"
                  style={{ fontSize: '15px', color: 'rgba(200,191,160,0.28)' }}>
                  Pick any track on the left to watch &amp; listen
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  )
}