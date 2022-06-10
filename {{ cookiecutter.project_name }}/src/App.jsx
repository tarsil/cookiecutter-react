import { Navigate, Route, Routes } from "react-router-dom"
import React, { Component } from "react"

import Page from "react-page-loading"
import ScrollUpBtn from "./components/shared/ScrollUp"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Page loader={"commet-spin"} color={"#fe5619"} size={50}>
          <Route
            render={({ location }) => (
              <section className="route-section">
                <Routes location={location}>
                  {/* <Route
                              path="/blog-details"
                              component={SingleBlog}
                          />
                          <Route
                              path="/blog-two"
                              component={BlogTwo}
                          />
                          <Route
                              path="/blog-one"
                              component={BlogOne}
                          />
                          <Route
                              path="/home-three"
                              component={HomeThree}
                          />
                          <Route
                              path="/home-two"
                              component={HomeTwo}
                          />
                          <Route
                              path="/"
                              component={HomeOne}
                          /> */}
                  <Navigate to="/not-found" />
                </Routes>
              </section>
            )}
          />
          <ScrollUpBtn />
        </Page>
      </div>
    )
  }
}

export default App
