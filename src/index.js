import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Provider } from "react-redux"
import { createStore } from "redux"

import "./index.css"

const initialState = {
  routesYMap: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "addRouteMap":
      return { ...state, routesYMap: [...state.routesYMap, action.payload] }
    case "swapRouteMap":
      return { ...state, routesYMap: [...action.payload] }
    case "exampleRouteMap":
      return { ...state, routesYMap: action.payload }
    case "deleteRouteMap":
      state.routesYMap.splice(action.payload, 1)
      console.log(state.routesYMap);
      return { ...state, routesYMap: [...state.routesYMap] }
    default: return state
  }
}

ReactDOM.render(
  <Provider store={createStore(reducer)}>
    <App />
  </Provider>,
  document.getElementById("root")
)
