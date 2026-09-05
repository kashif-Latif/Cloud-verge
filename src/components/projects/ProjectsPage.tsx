'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { projects } from '@/lib/content'
import { SectionChip } from '@/components/shared/atoms'
import { cn } from '@/lib/utils'

const categories = ['All', 'Backend', 'Web', 'Automation', 'Mobile'] as const

export default function ProjectsPage() {
  const { navigate } = useAppStore()
  const [filter, setFilter] = useState<(typeof categories)[number]>('All')

  const visible = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <div className="pt-[68px]">
      {/* Hero */}
      <section className="container-cv pt-14 md:pt-24 pb-12 md:pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 flex flex-col items-start gap-6">
            <SectionChip>Projects</SectionChip>
            <h1 className="text-display text-cv-ink text-balance">
              Work measured in numbers
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pt-16">
            <p className="text-lead">
              Every project below is in production today. The metric on each
              card is the one the client actually cares about.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="container-cv pb-8">
        <div className="glass mirror-sheen inline-flex max-w-full flex-wrap gap-1 rounded-full p-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                filter === cat ? 'bg-cv-ink text-background' : 'text-cv-muted hover:text-cv-ink',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="container-cv pb-24 md:pb-36">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map(p => (
            <article
              key={p.name}
              className="card-cv mirror-glint group flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={cn('relative h-40 overflow-hidden', `tint-${p.tint}`)}>
                <div className="absolute inset-x-5 -bottom-6 rounded-t-2xl border border-white/50 bg-white/60 p-3.5 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1.5 dark:border-white/10 dark:bg-white/5">
                  <p className="text-[11px] font-medium text-cv-muted">{p.category}</p>
                  <p className="mt-0.5 text-sm font-semibold text-cv-ink">{p.impact}</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div>
                  <h2 className="text-base font-semibold text-cv-ink">{p.name}</h2>
                  <p className="text-sm text-cv-muted">{p.tagline}</p>
                </div>
                <p className="text-sm leading-relaxed text-cv-muted">{p.desc}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {p.tech.map(t => (
                    <span key={t} className="chip px-2.5 py-1 text-[10px]">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="py-16 text-center text-sm text-cv-muted">
            No projects in this category yet.
          </p>
        )}

        <div className="mt-14 flex flex-col items-center gap-5 text-center">
          <h2 className="text-h3 text-cv-ink">Have a system like these in mind?</h2>
          <button onClick={() => navigate('contact')} className="btn-pill btn-ink">
            Tell us about it <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  )
}
