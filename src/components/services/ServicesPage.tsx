'use client'

import { useState } from 'react'
import {
  ArrowUpRight, Check, Server, Globe, Container, Layout, Bot, Smartphone,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { services, processSteps, techStack } from '@/lib/content'
import { SectionChip, SectionHead, TintIcon } from '@/components/shared/atoms'
import { cn } from '@/lib/utils'

const iconMap = { Server, Globe, Container, Layout, Bot, Smartphone } as const

export default function ServicesPage() {
  const { navigate } = useAppStore()
  const stackKeys = Object.keys(techStack) as (keyof typeof techStack)[]
  const [activeStack, setActiveStack] = useState<keyof typeof techStack>(stackKeys[0])

  return (
    <div className="pt-[68px]">
      {/* Hero */}
      <section className="container-cv pt-14 md:pt-24 pb-16 md:pb-28">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 flex flex-col items-start gap-6">
            <SectionChip>Services</SectionChip>
            <h1 className="text-display text-cv-ink text-balance">
              Everything a serious product needs
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pt-16">
            <p className="text-lead">
              Six disciplines under one roof — so your backend, frontend,
              infrastructure, and automation are designed to work together
              instead of merely coexisting.
            </p>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="container-cv pb-20 md:pb-32">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {services.map(s => {
            const Icon = iconMap[s.icon as keyof typeof iconMap]
            return (
              <article key={s.slug} className="card-cv mirror-glint flex flex-col overflow-hidden">
                <div className={cn('flex items-center gap-4 p-6 sm:p-7', `tint-${s.tint}`)}>
                  <TintIcon tint={s.tint} className="bg-white/60 dark:bg-white/10">
                    <Icon className="h-5 w-5" />
                  </TintIcon>
                  <h2 className="text-h3 text-cv-ink">{s.title}</h2>
                </div>
                <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
                  <p className="text-sm leading-relaxed text-cv-muted sm:text-base">{s.long}</p>
                  <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {s.points.map(pt => (
                      <li key={pt} className="flex items-start gap-2 text-sm text-cv-ink">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate('contact')}
                    className="btn-pill btn-ghost-pill mt-auto w-fit px-5 py-2.5"
                  >
                    Discuss this service <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Process — a real sequence, so numbering earns its place */}
      <section className="container-cv pb-20 md:pb-32">
        <SectionHead
          chip="How projects run"
          title="Five steps from idea to production"
          lead="The same disciplined path on every engagement — you always know exactly where the project stands."
        />
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, i) => (
            <li key={step.title} className="card-cv relative flex flex-col gap-3 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cv-ink text-sm font-semibold text-background">
                {i + 1}
              </span>
              <h3 className="text-base font-semibold text-cv-ink">{step.title}</h3>
              <p className="text-sm leading-relaxed text-cv-muted">{step.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Tech stack */}
      <section className="container-cv pb-24 md:pb-36">
        <div className="relative overflow-hidden rounded-3xl border border-cv-line bg-cv-panel p-6 sm:p-10">
          <SectionHead
            chip="Tooling"
            title="The stack we trust in production"
            align="left"
          />
          <div className="glass mirror-sheen inline-flex max-w-full flex-wrap gap-1 rounded-full p-1">
            {stackKeys.map(key => (
              <button
                key={key}
                onClick={() => setActiveStack(key)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  activeStack === key
                    ? 'bg-cv-ink text-background'
                    : 'text-cv-muted hover:text-cv-ink',
                )}
              >
                {key}
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {techStack[activeStack].map(tool => (
              <span key={tool} className="chip bg-white/70 px-4 py-2 text-sm dark:bg-white/5">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
