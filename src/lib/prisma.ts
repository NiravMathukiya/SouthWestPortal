import { PrismaClient } from '@prisma/client'

declare global {
  // Extend NodeJS.Global to include prisma
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma: PrismaClient =
  process.env.NODE_ENV === 'production'
    ? new PrismaClient()
    : global.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma
