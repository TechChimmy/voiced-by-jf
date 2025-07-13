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
    downloadLink: '/audio/audiobook-sample.mp3',
  },
  {
    title: 'D2C Ads',
    image: '/thumb.jpg',
    alt: 'Headphones',
    description:
      'Make your brand/product relatable and unforgettable with a voiceover that resonates long after that first listen.',
    buttonText: 'More Ad Samples',
    downloadLink: '/audio/d2c-sample.mp3',
  },
  {
    title: 'Corporate Videos',
    image: '/thumb.jpg',
    alt: 'Headphones',
    description:
      "Professional, yet personable and earnest... tailored to reflect your brand's unique tone and style.",
    buttonText: 'See Corporate Narrations',
    downloadLink: '/audio/corporate-sample.mp3',
  },
  {
    title: 'Audiobooks',
    image: '/thumb.jpg',
    alt: 'Headphones',
    description:
      "From gripping non-fiction to immersive fiction, my voice adapts to your narrative's every twist.",
    buttonText: 'More Audiobook Samples',
    downloadLink: '/audio/audiobook-sample.mp3',
  },
  {
    title: 'D2C Ads',
    image: '/thumb.jpg',
    alt: 'Headphones',
    description:
      'Make your brand/product relatable and unforgettable with a voiceover that resonates long after that first listen.',
    buttonText: 'More Ad Samples',
    downloadLink: '/audio/d2c-sample.mp3',
  },
  {
    title: 'Corporate Videos',
    image: '/thumb.jpg',
    alt: 'Headphones',
    description:
      "Professional, yet personable and earnest... tailored to reflect your brand's unique tone and style.",
    buttonText: 'See Corporate Narrations',
    downloadLink: '/audio/corporate-sample.mp3',
  },
  {
    title: 'Audiobooks',
    image: '/thumb.jpg',
    alt: 'Headphones',
    description:
      "From gripping non-fiction to immersive fiction, my voice adapts to your narrative's every twist.",
    buttonText: 'More Audiobook Samples',
    downloadLink: '/audio/audiobook-sample.mp3',
  },
  {
    title: 'D2C Ads',
    image: '/thumb.jpg',
    alt: 'Headphones',
    description:
      'Make your brand/product relatable and unforgettable with a voiceover that resonates long after that first listen.',
    buttonText: 'More Ad Samples',
    downloadLink: '/audio/d2c-sample.mp3',
  },
  {
    title: 'Corporate Videos',
    image: '/thumb.jpg',
    alt: 'Headphones',
    description:
      "Professional, yet personable and earnest... tailored to reflect your brand's unique tone and style.",
    buttonText: 'See Corporate Narrations',
    downloadLink: '/audio/corporate-sample.mp3',
  },
]

const DOT_COUNT = 3

export default function Works() {
  const [cardsPerSlide, setCardsPerSlide] = useState(3)
  const [currentDot, setCurrentDot] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const updateCardsPerSlide = () => {
      const width = window.innerWidth
      if (width >= 1280) {
        setCardsPerSlide(3)
      } else if (width >= 768) {
        setCardsPerSlide(2)
      } else {
        setCardsPerSlide(1)
      }
    }

    updateCardsPerSlide()
    window.addEventListener('resize', updateCardsPerSlide)
    return () => window.removeEventListener('resize', updateCardsPerSlide)
  }, [])

  const getCurrentSlideCards = () => {
    const slidesCount = Math.ceil(contentData.length / cardsPerSlide)
    const slideIndex = currentDot % slidesCount
    const start = slideIndex * cardsPerSlide
    return contentData.slice(start, start + cardsPerSlide)
  }

  const nextSlide = () => {
    setDirection(1)
    setCurrentDot((prev) => (prev + 1) % DOT_COUNT)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentDot((prev) => (prev - 1 + DOT_COUNT) % DOT_COUNT)
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentDot ? 1 : -1)
    setCurrentDot(index)
  }

  const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 130, damping: 22 },
        opacity: { duration: 0.15 }
      }
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 130, damping: 22 },
        opacity: { duration: 0.15 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 130, damping: 22 },
        opacity: { duration: 0.15 }
      }
    })
  }

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
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.div
              key={currentDot}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.1 }}
              className="flex justify-center items-center gap-6 flex-wrap xl:flex-nowrap"
            >
              {getCurrentSlideCards().map((item, index) => (
                <motion.div
                  key={`${currentDot}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: index * 0.02 }}
                  className="w-[300px] xl:w-[30%] h-[500px] md:h-[520px] bg-white rounded-2xl p-6 shadow-lg flex flex-col justify-between"
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
                    <p className="text-gray-600 mb-2 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-center justify-start gap-3 mb-4">
                      <Button size="icon" className="rounded-full bg-gray-800 hover:bg-gray-700">
                        <Play className="w-5 h-5 fill-white" />
                      </Button>
                      <Button
                        size="icon"
                        className="rounded-full bg-gray-800 hover:bg-gray-700"
                        onClick={() => {
                          const link = document.createElement('a')
                          link.href = item.downloadLink
                          link.download = item.downloadLink.split('/').pop() || 'sample.mp3'
                          link.click()
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                        </svg>
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
                currentDot === i ? 'bg-gray-800 scale-110' : 'bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute left-2 xl:left-4 top-1/2 -translate-y-1/2 z-20">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={prevSlide}
            size="icon"
            className="rounded-full w-8 h-8 xl:w-12 xl:h-12 bg-white hover:bg-gray-100 text-gray-800 shadow-lg p-0"
          >
            <ChevronLeft className="w-4 h-4 xl:w-6 xl:h-6" />
          </Button>
        </motion.div>
      </div>

      <div className="absolute right-2 xl:right-4 top-1/2 -translate-y-1/2 z-20">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={nextSlide}
            size="icon"
            className="rounded-full w-8 h-8 xl:w-12 xl:h-12 bg-white hover:bg-gray-100 text-gray-800 shadow-lg p-0"
          >
            <ChevronRight className="w-4 h-4 xl:w-6 xl:h-6" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
