import { useState } from "react";

type Todo = {
  id: number;
  content: string;
  checked: boolean;
};

export const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleAdd = () => {
    const newTodo: Todo = {
      id: Date.now(),
      content,
      checked: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setContent("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleCheck = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const handleRemove = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

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
