import React from "react";
import { useRecoilValue } from "recoil";
import { selFilteredTodoList } from "../../../recoil/selector/todoList.selector";
import TodoItem from "./TodoItem";

function TodoList() {
  const todoList = useRecoilValue(selFilteredTodoList);
  console.log("TodoList: ", todoList);
  return (
    <div>
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </div>
  );
}

export default TodoList;
