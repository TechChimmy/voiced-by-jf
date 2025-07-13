'use client'

import { useState, useEffect } from 'react'
import { Play, Download, Pause, Volume2, VolumeX } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

type Sample = {
  title: string
  description: string
  image: string
  src: string
  duration?: string
}

type GenreSamples = {
  [genre: string]: Sample[]
}

const samplesByGenre: GenreSamples = {
  'Audiobooks': [
    {
      title: 'Emotional Fiction – Chapter 1',
      description: 'A gripping narration that immerses you in the story with rich character voices and emotional depth.',
      image: '/audiobook1.png',
      src: '/audio/audiobook-sample-1.mp3',
      duration: '2:45'
    },
    {
      title: 'Thriller Teaser',
      description: 'Suspense-filled delivery for gripping storytelling with perfect pacing and tension-building.',
      image: '/audiobook2.png',
      src: '/audio/audiobook-sample-2.mp3',
      duration: '1:30'
    },
    {
      title: 'Fantasy Worldbuilding',
      description: 'Epic narration bringing magical worlds to life with majestic tone and clear articulation.',
      image: '/audiobook1.png',
      src: '/audio/audiobook-sample-3.mp3',
      duration: '3:15'
    }
  ],
  'D2C Ads': [
    {
      title: 'Launch Promo – Energy Drink',
      description: 'Bold and dynamic tone that hooks the audience with high-energy delivery.',
      image: '/ad1.png',
      src: '/audio/d2c-ad-1.mp3',
      duration: '0:45'
    },
    {
      title: 'Soft Sell – Skincare',
      description: 'Gentle, persuasive voice with authenticity and warmth that builds trust.',
      image: '/ad2.png',
      src: '/audio/d2c-ad-2.mp3',
      duration: '1:00'
    },
    {
      title: 'Luxury Product Showcase',
      description: 'Sophisticated and elegant delivery for high-end product presentation.',
      image: '/ad3.png',
      src: '/audio/d2c-ad-3.mp3',
      duration: '1:15'
    }
  ],
  'Corporate Videos': [
    {
      title: 'Annual Report Summary',
      description: 'Professional, clear and authoritative delivery perfect for corporate communications.',
      image: '/corporate1.png',
      src: '/audio/corporate-1.mp3',
      duration: '2:15'
    },
    {
      title: 'Product Training Video',
      description: 'Engaging instructional tone that maintains interest while being informative.',
      image: '/corporate2.png',
      src: '/audio/corporate-2.mp3',
      duration: '3:30'
    },
    {
      title: 'Company Culture Video',
      description: 'Warm and inviting tone that showcases company values authentically.',
      image: '/corporate1.png',
      src: '/audio/corporate-3.mp3',
      duration: '2:45'
    }
  ],
  'E-Learning': [
    {
      title: 'Science Module',
      description: 'Clear, articulate delivery perfect for educational content.',
      image: '/elearning1.png',
      src: '/audio/elearning-1.mp3',
      duration: '4:00'
    },
    {
      title: 'Language Course',
      description: 'Precise pronunciation with engaging pacing for language learning.',
      image: '/elearning2.png',
      src: '/audio/elearning-2.mp3',
      duration: '3:15'
    }
  ],
  'Video Games': [
    {
      title: 'Fantasy RPG Character',
      description: 'Immersive character voice with distinct personality.',
      image: '/games1.png',
      src: '/audio/game-1.mp3',
      duration: '1:45'
    },
    {
      title: 'Action Game Trailer',
      description: 'High-energy, dramatic narration for intense gameplay previews.',
      image: '/games2.png',
      src: '/audio/game-2.mp3',
      duration: '2:30'
    }
  ]
}

export default function Samples() {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [activeGenre, setActiveGenre] = useState<string>(Object.keys(samplesByGenre)[0])
  const [audioProgress, setAudioProgress] = useState<{[key: string]: number}>({})

  const handlePlay = (src: string) => {
    const audio = document.getElementById(src) as HTMLAudioElement
    if (audio) {
      if (currentPlaying === src) {
        audio.pause()
        setCurrentPlaying(null)
      } else {
        if (currentPlaying) {
          const current = document.getElementById(currentPlaying) as HTMLAudioElement
          current?.pause()
          current.currentTime = 0
        }
        audio.play()
        setCurrentPlaying(src)
      }
    }
  }

  const handleGenreChange = (genre: string) => {
    setActiveGenre(genre)
    if (currentPlaying) {
      const audio = document.getElementById(currentPlaying) as HTMLAudioElement
      audio?.pause()
      setCurrentPlaying(null)
    }
  }

  useEffect(() => {
    const audioElements = document.querySelectorAll('audio')
    
    const timeUpdateHandler = (e: Event) => {
      const audio = e.target as HTMLAudioElement
      const progress = (audio.currentTime / audio.duration) * 100
      setAudioProgress(prev => ({
        ...prev,
        [audio.id]: isNaN(progress) ? 0 : progress
      }))
    }

    audioElements.forEach(audio => {
      audio.addEventListener('timeupdate', timeUpdateHandler)
      audio.addEventListener('ended', () => setCurrentPlaying(null))
    })

    return () => {
      audioElements.forEach(audio => {
        audio.removeEventListener('timeupdate', timeUpdateHandler)
      })
    }
  }, [])

  const toggleMute = () => {
    const audioElements = document.querySelectorAll('audio')
    audioElements.forEach(audio => {
      audio.muted = !isMuted
    })
    setIsMuted(!isMuted)
  }

  return (
    <div className="bg-[#1a1a1a] min-h-screen py-12 px-4 sm:px-8 lg:px-16 xl:px-24 mt-18 md:mt-20 xl:mt-0 text-white">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#ffde4f] mb-4 tracking-tight">
          Voiceover Showcase
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Explore professional voiceover samples across different genres and styles.
        </p>
      </motion.header>

      <motion.div 
        className="flex flex-wrap justify-center gap-3 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {Object.keys(samplesByGenre).map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreChange(genre)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${activeGenre === genre 
              ? 'bg-[#ffde4f] text-black shadow-lg'
              : 'bg-[#2d2d2d] hover:bg-[#3a3a3a] text-white'}`}
          >
            {genre}
          </button>
        ))}
      </motion.div>

      <div className="flex justify-end mb-6">
        <button 
          onClick={toggleMute}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition"
          aria-label={isMuted ? "Unmute all" : "Mute all"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          <span>{isMuted ? "Unmute All" : "Mute All"}</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.section
          key={activeGenre}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {samplesByGenre[activeGenre].map((sample) => (
              <motion.div
                key={sample.src}
                whileHover={{ y: -5 }}
                className="rounded-xl bg-[#2a2a2a] overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col border-t-4 border-[#ffde4f]"
              >
                <div className="relative aspect-video group">
                  <Image
                    src={sample.image}
                    alt={sample.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <button
                    onClick={() => handlePlay(sample.src)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#ffde4f] flex items-center justify-center">
                      {currentPlaying === sample.src ? (
                        <Pause className="w-6 h-6 text-black" />
                      ) : (
                        <Play className="w-6 h-6 text-black ml-1" />
                      )}
                    </div>
                  </button>
                </div>

                <div className="w-full bg-[#383838] h-1">
                  <div 
                    className="bg-[#ffde4f] h-full" 
                    style={{ width: `${audioProgress[sample.src] || 0}%` }}
                  />
                </div>

                <div className="p-5 flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#ffde4f]">{sample.title}</h3>
                    {sample.duration && (
                      <span className="text-sm bg-[#ffde4f]/20 text-[#ffde4f] px-2 py-1 rounded">
                        {sample.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-4">{sample.description}</p>
                </div>

                <audio id={sample.src} src={sample.src} preload="metadata" />

                <div className="px-5 pb-5 flex gap-3">
                  <Button
                    onClick={() => handlePlay(sample.src)}
                    className={`flex-grow rounded-lg bg-[#ffde4f] hover:bg-[#ffea7a] text-black font-bold`}
                  >
                    {currentPlaying === sample.src ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Play Sample
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = sample.src
                      link.download = `${sample.title.replace(/\s+/g, '-')}.mp3`
                      link.click()
                    }}
                    className="rounded-lg border-[#ffde4f] text-[#ffde4f] hover:bg-[#ffde4f]/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  )
}