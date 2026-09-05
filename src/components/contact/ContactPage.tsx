'use client'

import { useState } from 'react'
import { Mail, MapPin, Clock, Send } from 'lucide-react'
import { toast } from 'sonner'
import { site } from '@/lib/content'
import { SectionChip, AuroraField } from '@/components/shared/atoms'

const budgets = ['Under $1k', '$1k – $5k', '$5k – $15k', '$15k+', 'Not sure yet']

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', budget: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    if (!form.name.trim() || !emailOk || !form.subject.trim() || !form.message.trim()) {
      toast.error('Please fill your name, a valid email, subject, and message.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      toast.success('Message sent — we reply within one business day.')
      setForm({ name: '', email: '', subject: '', budget: '', message: '' })
    } catch {
      toast.error(`Could not send right now. Please email us directly at ${site.email}.`)
    } finally {
      setSubmitting(false)
    }
  }

  const inputCls =
    'h-11 w-full rounded-2xl border border-cv-line bg-background/80 px-4 text-sm text-cv-ink placeholder:text-cv-muted focus:outline-none focus:ring-2 focus:ring-cv-ink/20'

  return (
    <div className="pt-[68px]">
      {/* Hero */}
      <section className="container-cv pt-14 md:pt-24 pb-12 md:pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 flex flex-col items-start gap-6">
            <SectionChip>Contact</SectionChip>
            <h1 className="text-display text-cv-ink text-balance">
              Tell us what you’re building
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pt-16">
            <p className="text-lead">
              Share the problem, the deadline, and the budget range — we reply
              within one business day with an honest read on all three.
            </p>
          </div>
        </div>
      </section>

      {/* Form panel */}
      <section className="container-cv pb-24 md:pb-36">
        <div className="relative overflow-hidden rounded-3xl border border-cv-line bg-cv-panel p-4 sm:p-8 lg:p-12">
          <AuroraField dim />
          <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Info cards */}
            <div className="flex flex-col gap-4 lg:col-span-4">
              {[
                { Icon: Mail, title: 'Email', value: site.email },
                { Icon: MapPin, title: 'Office', value: site.location },
                { Icon: Clock, title: 'Response time', value: 'Within 1 business day' },
              ].map(({ Icon, title, value }) => (
                <div key={title} className="glass mirror-sheen flex items-center gap-4 rounded-3xl p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/60 text-cv-ink dark:bg-white/10">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-cv-muted">{title}</p>
                    <p className="text-sm font-semibold text-cv-ink">{value}</p>
                  </div>
                </div>
              ))}
              <div className="glass mirror-sheen rounded-3xl p-5">
                <p className="text-sm leading-relaxed text-cv-muted">
                  Prefer email? Send the brief straight to{' '}
                  <span className="font-medium text-cv-ink">{site.email}</span>{' '}
                  — attachments welcome.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="glass-strong mirror-sheen flex flex-col gap-4 rounded-3xl p-6 sm:p-8 lg:col-span-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ct-name" className="text-xs font-medium text-cv-ink">Name</label>
                  <input id="ct-name" value={form.name} onChange={set('name')} className={inputCls} placeholder="Your name" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ct-email" className="text-xs font-medium text-cv-ink">Email</label>
                  <input id="ct-email" type="email" value={form.email} onChange={set('email')} className={inputCls} placeholder="you@company.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ct-subject" className="text-xs font-medium text-cv-ink">Subject</label>
                  <input id="ct-subject" value={form.subject} onChange={set('subject')} className={inputCls} placeholder="e.g. E-commerce backend rebuild" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ct-budget" className="text-xs font-medium text-cv-ink">Budget range (optional)</label>
                  <select id="ct-budget" value={form.budget} onChange={set('budget')} className={inputCls}>
                    <option value="">Select a range</option>
                    {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="ct-message" className="text-xs font-medium text-cv-ink">Project details</label>
                <textarea
                  id="ct-message"
                  value={form.message}
                  onChange={set('message')}
                  rows={6}
                  className="w-full rounded-2xl border border-cv-line bg-background/80 p-4 text-sm text-cv-ink placeholder:text-cv-muted focus:outline-none focus:ring-2 focus:ring-cv-ink/20"
                  placeholder="What are you building, what already exists, and when does it need to ship?"
                />
              </div>

              <button type="submit" disabled={submitting} className="btn-pill btn-ink w-fit disabled:opacity-60">
                {submitting ? 'Sending…' : 'Send message'}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
