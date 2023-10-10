import { useCookie } from 'nuxt/app'

export default defineEventHandler(async (event) => {
  const cookies = getCookie(event, 'jwt')
  console.log(getCookie)
  const refreshtoken = cookies.refresh_token
  if (!refreshtoken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Refresh token is invalid',
      })
    )
  }
  return {
    hello: refreshtoken,
  }
})
