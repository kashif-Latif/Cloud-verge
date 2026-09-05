'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  LayoutDashboard, Users, FileText, Briefcase, MessageSquare, Plus, Pencil, Trash2,
  Shield, Lock, Activity, TrendingUp, Eye, Search, Bell, Settings, LogOut, ChevronRight, Mail, Phone, Calendar, X, CheckCircle2, AlertTriangle
} from 'lucide-react'
import { toast } from 'sonner'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }

// Mock data
const leads = [
  { id: 1, name: 'Ahmed Raza', email: 'ahmed@techstart.com', company: 'TechStart Pvt Ltd', status: 'qualified', date: '2026-08-10', message: 'Interested in a custom web platform for our SaaS product.' },
  { id: 2, name: 'Sarah Mitchell', email: 'sarah@dataflow.io', company: 'DataFlow Inc', status: 'contacted', date: '2026-08-08', message: 'Need backend architecture consultation for our analytics platform.' },
  { id: 3, name: 'Hassan Ali', email: 'hassan@autowork.pk', company: 'AutoWork Solutions', status: 'converted', date: '2026-07-28', message: 'Wants a workflow automation system for internal operations.' },
  { id: 4, name: 'Zainab Khan', email: 'zainab@retailmax.com', company: 'RetailMax', status: 'new', date: '2026-08-13', message: 'Looking for a multi-vendor e-commerce platform.' },
  { id: 5, name: 'Omar Farooq', email: 'omar@finserve.com', company: 'FinServe Analytics', status: 'qualified', date: '2026-08-05', message: 'Needs DevOps consulting for microservices deployment.' },
]

const employees = [
  { id: 1, name: 'Abdul Muqeet', role: 'CEO & Operational Lead', email: 'muqeet@cloudvergeorg.net', status: 'active' },
  { id: 2, name: 'Muhammad Kashif Abdullah', role: 'Chairman & Investor', email: 'kashif@cloudvergeorg.net', status: 'active' },
  { id: 3, name: 'Muhammad Abdul Moeed', role: 'CFO', email: 'moeed@cloudvergeorg.net', status: 'active' },
  { id: 4, name: 'Muhammad Kashif Latif', role: 'Web Engineering Lead', email: 'kashif.latif@cloudvergeorg.net', status: 'active' },
  { id: 5, name: 'Mashad Ali', role: 'Mobile Engineering Lead', email: 'mashad@cloudvergeorg.net', status: 'active' },
  { id: 6, name: 'Jahanzaib Anwar Butt', role: 'Software Engineer', email: 'jahanzaib@cloudvergeorg.net', status: 'active' },
]

const projects = [
  { id: 1, name: 'PulseFeed', client: 'DataFlow Inc', status: 'completed', tech: 'Django, React, PostgreSQL', date: '2026-06-15' },
  { id: 2, name: 'Task-Flow', client: 'AutoWork Solutions', status: 'completed', tech: 'Python, React, Celery', date: '2026-05-20' },
  { id: 3, name: 'RetailMax Platform', client: 'RetailMax', status: 'in-progress', tech: 'Next.js, Prisma, PostgreSQL', date: '2026-08-01' },
]

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  contacted: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  qualified: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
  converted: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  'in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
}

const sidebarItems = [
  { key: 'admin', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'admin-leads', label: 'Leads & Contacts', icon: MessageSquare },
  { key: 'admin-employees', label: 'Employees', icon: Users },
  { key: 'admin-cms', label: 'CMS', icon: FileText },
  { key: 'admin-projects', label: 'Projects', icon: Briefcase },
]

export default function AdminPage() {
  const { page, navigate } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center gradient-mesh p-4">
        <motion.div {...fadeUp} className="w-full max-w-md">
        <Card className="border-border/50 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl gradient-blue shadow-lg">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <CardTitle className="text-2xl">Admin Portal</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to access the Cloud Verge dashboard</p>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={(e) => { e.preventDefault(); setAuthenticated(true); toast.success('Welcome back, Admin!') }} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Email</label>
                <Input placeholder="admin@cloudvergeorg.net" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} className="h-11" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Password</label>
                <Input type="password" placeholder="Enter password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} className="h-11" />
              </div>
              <Button type="submit" className="gradient-blue w-full border-0 font-semibold shadow-lg shadow-primary/25">Sign In</Button>
            </form>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" /> End-to-end encrypted session
            </div>
            <Button variant="ghost" onClick={() => navigate('home')} className="mt-2 w-full gap-1.5 text-sm text-muted-foreground">
              <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Back to website
            </Button>
          </CardContent>
        </Card>
        </motion.div>
      </div>
    )
  }

  const currentTab = sidebarItems.find(s => s.key === page)?.key || 'admin'

  const handleLogout = () => { setAuthenticated(false); toast.info('Logged out successfully.') }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card p-4 lg:block">
        <div className="mb-6 flex items-center gap-2.5">
          <img src="/images/logo.jpg" alt="Cloud Verge" className="h-9 w-auto" />
          <div><p className="text-sm font-bold">Cloud Verge</p><p className="text-xs text-muted-foreground">Admin Panel</p></div>
        </div>
        <nav className="space-y-1">
          {sidebarItems.map(item => (
            <button key={item.key} onClick={() => navigate(item.key as any)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${page === item.key ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              <item.icon className="h-4 w-4" />{item.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-6">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-card/80 px-4 py-3 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <img src="/images/logo.jpg" alt="Cloud Verge" className="h-8 w-auto" />
            <span className="text-sm font-bold">Admin</span>
          </div>
          <div className="hidden lg:block">
            <h1 className="text-lg font-bold">{sidebarItems.find(s => s.key === page)?.label || 'Dashboard'}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative h-9 w-9"><Bell className="h-4 w-4" /><span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">3</span></Button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-blue text-xs font-bold text-white">A</div>
              <span className="hidden text-sm font-medium sm:inline">Admin</span>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          {/* Mobile Nav */}
          <div className="mb-6 flex gap-2 overflow-x-auto scrollbar-thin lg:hidden">
            {sidebarItems.map(item => (
              <Button key={item.key} variant={page === item.key ? 'default' : 'outline'} size="sm" onClick={() => navigate(item.key as any)} className="gap-1.5 shrink-0">
                <item.icon className="h-3.5 w-3.5" />{item.label}
              </Button>
            ))}
          </div>

          {currentTab === 'admin' && <AdminDashboard />}
          {currentTab === 'admin-leads' && <AdminLeads searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
          {currentTab === 'admin-employees' && <AdminEmployees />}
          {currentTab === 'admin-cms' && <AdminCMS />}
          {currentTab === 'admin-projects' && <AdminProjects />}
        </div>
      </div>
    </div>
  )
}

function AdminDashboard() {
  const stats = [
    { label: 'Total Leads', value: '24', change: '+12%', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/40' },
    { label: 'Active Projects', value: '3', change: '+1', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
    { label: 'Team Members', value: '6', change: 'All active', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/40' },
    { label: 'Conversion Rate', value: '68%', change: '+5%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/40' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} {...fadeUp} transition={{ delay: i * 0.05 }}>
            <Card className="border-border/50">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div>
                <div><p className="text-2xl font-extrabold text-foreground">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p><p className="mt-0.5 text-xs font-medium text-cv-emerald">{s.change}</p></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader><CardTitle className="text-base">Recent Leads</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {leads.slice(0, 4).map(l => (
              <div key={l.id} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                <div className="min-w-0"><p className="truncate text-sm font-medium">{l.name}</p><p className="truncate text-xs text-muted-foreground">{l.company}</p></div>
                <span className={`ml-2 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[l.status]}`}>{l.status}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader><CardTitle className="text-base">Security Overview</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[{ label: 'SSL Certificate', value: 'Valid (256-bit)', ok: true }, { label: 'Last Security Audit', value: 'Aug 1, 2026', ok: true }, { label: 'Failed Login Attempts', value: '3 (blocked)', ok: true }, { label: 'Active Sessions', value: '2', ok: true }].map(s => (
              <div key={s.label} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                <div className="flex items-center gap-2"><CheckCircle2 className={`h-4 w-4 ${s.ok ? 'text-cv-emerald' : 'text-red-500'}`} /><span className="text-sm">{s.label}</span></div>
                <span className="text-xs text-muted-foreground">{s.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AdminLeads({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (q: string) => void }) {
  const filtered = leads.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.company.toLowerCase().includes(searchQuery.toLowerCase()))
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search leads..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="h-10 pl-9" /></div>
        <Dialog><DialogTrigger asChild><Button className="gradient-blue border-0 gap-2"><Plus className="h-4 w-4" /> Add Lead</Button></DialogTrigger>
        <DialogContent><DialogHeader><DialogTitle>Add New Lead</DialogTitle></DialogHeader><form className="space-y-4" onSubmit={e => { e.preventDefault(); toast.success('Lead added!') }}><Input placeholder="Name" required /><Input type="email" placeholder="Email" required /><Input placeholder="Company" /><textarea placeholder="Message" className="min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /><Button type="submit" className="gradient-blue w-full border-0">Save Lead</Button></form></DialogContent>
        </Dialog>
      </div>
      <div className="space-y-3">
        {filtered.map(l => (
          <Card key={l.id} className="border-border/50">
            <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2"><p className="font-semibold">{l.name}</p><span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColors[l.status]}`}>{l.status}</span></div>
                <p className="mt-0.5 text-xs text-muted-foreground">{l.company} | {l.email}</p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{l.message}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground hidden sm:block">{l.date}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AdminEmployees() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{employees.length} team members</p>
        <Dialog><DialogTrigger asChild><Button className="gradient-blue border-0 gap-2"><Plus className="h-4 w-4" /> Add Member</Button></DialogTrigger>
        <DialogContent><DialogHeader><DialogTitle>Add Team Member</DialogTitle></DialogHeader><form className="space-y-4" onSubmit={e => { e.preventDefault(); toast.success('Member added!') }}><Input placeholder="Full Name" required /><Input placeholder="Role / Title" required /><Input type="email" placeholder="Email" required /><Button type="submit" className="gradient-blue w-full border-0">Add Member</Button></form></DialogContent></Dialog>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {employees.map(emp => (
          <Card key={emp.id} className="card-hover border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full gradient-blue text-sm font-bold text-white">{emp.name.split(' ').map(n => n[0]).join('')}</div>
                <div className="min-w-0"><p className="truncate font-semibold">{emp.name}</p><p className="truncate text-xs text-primary">{emp.role}</p></div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{emp.email}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColors[emp.status]}`}>{emp.status}</span>
                <div className="flex gap-1"><Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3 w-3" /></Button></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AdminCMS() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="services">
        <TabsList><TabsTrigger value="services">Services</TabsTrigger><TabsTrigger value="blogs">Blogs</TabsTrigger><TabsTrigger value="reviews">Reviews</TabsTrigger></TabsList>
        <TabsContent value="services" className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Manage your service offerings</p>
            <Button size="sm" className="gradient-blue border-0 gap-1.5"><Plus className="h-3.5 w-3.5" /> Add Service</Button>
          </div>
          <div className="space-y-3">
            {['API & Backend Architecture', 'Custom Web Platforms', 'DevOps & Systems', 'Full-Stack Web Apps', 'Custom Automation', 'Mobile Applications'].map(s => (
              <Card key={s} className="border-border/50"><CardContent className="flex items-center justify-between p-4"><span className="text-sm font-medium">{s}</span><div className="flex gap-1"><Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-3.5 w-3.5" /></Button><Button variant="ghost" size="icon" className="h-8 w-8 text-red-500"><Trash2 className="h-3.5 w-3.5" /></Button></div></CardContent></Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="blogs" className="mt-4">
          <div className="flex items-center justify-between mb-4"><p className="text-sm text-muted-foreground">Manage blog posts</p><Button size="sm" className="gradient-blue border-0 gap-1.5"><Plus className="h-3.5 w-3.5" /> New Post</Button></div>
          <div className="space-y-3">
            {[{ t: 'Scaling Django for High-Concurrency', s: 'Published' }, { t: 'Docker to Kubernetes Journey', s: 'Published' }, { t: 'React Native vs Flutter', s: 'Published' }, { t: 'Python Automation Guide', s: 'Draft' }].map(b => (
              <Card key={b.t} className="border-border/50"><CardContent className="flex items-center justify-between p-4"><span className="text-sm font-medium">{b.t}</span><Badge variant={b.s === 'Published' ? 'default' : 'secondary'} className="text-xs">{b.s}</Badge></CardContent></Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <div className="flex items-center justify-between mb-4"><p className="text-sm text-muted-foreground">Manage client reviews</p><Button size="sm" className="gradient-blue border-0 gap-1.5"><Plus className="h-3.5 w-3.5" /> Add Review</Button></div>
          <div className="space-y-3">
            {['Ahmed Raza - TechStart', 'Sarah Mitchell - DataFlow', 'Hassan Ali - AutoWork', 'Zainab Khan - RetailMax'].map(r => (
              <Card key={r} className="border-border/50"><CardContent className="flex items-center justify-between p-4"><span className="text-sm font-medium">{r}</span><div className="flex gap-1"><Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-3.5 w-3.5" /></Button><Button variant="ghost" size="icon" className="h-8 w-8 text-red-500"><Trash2 className="h-3.5 w-3.5" /></Button></div></CardContent></Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AdminProjects() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{projects.length} projects</p>
        <Button size="sm" className="gradient-blue border-0 gap-1.5"><Plus className="h-3.5 w-3.5" /> New Project</Button>
      </div>
      <div className="space-y-3">
        {projects.map(p => (
          <Card key={p.id} className="border-border/50"><CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="font-semibold">{p.name}</p><p className="text-xs text-muted-foreground">{p.client} | {p.tech}</p></div>
            <div className="flex items-center gap-2"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[p.status]}`}>{p.status}</span><span className="text-xs text-muted-foreground hidden sm:block">{p.date}</span><Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-3.5 w-3.5" /></Button></div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  )
}
