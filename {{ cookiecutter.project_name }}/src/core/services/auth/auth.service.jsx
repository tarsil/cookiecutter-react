import TokenService from "../token.service"
import api from "../../interceptors/api"

class AuthService {
  login(username, password) {
    return api
      .post("/auth/token", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data)
        }
        return response.data
      })
  }

  logout() {
    TokenService.removeUser()
  }

  register(firstName, lastName, email, password, retypePassword) {
    return api.post("/accounts/auth/signup", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      retype_password: retypePassword,
    })
  }
  getCurrentUser() {
    return TokenService.getUser()
  }
}

export default new AuthService()
