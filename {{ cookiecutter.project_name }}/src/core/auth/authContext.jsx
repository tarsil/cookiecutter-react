import React, { useContext, useState } from "react"

import TokenHelper from "../clients/TokenHelper"
import authService from "../services/auth.service"

const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => {
  const [authed, setAuthed] = useState(false)

  const checkAuth = () => {
    if (TokenHelper.isLoggedIn()) {
      return true
    } else if (TokenHelper.isRefreshable()) {
      return true
    } else {
      authService.logout()
      return false
    }
  }

  const login = (email, password) => {
    authService.login(email, password)
  }

  const logout = () => {
    authService.logout()
    setAuthed(false)
  }

  return (
    <AuthContext.Provider
      value={{ authed, setAuthed, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
