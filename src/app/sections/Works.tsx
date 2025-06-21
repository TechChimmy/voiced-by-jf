'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Play, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSwipeable } from 'react-swipeable'
import { motion, AnimatePresence, Variants } from 'framer-motion'

const contentData = [
  {
    title: 'Audiobooks',
    image: '/thumb.jpg',
    alt: 'Headphones',
    description:
      "From gripping non-fiction to immersive fiction, my voice adapts to your narrative's every twist.",
    buttonText: 'More Audiobook Samples',
  },
  {
    title: 'D2C Ads',
    image: '/thumb.jpg',
    alt: 'Headphones',
    description:
      'Make your brand/product relatable and unforgettable with a voiceover that resonates long after that first listen.',
    buttonText: 'More Ad Samples',
  },
  {
    title: 'Corporate Videos',
    image: '/thumb.jpg',
    alt: 'Headphones',
    description:
      "Professional, yet personable and earnest... tailored to reflect your brand's unique tone and style.",
    buttonText: 'See Corporate Narrations',
  },
  {
    title: 'E-Learning',
    image: '/thumb.jpg',
    alt: 'Headphones',
    description:
      'Clear, engaging narration that makes complex topics accessible and keeps learners focused throughout their journey.',
    buttonText: 'View E-Learning Samples',
  },
  {
    title: 'Podcasts',
    image: '/thumb.jpg',
    alt: 'Headphones',
    description:
      'Warm, conversational delivery that builds connection with your audience and keeps them coming back for more.',
    buttonText: 'Listen to Podcast Demos',
  },
  {
    title: 'Video Games',
    image: '/thumb.jpg',
    alt: 'Headphones',
    description:
      'Dynamic character voices and immersive storytelling that brings your game world to life with authentic emotion.',
    buttonText: 'Explore Gaming Voices',
  },
  {
    title: 'Commercials',
    image: '/thumb.jpg',
    alt: 'Headphones',
    description:
      'Compelling, memorable voiceovers that cut through the noise and drive action with every word spoken.',
    buttonText: 'Commercial Voice Reels',
  },
  {
    title: 'Documentaries',
    image: '/thumb.jpg',
    alt: 'Headphones',
    description:
      'Authoritative yet approachable narration that guides viewers through compelling stories with clarity and gravitas.',
    buttonText: 'Documentary Samples',
  },
  {
    title: 'IVR & Phone Systems',
    image: '/thumb.jpg',
    alt: 'Headphones',
    description:
      "Professional, clear phone system voices that enhance customer experience and reflect your brand's reliability.",
    buttonText: 'IVR Voice Samples',
  },
]

const DOT_COUNT = 3

export default function Works() {
  const [cardsPerSlide, setCardsPerSlide] = useState(3)
  const [currentDot, setCurrentDot] = useState(0)
  const [direction, setDirection] = useState(0) // 0: no direction, 1: right, -1: left

  useEffect(() => {
    const updateCardsPerSlide = () => {
      const width = window.innerWidth
      if (width >= 1280) {
        setCardsPerSlide(3)
      } else {
        setCardsPerSlide(1)
      }
    }

    updateCardsPerSlide()
    window.addEventListener('resize', updateCardsPerSlide)
    return () => window.removeEventListener('resize', updateCardsPerSlide)
  }, [])

  const getCurrentSlideCards = () => {
    if (cardsPerSlide === 1) {
      const realIndex = currentDot % contentData.length
      return [contentData[realIndex]]
    } else {
      const start = currentDot * cardsPerSlide
      return contentData.slice(start, start + cardsPerSlide)
    }
  }

  const nextSlide = () => {
    setDirection(1)
    if (cardsPerSlide === 1) {
      setCurrentDot((prev) => (prev + 1) % contentData.length)
    } else {
      setCurrentDot((prev) => (prev + 1) % DOT_COUNT)
    }
  }

  const prevSlide = () => {
    setDirection(-1)
    if (cardsPerSlide === 1) {
      setCurrentDot((prev) => (prev - 1 + contentData.length) % contentData.length)
    } else {
      setCurrentDot((prev) => (prev - 1 + DOT_COUNT) % DOT_COUNT)
    }
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentDot ? 1 : -1)
    setCurrentDot(index)
  }

  const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        x: { type: "tween", duration: 0.2 },
        opacity: { duration: 0.1 }
      }
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "tween", duration: 0.2 },
        opacity: { duration: 0.1 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        x: { type: "tween", duration: 0.2 },
        opacity: { duration: 0.1 }
      }
    })
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true,
  })

  return (
    <div
      {...swipeHandlers}
      className="bg-[#ffde4f] min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="container mx-auto px-4 py-8 xl:py-16 relative z-10">
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={currentDot}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.2 }}
              className="flex justify-center items-center gap-6 flex-wrap xl:flex-nowrap"
            >
              {getCurrentSlideCards().map((item, index) => (
                <motion.div
                  key={`${currentDot}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: index * 0.02 }}
                  className="w-full xl:w-[30%] h-[500px] md:h-[560px] xl:h-[520px] bg-white rounded-2xl p-6 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-center justify-start mb-4">
                      <Button size="default" className="rounded-full bg-gray-800 hover:bg-gray-700">
                        <Play className="w-5 h-5 fill-white" />
                      </Button>
                    </div>
                    <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white rounded-full py-3">
                      {item.buttonText}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center mt-12 space-x-3">
          {[...Array(DOT_COUNT)].map((_, i) => (
            <motion.div
              key={i}
              onClick={() => goToSlide(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                cardsPerSlide === 1
                  ? currentDot % DOT_COUNT === i
                    ? 'bg-gray-800 scale-110'
                    : 'bg-white'
                  : currentDot === i
                    ? 'bg-gray-800 scale-110'
                    : 'bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Chevron Buttons only on xl and above */}
      <div className="hidden xl:block absolute left-4 top-1/2 -translate-y-1/2 z-20">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={prevSlide}
            size="icon"
            className="rounded-full w-12 h-12 bg-white hover:bg-gray-100 text-gray-800 shadow-lg p-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </motion.div>
      </div>

      <div className="hidden xl:block absolute right-4 top-1/2 -translate-y-1/2 z-20">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={nextSlide}
            size="icon"
            className="rounded-full w-12 h-12 bg-white hover:bg-gray-100 text-gray-800 shadow-lg p-0"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
