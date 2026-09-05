import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const employees = await db.employee.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(employees)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const employee = await db.employee.create({
      data: {
        name: body.name,
        email: body.email,
        role: body.role || 'employee',
        position: body.position || null,
        department: body.department || null,
        avatarUrl: body.avatarUrl || null,
        bio: body.bio || null,
        linkedinUrl: body.linkedinUrl || null,
        githubUrl: body.githubUrl || null,
      },
    })
    return NextResponse.json({ success: true, id: employee.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    const updated = await db.employee.update({ where: { id }, data })
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Failed to update employee' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await db.employee.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete employee' }, { status: 500 })
  }
}
