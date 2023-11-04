import { removeRefreshToken } from '~/server/db/refreshTokens'

export default defineEventHandler(async (event) => {
  try {
    const cookies = parseCookies(event)
    const refreshToken = cookies.refresh_token
    // removeRefreshToken
    await removeRefreshToken(refreshToken)
  } catch (e) {}
  await sendRefreshToken(event.res, null)
  return { message: 'Done' }
})