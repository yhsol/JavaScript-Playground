import React, { useMemo } from "react";
import { useRootState } from "../modules";
import { useFilter } from "./useFilter";
import { useTodoActions } from "./useTodoActions";

function useFilteredTodos() {
  const todos = useRootState((state) => state.todos);
  const [filter] = useFilter();

  const filteredTodos = useMemo(
    () =>
      filter === "ALL"
        ? todos
        : todos.filter((todo) => todo.done === (filter === "DONE")),
    [todos, filter]
  );
  const actions = useTodoActions();
  return [filteredTodos, actions] as const;
}

export default useFilteredTodos;
