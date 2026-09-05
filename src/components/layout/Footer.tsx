'use client'

import { useState } from 'react'
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'
import { toast } from 'sonner'
import { useAppStore, Page } from '@/lib/store'
import { site } from '@/lib/content'

const columns: { title: string; links: { label: string; page: Page }[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'About', page: 'about' },
      { label: 'Careers', page: 'careers' },
      { label: 'Blog', page: 'blog' },
      { label: 'Contact', page: 'contact' },
    ],
  },
  {
    title: 'Work',
    links: [
      { label: 'Services', page: 'services' },
      { label: 'Projects', page: 'projects' },
      { label: 'Reviews', page: 'reviews' },
      { label: 'Pricing', page: 'pricing' },
    ],
  },
]

export default function Footer() {
  const { navigate } = useAppStore()
  const [email, setEmail] = useState('')

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!valid) {
      toast.error('Please enter a valid email address.')
      return
    }
    toast.success('Subscribed — welcome aboard.')
    setEmail('')
  }

  return (
    <footer className="border-t border-cv-line bg-cv-card">
      <div className="container-cv py-14 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <button
              onClick={() => navigate('home')}
              className="w-fit text-[20px] font-semibold tracking-tight text-cv-ink"
            >
              {site.name}
            </button>
            <p className="max-w-sm text-sm leading-relaxed text-cv-muted">
              {site.tagline}. Backend systems, web platforms, mobile apps, and
              automation — engineered in {site.location}.
            </p>
            <form onSubmit={subscribe} className="mt-2 flex w-full max-w-sm items-center gap-2">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email for engineering notes"
                className="h-11 flex-1 rounded-full border border-cv-line bg-background px-4 text-sm text-cv-ink placeholder:text-cv-muted focus:outline-none focus:ring-2 focus:ring-cv-ink/20"
              />
              <button type="submit" className="btn-pill btn-ink h-11 px-4" aria-label="Subscribe">
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Link columns */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            {columns.map(col => (
              <div key={col.title}>
                <p className="mb-4 text-sm font-semibold text-cv-ink">{col.title}</p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map(l => (
                    <li key={l.label}>
                      <button
                        onClick={() => navigate(l.page)}
                        className="text-sm text-cv-muted transition-colors hover:text-cv-ink"
                      >
                        {l.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Status + social */}
          <div className="md:col-span-3 flex flex-col gap-4 md:items-end">
            <div className="chip">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              All systems operational
            </div>
            <div className="flex items-center gap-2">
              {[
                { Icon: Github, label: 'GitHub' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Twitter, label: 'Twitter' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  onClick={e => e.preventDefault()}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cv-line text-cv-muted transition-colors hover:bg-cv-panel hover:text-cv-ink"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cv-line pt-6 text-xs text-cv-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Engineered in {site.location}.</p>
          <p>{site.email}</p>
        </div>
      </div>
    </footer>
  )
}
