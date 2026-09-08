'use client'

import { ArrowUpRight } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { site, values, timeline, team, stats } from '@/lib/content'
import { SectionChip, SectionHead, InitialsAvatar, AuroraField } from '@/components/shared/atoms'

export default function AboutPage() {
  const { navigate } = useAppStore()

  return (
    <div className="pt-[68px]">
      {/* Hero */}
      <section className="container-cv pt-14 md:pt-24 pb-16 md:pb-28">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 flex flex-col items-start gap-6">
            <SectionChip>About {site.name}</SectionChip>
            <h1 className="text-display text-cv-ink text-balance">
              An engineering team, not a vendor
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pt-16">
            <p className="text-lead">
              {site.name} started in {site.location} with one conviction: most
              software fails at scale because it was never designed for it. We
              build the other kind.
            </p>
          </div>
        </div>
      </section>

      {/* Story panel */}
      <section className="container-cv pb-20 md:pb-32">
        <div className="relative overflow-hidden rounded-3xl border border-cv-line bg-cv-panel p-6 sm:p-10 lg:p-14">
          <AuroraField dim />

          {/* The workspace — HD photo with a literal mirror reflection */}
          <div className="relative z-10 mb-10">
            <div className="mirror-sheen glass overflow-hidden rounded-3xl p-2">
              <img
                src="/images/team-office.jpg"
                alt="The CloudVerge engineering team at work in the Lahore office"
                className="h-64 w-full rounded-2xl object-cover sm:h-80 lg:h-[420px]"
              />
            </div>
            <div aria-hidden className="reflect-floor -mt-1 hidden h-24 overflow-hidden rounded-b-3xl sm:block">
              <img
                src="/images/team-office.jpg"
                alt=""
                className="h-24 w-full rounded-2xl object-cover object-bottom"
              />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="glass mirror-sheen rounded-3xl p-6 sm:p-8">
              <h2 className="text-h3 text-cv-ink">Where we came from</h2>
              <p className="mt-4 text-sm leading-relaxed text-cv-muted sm:text-base">
                We began as a two-person backend consultancy rescuing slow APIs
                for local startups. Word spread the way it does when response
                times drop from seconds to milliseconds. Three years later we
                are a full engineering team shipping backends, web platforms,
                mobile apps, and automation — with the same obsession we
                started with.
              </p>
            </div>
            <div className="glass mirror-sheen rounded-3xl p-6 sm:p-8">
              <h2 className="text-h3 text-cv-ink">How we work</h2>
              <p className="mt-4 text-sm leading-relaxed text-cv-muted sm:text-base">
                Architecture before code. Weekly demos, not monthly surprises.
                A staging link you can open any day of the project. And when
                something breaks at 3am — because eventually something always
                does — we are the ones answering, not a ticket queue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-cv pb-20 md:pb-32">
        <SectionHead
          chip="What we stand on"
          title="Five principles behind every commit"
          lead="These are not poster slogans — they are the checklist every release passes before it ships."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="card-cv mirror-glint flex flex-col gap-3 p-6"
            >
              <span className="text-sm font-semibold text-cv-muted">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-base font-semibold text-cv-ink">{v.title}</h3>
              <p className="text-sm leading-relaxed text-cv-muted">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="container-cv pb-20 md:pb-32">
        <SectionHead chip="The journey" title="Four years of shipping" align="left" />
        <ol className="relative flex flex-col gap-8 border-l border-cv-line pl-8">
          {timeline.map(t => (
            <li key={t.year} className="relative">
              <span className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-2 border-background bg-cv-ink" />
              <p className="text-sm font-semibold text-cv-muted">{t.year}</p>
              <h3 className="mt-1 text-lg font-semibold text-cv-ink">{t.title}</h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-cv-muted">{t.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Team */}
      <section className="container-cv pb-20 md:pb-32">
        <SectionHead
          chip="The people"
          title="The team behind the uptime"
          lead={`${stats[2].value} engineers and operators building from ${site.location} for clients everywhere.`}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map(m => (
            <div key={m.name} className="card-cv mirror-glint flex items-center gap-4 p-5">
              <InitialsAvatar name={m.name} size="lg" />
              <div>
                <p className="text-sm font-semibold text-cv-ink">{m.name}</p>
                <p className="mt-0.5 text-xs text-cv-muted">{m.title}</p>
                <span className="chip mt-2 px-2.5 py-1 text-[10px]">{m.dept}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-cv pb-24 md:pb-36">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
          <h2 className="text-h2 text-cv-ink text-balance">Want to build with this team?</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => navigate('contact')} className="btn-pill btn-ink">
              Start a conversation <ArrowUpRight className="h-4 w-4" />
            </button>
            <button onClick={() => navigate('careers')} className="btn-pill btn-ghost-pill">
              Join the team
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
