'use client'

import { Mail, MessageCircle, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import Link from 'next/link'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic
    console.log(form)
  }

  return (
    <section className="bg-[#000000] text-white py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start justify-between">
        {/* Left: Form */}
        <div className="bg-[#303030] rounded-xl p-6 w-full lg:w-1/2 shadow-lg">
          <h2 className="text-[#ffde4f] text-xl font-bold mb-6 tracking-widest text-center lg:text-left">
            LET ME BE YOUR NEXT NARRATOR!
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="bg-transparent border border-white text-white"
                required
              />
              <Input
                placeholder="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="bg-transparent border border-white text-white"
              />
            </div>
            <Input
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent border border-white text-white"
              required
            />
            <Textarea
              placeholder="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              className="bg-transparent border border-white text-white min-h-[150px]"
              required
            />
            <Button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#B8860B] text-black font-medium py-3 rounded-md transition-colors">
              Send Message
            </Button>
          </form>
        </div>

        {/* Right: Contact Info */}
        <div className="w-full lg:w-1/2 space-y-6 text-sm md:text-base">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="text-[#ffde4f] w-5 h-5" />
              <a href="mailto:voicedbyjf@gmail.com" className="hover:underline">voicedbyjf@gmail.com</a>
            </div>
            {/* <div className="flex items-center gap-2">
              <Linkedin className="text-[#ffde4f] w-5 h-5" />
              <Link href="https://www.linkedin.com/in/vicki-jo-eva-502666aa/" target="_blank" className="hover:underline">
                https://www.linkedin.com/in/vicki-jo-eva-502666aa/
              </Link>
            </div> */}
            <div className="flex items-center gap-2">
              <MessageCircle className="text-[#ffde4f] w-5 h-5" />
              <a 
                href="https://wa.me/918073372921" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                +91 80733 72921
              </a>
            </div>
          </div>

          <p>
            Whether you’re an author in need of an audiobook narrator right now, or simply interested in learning more — then I’m happy to help!
          </p>
          <p>
            Please feel free to get in touch, and if you need to hear more from me,
            <strong className="text-white font-semibold"> then I’ll happily provide a custom audiobook audition </strong>
            if you send over a short extract of your work along with it!
          </p>
        </div>
      </div>
    </section>
  )
}
