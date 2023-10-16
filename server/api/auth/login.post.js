import { getUserByUsername } from '~/server/db/users'
import bcrypt from 'bcrypt'
import { generateTokens, sendRefreshToken } from '~/server/utils/jwt'
import { userTransformer } from '~/server/transformers/users'
import { createRefreshToken } from '~/server/db/refreshTokens'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body
  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: body,
        statusMessage: 'Invalid params',
      })
    )
  }

  // Is user registered?
  const user = await getUserByUsername(username)
  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'username or password are invalid',
      })
    )
  }
  // Compare passwords
  const doesThePasswordsMatches = await bcrypt.compare(password, user.password)
  if (!doesThePasswordsMatches) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'username or password are invalid',
      })
    )
  }
  // generate tokens
  // acces token
  // refreshToken
  const { accessToken, refreshToken } = generateTokens(user)
  // save it inside db
  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  })
  // add http only cookie
  await sendRefreshToken(event, refreshToken)
  return {
    access_token: accessToken,
    user: userTransformer(user),
  }
})
