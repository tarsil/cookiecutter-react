/* eslint-disable camelcase */
import * as moment from "moment"

import jwt_decode from "jwt-decode"

class TokenHelper {
  /**
   * Obtains the refresh token from the storage.
   */
  getLocalRefreshToken() {
    const refresh = localStorage.getItem("refresh")
    if (!refresh && refresh !== null) {
      return refresh
    }
    return
  }

  /**
   * Obtains the access token from the storage.
   */
  getLocalAccessToken() {
    const token = localStorage.getItem("access")
    if (!token && token !== null) {
      return token
    }
    return
  }

  /**
   * Updates the local storage with the received token.
   */
  updateLocalAccessToken(token) {
    localStorage.setItem("access", token)
  }

  /**
   * Gets the token.
   */
  getAccessToken() {
    return localStorage.getItem("access")
  }

  /**
   * Gets the token.
   */
  getTokenRefresh() {
    return localStorage.getItem("refresh")
  }

  /**
   * Sets token session
   */
  setAccessToken(authResult) {
    const access = authResult.access
    const payload = jwt_decode(access)
    const expiresAt = moment.unix(payload.exp)
    localStorage.setItem("access", authResult.access)
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()))
  }

  /**
   * Sets refresh token session
   */
  setRefreshToken(authResult) {
    const refresh = authResult.refresh
    const payload = jwt_decode(refresh)
    const expiresAt = moment.unix(payload.exp)
    localStorage.setItem("refresh", authResult.refresh)
    localStorage.setItem(
      "refresh_expires_at",
      JSON.stringify(expiresAt.valueOf()),
    )
  }

  /**
   * Removes the tokens from the local storage
   */
  logout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("expires_at")
    localStorage.removeItem("refresh_expires_at")
  }

  /**
   * Get the access token expiry date.
   */
  getExpiration() {
    const expiration = localStorage.getItem("expires_at")
    const expiresAt = JSON.parse(expiration)
    return moment(expiresAt)
  }

  /**
   * Get the refresh token expiry date.
   */
  getRefreshExpiration() {
    const expiration = localStorage.getItem("refresh_expires_at")
    const expiresAt = JSON.parse(expiration)
    return moment(expiresAt)
  }

  /**
   * Is still logged in.
   */
  isLoggedIn() {
    return moment().isBefore(this.getExpiration())
  }

  /**
   * Validates if the session is still refreshable to continue, else logout.
   */
  isRefreshable() {
    return moment().isBefore(this.getRefreshExpiration())
  }

  /**
   * Is user logged out.
   */
  isLoggedOut() {
    return !this.isLoggedIn()
  }
}

export default new TokenHelper()
