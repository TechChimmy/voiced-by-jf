'use client';

import Image from 'next/image';

export default function TrustedBy() {
  const brands = [
    { name: 'Penguin', src: '/penguin.png' },
    { name: 'Byju’s', src: '/byjus.png' },
    { name: 'Dunzo', src: '/dunzo.png' },
    { name: 'CCAL', src: '/ccal.png' },
    { name: 'Ampere', src: '/ampere.png' },
  ];

  return (
    <section className="bg-white py-12 px-6 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-evenly items-center gap-10">
        {brands.map((brand) => (
          <Image
            key={brand.name}
            src={brand.src}
            alt={brand.name}
            width={180}
            height={100}
            className="object-contain grayscale hover:grayscale-0 transition duration-300"
          />
        ))}
      </div>
    </section>
  );
}
