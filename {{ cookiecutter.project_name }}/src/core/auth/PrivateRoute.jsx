import { Navigate } from "react-router-dom"
import { appRoutes } from "../../constants"
import { useAuth } from "./authContext"

const PrivateRoute = ({ children }) => {
  const { checkAuth } = useAuth()
  const authed = checkAuth()

  return authed ? children : <Navigate to={appRoutes.LOGIN} />
}

export default PrivateRoute
