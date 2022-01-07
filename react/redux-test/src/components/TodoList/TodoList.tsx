import React from "react";
import useFilteredTodos from "../../hooks/useFilteredTodos";
import ReduxTodo from "../../redux/pages/Todo";
import TodoListItem from "./TodoListItem";

function TodoList() {
  const [todos, { remove, toggle }] = useFilteredTodos();
  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          onRemove={remove}
          onToggle={toggle}
          key={todo.id}
        />
      ))}
      redux
      <ReduxTodo />
    </ul>
  );
}

export default TodoList;
