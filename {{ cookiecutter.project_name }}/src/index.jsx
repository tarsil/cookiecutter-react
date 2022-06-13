import "./assets/scss/{{ cookiecutter.project_name }}.scss"

import App from "./App"
import { AuthProvider } from "./core/auth/authContext"
import React from "react"
import ReactDOM from "react-dom/client"

// import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()

/**
 * Add some hot reloading to the React App
 */
if (module.hot) {
  module.hot.accept()
}
