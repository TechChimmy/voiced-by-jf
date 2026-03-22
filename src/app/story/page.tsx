'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const chapters = [
    {
        index: '01',
        label: 'Origin',
        title: 'The Voice Before the Mic',
        year: '2008',
        body: `Long before a studio, there was a living room, a church pulpit, and a boy who discovered that words — spoken just right — could make a room go completely silent. Growing up in Chennai, Jeremy Francis found that his voice carried a weight most people his age hadn't yet discovered in themselves.`,
        body2: `Teachers noticed it. Audiences noticed it. But for years, it was just something he did — narrating school plays, anchoring college events, filling spaces with presence.`,
        accent: 'Origin',
    },
    {
        index: '02',
        label: 'Calling',
        title: 'When Silence Becomes a Career',
        year: '2015',
        body: `The pivot came quietly — a single audiobook project, recorded in a makeshift booth, that a client called "the most immersive narration I've ever commissioned." That one sentence rewired everything.`,
        body2: `Jeremy stopped treating his voice as a side act and started treating it as a craft. Equipment was upgraded. Acoustics were obsessed over. Delivery was studied, deconstructed, rebuilt. The hobby became a vocation.`,
        accent: 'Calling',
    },
    {
        index: '03',
        label: 'Craft',
        title: 'The Architecture of a Delivery',
        year: '2018',
        body: `What separates a voice actor from a voiceover artist? Control. Jeremy spent years mastering the architecture of a single sentence — understanding how breath placement, pacing, and tonal warmth transform a line of copy into something that lands in the listener's chest.`,
        body2: `Neutral Indian English. Conversational Tamil. Corporate gravitas. Intimate storytelling. Each register trained, not assumed. Each delivery intentional, never accidental.`,
        accent: 'Craft',
    },
    {
        index: '04',
        label: 'Studio',
        title: 'Building the Booth',
        year: '2020',
        body: `A professional home studio — acoustically treated, broadcast-grade — became the command centre. No more compromises. No more "good enough." Every session delivered with the silence, clarity, and warmth that the work demands.`,
        body2: `From audiobooks to D2C ads, corporate videos to e-learning modules, the studio became a place where every word found its shape.`,
        accent: 'Studio',
    },
    {
        index: '05',
        label: 'Now',
        title: 'The Voice That Makes It Land',
        year: '2024',
        body: `Today, Jeremy Francis is the voice behind campaigns that move product, narrations that move people, and training modules that actually get watched. Clients return not because he delivers lines — but because he delivers meaning.`,
        body2: `If you have words that need a voice, you're in the right place.`,
        accent: 'Today',
        cta: true,
    },
]

const stats = [
    { value: '500+', label: 'Projects Delivered' },
    { value: '6+', label: 'Years in Studio' },
    { value: '12+', label: 'Genres Covered' },
    { value: '3', label: 'Languages' },
]

function WaveDecor({ width = 120, opacity = 0.12, color = '#ffde4f' }: { width?: number; opacity?: number; color?: string }) {
    const bars = 22
    return (
        <div className="flex items-center gap-[2.5px]" style={{ width, height: '20px', flexShrink: 0 }}>
            {Array.from({ length: bars }).map((_, i) => (
                <div key={i} style={{
                    width: '2px', borderRadius: '2px',
                    background: color, opacity,
                    height: `${4 + Math.abs(Math.sin(i * 0.75)) * 14}px`,
                }} />
            ))}
        </div>
    )
}

export default function Story() {
    const [activeChapter, setActiveChapter] = useState(0)
    const chapterRefs = useRef<(HTMLDivElement | null)[]>([])
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observers: IntersectionObserver[] = []

        chapterRefs.current.forEach((el, i) => {
            if (!el) return
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveChapter(i) },
                { threshold: 0.4 }
            )
            obs.observe(el)
            observers.push(obs)
        })

        return () => observers.forEach(o => o.disconnect())
    }, [])

    return (
        <>
            <style>{`
        .f-bebas      { font-family:var(--font-fraunces),serif; }
        .f-cormorant  { font-family:var(--font-fraunces),serif; }
        .f-dm         { font-family:var(--font-fraunces),serif; }
        .f-tenor      { font-family:var(--font-fraunces),serif; }

        .story-grain::before {
          content:''; position:fixed; inset:0; pointer-events:none; z-index:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity:0.032;
        }

        /* Chapter reveal */
        @keyframes chapterReveal {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .chapter-block { opacity:0; }
        .chapter-block.visible { animation:chapterReveal 0.75s cubic-bezier(0.22,1,0.36,1) forwards; }

        /* Timeline dot pulse */
        @keyframes dotPulse {
          0%,100% { box-shadow:0 0 0 0 rgba(255,222,79,0.5); }
          50%      { box-shadow:0 0 0 8px rgba(255,222,79,0); }
        }
        .dot-active { animation:dotPulse 2s ease-in-out infinite; }

        /* Fade up */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-1 { animation:fadeUp 0.7s 0.1s ease both; }
        .fade-2 { animation:fadeUp 0.7s 0.22s ease both; }
        .fade-3 { animation:fadeUp 0.7s 0.34s ease both; }
        .fade-4 { animation:fadeUp 0.7s 0.46s ease both; }

        /* Stat counter */
        @keyframes statIn {
          from { opacity:0; transform:scale(0.85) translateY(10px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        .stat-card { animation:statIn 0.6s cubic-bezier(0.22,1,0.36,1) both; }

        /* Scroll indicator */
        @keyframes scrollBounce {
          0%,100% { transform:translateY(0); opacity:0.4; }
          50%      { transform:translateY(6px); opacity:0.9; }
        }
        .scroll-bounce { animation:scrollBounce 1.8s ease-in-out infinite; }

        /* Gold shimmer on large number */
        @keyframes shimmer {
          0%   { background-position:200% center; }
          100% { background-position:-200% center; }
        }
        .gold-shimmer {
          background: linear-gradient(90deg,#c8a84b 0%,#ffde4f 40%,#ffe98a 50%,#ffde4f 60%,#c8a84b 100%);
          background-size:200% auto;
          -webkit-background-clip:text;
          background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:shimmer 5s linear infinite;
        }

        .styled-scroll::-webkit-scrollbar { width:0; }
        
        /* Hover underline for CTA */
        .cta-underline {
          position:relative;
          display:inline-block;
        }
        .cta-underline::after {
          content:'';
          position:absolute;
          left:0; bottom:-2px;
          width:0; height:1px;
          background:#ffde4f;
          transition:width 0.3s ease;
        }
        .cta-underline:hover::after { width:100%; }
      `}</style>

            <div className="story-grain relative f-dm" style={{ background: '#0d0b07' }}>

                {/* ── AMBIENT GLOWS ── */}
                <div className="fixed pointer-events-none z-0" style={{
                    width: '800px', height: '800px', top: '10%', left: '-10%', borderRadius: '50%',
                    background: 'radial-gradient(circle,rgba(255,222,79,0.04) 0%,transparent 65%)',
                }} />
                <div className="fixed pointer-events-none z-0" style={{
                    width: '600px', height: '600px', bottom: '0', right: '0', borderRadius: '50%',
                    background: 'radial-gradient(circle,rgba(255,222,79,0.03) 0%,transparent 70%)',
                }} />

                {/* ════════════════════════════════
            HERO — OPENING FRAME
        ════════════════════════════════ */}
                <section className="relative z-10 flex items-center px-8 xl:px-20"
                    style={{
                        height: '100vh',
                        borderBottom: '1px solid rgba(255,222,79,0.07)',
                    }}>

                    <div className="max-w-[1100px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">

                        {/* ── LEFT: all text ── */}
                        <div className="flex flex-col">

                            {/* Eyebrow */}
                            <div className="fade-1 flex items-center gap-3 mb-6">
                                <div style={{ width: '32px', height: '1px', background: 'rgba(255,222,79,0.45)' }} />
                                <span className="f-tenor text-[10px] tracking-[0.38em] uppercase"
                                    style={{ color: 'rgba(255,222,79,0.55)' }}>
                                    My Story
                                </span>
                                <div style={{ width: '32px', height: '1px', background: 'rgba(255,222,79,0.45)' }} />
                            </div>

                            {/* Big hero text */}
                            <div className="mb-7">
                                <h1 className="f-bebas fade-2 leading-[0.85] mb-1"
                                    style={{ fontSize: 'clamp(52px,8vw,120px)', color: '#f5f0e8', letterSpacing: '0.01em' }}>
                                    The Voice
                                </h1>
                                <h1 className="f-bebas fade-2 leading-[0.85]"
                                    style={{ fontSize: 'clamp(52px,8vw,120px)', letterSpacing: '0.01em' }}>
                                    <span className="gold-shimmer">Behind</span>
                                    <span style={{ color: 'rgba(245,240,232,0.12)', marginLeft: '0.12em' }}>the Words</span>
                                </h1>
                            </div>

                            {/* Intro copy */}
                            <div className="fade-3 max-w-[520px]">
                                <p className="f-cormorant italic mb-4 leading-relaxed"
                                    style={{ fontSize: 'clamp(17px,1.8vw,22px)', color: 'rgba(200,191,160,0.8)' }}>
                                    "I don't just read words. I find the moment inside them."
                                </p>
                                <p className="f-dm font-light leading-[1.9]"
                                    style={{
                                        fontSize: 'clamp(12px,1.2vw,14px)', color: 'rgba(245,240,232,0.38)',
                                        borderLeft: '2px solid rgba(255,222,79,0.18)', paddingLeft: '16px'
                                    }}>
                                    Jeremy Francis is a Chennai-based voiceover artist specialising in audiobooks,
                                    D2C advertising, corporate films, and e-learning — delivering in Neutral Indian
                                    English and Conversational Tamil with studio-grade clarity.
                                </p>
                                <div className="mt-5">
                                    <WaveDecor width={160} opacity={0.2} />
                                </div>
                            </div>
                        </div>

                        {/* ── RIGHT: photo + stats ── */}
                        <div className="hidden lg:flex flex-col items-center gap-5 flex-shrink-0">

                            {/* Photo */}
                            <div className="relative rounded-2xl overflow-hidden flex-shrink-0"
                                style={{
                                    width: '280px',
                                    height: '380px',
                                    border: '1px solid rgba(255,222,79,0.2)',
                                    boxShadow: '0 0 0 1px rgba(255,222,79,0.08), 0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(255,210,60,0.1)',
                                }}>
                                <div className="absolute bottom-0 left-0 right-0 h-20 z-10 pointer-events-none"
                                    style={{ background: 'linear-gradient(to top,rgba(13,11,7,0.9),transparent)' }} />
                                <Image src="/jeremy.jpeg" alt="Jeremy Francis" fill className="object-cover object-top" priority />
                                {(['tl', 'tr', 'bl', 'br'] as const).map(c => (
                                    <div key={c} className="absolute z-20 pointer-events-none" style={{
                                        width: '14px', height: '14px',
                                        top: c[0] === 't' ? '10px' : undefined,
                                        bottom: c[0] === 'b' ? '10px' : undefined,
                                        left: c[1] === 'l' ? '10px' : undefined,
                                        right: c[1] === 'r' ? '10px' : undefined,
                                        borderTop: c[0] === 't' ? '1.5px solid rgba(255,222,79,0.4)' : undefined,
                                        borderBottom: c[0] === 'b' ? '1.5px solid rgba(255,222,79,0.4)' : undefined,
                                        borderLeft: c[1] === 'l' ? '1.5px solid rgba(255,222,79,0.4)' : undefined,
                                        borderRight: c[1] === 'r' ? '1.5px solid rgba(255,222,79,0.4)' : undefined,
                                    }} />
                                ))}
                            </div>

                            {/* Stats grid */}
                            <div className="grid grid-cols-2 gap-2.5" style={{ width: '280px' }}>
                                {stats.map((s, i) => (
                                    <div key={s.label}
                                        className="stat-card rounded-xl px-3 py-2.5 text-center"
                                        style={{
                                            background: 'rgba(255,255,255,0.025)',
                                            border: '1px solid rgba(255,222,79,0.1)',
                                            animationDelay: `${0.5 + i * 0.1}s`,
                                        }}>
                                        <div className="f-bebas leading-none mb-0.5"
                                            style={{ fontSize: '20px', color: '#ffde4f', letterSpacing: '0.03em' }}>
                                            {s.value}
                                        </div>
                                        <div className="f-tenor text-[8px] tracking-[0.18em] uppercase"
                                            style={{ color: 'rgba(255,255,255,0.3)' }}>
                                            {s.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="fade-4 absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                        <span className="f-tenor text-[8px] tracking-[0.3em] uppercase"
                            style={{ color: 'rgba(255,222,79,0.28)' }}>
                            Scroll to read
                        </span>
                        <div className="scroll-bounce">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,222,79,0.35)" strokeWidth="2" strokeLinecap="round">
                                <path d="M12 5v14M5 12l7 7 7-7" />
                            </svg>
                        </div>
                    </div>
                </section>


                {/* ════════════════════════════════
            CHAPTERS — TIMELINE
        ════════════════════════════════ */}
                <section className="relative z-10 max-w-[1100px] mx-auto px-8 xl:px-20 py-24">

                    {/* Section label */}
                    <div className="flex items-center gap-4 mb-20">
                        <span className="f-tenor text-[9px] tracking-[0.38em] uppercase"
                            style={{ color: 'rgba(255,222,79,0.35)' }}>
                            The Journey
                        </span>
                        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,rgba(255,222,79,0.15),transparent)' }} />
                    </div>

                    {/* Timeline layout */}
                    <div className="relative flex gap-8 xl:gap-16">

                        {/* ── Sticky left: timeline spine ── */}
                        <div className="hidden lg:flex flex-col items-center flex-shrink-0 sticky top-32 self-start"
                            style={{ width: '60px' }}>

                            {/* Spine line */}
                            <div className="absolute top-0 bottom-0 w-px left-1/2 -translate-x-1/2"
                                style={{ background: 'linear-gradient(180deg,rgba(255,222,79,0.0),rgba(255,222,79,0.18) 10%,rgba(255,222,79,0.18) 90%,rgba(255,222,79,0.0))' }}
                            />

                            {/* Chapter dots */}
                            <div className="relative flex flex-col gap-[108px] pt-2">
                                {chapters.map((c, i) => (
                                    <div key={c.index} className="flex flex-col items-center gap-1.5"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => chapterRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
                                        <div
                                            className={`w-3 h-3 rounded-full transition-all duration-400 ${activeChapter === i ? 'dot-active' : ''}`}
                                            style={{
                                                background: activeChapter === i ? '#ffde4f' : 'rgba(255,222,79,0.2)',
                                                border: `2px solid ${activeChapter === i ? '#ffde4f' : 'rgba(255,222,79,0.25)'}`,
                                                transform: activeChapter === i ? 'scale(1.3)' : 'scale(1)',
                                                transition: 'all 0.3s ease',
                                            }}
                                        />
                                        <span className="f-tenor text-[8px] tracking-[0.1em]"
                                            style={{
                                                color: activeChapter === i ? 'rgba(255,222,79,0.7)' : 'rgba(255,255,255,0.18)',
                                                transition: 'color 0.3s', writingMode: 'horizontal-tb'
                                            }}>
                                            {c.index}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Right: chapter content ── */}
                        <div className="flex-1 flex flex-col gap-24">
                            {chapters.map((c, i) => (
                                <ChapterBlock
                                    key={c.index}
                                    chapter={c}
                                    index={i}
                                    active={activeChapter === i}
                                    ref={(el: HTMLDivElement | null) => { chapterRefs.current[i] = el }}
                                />
                            ))}
                        </div>
                    </div>
                </section>


                {/* ════════════════════════════════
            CLOSING TAPE REEL FOOTER
        ════════════════════════════════ */}
                <section className="relative z-10 px-8 xl:px-20 py-24"
                    style={{ borderTop: '1px solid rgba(255,222,79,0.07)' }}>
                    <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">

                        <div className="flex flex-col gap-4 max-w-[500px]">
                            <p className="f-tenor text-[9px] tracking-[0.35em] uppercase"
                                style={{ color: 'rgba(255,222,79,0.4)' }}>
                                Ready to work together?
                            </p>
                            <h2 className="f-cormorant leading-tight"
                                style={{ fontSize: 'clamp(32px,4vw,52px)', color: '#f5f0e8', fontWeight: 300 }}>
                                Let's make your script{' '}
                                <span className="italic" style={{ color: '#ffde4f' }}>land.</span>
                            </h2>
                            <WaveDecor width={140} opacity={0.22} />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/samples"
                                className="f-tenor text-[11px] tracking-[0.14em] uppercase px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 text-center"
                                style={{
                                    background: 'rgba(255,222,79,0.08)',
                                    border: '1px solid rgba(255,222,79,0.2)',
                                    color: 'rgba(255,222,79,0.85)',
                                }}>
                                Hear My Voice
                            </Link>
                            <a
                                href="https://wa.me/918073372921"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="f-tenor text-[11px] tracking-[0.14em] uppercase px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 text-center"
                                style={{
                                    background: '#ffde4f',
                                    color: '#0d0b07',
                                    fontWeight: 600,
                                }}>
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}


/* ──────────────────────────────────────
   Chapter Block sub-component
────────────────────────────────────── */
import { forwardRef } from 'react'

const ChapterBlock = forwardRef<HTMLDivElement, {
    chapter: typeof chapters[0]
    index: number
    active: boolean
}>(function ChapterBlock({ chapter: c, index: i, active }, ref) {
    const [visible, setVisible] = useState(false)
    const localRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = localRef.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.15 }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    // Merge refs
    const setRef = (el: HTMLDivElement | null) => {
        (localRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        if (typeof ref === 'function') ref(el)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
    }

    return (
        <div
            ref={setRef}
            className={`chapter-block ${visible ? 'visible' : ''}`}
            style={{ animationDelay: `${i * 0.05}s` }}
        >
            {/* Chapter header */}
            <div className="flex items-center gap-4 mb-6">
                {/* Tape counter number */}
                <span className="f-bebas leading-none flex-shrink-0"
                    style={{
                        fontSize: '52px',
                        color: active ? 'rgba(255,222,79,0.15)' : 'rgba(255,255,255,0.05)',
                        letterSpacing: '0.02em',
                        transition: 'color 0.4s',
                    }}>
                    {c.index}
                </span>

                <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-3">
                        <span className="f-tenor text-[9px] tracking-[0.3em] uppercase"
                            style={{
                                color: active ? 'rgba(255,222,79,0.6)' : 'rgba(255,255,255,0.22)',
                                transition: 'color 0.4s'
                            }}>
                            {c.label}
                        </span>
                        <div style={{
                            width: '24px', height: '1px',
                            background: active ? 'rgba(255,222,79,0.4)' : 'rgba(255,255,255,0.1)',
                            transition: 'background 0.4s',
                        }} />
                        <span className="f-tenor text-[9px] tracking-[0.2em]"
                            style={{ color: 'rgba(255,255,255,0.18)' }}>
                            {c.year}
                        </span>
                    </div>

                    <h3 className="f-cormorant leading-tight"
                        style={{
                            fontSize: 'clamp(22px,2.8vw,36px)',
                            color: active ? '#f5f0e8' : 'rgba(245,240,232,0.55)',
                            fontWeight: 400,
                            transition: 'color 0.4s',
                        }}>
                        {c.title}
                    </h3>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-4 pl-0 lg:pl-4"
                style={{
                    borderLeft: active ? '2px solid rgba(255,222,79,0.2)' : '2px solid transparent',
                    transition: 'border-color 0.4s', paddingLeft: '20px'
                }}>

                <p className="f-dm font-light leading-[1.95]"
                    style={{
                        fontSize: 'clamp(13px,1.3vw,15.5px)',
                        color: active ? 'rgba(245,240,232,0.65)' : 'rgba(245,240,232,0.3)',
                        transition: 'color 0.4s',
                    }}>
                    {c.body}
                </p>

                <p className="f-dm font-light leading-[1.95]"
                    style={{
                        fontSize: 'clamp(13px,1.3vw,15.5px)',
                        color: active ? 'rgba(245,240,232,0.45)' : 'rgba(245,240,232,0.2)',
                        transition: 'color 0.4s',
                    }}>
                    {c.body2}
                </p>

                {/* Waveform + accent word */}
                <div className="flex items-center gap-4 pt-2">
                    <WaveDecor width={80} opacity={active ? 0.3 : 0.1} />
                    <span className="f-cormorant italic"
                        style={{
                            fontSize: '13px',
                            color: active ? 'rgba(255,222,79,0.4)' : 'rgba(255,255,255,0.1)',
                            transition: 'color 0.4s',
                            letterSpacing: '0.06em',
                        }}>
                        — {c.accent}
                    </span>
                </div>

                {/* CTA on last chapter */}
                {c.cta && (
                    <div className="flex gap-4 mt-4 flex-wrap">
                        <Link
                            href="/samples"
                            className="f-tenor text-[11px] tracking-[0.14em] uppercase px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-105"
                            style={{ background: '#ffde4f', color: '#0d0b07', fontWeight: 600 }}>
                            Hear My Voice
                        </Link>
                        <a
                            href="https://wa.me/918073372921"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="f-tenor text-[11px] tracking-[0.14em] uppercase px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-105"
                            style={{
                                background: 'transparent',
                                color: 'rgba(255,222,79,0.7)',
                                border: '1px solid rgba(255,222,79,0.2)',
                            }}>
                            Get in Touch
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
})