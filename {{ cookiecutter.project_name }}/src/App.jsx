import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import Login from "./pages/Login"
import { appRoutes } from "./constants"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={appRoutes.LOGIN} element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
