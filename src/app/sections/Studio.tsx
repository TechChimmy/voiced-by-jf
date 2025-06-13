'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const studioImages = [
  { src: '/thumb.jpg', alt: 'Studio View 1' },
  { src: '/thumb.jpg', alt: 'Studio View 2' },
  { src: '/thumb.jpg', alt: 'Studio View 3' },
  { src: '/thumb.jpg', alt: 'Studio View 4' }
]

export default function Studio() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-slide every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % studioImages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-[#303030] text-white py-16">
      <div className="container mx-auto px-6 xl:px-12 grid grid-cols-1 xl:grid-cols-2 gap-12 items-stretch">
        {/* Carousel for base to lg screens */}
        <div className="block xl:hidden w-full">
          <div className="relative w-full h-[220px] overflow-hidden rounded-xl">
            {studioImages.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Left Side: Text Block - Always Visible */}
        <div className="flex flex-col justify-center h-auto xl:h-[600px]">
          <div>
            <h2 className="text-4xl font-bold text-[#ffde4f] mb-6">My Studio</h2>
            <p className="text-lg text-white mb-4 font-semibold">
              From Mic Dreams to Microphones – My Voiceover Journey
            </p>
            <p className="text-gray-300 mb-4">
              From my very own home studio, I can record, process and deliver all my audio
              recordings directly to you, with production that’s professional grade. I’ve delivered
              work for huge organisations from my home studio, so it removes all the hassle of
              having to book in a commercial studio, because I throw in one for free.
            </p>
            <p className="text-gray-300">
              There’s no waiting times with my studio, so I can deliver all your recordings when
              you need them and ready to be broadcast straight away!
            </p>
          </div>
        </div>

        {/* Bento Grid: Only for xl screens */}
        <div className="hidden xl:grid grid-cols-2 grid-rows-6 gap-4 h-[600px]">
          <div className="row-span-4">
            <Image
              src="/thumb.jpg"
              alt="Studio View 1"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="row-span-2">
            <Image
              src="/thumb.jpg"
              alt="Studio View 2"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="row-span-2">
            <Image
              src="/thumb.jpg"
              alt="Studio View 3"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="col-span-2 row-span-2">
            <Image
              src="/thumb.jpg"
              alt="Studio View 4"
              width={1000}
              height={500}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
