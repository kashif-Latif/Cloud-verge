'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Search } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { blogPosts } from '@/lib/content'
import { SectionChip, InitialsAvatar } from '@/components/shared/atoms'
import { cn } from '@/lib/utils'

const categories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))]

export default function BlogPage() {
  const { navigate } = useAppStore()
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('All')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return blogPosts.filter(p => {
      const matchesCat = cat === 'All' || p.category === cat
      const matchesQ =
        !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      return matchesCat && matchesQ
    })
  }, [query, cat])

  return (
    <div className="pt-[68px]">
      {/* Hero */}
      <section className="container-cv pt-14 md:pt-24 pb-12 md:pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 flex flex-col items-start gap-6">
            <SectionChip>Engineering blog</SectionChip>
            <h1 className="text-display text-cv-ink text-balance">
              Notes from production
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pt-16">
            <p className="text-lead">
              What we learn shipping real systems — scaling, deployment,
              automation, and the trade-offs nobody puts in tutorials.
            </p>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="container-cv pb-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="glass mirror-sheen inline-flex max-w-full flex-wrap gap-1 rounded-full p-1">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  cat === c ? 'bg-cv-ink text-background' : 'text-cv-muted hover:text-cv-ink',
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cv-muted" />
            <label htmlFor="blog-search" className="sr-only">Search articles</label>
            <input
              id="blog-search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search articles"
              className="h-11 w-full rounded-full border border-cv-line bg-cv-card pl-10 pr-4 text-sm text-cv-ink placeholder:text-cv-muted focus:outline-none focus:ring-2 focus:ring-cv-ink/20"
            />
          </div>
        </div>
      </section>

      {/* Post grid */}
      <section className="container-cv pb-24 md:pb-36">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {visible.map(p => (
            <button
              key={p.slug}
              onClick={() => navigate('blog-post', { slug: p.slug })}
              className="card-cv mirror-glint group flex flex-col overflow-hidden text-left transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={cn('flex items-center justify-between p-6', `tint-${p.tint}`)}>
                <span className="chip bg-white/60 dark:bg-white/10">{p.category}</span>
                <ArrowUpRight className="h-4 w-4 text-cv-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h2 className="text-lg font-semibold leading-snug text-cv-ink">{p.title}</h2>
                <p className="text-sm leading-relaxed text-cv-muted">{p.excerpt}</p>
                <div className="mt-auto flex items-center gap-3 pt-3">
                  <InitialsAvatar name={p.author} size="sm" />
                  <div className="text-xs text-cv-muted">
                    <p className="font-medium text-cv-ink">{p.author}</p>
                    <p>{p.date} · {p.readTime}</p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        {visible.length === 0 && (
          <p className="py-16 text-center text-sm text-cv-muted">
            No articles match that search yet.
          </p>
        )}
      </section>
    </div>
  )
}

/* ---------------------------- Single post ---------------------------- */

export function BlogPostPage() {
  const { params, navigate } = useAppStore()
  const post = blogPosts.find(p => p.slug === params.slug) ?? blogPosts[0]

  const related = blogPosts.filter(p => p.slug !== post.slug).slice(0, 2)

  return (
    <div className="pt-[68px]">
      <article className="container-cv pt-12 md:pt-20 pb-20">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => navigate('blog')}
            className="btn-pill btn-ghost-pill mb-8 px-4 py-2 text-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All articles
          </button>

          <span className="chip">{post.category}</span>
          <h1 className="mt-5 text-h2 text-cv-ink text-balance">{post.title}</h1>

          <div className="mt-6 flex items-center gap-3">
            <InitialsAvatar name={post.author} size="md" />
            <div className="text-sm">
              <p className="font-semibold text-cv-ink">{post.author}</p>
              <p className="text-xs text-cv-muted">{post.date} · {post.readTime}</p>
            </div>
          </div>

          <div className={cn('mt-10 h-40 rounded-3xl sm:h-52', `tint-${post.tint}`)} aria-hidden />

          <div className="mt-10 flex flex-col gap-6">
            {post.body.map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-cv-ink/90">
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="container-cv pb-24 md:pb-36">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-h3 text-cv-ink">Keep reading</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {related.map(p => (
              <button
                key={p.slug}
                onClick={() => navigate('blog-post', { slug: p.slug })}
                className="card-cv mirror-glint flex flex-col gap-2 p-5 text-left transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="chip w-fit px-2.5 py-1 text-[10px]">{p.category}</span>
                <h3 className="text-sm font-semibold leading-snug text-cv-ink">{p.title}</h3>
                <p className="text-xs text-cv-muted">{p.readTime}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
