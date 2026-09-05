'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, Minus } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { pricingTiers, pricingMatrix, pricingFaqs } from '@/lib/content'
import { SectionChip, SectionHead } from '@/components/shared/atoms'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

export default function PricingPage() {
  const { navigate } = useAppStore()
  const [yearly, setYearly] = useState(false)

  return (
    <div className="pt-[68px]">
      {/* Hero */}
      <section className="container-cv pt-14 md:pt-24 pb-12 md:pb-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <SectionChip>Pricing</SectionChip>
          <h1 className="text-display text-cv-ink text-balance">
            Plans that scale with the load
          </h1>
          <p className="text-lead max-w-xl">
            Transparent monthly engineering plans. No lock-in, cancel any
            month, and the code is yours from day one.
          </p>

          {/* Billing toggle */}
          <div className="glass mirror-sheen mt-2 inline-flex items-center rounded-full p-1">
            <button
              onClick={() => setYearly(false)}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-medium transition-colors',
                !yearly ? 'bg-cv-ink text-background' : 'text-cv-muted hover:text-cv-ink',
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn(
                'flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors',
                yearly ? 'bg-cv-ink text-background' : 'text-cv-muted hover:text-cv-ink',
              )}
            >
              Yearly
              <span className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                yearly ? 'bg-background/20 text-background' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
              )}>
                −10%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Tier cards */}
      <section className="container-cv pb-20 md:pb-28">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {pricingTiers.map(tier => (
            <div
              key={tier.name}
              className={cn(
                'relative flex flex-col gap-6 rounded-3xl p-7 sm:p-8',
                tier.highlighted
                  ? 'bg-cv-ink text-background shadow-xl'
                  : 'card-cv mirror-glint',
              )}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 px-3.5 py-1 text-[11px] font-semibold text-white">
                  Most popular
                </span>
              )}
              <div>
                <h2 className={cn('text-lg font-semibold', tier.highlighted ? 'text-background' : 'text-cv-ink')}>
                  {tier.name}
                </h2>
                <p className={cn('mt-1 text-sm', tier.highlighted ? 'text-background/70' : 'text-cv-muted')}>
                  {tier.tagline}
                </p>
              </div>
              <div className="flex items-end gap-1.5">
                <span className={cn('text-5xl font-semibold tracking-tight', tier.highlighted ? 'text-background' : 'text-cv-ink')}>
                  ${yearly ? tier.yearly : tier.monthly}
                </span>
                <span className={cn('pb-1.5 text-sm', tier.highlighted ? 'text-background/70' : 'text-cv-muted')}>
                  /month{yearly ? ', billed yearly' : ''}
                </span>
              </div>
              <ul className="flex flex-col gap-2.5">
                {tier.features.map(f => (
                  <li key={f} className={cn('flex items-start gap-2 text-sm', tier.highlighted ? 'text-background/90' : 'text-cv-ink')}>
                    <Check className={cn('mt-0.5 h-4 w-4 shrink-0', tier.highlighted ? 'text-emerald-300' : 'text-emerald-500')} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('contact')}
                className={cn(
                  'btn-pill mt-auto w-full',
                  tier.highlighted
                    ? 'bg-background text-cv-ink hover:opacity-90'
                    : 'btn-ink',
                )}
              >
                Get started <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison matrix */}
      <section className="container-cv pb-20 md:pb-28">
        <SectionHead chip="Full comparison" title="Every plan, side by side" align="left" />
        <div className="card-cv overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-cv-line">
                <th className="p-5 font-medium text-cv-muted">Feature</th>
                {pricingTiers.map(t => (
                  <th key={t.name} className="p-5 font-semibold text-cv-ink">{t.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingMatrix.map(row => (
                <tr key={row.name} className="border-b border-cv-line last:border-0">
                  <td className="p-5 text-cv-ink">{row.name}</td>
                  {(['starter', 'professional', 'enterprise'] as const).map(k => {
                    const v = row[k]
                    return (
                      <td key={k} className="p-5">
                        {typeof v === 'boolean' ? (
                          v ? (
                            <Check className="h-4 w-4 text-emerald-500" aria-label="Included" />
                          ) : (
                            <Minus className="h-4 w-4 text-cv-line" aria-label="Not included" />
                          )
                        ) : (
                          <span className="text-cv-muted">{v}</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQs */}
      <section className="container-cv pb-24 md:pb-36">
        <div className="mx-auto max-w-2xl">
          <SectionHead chip="Questions" title="Before you ask" align="center" />
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {pricingFaqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="card-cv border-b-0 px-6"
              >
                <AccordionTrigger className="py-5 text-left text-sm font-semibold text-cv-ink hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-cv-muted">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}
