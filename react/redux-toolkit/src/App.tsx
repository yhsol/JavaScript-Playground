import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { createStore } from "redux";

// reducer
function counter(state = 0, action: { type: string }) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// store
let store = createStore(counter);

store.subscribe(() => console.log(store.getState()));

function increment() {
  store.dispatch({ type: "INCREMENT" });
}
function decrement() {
  store.dispatch({ type: "DECREMENT" });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
