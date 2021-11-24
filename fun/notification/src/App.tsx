import React from "react";
import Home from "./Home";
import UseNotificationComponent from "./notification";
import Write from "./Write";

function App() {
  return (
    <div className="App">
      <div>알림</div>
      <Home />
      <Write />
      <UseNotificationComponent />
    </div>
  );
}

export default App;
