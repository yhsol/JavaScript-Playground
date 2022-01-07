import React from "react";
import ProfileCard from "../../../features/profile/components/ProfileCard/ProfileCard";
import TodoCard from "../../../features/todo/components/TodoCard/TodoCard";

const App = () => {
  return (
    <div className="App">
      <ProfileCard />
      <TodoCard />
    </div>
  );
};

export default App;
