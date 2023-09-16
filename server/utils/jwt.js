import jwt from 'jsonwebtoken'

const generateAccessToken = (user) => {
  const config = useRuntimeConfig()
  return jwt.sign(
    { userId: user.id },
    config.jwtAccessSecret,

    {
      expiresIn: '10m',
    }
  )
}
const generateRefreshToken = (user) => {
  const config = useRuntimeConfig()
  return jwt.sign(
    { userId: user.id },
    config.jwtRefreshSecret,

    {
      expiresIn: '4h',
    }
  )
}
export const generateTokens = (user) => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  }
}

export const sendRefreshToken = async (event, token) => {
  if (!event.res) {
  }
  console.log(event, 'event-res')

  setCookie(event, 'refresh_token', token, {
    httpOnly: true,
    sameSite: true,
  })
}
