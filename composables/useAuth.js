import useFetchApi from '~/composables/useFetchApi'
import { jwtDecode } from 'jwt-decode'

export default () => {
  const useAuthToken = () => useState('auth_token')
  const useAuthUser = () => useState('auth_user')
  const useAuthLoading = () => useState('auth_loading', () => true)
  const setToken = (newToken) => {
    const authToken = useAuthToken()
    authToken.value = newToken
  }
  const setUser = (newUser) => {
    const authUser = useAuthUser()
    authUser.value = newUser
  }
  const setIsAuthLoading = (value) => {
    const authLoading = useAuthLoading()
    authLoading.value = value
  }
  const login = (username, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            username,
            password,
          },
        })
        const { access_token, user } = data
        setToken(access_token)
        setUser(user)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/refresh')
        const { access_token } = data
        setToken(access_token)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi('/api/auth/user')
        setUser(data.user)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken()
    if (!authToken) return
    const jwt = jwtDecode(`${authToken.value}`, { header: false })
    const newRefreshTime = jwt.exp - 60000
    setTimeout(async () => {
      await refreshToken()
      reRefreshAccessToken()
    }, newRefreshTime)
  }
  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setIsAuthLoading(true)
      try {
        await refreshToken()
        await getUser()
        reRefreshAccessToken()
        resolve(true)
      } catch (error) {
        reject(error)
      } finally {
        setIsAuthLoading(false)
      }
    })
  }
  const logout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await useFetchApi('/api/auth/logout', {
          method: 'POST',
        })
        setToken(null)
        setUser(null)
        resolve(true)
      } catch (e) {}
    })
  }
  return {
    login,
    logout,
    useAuthUser,
    useAuthToken,
    initAuth,
    useAuthLoading,
  }
}
