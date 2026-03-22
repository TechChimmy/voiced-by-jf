'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const samples = [
  { label: 'Commercial', duration: '0:32', file: '/samples/commercial.mp3' },
  { label: 'Narration', duration: '1:04', file: '/samples/narration.mp3' },
  { label: 'Character', duration: '0:48', file: '/samples/character.mp3' },
  { label: 'Corporate', duration: '0:55', file: '/samples/corporate.mp3' },
  { label: 'Audiobook', duration: '1:20', file: '/samples/audiobook.mp3' },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingSample, setPlayingSample] = useState<number | null>(null);
  const [downloadingIdx, setDownloadingIdx] = useState<number | null>(null);

  const handleDownload = async (e: React.MouseEvent, s: typeof samples[0], i: number) => {
    e.stopPropagation();
    setDownloadingIdx(i);
    try {
      const res = await fetch(s.file);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Jeremy-Francis-${s.label}.mp3`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      const a = document.createElement('a');
      a.href = s.file;
      a.download = `Jeremy-Francis-${s.label}.mp3`;
      a.click();
    } finally {
      setTimeout(() => setDownloadingIdx(null), 1200);
    }
  };

  const animFrameRef = useRef<number>(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const bars = 72;
    const amplitudes = Array.from({ length: bars }, (_, i) => {
      const center = bars / 2;
      const dist = Math.abs(i - center) / center;
      return 0.15 + (1 - dist * dist) * 0.85;
    });

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const barWidth = w / bars;
      const centerY = h / 2;

      for (let i = 0; i < bars; i++) {
        const t = offsetRef.current;
        const wave1 = Math.sin((i / bars) * Math.PI * 4 + t * 1.2) * 0.5;
        const wave2 = Math.sin((i / bars) * Math.PI * 6 - t * 0.8) * 0.3;
        const wave3 = Math.cos((i / bars) * Math.PI * 2 + t * 0.5) * 0.2;
        const combined = (wave1 + wave2 + wave3) * amplitudes[i];
        const barH = Math.max(3, Math.abs(combined) * h * 0.42);
        const x = i * barWidth + barWidth * 0.18;
        const bw = barWidth * 0.52;
        const alpha = isPlaying ? 0.55 + Math.abs(combined) * 0.45 : 0.18 + Math.abs(combined) * 0.14;
        const progress = i / bars;
        const hue = 42 + progress * 10;
        const sat = 95 - progress * 10;
        const lit = 52 + progress * 8;
        ctx.fillStyle = `hsla(${hue}, ${sat}%, ${lit}%, ${alpha})`;
        const radius = bw / 2;
        ctx.beginPath();
        ctx.roundRect(x, centerY - barH, bw, barH, [radius, radius, 2, 2]);
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(x, centerY, bw, barH, [2, 2, radius, radius]);
        ctx.fill();
      }

      offsetRef.current += isPlaying ? 0.045 : 0.012;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isPlaying]);

  // Shared sample card renderer to avoid duplication
  const renderSampleCard = (s: typeof samples[0], i: number, extraClass = '') => (
    <button
      key={s.label}
      onClick={() => setPlayingSample(playingSample === i ? null : i)}
      className={`sample-card ${extraClass} flex items-center gap-3 rounded-2xl px-4 py-3 w-full text-left cursor-pointer`}
      style={{
        background: playingSample === i ? 'rgba(255,222,79,0.08)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${playingSample === i ? 'rgba(255,222,79,0.25)' : 'rgba(255,255,255,0.07)'}`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <span
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: playingSample === i ? '#ffde4f' : 'rgba(255,222,79,0.10)',
          border: '1px solid rgba(255,222,79,0.2)',
        }}
      >
        {playingSample === i ? (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#181818">
            <rect x="5" y="4" width="4" height="16" rx="1" />
            <rect x="15" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#ffde4f">
            <path d="M6 4l14 8-14 8V4z" />
          </svg>
        )}
      </span>

      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span
          className="font-tenor text-[11px] tracking-[0.12em] uppercase"
          style={{ color: playingSample === i ? '#ffde4f' : 'rgba(245,240,232,0.7)' }}
        >
          {s.label}
        </span>
        <span className="font-dm text-[11px]" style={{ color: 'rgba(245,240,232,0.28)' }}>
          {s.duration}
        </span>
      </div>

      <span
        className="dl-btn w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        onClick={(e) => handleDownload(e, s, i)}
        title={`Download ${s.label}`}
        style={{
          background: downloadingIdx === i ? '#ffde4f' : 'rgba(255,222,79,0.12)',
          border: '1px solid rgba(255,222,79,0.25)',
        }}
      >
        {downloadingIdx === i ? (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#181818" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ffde4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v13M5 16l7 7 7-7" />
            <path d="M3 21h18" />
          </svg>
        )}
      </span>
    </button>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Tenor+Sans&display=swap');

        .font-bebas    { font-family: 'Bebas Neue', sans-serif; }
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-dm       { font-family: 'DM Sans', sans-serif; }
        .font-tenor    { font-family: 'Tenor Sans', sans-serif; }

        .hero-grain::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.035;
          pointer-events: none;
          z-index: 1;
        }

        .hero-label::before,
        .hero-label::after {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: #ffde4f;
          opacity: 0.45;
        }

        .wave-centerline::after {
          content: '';
          position: absolute;
          left: 0; right: 0; top: 50%;
          height: 1px;
          background: rgba(255,222,79,0.10);
          pointer-events: none;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-1 { animation: fadeUp 0.7s 0.05s ease both; }
        .fade-2 { animation: fadeUp 0.7s 0.18s ease both; }
        .fade-3 { animation: fadeUp 0.7s 0.30s ease both; }
        .fade-4 { animation: fadeUp 0.7s 0.42s ease both; }
        .fade-5 { animation: fadeUp 0.7s 0.54s ease both; }
        .fade-6 { animation: fadeUp 0.7s 0.66s ease both; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .fade-r1 { animation: fadeIn 0.7s 0.30s ease both; }
        .fade-r2 { animation: fadeIn 0.7s 0.44s ease both; }
        .fade-r3 { animation: fadeIn 0.7s 0.58s ease both; }
        .fade-r4 { animation: fadeIn 0.7s 0.70s ease both; }
        .fade-r5 { animation: fadeIn 0.7s 0.82s ease both; }

        .sample-card {
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .sample-card:hover {
          background: rgba(255,222,79,0.06) !important;
          border-color: rgba(255,222,79,0.22) !important;
          transform: translateX(-3px);
        }
        .sample-card .dl-btn {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.18s, transform 0.18s;
          pointer-events: none;
        }
        .sample-card:hover .dl-btn {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }

        /* Always show download on touch devices */
        @media (hover: none) {
          .sample-card .dl-btn {
            opacity: 1 !important;
            transform: scale(1) !important;
            pointer-events: auto !important;
          }
        }

        .play-btn-primary {
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .play-btn-primary:hover {
          background: #fff !important;
          transform: scale(1.03);
          box-shadow: 0 6px 32px rgba(255,222,79,0.28);
        }
        .play-btn-primary:active { transform: scale(0.97); }

        .btn-secondary {
          transition: color 0.2s, border-color 0.2s, transform 0.15s;
        }
        .btn-secondary:hover {
          color: #f5f0e8 !important;
          border-color: rgba(245,240,232,0.4) !important;
          transform: scale(1.03);
        }

        .img-frame {
          box-shadow:
            0 0 0 1px rgba(255,222,79,0.12),
            0 32px 80px rgba(0,0,0,0.7),
            0 8px 24px rgba(0,0,0,0.4);
        }
      `}</style>

      <section
        className="hero-grain relative w-full min-h-screen flex items-center font-dm"
        style={{ background: '#0d0b07' }}
      >
        {/* Warm radial glow — left */}
        <div className="absolute pointer-events-none z-[1]" style={{
          width: '700px', height: '700px', top: '50%', left: '20%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,210,60,0.06) 0%, transparent 65%)',
          borderRadius: '50%',
        }} />

        {/* Warm radial glow — right */}
        <div className="absolute pointer-events-none z-[1]" style={{
          width: '500px', height: '700px', top: '50%', right: '-5%',
          transform: 'translateY(-50%)',
          background: 'radial-gradient(circle, rgba(255,210,60,0.04) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />

        {/* Bottom rule */}
        <div className="absolute bottom-0 left-0 right-0 h-px z-[2]" style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,222,79,0.18) 30%, rgba(255,222,79,0.18) 70%, transparent)'
        }} />

        {/* Side label */}
        <span
          className="font-tenor absolute right-6 top-1/2 text-[9px] tracking-[0.28em] uppercase whitespace-nowrap z-10 hidden lg:block"
          style={{ color: 'rgba(255,222,79,0.22)', transform: 'translateY(-50%) rotate(90deg)', transformOrigin: 'center' }}
        >
          Voice&nbsp;·&nbsp;Narration&nbsp;·&nbsp;Storytelling
        </span>

        {/* ── TWO-COLUMN GRID ── */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8 xl:px-12 pt-22 pb-20 grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* ══════════════ LEFT COLUMN ══════════════ */}
          <div className="flex flex-col items-start">

            {/* Eyebrow */}
            <p className="hero-label font-tenor fade-1 flex items-center gap-3 mb-6 text-[10px] tracking-[0.32em] uppercase"
              style={{ color: '#ffde4f', opacity: 0.65 }}>
              Voiceover Artist
            </p>

            {/* Name */}
            <h1 className="font-bebas fade-2 leading-[0.88] tracking-[0.02em] mb-0"
              style={{ fontSize: 'clamp(64px, 9vw, 130px)', color: '#f5f0e8' }}>
              Jeremy
            </h1>
            <h1 className="font-bebas fade-2 leading-[0.88] tracking-[0.02em] mb-6"
              style={{ fontSize: 'clamp(64px, 9vw, 130px)', color: '#f5f0e8' }}>
              <span style={{ color: '#ffde4f' }}>Francis</span>
            </h1>

            {/* Waveform */}
            <div className="wave-centerline fade-3 relative w-full h-[72px] mb-6">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            {/* Tagline */}
            <p className="font-cormorant fade-4 italic mb-4 leading-snug"
              style={{ fontSize: 'clamp(18px, 2.2vw, 26px)', color: '#c8bfa0' }}>
              The voice that makes your script{' '}
              <span className="not-italic" style={{ color: '#ffde4f' }}>land.</span>
            </p>

            {/* Description */}
            <p className="font-dm font-light fade-5 leading-[1.85] mb-10"
              style={{
                fontSize: 'clamp(13px, 1.3vw, 15px)',
                color: 'rgba(245,240,232,0.42)',
                maxWidth: '480px',
                borderLeft: '2px solid rgba(255,222,79,0.18)',
                paddingLeft: '16px',
              }}>
              Neutral Indian English. Conversational Tamil. Audiobooks, ads,
              corporate films, explainers — whatever the brief, the delivery
              is always exactly what you had in mind.
            </p>

            {/* CTA row */}
            <div className="fade-6 flex items-center gap-4 flex-wrap">
              <button
                onClick={() => setIsPlaying(p => !p)}
                aria-label={isPlaying ? 'Pause demo' : 'Play voice demo'}
                className="play-btn-primary font-dm font-medium flex items-center gap-3 rounded-full cursor-pointer"
                style={{
                  background: '#ffde4f', color: '#181818', border: 'none',
                  padding: '13px 26px 13px 16px', fontSize: '13px', letterSpacing: '0.05em',
                }}
              >
                <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: '#181818' }}>
                  {isPlaying ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#ffde4f">
                      <rect x="5" y="4" width="4" height="16" rx="1" />
                      <rect x="15" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#ffde4f">
                      <path d="M6 4l14 8-14 8V4z" />
                    </svg>
                  )}
                </span>
                {isPlaying ? 'Listening…' : 'Hear my Voice'}
              </button>

              <a href="https://wa.me/918073372921" target="_blank" rel="noopener noreferrer"
                className="btn-secondary font-dm font-normal flex items-center gap-2 rounded-full cursor-pointer"
                style={{
                  background: 'transparent', color: 'rgba(245,240,232,0.45)',
                  border: '1px solid rgba(245,240,232,0.14)',
                  padding: '13px 22px', fontSize: '13px', letterSpacing: '0.05em', textDecoration: 'none',
                }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Get in touch
              </a>
            </div>

            {/* ══ MOBILE ONLY: photo + samples (xl:hidden) ══ */}
            <div className="xl:hidden w-full mt-12 flex flex-col gap-6">

              {/* Photo — full width, tall enough to feel impactful */}
              <div className="img-frame relative w-full rounded-2xl overflow-hidden"
                style={{ height: '340px', border: '1px solid rgba(255,222,79,0.12)' }}>
                <div className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(13,11,7,0.85), transparent)' }} />
                <Image src="/jeremy.jpeg" alt="Jeremy Francis" fill className="object-cover object-top" priority />
              </div>

              {/* Section label */}
              <div className="flex items-center gap-3">
                <div style={{ width: '24px', height: '1px', background: 'rgba(255,222,79,0.35)' }} />
                <p className="font-tenor text-[9px] tracking-[0.3em] uppercase"
                  style={{ color: 'rgba(255,222,79,0.4)' }}>
                  Voice Samples
                </p>
              </div>

              {/* Sample cards — single column on mobile, 2-col on sm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                {samples.map((s, i) => renderSampleCard(s, i))}
              </div>
            </div>
            {/* ══ END MOBILE ONLY ══ */}

          </div>

          {/* ══════════════ RIGHT COLUMN — desktop only ══════════════ */}
          <div className="hidden xl:flex items-center justify-center gap-5 relative">

            {/* Sample cards — left of image */}
            <div className="flex flex-col gap-2.5 flex-shrink-0" style={{ width: '220px' }}>
              {samples.map((s, i) => renderSampleCard(s, i, `fade-r${i + 1}`))}
            </div>

            {/* Jeremy's photo */}
            <div className="img-frame fade-r1 relative flex-shrink-0 rounded-2xl overflow-hidden"
              style={{ width: '260px', height: '460px', border: '1px solid rgba(255,222,79,0.10)' }}>
              <div className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(13,11,7,0.85), transparent)' }} />
              <Image src="/jeremy.jpeg" alt="Jeremy Francis" fill className="object-cover object-top" priority />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}