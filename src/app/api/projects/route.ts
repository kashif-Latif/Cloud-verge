import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const project = await db.project.create({
      data: {
        title: body.title,
        clientName: body.clientName,
        category: body.category,
        description: body.description,
        technologies: body.technologies,
        impact: body.impact || null,
        featured: body.featured || false,
        imageSeed: body.imageSeed || null,
      },
    })
    return NextResponse.json({ success: true, id: project.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
