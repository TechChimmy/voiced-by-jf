'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

const navItems = [
  {
    name: 'Home',
    path: '/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    name: 'Samples',
    path: '/samples',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'My Story',
    path: '/story',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    name: 'FAQs',
    path: '/faqs',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <circle cx="12" cy="17" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
];

const contactItems = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/918073372921',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.5 5.5l1.87-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=voicedbyjf@gmail.com&su=Regarding%20Your%20Services&body=Hello%20Jeremy,',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // Shrink pill slightly on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on outside click
  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('mousedown', onOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', onOutside);
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>

      {/* ════════════════════════════════════
          DESKTOP — FLOATING PILL NAVBAR
      ════════════════════════════════════ */}
      <nav
        className={[
          'hidden xl:flex fixed z-50 items-center',
          'rounded-2xl border border-[rgba(255,222,79,0.10)]',
          scrolled ? 'px-3 py-2 gap-1' : 'px-5 py-3 gap-2',
          'transition-all duration-500 ease-out',
        ].join(' ')}
        style={{
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'fit-content',
          whiteSpace: 'nowrap',
          background: 'rgba(11,9,5,0.80)',
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.65), 0 2px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,222,79,0.07)',
          animation: 'navbarIn 0.7s 0.1s cubic-bezier(0.22,1,0.36,1) both',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className={[
            'flex items-center justify-center rounded-xl overflow-hidden',
            'transition-transform duration-200 hover:scale-105 flex-shrink-0',
            scrolled ? 'w-8 h-8' : 'w-9 h-9',
          ].join(' ')}
          style={{
            background: 'rgba(255,222,79,0.08)',
            boxShadow: '0 0 0 1px rgba(255,222,79,0.12), 0 0 20px rgba(255,210,60,0.08)',
          }}
        >
          <Image
            src="/logo.png"
            alt="Voiced"
            width={28}
            height={28}
            className={[
              'object-contain transition-all duration-500',
              scrolled ? 'w-5 h-5' : 'w-7 h-7',
            ].join(' ')}
          />
        </Link>

        {/* Left divider */}
        <div
          className="w-px h-5 flex-shrink-0"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(255,222,79,0.2), transparent)' }}
        />

        {/* Nav items */}
        {navItems.map((item, i) => {
          const active = mounted && pathname === item.path;
          return (
            <NavPillItem
              key={item.path}
              href={item.path}
              icon={item.icon}
              label={item.name}
              active={active}
              animDelay={`${0.18 + i * 0.07}s`}
              scrolled={scrolled}
            />
          );
        })}

        {/* Right divider */}
        <div
          className="w-px h-5 flex-shrink-0"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(255,222,79,0.2), transparent)' }}
        />

        {/* Contact icons */}
        {contactItems.map((item, i) => (
          <NavPillItem
            key={item.name}
            href={item.href}
            icon={item.icon}
            label={item.name}
            active={false}
            external
            animDelay={`${0.46 + i * 0.07}s`}
            scrolled={scrolled}
          />
        ))}
      </nav>

      {/* Keyframe injection via global style tag */}
      <style>{`
        @keyframes navbarIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-16px) scale(0.96); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        @keyframes itemIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPop {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .active-dot-nav {
          animation: dotPop 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes drawerDown {
          from { transform: translateY(-100%); }
          to   { transform: translateY(0); }
        }
        .drawer-down { animation: drawerDown 0.38s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes dItemFade {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ════════════════════════════════════
          MOBILE — TOP BAR
      ════════════════════════════════════ */}
      <header
        className="xl:hidden fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 py-3"
        style={{
          background: 'transparent',
        }}
      >
        <Link href="/">
          <Image src="/logo.png" alt="Voiced" width={100} height={36} className="h-9 w-auto" />
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="flex flex-col items-end gap-[5px] p-2 -mr-1"
          aria-label="Toggle menu"
        >
          <span
            className="block h-[1.5px] w-5 rounded-sm transition-all duration-300 origin-center"
            style={{
              background: 'rgba(240,234,216,0.7)',
              transform: isOpen ? 'translateY(6.5px) rotate(45deg)' : undefined,
            }}
          />
          <span
            className="block h-[1.5px] w-[13px] rounded-sm transition-all duration-300"
            style={{
              background: 'rgba(240,234,216,0.7)',
              opacity: isOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-[1.5px] w-5 rounded-sm transition-all duration-300 origin-center"
            style={{
              background: 'rgba(240,234,216,0.7)',
              transform: isOpen ? 'translateY(-6.5px) rotate(-45deg)' : undefined,
            }}
          />
        </button>
      </header>

      {/* ════════════════════════════════════
          MOBILE — BACKDROP
      ════════════════════════════════════ */}
      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 z-40"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ════════════════════════════════════
          MOBILE — DRAWER (drops down from top)
      ════════════════════════════════════ */}
      <div
        ref={drawerRef}
        className={[
          'xl:hidden fixed top-0 left-0 w-full z-50 flex flex-col px-6 pt-20 pb-8',
          isOpen ? 'pointer-events-auto drawer-down' : 'pointer-events-none -translate-y-full',
          'transition-transform duration-300 ease-out',
        ].join(' ')}
        style={{
          background: 'rgba(11,9,5,0.97)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          borderBottom: '1px solid rgba(255,222,79,0.10)',
          boxShadow: '0 12px 80px rgba(0,0,0,0.85)',
        }}
      >
        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{ background: 'linear-gradient(90deg, rgba(255,222,79,0.2), transparent)' }}
        />

        {/* Nav links */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item, i) => {
            const active = mounted && pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 hover:bg-[rgba(255,222,79,0.05)]"
                style={{
                  background: active ? 'rgba(255,222,79,0.07)' : undefined,
                  animation: isOpen ? `dItemFade 0.4s ${0.07 * (i + 1)}s cubic-bezier(0.22,1,0.36,1) both` : undefined,
                  opacity: isOpen ? undefined : 0,
                }}
              >
                <span style={{ color: active ? '#ffde4f' : 'rgba(240,234,216,0.4)' }}>
                  {item.icon}
                </span>
                <span
                  className={`text-xl leading-none ${active ? 'italic' : ''}`}
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontWeight: 300,
                    color: active ? '#ffde4f' : 'rgba(240,234,216,0.75)',
                  }}
                >
                  {item.name}
                </span>
                {active && (
                  <span
                    className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: '#ffde4f', boxShadow: '0 0 6px #ffde4f' }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Contact */}
        <div className="mt-4">
          <div
            className="h-px mb-4"
            style={{ background: 'linear-gradient(90deg, rgba(255,222,79,0.15), transparent)' }}
          />
          <p
            className="text-[9px] tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "var(--font-fraunces), serif", color: 'rgba(255,222,79,0.3)' }}
          >
            Contact
          </p>
          <div className="flex flex-col gap-3">
            {contactItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-light transition-colors duration-200 hover:text-[#ffde4f]"
                style={{ color: 'rgba(240,234,216,0.4)', fontFamily: 'var(--font-fraunces), serif' }}
              >
                <span>{item.icon}</span>
                {item.name === 'WhatsApp' ? '+91 80733 72921' : 'voicedbyjf@gmail.com'}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ──────────────────────────────────────
   Sub-component: single pill nav item
────────────────────────────────────── */
interface NavPillItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  external?: boolean;
  animDelay: string;
  scrolled: boolean;
}

function NavPillItem({ href, icon, label, active, external, animDelay, scrolled }: NavPillItemProps) {
  const Tag = external ? 'a' : Link;
  const extraProps = external
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <div className="relative group" style={{ animation: `itemIn 0.45s ${animDelay} cubic-bezier(0.22,1,0.36,1) both` }}>
      <Tag
        href={href}
        {...extraProps}
        className={[
          'relative flex items-center justify-center rounded-xl',
          'transition-all duration-200',
          'hover:scale-110',
          scrolled ? 'w-8 h-8' : 'w-9 h-9',
          active
            ? 'bg-[rgba(255,222,79,0.10)] text-[#ffde4f]'
            : 'text-[rgba(240,234,216,0.35)] hover:bg-[rgba(255,222,79,0.08)] hover:text-[rgba(255,222,79,0.9)]',
        ].join(' ')}
      >
        {/* Active indicator dot */}
        {active && (
          <span
            className="active-dot-nav absolute bottom-1 left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full"
            style={{ background: '#ffde4f', boxShadow: '0 0 6px rgba(255,222,79,0.8)' }}
          />
        )}

        {icon}
      </Tag>

      {/* Tooltip — drops downward */}
      <div
        className={[
          'pointer-events-none absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2',
          'opacity-0 group-hover:opacity-100',
          'translate-y-[-4px] group-hover:translate-y-0',
          'transition-all duration-200',
          'whitespace-nowrap px-2.5 py-1.5 rounded-lg text-[10px] tracking-[0.14em] uppercase',
        ].join(' ')}
        style={{
          fontFamily: "var(--font-fraunces), serif",
          background: 'rgba(11,9,5,0.92)',
          border: '1px solid rgba(255,222,79,0.15)',
          color: 'rgba(240,234,216,0.85)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        {/* Arrow pointing up */}
        <span
          className="absolute left-1/2 -translate-x-1/2 bottom-full"
          style={{
            borderWidth: '5px',
            borderStyle: 'solid',
            borderColor: 'transparent transparent rgba(255,222,79,0.15) transparent',
          }}
        />
        {label}
      </div>
    </div>
  );
}