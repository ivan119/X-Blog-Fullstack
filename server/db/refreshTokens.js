import { prisma } from '~/server/db/index'

export const createRefreshToken = (refreshToken) => {
  return prisma.refreshToken.create({
    data: refreshToken,
  })
}
