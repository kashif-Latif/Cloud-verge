import { create } from 'zustand'

export type Page =
  | 'home' | 'about' | 'services' | 'projects' | 'careers'
  | 'reviews' | 'blog' | 'blog-post' | 'contact' | 'pricing'
  | 'admin' | 'admin-leads' | 'admin-employees' | 'admin-cms' | 'admin-projects'
  | 'portal' | 'portal-tasks' | 'portal-kb'

type ModalType = 'contact' | 'review' | 'login' | 'mobile-menu' | null

type AppState = {
  page: Page
  params: Record<string, string>
  modal: ModalType
  isMobileMenuOpen: boolean
  navigate: (page: Page, params?: Record<string, string>) => void
  goBack: () => void
  openModal: (modal: ModalType) => void
  closeModal: () => void
  setMobileMenu: (open: boolean) => void
  /** internal: apply state coming from the browser (popstate / initial load) */
  _applyLocation: (page: Page, params: Record<string, string>) => void
}

/* ---------------- URL <-> Page mapping ---------------- */

const pageToPath = (page: Page, params: Record<string, string>): string => {
  switch (page) {
    case 'home': return '/'
    case 'blog-post': return `/blog/${params.slug || params.id || ''}`
    case 'admin-leads': return '/admin/leads'
    case 'admin-employees': return '/admin/employees'
    case 'admin-cms': return '/admin/cms'
    case 'admin-projects': return '/admin/projects'
    case 'portal-tasks': return '/portal/tasks'
    case 'portal-kb': return '/portal/kb'
    default: return `/${page}`
  }
}

export const pathToPage = (pathname: string): { page: Page; params: Record<string, string> } => {
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean)
  if (parts.length === 0) return { page: 'home', params: {} }

  const [root, second] = parts
  if (root === 'blog' && second) return { page: 'blog-post', params: { slug: second } }
  // admin/portal intentionally not routed on the public site (portal phase comes later)

  const known: Page[] = ['about', 'services', 'projects', 'careers', 'reviews', 'blog', 'contact', 'pricing']
  if (known.includes(root as Page)) return { page: root as Page, params: {} }
  return { page: 'home', params: {} }
}

/* ---------------- store ---------------- */

export const useAppStore = create<AppState>((set, get) => ({
  page: 'home',
  params: {},
  modal: null,
  isMobileMenuOpen: false,

  navigate: (page, params = {}) => {
    const prev = get().page
    set({ page, params, isMobileMenuOpen: false, modal: null })
    if (typeof window !== 'undefined') {
      const path = pageToPath(page, params)
      if (prev !== page || window.location.pathname !== path) {
        window.history.pushState({ page, params }, '', path)
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },

  goBack: () => {
    if (typeof window !== 'undefined') window.history.back()
  },

  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),
  setMobileMenu: (open) => set({ isMobileMenuOpen: open }),

  _applyLocation: (page, params) => set({ page, params, isMobileMenuOpen: false }),
}))

/**
 * Call once on the client (inside the root App component).
 * Syncs the store with the real URL: initial deep-link, back/forward buttons.
 */
export function initUrlSync() {
  if (typeof window === 'undefined') return () => {}

  const { page, params } = pathToPage(window.location.pathname)
  useAppStore.getState()._applyLocation(page, params)
  window.history.replaceState({ page, params }, '', window.location.pathname)

  const onPop = (e: PopStateEvent) => {
    if (e.state?.page) {
      useAppStore.getState()._applyLocation(e.state.page, e.state.params || {})
    } else {
      const parsed = pathToPage(window.location.pathname)
      useAppStore.getState()._applyLocation(parsed.page, parsed.params)
    }
  }
  window.addEventListener('popstate', onPop)
  return () => window.removeEventListener('popstate', onPop)
}
