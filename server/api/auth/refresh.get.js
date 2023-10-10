import { getRefreshTokenByToken } from '~/server/db/refreshTokens'

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event)
  console.log(cookies, 'cookies')
  const refreshToken = cookies.refresh_token
  if (!refreshToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Refresh token is invalid',
      })
    )
  }
  const rToken = await getRefreshTokenByToken(refreshToken)

  return {
    hello: rToken,
  }
})
