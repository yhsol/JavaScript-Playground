import React from "react";
import { Todo } from "../../types/Todo.types";

type Props = {
  todo: Todo;
  onToggle(id: string): void;
  onRemove(id: string): void;
};

function TodoListItem({ todo, onToggle, onRemove }: Props) {
  return (
    <li>
      <span
        onClick={() => onToggle(todo.id)}
        style={{ textDecoration: todo.done ? "line-through" : "" }}
      >
        {todo.text}
      </span>
      <span
        onClick={() => onRemove(todo.id)}
        style={{
          marginLeft: 8,
          color: "gray",
          cursor: "pointer",
        }}
      >
        [삭제]
      </span>
    </li>
  );
}

export default TodoListItem;
