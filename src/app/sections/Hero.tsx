'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[700px] md:min-h-[700px] lg:min-h-screen bg-[#303030] flex items-center justify-center px-6 overflow-hidden mt-16 md:mt-12 xl:mt-0">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-10 px-4 lg:px-8 relative">

        {/* Left Text Section */}
        <div className="text-white w-full lg:flex-1 max-w-2xl z-20">
          <h1 className="text-3xl md:text-6xl font-bold text-[#ffde4f] mb-6 md:mb-6 lg:py-8">
            Hi! I'm Jeremy . . .
          </h1>

          <p className="text-white text-lg md:text-xl mb-4 leading-loose">
            ... a professional voiceover artist specializing in neutral Indian English and conversational Tamil.
          </p>

          <p className="text-white text-lg md:text-xl mb-8 leading-loose md:py-6 lg:py-8">
            Whether it's a roller-coaster of an audiobook, a punchy ad, a heartfelt corporate video, or an easy-to-understand explainer video, I love using my voice to do exactly what you want your script to do.
          </p>

          <button
            className="bg-[#ffde4f] text-black px-6 py-3 rounded-full hover:bg-white hover:text-black transition flex flex-row items-center gap-2 font-semibold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
            Here’s my voice in action
          </button>
        </div>

        {/* Right Image Section */}
        <div className="w-full max-w-[800px] lg:flex-1 flex items-center justify-center relative">
          {/* Yellow Tag */}
          <div className="hidden lg:block absolute w-fit h-fit px-4 py-4 -bottom-10 md:top-10 lg:top-36 lg:right-50 bg-[#ffde4f] text-black text-sm font-bold rounded z-20">
            One Artist, Many Voices
          </div>
          {/* Jeremy's image */}
          <div className="absolute -bottom-[350px] md:right-10 md:-top-[600px] lg:-right-40 lg:-top-[700px] z-10">
            <div className="lg:w-[800px] lg:h-[1600px] md:w-[600px] md:h-[1200px] w-[400px] h-[900px] rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
              <Image 
                src="/jeremy.png" 
                alt="Jeremy" 
                width={800}
                height={1600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
