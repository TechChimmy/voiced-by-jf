'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navItems = ['Samples', 'My Story', 'FAQs', 'Menu'];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const mobileSidebarRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        mobileSidebarRef.current &&
        !mobileSidebarRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col justify-between bg-black text-white w-64 min-h-screen fixed px-6 py-8 z-50">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <Image src="/logo.png" alt="Voiced Logo" width={200} height={200} />
          </div>
          <nav className="flex flex-col gap-6 items-center">
            {navItems.map((item, idx) => (
              <Link key={idx} href="#" className="group relative w-fit">
                <span className="text-sm md:text-lg text-white group-hover:text-[#ffde4f] transition-colors">
                  {item}
                </span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#ffde4f] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="text-sm mt-4 text-white">
          <a 
            href="https://wa.me/918073372921" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mb-4 block hover:text-[#ffde4f] transition-colors"
          >
            +91 80733 72921
          </a>
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=voicedbyjf@gmail.com&su=Regarding%20Your%20Services&body=Hello%20Jeremy," 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#ffde4f] transition-colors"
          >
            voicedbyjf@gmail.com
          </a>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-[999]">
        <button
          onClick={() => setIsOpen(true)}
          className="text-white bg-black p-2 rounded-full shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300" />
      )}

      {/* Mobile Sidebar */}
      <div
        ref={mobileSidebarRef}
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-black text-white px-6 py-8 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-0 text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 mb-10">
          <Image src="/logo.png" alt="Voiced Logo" width={180} height={180} />
        </div>

        <nav className="flex flex-col gap-6 mb-8">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href="#"
              onClick={() => setIsOpen(false)}
              className="group relative w-fit"
            >
              <span className="text-base text-white group-hover:text-[#ffde4f] transition-colors">
                {item}
              </span>
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#ffde4f] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="text-sm mt-auto">
          <a 
            href="https://wa.me/918073372921" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mb-4 block hover:text-[#ffde4f] transition-colors"
          >
            +91 80733 72921
          </a>
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=voicedbyjf@gmail.com&su=Regarding%20Your%20Services&body=Hello%20Jeremy," 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#ffde4f] transition-colors"
          >
            voicedbyjf@gmail.com
          </a>
        </div>
      </div>
    </>
  );
}
