/**
 * CloudVerge — site content
 * Single source of truth for everything shown on the public pages.
 * Edit here; every page updates automatically.
 */

export const site = {
  name: 'CloudVerge',
  tagline: 'Software that holds under pressure',
  description:
    'CloudVerge is a software engineering agency in Lahore building high-throughput backends, scalable web platforms, mobile apps, and automation systems for companies that cannot afford downtime.',
  email: 'contact@cloudvergeorg.net',
  phone: '+92 300 0000000',
  location: 'Lahore, Pakistan',
  slogan: 'Elevating technology. Empowering futures.',
}

export const navLinks = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Services', page: 'services' },
  { label: 'Projects', page: 'projects' },
  { label: 'Reviews', page: 'reviews' },
  { label: 'Blog', page: 'blog' },
  { label: 'Pricing', page: 'pricing' },
  { label: 'Careers', page: 'careers' },
  { label: 'Contact', page: 'contact' },
] as const

export const heroTabs = ['Web Platforms', 'Backend & APIs', 'Automation'] as const

export const heroPills = [
  'API Architecture', 'Web Platforms', 'DevOps', 'Automation', 'Mobile Apps',
] as const

export const trustedBy = [
  'TechStart', 'DataFlow', 'FinServe', 'RetailMax', 'EduTech', 'AutoWork', 'PulseFeed', 'NexaCorp',
] as const

export type Service = {
  slug: string
  title: string
  short: string
  long: string
  points: string[]
  tint: 'violet' | 'mint' | 'sky' | 'peach'
  icon: string // lucide icon name resolved in components
}

export const services: Service[] = [
  {
    slug: 'backend',
    title: 'API & Backend Architecture',
    short: 'High-throughput backends with Django/DRF and hard SQL optimization.',
    long: 'We design and build backend systems that stay fast under real load — thousands of requests per second with sub-100ms responses. Schema design, query optimization, caching layers, and concurrency handled properly from day one.',
    points: ['REST & GraphQL APIs', 'PostgreSQL schema & query tuning', 'Redis caching & queues', 'Load-tested before launch'],
    tint: 'violet',
    icon: 'Server',
  },
  {
    slug: 'web-platforms',
    title: 'Custom Web Platforms',
    short: 'Scalable web applications with automated CI/CD pipelines.',
    long: 'From MVP to enterprise, we build platforms that grow with the business. Automated pipelines, staging environments, and deployment discipline mean shipping stays fast even as the codebase grows.',
    points: ['Next.js & React frontends', 'Automated CI/CD', 'Multi-environment deploys', 'Built to scale to millions of users'],
    tint: 'sky',
    icon: 'Globe',
  },
  {
    slug: 'devops',
    title: 'DevOps & Systems',
    short: 'Docker, CI/CD, and high-availability hosting infrastructure.',
    long: 'Containerized deployments, infrastructure as code, and monitoring that catches problems before your users do. Always up, always fast, always secure.',
    points: ['Docker & Kubernetes', 'Zero-downtime deployments', '24/7 monitoring & alerts', '99.9% uptime SLA'],
    tint: 'mint',
    icon: 'Container',
  },
  {
    slug: 'fullstack',
    title: 'Full-Stack Web Apps',
    short: 'High-speed platforms engineered for rapid user adoption.',
    long: 'Interactive, responsive applications built with modern frameworks. Performance budgets enforced on every release — because a slow product is a broken product.',
    points: ['End-to-end delivery', 'Performance-first builds', 'Responsive on every device', 'Accessible by default'],
    tint: 'peach',
    icon: 'Layout',
  },
  {
    slug: 'automation',
    title: 'Custom Automation',
    short: 'Python bots, scraping systems, and workflow integrations.',
    long: 'We automate what slows your team down — data pipelines, intelligent scrapers, report generation, and integrations between the tools you already use.',
    points: ['Python automation & bots', 'Data scraping at scale', 'Workflow integrations', 'Scheduled pipelines'],
    tint: 'mint',
    icon: 'Bot',
  },
  {
    slug: 'mobile',
    title: 'Mobile Applications',
    short: 'Cross-platform iOS & Android apps with native-grade feel.',
    long: 'Performance-focused mobile apps from one shared codebase — faster time to market without the compromise users can feel.',
    points: ['React Native & Flutter', 'iOS + Android from one codebase', 'Offline-first patterns', 'Store submission handled'],
    tint: 'violet',
    icon: 'Smartphone',
  },
]

export const stats = [
  { value: '50+', label: 'Projects delivered' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '6+', label: 'Engineers' },
  { value: '3+', label: 'Years shipping' },
] as const

export const processSteps = [
  { title: 'Discover', desc: 'We map your goals, users, and constraints before writing a line of code.' },
  { title: 'Architect', desc: 'System design, data models, and infrastructure planned for the load you will actually face.' },
  { title: 'Build', desc: 'Short iterations, working software every week, and a staging link you can click.' },
  { title: 'Harden', desc: 'Load testing, security review, and monitoring wired in before launch day.' },
  { title: 'Launch & run', desc: 'Zero-downtime deployment, then ongoing monitoring, support, and iteration.' },
] as const

export type Project = {
  name: string
  tagline: string
  desc: string
  tech: string[]
  category: 'Backend' | 'Web' | 'Automation' | 'Mobile'
  impact: string
  tint: 'violet' | 'mint' | 'sky' | 'peach'
}

export const projects: Project[] = [
  {
    name: 'PulseFeed',
    tagline: 'Real-time news aggregation',
    desc: 'High-performance platform ingesting and delivering real-time content from hundreds of sources with sub-second latency.',
    tech: ['Django', 'PostgreSQL', 'Redis', 'WebSockets'],
    category: 'Backend',
    impact: '400k articles/day processed',
    tint: 'violet',
  },
  {
    name: 'Task-Flow',
    tagline: 'Workflow automation engine',
    desc: 'Intelligent automation system with custom rule engines, task scheduling, and real-time monitoring dashboards.',
    tech: ['Python', 'React', 'Docker', 'Celery'],
    category: 'Automation',
    impact: '30+ hours saved weekly per team',
    tint: 'sky',
  },
  {
    name: 'FinServe Analytics',
    tagline: 'Financial reporting platform',
    desc: 'Secure analytics dashboard turning raw transaction data into audited, exportable reports for finance teams.',
    tech: ['Next.js', 'PostgreSQL', 'Recharts', 'Docker'],
    category: 'Web',
    impact: 'Reporting time cut from days to minutes',
    tint: 'mint',
  },
  {
    name: 'RetailMax Commerce',
    tagline: 'Headless commerce backend',
    desc: 'Order, inventory, and fulfilment APIs powering a multi-storefront retail operation with COD reconciliation.',
    tech: ['Django', 'Redis', 'Celery', 'PostgreSQL'],
    category: 'Backend',
    impact: '12k orders/day at peak, zero downtime',
    tint: 'peach',
  },
  {
    name: 'EduTech LMS',
    tagline: 'Learning management system',
    desc: 'Course delivery, assessments, and progress tracking for an education provider serving thousands of students.',
    tech: ['Next.js', 'Supabase', 'Tailwind', 'Vercel'],
    category: 'Web',
    impact: '8k active learners onboarded',
    tint: 'sky',
  },
  {
    name: 'AutoWork Field App',
    tagline: 'Field-operations mobile app',
    desc: 'Offline-first mobile app for field technicians — job cards, photos, signatures, and sync when back online.',
    tech: ['React Native', 'SQLite', 'Node.js'],
    category: 'Mobile',
    impact: 'Paperwork eliminated for 120 technicians',
    tint: 'violet',
  },
]

export type Review = {
  name: string
  role: string
  company: string
  rating: number
  text: string
}

export const reviews: Review[] = [
  {
    name: 'Ahmed Raza',
    role: 'CTO',
    company: 'TechStart',
    rating: 5,
    text: 'They rebuilt our order API on Django. p95 went from ~800ms to under 120ms and the weekly crash reports basically stopped. Communication was on WhatsApp and quick.',
  },
  {
    name: 'Ayesha Tariq',
    role: 'Product Manager',
    company: 'EduTech Pakistan',
    rating: 5,
    text: 'Result-day traffic used to take our LMS down every semester. First exam season after the rework, zero downtime. They also left us proper deployment docs, which nobody does.',
  },
  {
    name: 'Omar Farooq',
    role: 'Founder',
    company: 'FinServe Analytics',
    rating: 4,
    text: 'Solid engineering and honest estimates. Mid-project responses slowed for about a week during a team crunch, but the final dashboard shipped complete and has run clean for months.',
  },
  {
    name: 'Hassan Ali',
    role: 'Operations Head',
    company: 'RetailMax',
    rating: 4,
    text: 'COD order reconciliation that took our team 3 hours a day is now a 10-minute review. A few edge cases needed a second pass after launch — they fixed them without drama.',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Head of Engineering',
    company: 'DataFlow',
    rating: 5,
    text: 'We hired them remotely for a scraping and pipeline project. Idempotent jobs, alerting on silent failures, clean handover. The code reads like an in-house senior wrote it.',
  },
  {
    name: 'Zainab Khan',
    role: 'Technical Lead',
    company: 'AutoWork',
    rating: 4,
    text: 'The field app works offline and syncs without duplicating job cards, which two previous vendors failed at. UI polish took an extra iteration, but the core has been reliable.',
  },
]

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  tint: 'violet' | 'mint' | 'sky' | 'peach'
  body: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'scaling-django-high-concurrency',
    title: 'Scaling Django for High-Concurrency Applications',
    excerpt: 'The exact techniques we use to take Django from hundreds to tens of thousands of requests per second — connection pooling, query discipline, and caching that actually works.',
    category: 'Backend',
    author: 'Abdul Muqeet',
    date: 'Aug 2026',
    readTime: '8 min read',
    tint: 'violet',
    body: [
      'Django gets an unfair reputation for being slow. In our experience, the framework is almost never the bottleneck — the database access patterns are. Before reaching for microservices or a rewrite, fix the queries.',
      'Start with the N+1 problem. Every list view should be audited with django-debug-toolbar or query logging. select_related and prefetch_related solve the majority of performance complaints we see in codebases that come to us for rescue work.',
      'Next, connection pooling. Django opens a database connection per request by default. Under real concurrency, PgBouncer in transaction mode changes everything — we have seen p95 latency drop by 60% from this single infrastructure change.',
      'Finally, cache with intent. Blanket page caching hides bugs; targeted caching of expensive computations with clear invalidation rules is what survives production. Redis with short TTLs and explicit cache keys beats clever automatic invalidation every time.',
    ],
  },
  {
    slug: 'docker-to-kubernetes-journey',
    title: 'Docker to Kubernetes: Our Production Deployment Journey',
    excerpt: 'When a docker-compose setup stops being enough, and what actually changes when you make the jump — from someone who runs both in production.',
    category: 'DevOps',
    author: 'Muhammad Kashif Latif',
    date: 'Jul 2026',
    readTime: '10 min read',
    tint: 'sky',
    body: [
      'Most projects do not need Kubernetes on day one. A well-configured docker-compose setup behind a load balancer will serve you honestly until real scale arrives. The question is knowing when that moment comes.',
      'For us, the trigger was zero-downtime deployments across multiple services with different scaling needs. When your API needs ten replicas but your worker needs two, and both need to roll without dropping requests, orchestration earns its complexity.',
      'The migration itself taught us to keep manifests boring. Helm charts with sensible defaults, resource limits on everything, and liveness probes that actually reflect health — not just process existence.',
      'The payoff: deploys became a non-event. What used to be a scheduled maintenance window is now a git push at 2pm on a Tuesday.',
    ],
  },
  {
    slug: 'react-native-vs-flutter-2026',
    title: 'React Native vs Flutter in 2026: Our Engineering Perspective',
    excerpt: 'We ship both. Here is how we actually choose between them for client projects — and why the answer is usually about the team, not the framework.',
    category: 'Mobile',
    author: 'Mashad Ali',
    date: 'Jun 2026',
    readTime: '7 min read',
    tint: 'mint',
    body: [
      'Both frameworks are mature enough that framework capability is rarely the deciding factor anymore. Performance differences that mattered in 2022 have largely evaporated for typical business applications.',
      'We choose React Native when the client has an existing web team — the shared mental model with React means web engineers become productive on mobile in weeks, not months. Component patterns, state management, and even some business logic transfer directly.',
      'We choose Flutter when pixel-perfect custom UI across platforms is the priority, or when the app is animation-heavy. The rendering model gives you control that React Native still makes you work harder for.',
      'The honest answer most agencies avoid: for a standard CRUD app with forms, lists, and an API, either framework delivers. Choose based on who will maintain it after launch.',
    ],
  },
  {
    slug: 'intelligent-automation-python',
    title: 'Building Intelligent Automation with Python: A Practical Guide',
    excerpt: 'From cron jobs to resilient pipelines — patterns for automation that survives real-world messiness instead of breaking at 3am.',
    category: 'Automation',
    author: 'Jahanzaib Anwar Butt',
    date: 'May 2026',
    readTime: '6 min read',
    tint: 'peach',
    body: [
      'Automation that works in a demo and automation that runs unattended for a year are different engineering problems. The gap is entirely about failure handling.',
      'Rule one: every automated task must be idempotent. If the script runs twice — and one day it will — the result must be the same as running once. Design for retry from the start.',
      'Rule two: alert on absence, not just errors. A scraper that silently stops finding data is worse than one that crashes loudly. Heartbeats and expected-output checks catch the failures that exception handlers miss.',
      'Rule three: log decisions, not just events. When automation makes a choice — skipping a record, retrying a request — the log should say why. Future you, debugging at speed, will be grateful.',
    ],
  },
]

export const values = [
  { title: 'Performance First', desc: 'Speed is a feature. We set performance budgets and hold every release to them.' },
  { title: 'Scalable Thinking', desc: 'We architect for the load you will face in two years, not the demo next week.' },
  { title: 'Transparent Process', desc: 'Weekly demos, honest estimates, and a staging link you can open any time.' },
  { title: 'Quality Assurance', desc: 'Code review, automated testing, and security scanning on every merge.' },
  { title: 'Security by Default', desc: 'Encryption, least-privilege access, and audits are baseline, not add-ons.' },
] as const

export const timeline = [
  { year: '2023', title: 'Founded in Lahore', desc: 'Started as a two-person backend consultancy fixing slow APIs for local startups.' },
  { year: '2024', title: 'First enterprise clients', desc: 'Grew to a full engineering team; shipped PulseFeed and our first high-scale commerce backend.' },
  { year: '2025', title: '50 projects delivered', desc: 'Expanded into mobile and automation. Introduced our 99.9% uptime SLA.' },
  { year: '2026', title: 'Platform practice', desc: 'Building long-term platform partnerships — engineering teams embedded with clients.' },
] as const

export const team = [
  { name: 'Abdul Muqeet', title: 'CEO & Operational Lead', dept: 'Leadership' },
  { name: 'Muhammad Kashif Abdullah', title: 'Chairman & Investor', dept: 'Leadership' },
  { name: 'Muhammad Abdul Moeed', title: 'Chief Financial Officer', dept: 'Finance' },
  { name: 'Muhammad Kashif Latif', title: 'Web Engineering Lead', dept: 'Engineering' },
  { name: 'Mashad Ali', title: 'Mobile Engineering Lead', dept: 'Engineering' },
  { name: 'Jahanzaib Anwar Butt', title: 'Software Engineer', dept: 'Engineering' },
] as const

export const techStack = {
  Backend: ['Python', 'Django', 'DRF', 'Node.js', 'PostgreSQL', 'Redis', 'Celery'],
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  Mobile: ['React Native', 'Flutter', 'Expo', 'SQLite'],
  'DevOps & Cloud': ['Docker', 'Kubernetes', 'GitHub Actions', 'Vercel', 'AWS', 'Nginx'],
} as const

export const pricingTiers = [
  {
    name: 'Starter',
    monthly: 99,
    yearly: 89,
    tagline: 'For a focused product or MVP',
    features: ['Up to 5 API endpoints', '1 deployment environment', 'CI/CD pipeline', 'Email support', 'Monthly progress report'],
    highlighted: false,
  },
  {
    name: 'Professional',
    monthly: 299,
    yearly: 269,
    tagline: 'For growing products with real users',
    features: ['Up to 20 API endpoints', '3 environments incl. staging', 'CI/CD pipeline', 'Priority Slack support', 'Performance monitoring', 'Monthly security scan'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    monthly: 799,
    yearly: 719,
    tagline: 'For platforms that cannot go down',
    features: ['Unlimited API endpoints', 'Unlimited environments', 'Dedicated engineering pod', '24/7 incident response', '99.9% uptime SLA', 'Quarterly security audit'],
    highlighted: false,
  },
] as const

export const pricingMatrix = [
  { name: 'API endpoints', starter: 'Up to 5', professional: 'Up to 20', enterprise: 'Unlimited' },
  { name: 'Deployment environments', starter: '1', professional: '3', enterprise: 'Unlimited' },
  { name: 'CI/CD pipeline', starter: true, professional: true, enterprise: true },
  { name: 'Staging environment', starter: false, professional: true, enterprise: true },
  { name: 'Email support', starter: true, professional: true, enterprise: true },
  { name: 'Priority Slack support', starter: false, professional: true, enterprise: true },
  { name: 'Performance monitoring', starter: false, professional: true, enterprise: true },
  { name: 'Dedicated engineering pod', starter: false, professional: false, enterprise: true },
  { name: '24/7 incident response', starter: false, professional: false, enterprise: true },
  { name: 'Uptime SLA', starter: '—', professional: '99.5%', enterprise: '99.9%' },
] as const

export const pricingFaqs = [
  { q: 'Can I switch plans later?', a: 'Yes — upgrades apply immediately and we prorate the difference. Downgrades take effect at the next billing cycle.' },
  { q: 'What happens after the project launches?', a: 'Every plan includes post-launch support. Most clients move to a lighter maintenance retainer once the platform is stable.' },
  { q: 'Do you work with fixed-scope projects?', a: 'Yes. For well-defined builds we quote a fixed price with milestone payments instead of a monthly plan.' },
  { q: 'Who owns the code?', a: 'You do — completely. Full repository access from day one, and everything transfers to you on completion.' },
] as const

export const jobs = [
  { title: 'Senior Backend Engineer (Django)', type: 'Full-time', mode: 'Remote / Lahore', dept: 'Engineering', desc: 'Own high-throughput API design, SQL optimization, and mentoring across our backend practice.' },
  { title: 'Full-Stack Developer (Next.js)', type: 'Full-time', mode: 'Remote / Lahore', dept: 'Engineering', desc: 'Ship end-to-end features across React frontends and Node/Django backends with strong TypeScript.' },
  { title: 'Mobile Developer (React Native)', type: 'Full-time', mode: 'Remote', dept: 'Engineering', desc: 'Build offline-first cross-platform apps with native-grade performance and clean release pipelines.' },
  { title: 'DevOps Engineer', type: 'Full-time', mode: 'Hybrid — Lahore', dept: 'Infrastructure', desc: 'Own Docker/Kubernetes infrastructure, CI/CD, and the monitoring that keeps our 99.9% SLA honest.' },
  { title: 'QA Automation Engineer', type: 'Full-time', mode: 'Remote', dept: 'Quality', desc: 'Build automated test suites that let us ship fast without breaking things.' },
  { title: 'Project Manager', type: 'Full-time', mode: 'Lahore', dept: 'Delivery', desc: 'Run client communication, sprint planning, and delivery across multiple engineering pods.' },
] as const

export const perks = [
  { title: 'Remote-first culture', desc: 'Work where you are sharpest; we meet in Lahore when it matters.' },
  { title: 'Learning budget', desc: '$500/year for courses, books, and conferences — use it or we will ask why.' },
  { title: 'Health insurance', desc: 'Full coverage for you, with family plans available.' },
  { title: 'Equipment provided', desc: 'A machine that compiles fast and a setup that does not hurt your back.' },
  { title: 'Paid time off', desc: 'Real vacations. Shipping tired code helps nobody.' },
  { title: 'Annual retreats', desc: 'Once a year the whole team gets in one room — mountains preferred.' },
] as const
