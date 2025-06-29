'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  return (
    <section className="relative w-full min-h-screen bg-[#303030] flex items-center justify-center px-6 py-16 shadow-[0_0_30px_10px_rgba(0,0,0,0.95)] z-10 overflow-hidden mt-8 md:mt-0">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-10 px-4 lg:px-8">

        {/* Left Text Section */}
        <div className="text-white w-full lg:flex-1 max-w-2xl z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-[#ffde4f] mb-8 lg:mb-12">
            Hi! I'm Jeremy ...
          </h1>

          <p className="text-white text-xl mb-6 leading-relaxed">
            ... a professional voiceover artist specializing in neutral Indian English and conversational Tamil.
          </p>

          <p className="text-white text-xl mb-8 leading-loose">
            Whether it's a roller-coaster of an audiobook, a punchy ad, a heartfelt corporate video, or an easy-to-understand explainer video, I love using my voice to do exactly what you want your script to do.
          </p>

          <button
            onClick={() => setIsSpeaking(true)}
            className="bg-[#ffde4f] border-3 border-white text-black px-6 py-3 rounded-full hover:bg-transparent hover:text-[#ffde4f] transition flex flex-row items-center gap-2 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
            Here's my voice in action
          </button>
        </div>

        {/* Right Image Section with Radial Burst */}
        <div className="w-full max-w-[500px] lg:flex-1 flex items-center justify-center relative">
          <div className="relative w-full max-w-[400px] md:max-w-[500px] aspect-square mx-auto">

            {/* Radial Burst Background */}
            <Image
              src="/circle-waveform.png"
              alt="Waveform Background"
              width={800}
              height={800}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 w-full h-full object-contain opacity-100 z-0 filter brightness-0 invert"
            />

            {/* Foreground Jeremy Image */}
            <div className="absolute inset-0 flex items-center justify-center z-10 -right-90">
              <Image
                src={isSpeaking ? "/jeremy-speaking.png" : "/jeremy.png"}
                alt="Jeremy with mic"
                width={800}
                height={800}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain w-[300px] h-[300px] md:w-[500px] md:h-[500px] "
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
