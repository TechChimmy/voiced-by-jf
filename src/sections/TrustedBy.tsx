'use client';

import Image from 'next/image';
import { useRef } from 'react';

export default function TrustedBy() {
  const brands = [
    { name: 'Penguin', src: '/penguin.png' },
    { name: "Byju's", src: '/byjus.png' },
    { name: 'Dunzo', src: '/dunzo.png' },
    { name: 'CCAL', src: '/ccal.png' },
    { name: 'Ampere', src: '/ampere.png' },
  ];

  // Triple-duplicate for seamless infinite loop
  const track = [...brands, ...brands, ...brands];

  return (
    <>
      <style>{`
        .f-tenor     { font-family: var(--font-fraunces), serif; }
        .f-cormorant { font-family: var(--font-fraunces), serif; }

        /* ── Section background ── */
        .tb-section {
          position: relative;
          background: #0d0b07;
          overflow: hidden;
        }

        /* ── Subtle horizontal gold line through center ── */
        .tb-section::before {
          content: '';
          position: absolute;
          left: 0; right: 0;
          top: 50%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,222,79,0.06) 20%,
            rgba(255,222,79,0.12) 50%,
            rgba(255,222,79,0.06) 80%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* ── Left + right fade masks ── */
        .tb-track-wrap::before,
        .tb-track-wrap::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 140px;
          z-index: 10;
          pointer-events: none;
        }
        .tb-track-wrap::before {
          left: 0;
          background: linear-gradient(90deg, #0d0b07 0%, transparent 100%);
        }
        .tb-track-wrap::after {
          right: 0;
          background: linear-gradient(270deg, #0d0b07 0%, transparent 100%);
        }

        /* ── Infinite scroll animation ── */
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .tb-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marqueeScroll 22s linear infinite;
          will-change: transform;
        }
        .tb-track:hover { animation-play-state: paused; }

        /* ── Individual brand card ── */
        .brand-card {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 160px;
          height: 72px;
          margin: 0 20px;
          border-radius: 14px;
          border: 1px solid rgba(255,222,79,0.09);
          background: rgba(255, 255, 255, 1);
          transition: border-color 0.35s, background 0.35s, transform 0.35s;
          cursor: default;
          overflow: hidden;
        }
        .brand-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(255,222,79,0.06) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.35s;
          border-radius: inherit;
        }
        .brand-card:hover {
          border-color: rgba(255,222,79,0.4);
          background: #ffffff;
          transform: translateY(-3px);
        }
        .brand-card:hover::before { opacity: 1; }

        /* Logo image — show natural colors, slightly dimmed, brighten on hover */
        .brand-img {
          object-fit: contain;
          opacity: 0.55;
          filter: saturate(0.7);
          transition: opacity 0.35s, filter 0.35s, transform 0.35s;
        }
        .brand-card:hover .brand-img {
          opacity: 1;
          filter: saturate(1.1) brightness(1.05);
          transform: scale(1.06);
        }

        /* ── Eyebrow label ── */
        @keyframes tbIn {
          from { opacity:0; transform: translateY(14px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .tb-label { animation: tbIn 0.7s 0.1s cubic-bezier(0.22,1,0.36,1) both; }
        .tb-track-wrap { animation: tbIn 0.7s 0.25s cubic-bezier(0.22,1,0.36,1) both; }

        /* ── Dot separator ── */
        .tb-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(255,222,79,0.35);
          display: inline-block;
          margin: 0 10px;
          vertical-align: middle;
        }
      `}</style>

      <section className="tb-section py-10 px-0">

        {/* Eyebrow */}
        <div className="tb-label flex items-center justify-center gap-3 mb-8">
          <span
            className="block flex-shrink-0"
            style={{
              width: 40, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,222,79,0.3))'
            }}
          />
          <span className="f-tenor text-[9px] tracking-[0.38em] uppercase"
            style={{ color: 'rgba(255,222,79,0.4)' }}>
            Trusted by
          </span>
          <span className="tb-dot" />
          <span className="f-cormorant italic text-[15px]"
            style={{ color: 'rgba(240,234,216,0.28)' }}>
            brands that care about their voice
          </span>
          <span
            className="block flex-shrink-0"
            style={{
              width: 40, height: 1,
              background: 'linear-gradient(90deg, rgba(255,222,79,0.3), transparent)'
            }}
          />
        </div>

        {/* Track */}
        <div className="tb-track-wrap relative overflow-hidden w-full py-3">
          <div className="tb-track">
            {track.map((brand, i) => (
              <div key={`${brand.name}-${i}`} className="brand-card">
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={110}
                  height={48}
                  className="brand-img"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom hairline */}
        <div
          className="mt-8 mx-auto"
          style={{
            maxWidth: 600,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,222,79,0.1) 50%, transparent)'
          }}
        />
      </section>
    </>
  );
}