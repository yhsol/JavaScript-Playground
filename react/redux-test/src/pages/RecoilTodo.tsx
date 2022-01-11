import React from "react";
import TodoItemCreator from "../components/recoil/TodoList/TodoItemCreator";
import TodoList from "../components/recoil/TodoList/TodoList";
import TodoListFilters from "../components/recoil/TodoList/TodoListFilters";

function RecoilTodo() {
  return (
    <div>
      <TodoListFilters />
      <TodoItemCreator />
      <TodoList />
    </div>
  );
}

export default RecoilTodo;
