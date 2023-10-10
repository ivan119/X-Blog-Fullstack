import { prisma } from '~/server/db/index'
import { b } from 'prisma/build/public/assets/vendor'

export const createRefreshToken = (refreshToken) => {
  return prisma.refreshToken.create({
    data: refreshToken,
  })
}
export const getRefreshTokenByToken = (token) => {
  return prisma.refreshToken.findUnique({ where: { token } })
}
