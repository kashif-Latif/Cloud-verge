'use client'

import { useLayoutEffect } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore, initUrlSync } from '@/lib/store'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const HomePage = dynamic(() => import('@/components/home/HomePage'), { ssr: false })
const AboutPage = dynamic(() => import('@/components/about/AboutPage'), { ssr: false })
const ServicesPage = dynamic(() => import('@/components/services/ServicesPage'), { ssr: false })
const ProjectsPage = dynamic(() => import('@/components/projects/ProjectsPage'), { ssr: false })
const ReviewsPage = dynamic(() => import('@/components/reviews/ReviewsPage'), { ssr: false })
const BlogPage = dynamic(() => import('@/components/blog/BlogPage').then(m => ({ default: m.default })), { ssr: false })
const BlogPostPage = dynamic(() => import('@/components/blog/BlogPage').then(m => ({ default: m.BlogPostPage })), { ssr: false })
const ContactPage = dynamic(() => import('@/components/contact/ContactPage'), { ssr: false })
const PricingPage = dynamic(() => import('@/components/pricing/PricingPage'), { ssr: false })
const CareersPage = dynamic(() => import('@/components/careers/CareersPage'), { ssr: false })

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
}

function PageContent() {
  const { page } = useAppStore()

  // Sync store <-> URL once on mount (deep links, back/forward buttons)
  useLayoutEffect(() => initUrlSync(), [])


  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage />
      case 'about': return <AboutPage />
      case 'services': return <ServicesPage />
      case 'projects': return <ProjectsPage />
      case 'reviews': return <ReviewsPage />
      case 'blog': return <BlogPage />
      case 'blog-post': return <BlogPostPage />
      case 'contact': return <ContactPage />
      case 'pricing': return <PricingPage />
      case 'careers': return <CareersPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return <PageContent />
}
