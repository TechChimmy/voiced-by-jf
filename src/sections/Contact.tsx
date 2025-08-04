'use client'

import { Mail, Phone, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

type FormData = {
  name: string
  phone: string
  email: string
  message: string
  timestamp?: string
}

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({ name: '', phone: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({ success: true, message: 'I’ve received your message. Let’s talk soon.' })
        setForm({ name: '', phone: '', email: '', message: '' })
      } else {
        throw new Error(result.error || 'Something went wrong.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : 'Unexpected error. Try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative min-h-screen bg-[#ffde4f] py-28 px-4 overflow-hidden">
      {/* Floating Sparks */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-30">
        <div className="absolute animate-pulse-slow w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl left-[-10%] top-[20%]" />
        <div className="absolute animate-pulse-slow w-96 h-96 bg-pink-500/20 rounded-full blur-3xl right-[-15%] bottom-[-5%]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8 }} 
        className="relative z-10 max-w-5xl mx-auto bg-[#1a1a1a]/90 backdrop-blur-md rounded-[30px] shadow-2xl px-8 py-10 md:px-12"
      >
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[#ffde4f] text-3xl sm:text-4xl font-black mb-8 text-center"
        >
          Let Me Tell Your Story
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {submitStatus && (
            <div
              className={clsx(
                'p-4 rounded-xl flex items-start gap-3 text-sm',
                submitStatus.success
                  ? 'bg-green-400/10 border border-green-500 text-green-200'
                  : 'bg-red-400/10 border border-red-500 text-red-200'
              )}
            >
              {submitStatus.success ? (
                <CheckCircle className="w-5 h-5 mt-1" />
              ) : (
                <XCircle className="w-5 h-5 mt-1" />
              )}
              <div>
                <p className="font-semibold">
                  {submitStatus.success ? 'Success!' : 'Oops…'}
                </p>
                <p>{submitStatus.message}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="bg-black/30 text-white border-white/10 focus:ring-[#ffde4f]"
            />
            <Input
              placeholder="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={isSubmitting}
              className="bg-black/30 text-white border-white/10 focus:ring-[#ffde4f]"
            />
          </div>

          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="bg-black/30 text-white border-white/10 focus:ring-[#ffde4f]"
          />

          <Textarea
            placeholder="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="bg-black/30 text-white border-white/10 min-h-[140px] focus:ring-[#ffde4f]"
          />

          <motion.div
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#ffde4f] hover:bg-[#ffe97e] text-black font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-xl"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </motion.div>
        </form>
      </motion.div>

      <div className="mt-16 w-full max-w-4xl mx-auto text-center font-semibold text-black text-xl leading-loose z-10 relative px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 xl:block hidden"
        >
          Need a sample read? <br />
          Send me a short extract and I'll bring your characters to life with a custom voice audition.
        </motion.p>

        <motion.div 
          className="flex flex-wrap justify-center items-center gap-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="mailto:voicedbyjf@gmail.com"
            className="relative px-4 py-3 bg-black/90 text-white rounded-full flex items-center gap-2 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span 
              className="absolute inset-0 bg-[#ffde4f] origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ zIndex: -1 }}
            />
            <Mail className="w-5 h-5 flex-shrink-0" />
            <span>voicedbyjf@gmail.com</span>
            <motion.span 
              className="ml-1"
              animate={{ x: [0, 4, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            >
              →
            </motion.span>
          </motion.a>
          
          <motion.a
            href="https://wa.me/918073372921"
            className="relative px-4 py-3 bg-black/90 text-white rounded-full flex items-center gap-2 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            target="_blank"
          >
            <motion.span 
              className="absolute inset-0 bg-[#ffde4f] origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ zIndex: -1 }}
            />
            <Phone className="w-5 h-5 flex-shrink-0" />
            <span>+91 80733 72921</span>
            <motion.div 
              className="ml-1 w-2 h-2 bg-green-400 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
