'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function TrustedBy() {
  const brands = [
    { name: 'Penguin', src: '/penguin.png' },
    { name: 'Byju’s', src: '/byjus.png' },
    { name: 'Dunzo', src: '/dunzo.png' },
    { name: 'CCAL', src: '/ccal.png' },
    { name: 'Ampere', src: '/ampere.png' },
  ];

  const marqueeBrands = [...brands, ...brands];
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const speed = 0.5;
    let position = 0;

    const animate = () => {
      position -= speed;

      // If it scrolls past its scrollable width, reset
      const scrollableWidth = marquee.scrollWidth / 2;
      if (Math.abs(position) >= scrollableWidth) {
        position = 0;
      }

      marquee.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="bg-white py-4 px-6">
      {/* Static Desktop View */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-evenly items-center md:gap-5 xl:gap-10">
          {brands.map((brand) => (
            <Image
              key={brand.name}
              src={brand.src}
              alt={brand.name}
              width={180}
              height={100}
              className="object-contain md:w-[100px] xl:w-[150px]"
            />
          ))}
        </div>
      </div>

      {/* Marquee View (for sm, md, lg) */}
      <div className="md:hidden relative overflow-hidden w-full">
        <div
          ref={marqueeRef}
          className="flex flex-row items-center whitespace-nowrap will-change-transform"
          style={{ transform: 'translateX(0)' }}
        >
          {marqueeBrands.map((brand, index) => (
            <div key={`${brand.name}-${index}`} className="shrink-0 px-4 py-2">
              <Image
                src={brand.src}
                alt={brand.name}
                width={100}
                height={60}
                className="object-contain md:w-[100px] xl:w-[150px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
