import TokenHelper from "./TokenHelper"
import { appRoutes } from "../../constants"
import axios from "axios"

const baseURL = "http://localhost:8000"

const httpClient = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: TokenHelper.getLocalAccessToken()
      ? "Bearer " + TokenHelper.getLocalAccessToken()
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
})

httpClient.interceptors.request.use(
  (config) => {
    const token = TokenHelper.getLocalAccessToken()
    if (token) {
      config.headers["Authorization"] = "Bearer " + token // for Django backend
      //   config.headers["x-access-token"] = token // for Node.js Express back-end
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config

    // Prevent infinite loops
    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "/auth/api/token/refresh"
    ) {
      window.location.href = appRoutes.LOGIN
      return Promise.reject(error)
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = TokenHelper.getLocalRefreshToken()

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]))

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000)
        console.log(tokenParts.exp)

        if (tokenParts.exp > now) {
          return httpClient
            .post("/auth/api/token/refresh", { refresh: refreshToken })
            .then((response) => {
              TokenHelper.updateLocalAccessToken(response.data.access)
              localStorage.setItem("access_token", response.data.access)

              httpClient.defaults.headers["Authorization"] =
                "Bearer " + response.data.access
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.access

              return httpClient(originalRequest)
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now)
          window.location.href = appRoutes.LOGIN
        }
      } else {
        console.log("Refresh token not available.")
        window.location.href = appRoutes.LOGIN
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error)
  },
)

export default httpClient
