import type { PrismaClient } from '@prisma/client'

/**
 * Lazy Prisma singleton.
 *
 * The client is required and constructed on first actual use (first API
 * request), never during `next build` page-data collection. This keeps
 * builds deterministic and avoids opening DB connections at build time.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function createClient(): PrismaClient {
  // Runtime require so the generated client only loads when serving requests.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient: Client } = require('@prisma/client') as typeof import('@prisma/client')
  return new Client()
}

export const db: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = (globalForPrisma.prisma ??= createClient())
    const value = client[prop as keyof PrismaClient]
    return typeof value === 'function'
      ? (value as (...args: unknown[]) => unknown).bind(client)
      : value
  },
})
