import UrlPattern from 'url-pattern'
import { decodeAccessToken } from '~/server/utils/jwt'
import { getUserById } from '~/server/db/users'

export default defineEventHandler(async (event) => {
  // TODO: Check for "event.req" "Deprecated symbol used, consult docs for better alternative"
  const endpoints = [
    '/api/auth/user',
    '/api/user/tweets',
    '/api/tweets',
    '/api/tweets/:id',
  ]
  const isHandleByThisMiddleware = endpoints.some((endpoint) => {
    const pattern = new UrlPattern(endpoint)
    return pattern.match(event.req.url)
  })
  if (!isHandleByThisMiddleware) {
    return
  }
  const token = event.req.headers['authorization']?.split(' ')[1]
  const decoded = decodeAccessToken(token)
  if (!decoded) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    )
  }
  try {
    const userId = decoded.userId
    const user = await getUserById(userId)
    event.context.auth = { user }
  } catch (e) {
    return
  }
})
