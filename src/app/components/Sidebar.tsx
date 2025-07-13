'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Samples', path: '/samples' },
  { name: 'My Story', path: '/story' },
  { name: 'FAQs', path: '/faqs' }
];

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
      document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'auto'; // Cleanup
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden xl:flex flex-col justify-between bg-black text-white w-64 min-h-screen fixed px-6 py-8 z-50">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <Image src="/logo.png" alt="Voiced Logo" width={200} height={200} />
          </div>
          <nav className="flex flex-col gap-6 items-center">
            {navItems.map((item, idx) => (
              <Link 
                key={idx} 
                href={item.path} 
                className="group relative w-fit"
              >
                <span className="text-sm md:text-lg text-white group-hover:text-[#ffde4f] transition-colors">
                  {item.name}
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

      {/* Mobile Navbar - Visible only on small screens */}
      <header className="xl:hidden fixed top-0 left-0 w-full bg-black text-white py-4 px-6 z-40 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png"
              alt="Voiced Logo" 
              width={150} 
              height={50} 
              className="h-16 w-auto"
            />
          </Link>
        </div>
        
        <button
          onClick={() => setIsOpen(true)}
          className="text-white p-2 rounded-full focus:outline-none"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-40" />
      )}

      {/* Mobile Sidebar */}
      <div
        ref={mobileSidebarRef}
        className={`xl:hidden fixed top-0 right-0 h-full w-64 bg-black text-white px-6 py-8 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white p-2 -mr-2"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-6 mb-8">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="group relative w-fit"
            >
              <span className="text-lg text-white group-hover:text-[#ffde4f] transition-colors">
                {item.name}
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