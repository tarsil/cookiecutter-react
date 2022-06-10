import { Navigate, Route, Routes } from "react-router-dom"
import React, { Component } from "react"

import Login from "./pages/Login"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/sign-in" element={<Login />}></Route>
      </Routes>
    </div>
  )
}

export default App
