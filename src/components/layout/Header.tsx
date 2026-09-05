'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Menu, X, Moon, Sun, ArrowUpRight } from 'lucide-react'
import { useAppStore, Page } from '@/lib/store'
import { navLinks, site } from '@/lib/content'
import { cn } from '@/lib/utils'

export default function Header() {
  const { page, navigate, isMobileMenuOpen, setMobileMenu } = useAppStore()
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const go = (p: Page) => navigate(p)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 glass mirror-sheen border-x-0 border-t-0 rounded-none">
        <div className="container-cv flex h-[68px] items-center justify-between gap-4">
          {/* Brand */}
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2.5 text-cv-ink"
            aria-label="CloudVerge — home"
          >
            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-cv-ink">
              <span className="absolute -left-1 -top-1 h-5 w-5 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 blur-[6px]" />
              <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-br from-sky-400 to-emerald-300 blur-[6px]" />
            </span>
            <span className="text-[19px] font-semibold tracking-tight">{site.name}</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => go(link.page as Page)}
                className={cn(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  page === link.page
                    ? 'bg-cv-ink text-background'
                    : 'text-cv-muted hover:text-cv-ink hover:bg-cv-panel',
                )}
                aria-current={page === link.page ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cv-line text-cv-muted transition-colors hover:bg-cv-panel hover:text-cv-ink"
              aria-label={mounted ? `Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode` : 'Toggle theme'}
            >
              {mounted && resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => go('contact')}
              className="btn-pill btn-ink hidden sm:inline-flex px-5 py-2.5"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => setMobileMenu(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cv-line text-cv-ink lg:hidden"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — full glass sheet */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setMobileMenu(false)}
            aria-hidden
          />
          <div className="glass-strong mirror-sheen absolute inset-x-3 top-[76px] rounded-3xl p-4 max-h-[calc(100dvh-96px)] overflow-y-auto">
            <nav className="flex flex-col" aria-label="Mobile">
              {navLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => go(link.page as Page)}
                  className={cn(
                    'flex items-center justify-between rounded-2xl px-4 py-3.5 text-left text-base font-medium transition-colors',
                    page === link.page ? 'bg-cv-ink text-background' : 'text-cv-ink hover:bg-cv-panel',
                  )}
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4 opacity-50" />
                </button>
              ))}
            </nav>
            <button
              onClick={() => go('contact')}
              className="btn-pill btn-ink mt-3 w-full"
            >
              Start a project
            </button>
          </div>
        </div>
      )}
    </>
  )
}
