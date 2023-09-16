import { sendError } from 'h3'
import { createUser } from '../../db/users.js'
import { userTransformer } from '~/server/transformers/users'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, email, password, repeatPassword, name } = body
  if (!username || !email || !password || !repeatPassword || !name) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'Invalid params' })
    )
  }
  if (password !== repeatPassword) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Password do not match with Repeat Password',
      })
    )
  }
  const userData = {
    username,
    email,
    password,
    name,
    profileImage: 'https://picsum.photos/45/45',
  }
  const user = await createUser(userData)
  return {
    body: userTransformer(user),
  }
})
