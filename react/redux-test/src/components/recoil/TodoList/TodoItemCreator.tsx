import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { stateTodoList } from "../../../recoil/atom/todoList.atom";

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(stateTodoList);

  const addTodo = () => {
    setTodoList((prev) => [
      ...prev,
      { id: nanoid(), text: inputValue, isComplete: false },
    ]);
    setInputValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}

export default TodoItemCreator;
