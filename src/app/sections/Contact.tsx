'use client'

import { Mail, MessageCircle, Linkedin, Phone, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import Link from 'next/link'

// Create a type for the form data
type FormData = {
  name: string
  phone: string
  email: string
  message: string
  timestamp?: string
}

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({ 
    name: '', 
    phone: '', 
    email: '', 
    message: '' 
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{success: boolean, message: string} | null>(null)

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const result = await response.json()
      
      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Your message has been sent successfully. I will get back to you soon!' })
        setForm({ name: '', phone: '', email: '', message: '' })
      } else {
        throw new Error(result.error || 'Failed to send message. Please try again later.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({ 
        success: false, 
        message: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-[#303030] text-white py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start justify-between">
        {/* Left: Form */}
        <div className="bg-[#ffde4f] rounded-xl p-6 w-full lg:w-1/2 shadow-lg">
          <h2 className="text-black text-xl font-bold mb-6 tracking-widest text-center lg:text-left">
            LET ME BE YOUR NEXT NARRATOR!
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitStatus && (
              <div className={`p-4 rounded-lg flex items-start gap-3 ${
                submitStatus.success 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {submitStatus.success ? (
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium">
                    {submitStatus.success ? 'Message Sent Successfully!' : 'Error Sending Message'}
                  </p>
                  <p className="text-sm mt-1">{submitStatus.message}</p>
                  {submitStatus.success && (
                    <p className="text-xs mt-2 opacity-80">
                      Thanks for reaching out!
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="bg-white border border-white text-black"
                required
                disabled={isSubmitting}
              />
              <Input
                placeholder="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="bg-white border border-white text-black"
                disabled={isSubmitting}
              />
            </div>
            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="bg-white border border-white text-black"
              required
              disabled={isSubmitting}
            />
            <Textarea
              placeholder="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              className="bg-white border border-white text-black min-h-[150px]"
              required
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              className="w-full bg-[#1a1a1a] hover:bg-[#ffde4f] hover:text-black text-white border border-black font-medium py-3 rounded-md transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>

        {/* Right: Contact Info */}
        <div className="w-full lg:w-1/2 space-y-6 text-sm md:text-base">
          <div className="space-y-4">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=voicedbyjf@gmail.com&su=Regarding%20Your%20Services&body=Hello%20Jeremy," 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#ffde4f] transition-colors flex items-center gap-2"
            >
              <Mail className="text-[#ffde4f] w-5 h-5" />
              voicedbyjf@gmail.com
            </a>
            <a 
              href="https://wa.me/918073372921" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#ffde4f] transition-colors flex items-center gap-2"
            >
              <Phone className="text-[#ffde4f] w-5 h-5" />
              +91 80733 72921
            </a>
          </div>

          <p>
            Whether you're an author in need of an audiobook narrator right now, or simply interested in learning more — then I'm happy to help!
          </p>
          <p>
            Please feel free to get in touch, and if you need to hear more from me,
            <strong className="text-white font-semibold"> then I'll happily provide a custom audiobook audition </strong>
            if you send over a short extract of your work along with it!
          </p>
        </div>
      </div>
    </section>
  )
}