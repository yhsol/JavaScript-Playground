import React from "react";
import TodoFilters from "../components/TodoFilters/TodoFilters";
import TodoForm from "../components/TodoForm/TodoForm";
import TodoList from "../components/TodoList/TodoList";

function Todo() {
  return (
    <div>
      <TodoForm />
      <TodoList />
      <TodoFilters />
    </div>
  );
}

export default Todo;
