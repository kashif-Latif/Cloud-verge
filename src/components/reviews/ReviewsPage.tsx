'use client'

import { useState } from 'react'
import { Star, Send } from 'lucide-react'
import { toast } from 'sonner'
import { reviews } from '@/lib/content'
import { SectionChip, SectionHead, Stars, InitialsAvatar, AuroraField } from '@/components/shared/atoms'
import { cn } from '@/lib/utils'

export default function ReviewsPage() {
  const [form, setForm] = useState({ clientName: '', company: '', content: '' })
  const [rating, setRating] = useState(5)
  const [submitting, setSubmitting] = useState(false)

  const avg = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.clientName.trim() || !form.content.trim()) {
      toast.error('Please add your name and your review.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating }),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      toast.success('Review submitted — it will appear after verification.')
      setForm({ clientName: '', company: '', content: '' })
      setRating(5)
    } catch {
      toast.error('Could not submit right now. Please try again, or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-[68px]">
      {/* Hero */}
      <section className="container-cv pt-14 md:pt-24 pb-12 md:pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 flex flex-col items-start gap-6">
            <SectionChip>Reviews</SectionChip>
            <h1 className="text-display text-cv-ink text-balance">
              Clients keep the receipts
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pt-16 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-semibold tracking-tight text-cv-ink">{avg}</span>
              <div>
                <Stars count={5} />
                <p className="mt-1 text-xs text-cv-muted">{reviews.length} client reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="container-cv pb-20 md:pb-28">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map(r => (
            <figure key={r.name} className="card-cv mirror-glint flex flex-col gap-4 p-6">
              <Stars count={r.rating} />
              <blockquote className="text-sm leading-relaxed text-cv-ink">“{r.text}”</blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-2">
                <InitialsAvatar name={r.name} size="sm" />
                <div>
                  <p className="text-sm font-semibold text-cv-ink">{r.name}</p>
                  <p className="text-xs text-cv-muted">{r.role}, {r.company}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Submit form on aurora glass */}
      <section className="container-cv pb-24 md:pb-36">
        <div className="relative overflow-hidden rounded-3xl border border-cv-line bg-cv-panel p-6 sm:p-10">
          <AuroraField dim />
          <div className="relative z-10 mx-auto max-w-2xl">
            <SectionHead
              chip="Worked with us?"
              title="Leave a review"
              lead="Tell us what we built together and how it went — reviews are checked before they appear."
              align="center"
            />
            <form onSubmit={submit} className="glass-strong mirror-sheen flex flex-col gap-4 rounded-3xl p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rv-name" className="text-xs font-medium text-cv-ink">Your name</label>
                  <input
                    id="rv-name"
                    value={form.clientName}
                    onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))}
                    className="h-11 rounded-2xl border border-cv-line bg-background/80 px-4 text-sm text-cv-ink focus:outline-none focus:ring-2 focus:ring-cv-ink/20"
                    placeholder="Ahmed Raza"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rv-company" className="text-xs font-medium text-cv-ink">Company (optional)</label>
                  <input
                    id="rv-company"
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    className="h-11 rounded-2xl border border-cv-line bg-background/80 px-4 text-sm text-cv-ink focus:outline-none focus:ring-2 focus:ring-cv-ink/20"
                    placeholder="TechStart Pvt Ltd"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-cv-ink">Rating</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(i + 1)}
                      aria-label={`${i + 1} star${i ? 's' : ''}`}
                      className="p-0.5"
                    >
                      <Star
                        className={cn(
                          'h-6 w-6 transition-colors',
                          i < rating ? 'fill-amber-400 text-amber-400' : 'text-cv-line',
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="rv-content" className="text-xs font-medium text-cv-ink">Your review</label>
                <textarea
                  id="rv-content"
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  rows={4}
                  className="rounded-2xl border border-cv-line bg-background/80 p-4 text-sm text-cv-ink focus:outline-none focus:ring-2 focus:ring-cv-ink/20"
                  placeholder="What did we build, and how did it go?"
                />
              </div>

              <button type="submit" disabled={submitting} className="btn-pill btn-ink w-fit disabled:opacity-60">
                {submitting ? 'Submitting…' : 'Submit review'}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
