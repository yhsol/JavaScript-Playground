import React from "react";
import { useSelector } from "react-redux";
import { activeProfileSelector } from "../../selectors/activeProfile.selector";
import { todoListSelector } from "../../selectors/todoList.selector";
import TodoItem from "../TodoItem/TodoItem";
import TodoCardFooter from "./TodoCardFooter";

const TodoCard: React.FC = () => {
  const todoList = useSelector(todoListSelector);
  const activeProfile = useSelector(activeProfileSelector);
  return (
    <div className="card" role="complementary" aria-label="Todo Card">
      <div className="card-header">
        <h5 className="card-title">
          Todos {activeProfile?.name && `for ${activeProfile?.name}`}
        </h5>
      </div>
      <div className="card-body">
        <ul className="list-group">
          {todoList.map((todo) => (
            <TodoItem key={todo.todoId} todo={todo}></TodoItem>
          ))}
        </ul>
      </div>
      <TodoCardFooter></TodoCardFooter>
    </div>
  );
};

export default TodoCard;
