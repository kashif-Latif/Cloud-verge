'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  LayoutDashboard, Kanban, BookOpen, Plus, GripVertical, X, Clock, AlertCircle,
  CheckCircle2, ChevronRight, LogOut, User, Bell, Search, Calendar, ChevronLeft, FileText, Shield, Lock
} from 'lucide-react'
import { toast } from 'sonner'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }

const kanbanColumns = [
  {
    id: 'todo', title: 'To Do', color: 'border-blue-500', dot: 'bg-blue-500',
    tasks: [
      { id: 't1', title: 'Setup PostgreSQL read replica for client X', priority: 'high', dueDate: 'Aug 16' },
      { id: 't2', title: 'Write API docs for PulseFeed v2', priority: 'medium', dueDate: 'Aug 18' },
      { id: 't3', title: 'Review PR #142 - Auth middleware', priority: 'low', dueDate: 'Aug 20' },
    ],
  },
  {
    id: 'in-progress', title: 'In Progress', color: 'border-amber-500', dot: 'bg-amber-500',
    tasks: [
      { id: 't4', title: 'Implement WebSocket live notifications', priority: 'high', dueDate: 'Aug 15' },
      { id: 't5', title: 'Docker multi-stage build optimization', priority: 'medium', dueDate: 'Aug 17' },
    ],
  },
  {
    id: 'review', title: 'Review', color: 'border-purple-500', dot: 'bg-purple-500',
    tasks: [
      { id: 't6', title: 'Task-Flow rule engine refactor', priority: 'high', dueDate: 'Aug 14' },
    ],
  },
  {
    id: 'done', title: 'Done', color: 'border-emerald-500', dot: 'bg-emerald-500',
    tasks: [
      { id: 't7', title: 'Deploy staging environment for RetailMax', priority: 'medium', dueDate: 'Aug 10' },
      { id: 't8', title: 'Setup CI/CD pipeline for client Y', priority: 'high', dueDate: 'Aug 8' },
    ],
  },
]

const knowledgeBase = [
  { id: 'kb1', title: 'Git Workflow & Branching Strategy', category: 'Engineering', icon: 'git', updated: 'Aug 12, 2026' },
  { id: 'kb2', title: 'Django REST Framework Best Practices', category: 'Backend', icon: 'backend', updated: 'Aug 10, 2026' },
  { id: 'kb3', title: 'Docker & Kubernetes Deployment Guide', category: 'DevOps', icon: 'devops', updated: 'Aug 5, 2026' },
  { id: 'kb4', title: 'React/Next.js Component Patterns', category: 'Frontend', icon: 'frontend', updated: 'Jul 30, 2026' },
  { id: 'kb5', title: 'Security Checklist for New Projects', category: 'Security', icon: 'security', updated: 'Jul 28, 2026' },
  { id: 'kb6', title: 'Client Communication Templates', category: 'Business', icon: 'business', updated: 'Jul 25, 2026' },
]

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  low: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
}

const sidebarItems = [
  { key: 'portal', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'portal-tasks', label: 'Task Board', icon: Kanban },
  { key: 'portal-kb', label: 'Knowledge Base', icon: BookOpen },
]

export default function PortalPage() {
  const { page, navigate } = useAppStore()
  const [authenticated, setAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center gradient-mesh p-4">
        <motion.div {...fadeUp} className="w-full max-w-md">
          <Card className="border-border/50 shadow-xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl gradient-green shadow-lg">
                <User className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-2xl">Employee Portal</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Sign in to access your workspace</p>
            </CardHeader>
            <CardContent className="pt-4">
              <form onSubmit={e => { e.preventDefault(); setAuthenticated(true); toast.success('Welcome back!') }} className="space-y-4">
                <div><label className="mb-1.5 block text-sm font-medium">Email</label><Input placeholder="your.name@cloudvergeorg.net" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} className="h-11" /></div>
                <div><label className="mb-1.5 block text-sm font-medium">Password</label><Input type="password" placeholder="Enter password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} className="h-11" /></div>
                <Button type="submit" className="gradient-green w-full border-0 font-semibold shadow-lg shadow-cv-emerald/25">Sign In</Button>
              </form>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" /> End-to-end encrypted session
              </div>
              <Button variant="ghost" onClick={() => navigate('home')} className="mt-2 w-full gap-1.5 text-sm text-muted-foreground">
                <ChevronLeft className="h-3.5 w-3.5" /> Back to website
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const handleLogout = () => { setAuthenticated(false); toast.info('Logged out successfully.') }
  const currentTab = sidebarItems.find(s => s.key === page)?.key || 'portal'

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card p-4 lg:block">
        <div className="mb-6 flex items-center gap-2.5">
          <img src="/images/logo.jpg" alt="Cloud Verge" className="h-9 w-auto" />
          <div><p className="text-sm font-bold">Cloud Verge</p><p className="text-xs text-muted-foreground">Employee Portal</p></div>
        </div>
        <nav className="space-y-1">
          {sidebarItems.map(item => (
            <button key={item.key} onClick={() => navigate(item.key as any)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${page === item.key ? 'bg-cv-emerald/10 text-cv-emerald' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
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

      {/* Main */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-card/80 px-4 py-3 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <img src="/images/logo.jpg" alt="Cloud Verge" className="h-8 w-auto" />
            <span className="text-sm font-bold">Portal</span>
          </div>
          <h1 className="hidden text-lg font-bold lg:block">{sidebarItems.find(s => s.key === page)?.label || 'Dashboard'}</h1>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative h-9 w-9"><Bell className="h-4 w-4" /></Button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-green text-xs font-bold text-white">E</div>
              <span className="hidden text-sm font-medium sm:inline">Employee</span>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          <div className="mb-6 flex gap-2 overflow-x-auto scrollbar-thin lg:hidden">
            {sidebarItems.map(item => (
              <Button key={item.key} variant={page === item.key ? 'default' : 'outline'} size="sm" onClick={() => navigate(item.key as any)} className="gap-1.5 shrink-0">
                <item.icon className="h-3.5 w-3.5" />{item.label}
              </Button>
            ))}
          </div>

          {currentTab === 'portal' && <PortalDashboard />}
          {currentTab === 'portal-tasks' && <PortalTasks />}
          {currentTab === 'portal-kb' && <PortalKB />}
        </div>
      </div>
    </div>
  )
}

function PortalDashboard() {
  const stats = [
    { label: 'My Tasks', value: '5', icon: Kanban, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/40' },
    { label: 'In Progress', value: '2', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/40' },
    { label: 'Completed', value: '12', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
    { label: 'Overdue', value: '1', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950/40' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} {...fadeUp} transition={{ delay: i * 0.05 }}>
            <Card className="border-border/50"><CardContent className="flex items-center gap-4 p-5">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div>
              <div><p className="text-2xl font-extrabold text-foreground">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
            </CardContent></Card>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50"><CardHeader><CardTitle className="text-base">My Active Tasks</CardTitle></CardHeader><CardContent className="space-y-3">
          {kanbanColumns.flatMap(c => c.tasks).filter((_, i) => i < 4).map(t => (
            <div key={t.id} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
              <div className="min-w-0"><p className="truncate text-sm font-medium">{t.title}</p><p className="text-xs text-muted-foreground">Due: {t.dueDate}</p></div>
              <span className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${priorityColors[t.priority]}`}>{t.priority}</span>
            </div>
          ))}
        </CardContent></Card>
        <Card className="border-border/50"><CardHeader><CardTitle className="text-base">Quick Links</CardTitle></CardHeader><CardContent className="space-y-3">
          {knowledgeBase.slice(0, 4).map(kb => (
            <div key={kb.id} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
              <div className="flex items-center gap-3"><FileText className="h-4 w-4 text-muted-foreground" /><div><p className="text-sm font-medium">{kb.title}</p><p className="text-xs text-muted-foreground">{kb.category}</p></div></div>
            </div>
          ))}
        </CardContent></Card>
      </div>
    </div>
  )
}

function PortalTasks() {
  const [columns, setColumns] = useState(kanbanColumns)
  const [addTaskCol, setAddTaskCol] = useState<string | null>(null)
  const [newTask, setNewTask] = useState('')

  const addTask = (colId: string) => {
    if (!newTask.trim()) return
    setColumns(prev => prev.map(col => col.id === colId ? { ...col, tasks: [...col.tasks, { id: `t${Date.now()}`, title: newTask, priority: 'medium', dueDate: 'Aug 20' }] } : col))
    setNewTask('')
    setAddTaskCol(null)
    toast.success('Task added!')
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Drag tasks between columns to update status</p>
        <Dialog><DialogTrigger asChild><Button size="sm" className="gradient-green border-0 gap-1.5"><Plus className="h-3.5 w-3.5" /> New Task</Button></DialogTrigger>
        <DialogContent><DialogHeader><DialogTitle>Create New Task</DialogTitle></DialogHeader><form className="space-y-4" onSubmit={e => { e.preventDefault(); toast.success('Task created!') }}><Input placeholder="Task title" required /><Input placeholder="Due date (e.g., Aug 20)" /><select className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"><option value="high">High Priority</option><option value="medium">Medium Priority</option><option value="low">Low Priority</option></select><Button type="submit" className="gradient-green w-full border-0">Create Task</Button></form></DialogContent></Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columns.map(col => (
          <div key={col.id} className="rounded-xl border border-border/50 bg-card">
            <div className={`flex items-center justify-between border-b-2 ${col.color} p-3`}>
              <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${col.dot}`} />
                <span className="text-sm font-semibold">{col.title}</span>
                <Badge variant="secondary" className="text-xs">{col.tasks.length}</Badge>
              </div>
              {addTaskCol === col.id ? (
                <div className="flex items-center gap-1">
                  <input autoFocus className="h-7 w-28 rounded border border-input bg-background px-2 text-xs" placeholder="Task name" value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask(col.id)} />
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => addTask(col.id)}><CheckCircle2 className="h-3.5 w-3.5 text-cv-emerald" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setAddTaskCol(null); setNewTask('') }}><X className="h-3.5 w-3.5" /></Button>
                </div>
              ) : (
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setAddTaskCol(col.id)}><Plus className="h-3.5 w-3.5" /></Button>
              )}
            </div>
            <div className="min-h-[200px] space-y-2 p-2">
              {col.tasks.map(task => (
                <motion.div key={task.id} layout className="rounded-lg border border-border/50 bg-background p-3 transition-all hover:shadow-sm">
                  <p className="text-sm font-medium leading-tight">{task.title}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${priorityColors[task.priority]}`}>{task.priority}</span>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Calendar className="h-3 w-3" />{task.dueDate}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PortalKB() {
  const [search, setSearch] = useState('')
  const filtered = knowledgeBase.filter(kb => kb.title.toLowerCase().includes(search.toLowerCase()) || kb.category.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">{knowledgeBase.length} articles available</p>
        <div className="relative max-w-sm w-full"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)} className="h-10 pl-9" /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((kb, i) => (
          <motion.div key={kb.id} {...fadeUp} transition={{ delay: i * 0.04 }} className="card-hover cursor-pointer rounded-xl border border-border/50 bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">{kb.category}</Badge>
              <span className="text-[10px] text-muted-foreground">Updated {kb.updated}</span>
            </div>
            <h3 className="text-sm font-bold text-foreground">{kb.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground">Internal reference guide for the Cloud Verge engineering team.</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
