'use client'

import { useState } from 'react'
import {
  ArrowRight, ArrowUpRight, Server, Globe, Container, Layout, Bot, Smartphone,
  Activity, Gauge, Rocket,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import {
  site, services, stats, projects, reviews, trustedBy, heroTabs, heroPills,
} from '@/lib/content'
import { SectionHead, TintIcon, Stars, InitialsAvatar, AuroraField } from '@/components/shared/atoms'
import { cn } from '@/lib/utils'

const iconMap = { Server, Globe, Container, Layout, Bot, Smartphone } as const

/* ------------------------------------------------------------------ */
/* Hero showcase panel: aurora orbs + floating glass metrics card.     */
/* `mirror` renders the cheap static copy used for the floor           */
/* reflection (no animation, no backdrop-filter — GPU friendly).       */
/* ------------------------------------------------------------------ */
function ShowcaseScene({ mirror = false }: { mirror?: boolean }) {
  return (
    <div className="relative h-full w-full">
      {/* aurora */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className={cn('orb orb-violet w-[300px] h-[300px] left-[8%] top-[12%]', !mirror && 'orb-anim-a')} />
        <div className={cn('orb orb-sky w-[360px] h-[360px] left-[38%] top-[4%]', !mirror && 'orb-anim-b')} />
        <div className={cn('orb orb-rose w-[240px] h-[240px] left-[2%] top-[46%]', !mirror && 'orb-anim-b')} />
        <div className={cn('orb orb-mint w-[280px] h-[280px] right-[6%] top-[38%]', !mirror && 'orb-anim-a')} />
      </div>

      {/* floating glass metrics card */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={cn(
            'w-full max-w-[400px] rounded-3xl p-5 sm:p-6',
            mirror
              ? 'border border-white/40 bg-white/45 dark:border-white/10 dark:bg-white/5'
              : 'glass-strong mirror-sheen',
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-cv-muted">Production · live</span>
            </div>
            <span className="text-xs font-medium text-cv-muted">cloudverge.dev</span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { Icon: Gauge, value: '87ms', label: 'p95 response' },
              { Icon: Activity, value: '99.9%', label: 'uptime' },
              { Icon: Rocket, value: '212', label: 'deploys / mo' },
            ].map(m => (
              <div key={m.label} className="rounded-2xl bg-white/55 p-3 dark:bg-white/5">
                <m.Icon className="h-4 w-4 text-cv-muted" />
                <p className="mt-2 text-xl font-semibold tracking-tight text-cv-ink">{m.value}</p>
                <p className="text-[11px] text-cv-muted">{m.label}</p>
              </div>
            ))}
          </div>

          {/* faux waveform */}
          <div className="mt-5 flex h-12 items-end gap-[3px]" aria-hidden>
            {[38, 62, 45, 80, 55, 90, 48, 70, 40, 84, 58, 66, 44, 76, 52, 88, 46, 60, 42, 72, 50, 82, 56, 64].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%` }}
                className="w-full rounded-full bg-gradient-to-t from-indigo-400/70 to-sky-400/70"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const { navigate } = useAppStore()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="pt-[68px]">
      {/* ============================ HERO ============================ */}
      <section className="container-cv pt-14 md:pt-24 pb-16 md:pb-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8">
            <h1 className="rise-1 text-display text-cv-ink text-balance">
              Software that holds under pressure
            </h1>
            <div className="rise-3 mt-8 flex flex-wrap items-center gap-3">
              <button onClick={() => navigate('contact')} className="btn-pill btn-ink">
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button onClick={() => navigate('projects')} className="btn-pill btn-ghost-pill">
                See our work
              </button>
            </div>
          </div>
          <div className="rise-2 lg:col-span-4 lg:pt-3">
            <p className="text-lead">
              {site.name} engineers high-throughput backends, scalable web
              platforms, and automation for companies that cannot afford
              downtime — from first commit to 3am incident response.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== AURORA SHOWCASE PANEL ==================== */}
      <section className="container-cv pb-24 md:pb-36">
        <div className="rise-4 relative">
          <div className="card-cv relative overflow-hidden rounded-3xl bg-cv-panel">
            {/* top controls */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 p-4 sm:p-6">
              <div className="glass mirror-sheen flex rounded-full p-1">
                {heroTabs.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={cn(
                      'rounded-full px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors',
                      activeTab === i
                        ? 'bg-cv-ink text-background shadow-sm'
                        : 'text-cv-muted hover:text-cv-ink',
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="chip bg-white/60 dark:bg-white/5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Systems online
              </div>
            </div>

            {/* scene */}
            <div className="relative z-10 h-[340px] sm:h-[400px]">
              <ShowcaseScene />
            </div>

            {/* mirror floor — reflected copy fading into the panel */}
            <div aria-hidden className="reflect-floor relative z-0 -mt-2 hidden h-[150px] sm:block">
              <div className="h-[400px]">
                <ShowcaseScene mirror />
              </div>
            </div>

            {/* bottom glass toolbar */}
            <div className="relative z-10 p-4 sm:p-6">
              <div className="glass mirror-sheen flex flex-wrap items-center justify-between gap-3 rounded-2xl p-3 sm:p-4">
                <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
                  {heroPills.map(pill => (
                    <span key={pill} className="chip whitespace-nowrap bg-white/60 dark:bg-white/5">
                      {pill}
                    </span>
                  ))}
                </div>
                <button onClick={() => navigate('services')} className="btn-pill btn-ink px-5 py-2.5">
                  Explore services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== TRUSTED MARQUEE ======================== */}
      <section className="border-y border-cv-line bg-cv-card py-10">
        <p className="mb-6 text-center text-xs font-medium tracking-wide text-cv-muted">
          Trusted by teams shipping real products
        </p>
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track gap-14 px-7">
            {[...trustedBy, ...trustedBy].map((brand, i) => (
              <span
                key={`${brand}-${i}`}
                className="whitespace-nowrap text-lg font-semibold tracking-tight text-cv-muted/70"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== SERVICES ========================== */}
      <section className="container-cv section-cv">
        <SectionHead
          chip="What we build"
          title="Six disciplines, one engineering standard"
          lead="Every service runs through the same pipeline: architecture first, performance budgets enforced, security reviewed before launch."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(s => {
            const Icon = iconMap[s.icon as keyof typeof iconMap]
            return (
              <button
                key={s.slug}
                onClick={() => navigate('services')}
                className="card-cv mirror-glint group flex flex-col items-start gap-4 p-6 text-left transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <TintIcon tint={s.tint}>
                  <Icon className="h-5 w-5" />
                </TintIcon>
                <div>
                  <h3 className="text-base font-semibold text-cv-ink">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cv-muted">{s.short}</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-cv-ink opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ============================ STATS ============================ */}
      <section className="container-cv pb-20 md:pb-32">
        <div className="card-cv grid grid-cols-2 divide-cv-line rounded-3xl bg-cv-panel sm:grid-cols-4 sm:divide-x">
          {stats.map(s => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-4 py-8 text-center sm:py-10">
              <span className="text-4xl font-semibold tracking-tight text-cv-ink sm:text-5xl">
                {s.value}
              </span>
              <span className="text-sm text-cv-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ======================= FEATURED PROJECTS ======================= */}
      <section className="container-cv pb-20 md:pb-32">
        <SectionHead
          chip="Selected work"
          title="Built, shipped, and still running"
          lead="A few of the systems currently in production. Every one is measured by the numbers it delivers, not the pixels it shows."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.slice(0, 4).map(p => (
            <button
              key={p.name}
              onClick={() => navigate('projects')}
              className="card-cv mirror-glint group overflow-hidden text-left transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={cn('relative h-44 overflow-hidden', `tint-${p.tint}`)}>
                <div className="absolute inset-x-6 -bottom-8 rounded-t-2xl border border-white/50 bg-white/60 p-4 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-2 dark:border-white/10 dark:bg-white/5">
                  <p className="text-xs font-medium text-cv-muted">{p.category}</p>
                  <p className="mt-1 text-sm font-semibold text-cv-ink">{p.impact}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-cv-ink">{p.name}</h3>
                  <ArrowUpRight className="h-4 w-4 text-cv-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="mt-1 text-sm text-cv-muted">{p.tagline}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ========================= TESTIMONIALS ========================= */}
      <section className="container-cv pb-20 md:pb-32">
        <div className="relative overflow-hidden rounded-3xl border border-cv-line bg-cv-panel p-6 sm:p-10">
          <AuroraField dim />
          <div className="relative z-10">
            <SectionHead
              chip="Client reviews"
              title="What it feels like to work with us"
              align="left"
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {reviews.slice(0, 2).map(r => (
                <figure key={r.name} className="glass mirror-sheen rounded-3xl p-6 sm:p-7">
                  <Stars count={r.rating} />
                  <blockquote className="mt-4 text-base leading-relaxed text-cv-ink">
                    “{r.text}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <InitialsAvatar name={r.name} size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-cv-ink">{r.name}</p>
                      <p className="text-xs text-cv-muted">{r.role}, {r.company}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
            <button
              onClick={() => navigate('reviews')}
              className="btn-pill btn-ghost-pill mt-6 bg-white/50 dark:bg-white/5"
            >
              Read all reviews
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================= CTA ============================= */}
      <section className="container-cv pb-24 md:pb-36">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
          <h2 className="text-h2 text-cv-ink text-balance">
            Ready to build something that doesn’t break?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => navigate('contact')} className="btn-pill btn-ink">
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button onClick={() => navigate('pricing')} className="btn-pill btn-ghost-pill">
              View pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
