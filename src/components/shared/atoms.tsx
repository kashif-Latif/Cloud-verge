'use client'

import { ReactNode } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Small pill label used above sections (Auralis-style chip, not caps eyebrow) */
export function SectionChip({ children }: { children: ReactNode }) {
  return <span className="chip">{children}</span>
}

/* Standard section header block: chip + big heading + optional lead, split layout */
export function SectionHead({
  chip,
  title,
  lead,
  align = 'split',
}: {
  chip?: string
  title: ReactNode
  lead?: string
  align?: 'split' | 'center' | 'left'
}) {
  if (align === 'center') {
    return (
      <div className="mx-auto max-w-3xl text-center flex flex-col items-center gap-5 mb-14 md:mb-20">
        {chip && <SectionChip>{chip}</SectionChip>}
        <h2 className="text-h2 text-cv-ink text-balance">{title}</h2>
        {lead && <p className="text-lead max-w-2xl">{lead}</p>}
      </div>
    )
  }
  if (align === 'left') {
    return (
      <div className="max-w-2xl flex flex-col items-start gap-5 mb-14 md:mb-20">
        {chip && <SectionChip>{chip}</SectionChip>}
        <h2 className="text-h2 text-cv-ink text-balance">{title}</h2>
        {lead && <p className="text-lead">{lead}</p>}
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-14 md:mb-20">
      <div className="lg:col-span-7 flex flex-col items-start gap-5">
        {chip && <SectionChip>{chip}</SectionChip>}
        <h2 className="text-h2 text-cv-ink text-balance">{title}</h2>
      </div>
      {lead && (
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="text-lead">{lead}</p>
        </div>
      )}
    </div>
  )
}

/* The aurora: soft drifting gradient orbs, absolutely positioned in a relative parent */
export function AuroraField({ className, dim = false }: { className?: string; dim?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        'absolute inset-0 overflow-hidden pointer-events-none',
        dim && 'opacity-60',
        className,
      )}
    >
      <div className="orb orb-violet orb-anim-a w-[340px] h-[340px] left-1/2 top-1/2 -translate-x-[75%] -translate-y-[60%]" />
      <div className="orb orb-sky orb-anim-b w-[380px] h-[380px] left-1/2 top-1/2 -translate-x-[15%] -translate-y-[45%]" />
      <div className="orb orb-rose orb-anim-b w-[260px] h-[260px] left-1/2 top-1/2 -translate-x-[110%] -translate-y-[10%]" />
      <div className="orb orb-mint orb-anim-a w-[280px] h-[280px] left-1/2 top-1/2 translate-x-[25%] -translate-y-[0%]" />
    </div>
  )
}

/* Star rating row */
export function Stars({ count, className }: { count: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-0.5', className)} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < count ? 'fill-amber-400 text-amber-400' : 'text-cv-line fill-cv-line',
          )}
        />
      ))}
    </div>
  )
}

/* Rounded tinted square holding an icon */
export function TintIcon({
  tint,
  children,
  className,
}: {
  tint: 'violet' | 'mint' | 'sky' | 'peach'
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex h-12 w-12 items-center justify-center rounded-2xl text-cv-ink',
        `tint-${tint}`,
        className,
      )}
    >
      {children}
    </div>
  )
}

/* Initials avatar with a soft gradient — no external images needed */
const avatarGradients = [
  'from-indigo-300 to-purple-300',
  'from-sky-300 to-blue-300',
  'from-rose-300 to-orange-200',
  'from-emerald-300 to-teal-200',
]

export function InitialsAvatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('')
  const g = avatarGradients[(name.charCodeAt(0) + name.length) % avatarGradients.length]
  const sizes = { sm: 'h-9 w-9 text-xs', md: 'h-11 w-11 text-sm', lg: 'h-20 w-20 text-xl' }
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white shrink-0',
        g,
        sizes[size],
      )}
      aria-hidden
    >
      {initials}
    </div>
  )
}
