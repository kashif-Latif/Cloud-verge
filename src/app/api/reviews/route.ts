import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clientName, company, industry, rating, content } = body

    if (!clientName || !rating || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const review = await db.review.create({
      data: {
        clientName,
        company: company || null,
        industry: industry || null,
        rating: Math.min(5, Math.max(1, Number(rating))),
        content,
        verified: false,
        featured: false,
      },
    })

    return NextResponse.json({ success: true, id: review.id }, { status: 201 })
  } catch (error) {
    console.error('Review submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const reviews = await db.review.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(reviews)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}