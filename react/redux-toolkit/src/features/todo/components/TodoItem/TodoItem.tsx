import React from "react";
import styles from "./ToDoItem.module.css";

import { emptyTodo } from "../../helpers/todo.template";
import { Todo } from "../../todo.slice";
import {
  getDeleteOnClick,
  getDescriptionOnChange,
  getIsCompleteOnChange,
} from "./todoItem.funcs";
import CustomCheckbox from "../../../../app/component/CustomCheckbox/CustomCheckbox";
import CustomTextInput from "../../../../app/component/CustomTextInput/CustomTextInput";

interface TodoProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoProps> = ({ todo = emptyTodo }) => {
  return (
    <li className={"list-group-item " + styles.todoItem}>
      <CustomCheckbox
        idPrefix={`isComplete-${todo.todoId}`}
        label="Complete?"
        checked={todo.isComplete}
        onChange={getIsCompleteOnChange(todo.todoId)}
      />
      <CustomTextInput
        idPrefix={`description-${todo.todoId}`}
        label="Description"
        value={todo.description}
        onChange={getDescriptionOnChange(todo.todoId)}
      />
      <div className={styles.butonWrapper}>
        <button
          className="btn btn-danger"
          onClick={getDeleteOnClick(todo.todoId)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
