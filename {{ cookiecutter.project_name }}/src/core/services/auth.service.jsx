import TokenHelper from "../clients/TokenHelper"
import httpClient from "../clients/AxiosClient"

/**
 * Register a user in the platform
 */
const signup = (email, password) => {
  return httpClient
    .post("/api/accounts/auth/signup", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(response.data))
      }

      return response.data
    })
}

/**
 * Login into the application with email and password
 */
const login = (email, password) => {
  return httpClient
    .post("/auth/api/token", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        TokenHelper.setAccessToken(response.data)
        TokenHelper.setRefreshToken(response.data)
      }

      return response.data
    })
}

const refreshToken = () => {
  return httpClient
    .post("/auth/api/token/refresh", {
      refresh: TokenHelper.getLocalRefreshToken(),
    })
    .then((response) => {
      if (response.data.access) {
        TokenHelper.setAccessToken(response.data)
      }
      return response.data
    })
}

/**
 * Logout of the application
 */
const logout = () => {
  TokenHelper.logout()
}

const authService = {
  signup,
  login,
  logout,
}

export default authService
