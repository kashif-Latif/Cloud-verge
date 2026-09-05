'use client'

import { ArrowUpRight, MapPin, Briefcase } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { jobs, perks, site } from '@/lib/content'
import { SectionChip, SectionHead, AuroraField } from '@/components/shared/atoms'

export default function CareersPage() {
  const { navigate } = useAppStore()

  return (
    <div className="pt-[68px]">
      {/* Hero */}
      <section className="container-cv pt-14 md:pt-24 pb-12 md:pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 flex flex-col items-start gap-6">
            <SectionChip>Careers</SectionChip>
            <h1 className="text-display text-cv-ink text-balance">
              Do the best work of your career
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pt-16">
            <p className="text-lead">
              Small team, real ownership, and systems with actual users. If
              you care about craft more than titles, you will fit right in.
            </p>
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="container-cv pb-20 md:pb-28">
        <SectionHead
          chip="Open roles"
          title={`${jobs.length} positions open right now`}
          lead="Every application gets a human reply — usually within three days."
        />
        <div className="flex flex-col gap-3">
          {jobs.map(job => (
            <div
              key={job.title}
              className="card-cv mirror-glint flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-semibold text-cv-ink">{job.title}</h2>
                <p className="max-w-xl text-sm leading-relaxed text-cv-muted">{job.desc}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="chip px-2.5 py-1 text-[11px]">
                    <Briefcase className="h-3 w-3" /> {job.type}
                  </span>
                  <span className="chip px-2.5 py-1 text-[11px]">
                    <MapPin className="h-3 w-3" /> {job.mode}
                  </span>
                  <span className="chip px-2.5 py-1 text-[11px]">{job.dept}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('contact')}
                className="btn-pill btn-ink w-fit shrink-0"
              >
                Apply <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Perks */}
      <section className="container-cv pb-24 md:pb-36">
        <div className="relative overflow-hidden rounded-3xl border border-cv-line bg-cv-panel p-6 sm:p-10">
          <AuroraField dim />
          <div className="relative z-10">
            <SectionHead chip="Why join" title="What working here comes with" align="left" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {perks.map(p => (
                <div key={p.title} className="glass mirror-sheen rounded-3xl p-6">
                  <h3 className="text-sm font-semibold text-cv-ink">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cv-muted">{p.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-cv-muted">
              Don’t see your role? Pitch us anyway at{' '}
              <span className="font-medium text-cv-ink">{site.email}</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
