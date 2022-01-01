import React, { useState } from "react";
import { useTodoActions } from "../../hooks/useTodoActions";

function TodoForm() {
  const { add } = useTodoActions();
  const [text, setText] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        add(text);
        setText("");
      }}
    >
      <input
        type="text"
        placeholder="할 일을 입력하세요."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">등록</button>
    </form>
  );
}

export default TodoForm;
