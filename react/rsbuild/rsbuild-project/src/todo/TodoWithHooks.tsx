import { useState } from "react";

type Todo = {
  id: number;
  content: string;
  checked: boolean;
};

function uesTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState("");

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const add = () => {
    const newTodo: Todo = {
      id: Date.now(),
      content,
      checked: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setContent("");
  };

  const addByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      add();
    }
  };

  const check = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };
  const remove = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    content,
    change,
    add,
    addByEnter,
    check,
    remove,
  };
}

export const TodoWithHooks = () => {
  const {
    todos,
    content,
    change: handleChange,
    add: handleAdd,
    addByEnter: handleKeyDown,
    check: handleCheck,
    remove: handleRemove,
  } = uesTodo();

  return (
    <>
      <h3>Todo</h3>
      <div>
        <input
          type="text"
          placeholder="Write your todo..."
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div>
        {todos.map((todo) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px",
            }}
          >
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => handleCheck(todo.id)}
            />
            <div>{todo.content}</div>
            <button onClick={() => handleRemove(todo.id)}>X</button>
          </div>
        ))}
      </div>
    </>
  );
};
