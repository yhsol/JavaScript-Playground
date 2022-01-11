import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selAllTodo } from "../redux/stores/todo.selector";
import { useFilter } from "./useFilter";
import { useTodoActions } from "./useTodoActions";

function useFilteredTodos() {
  // const todos = useRootState((state) => state.todos);
  const todos = useSelector(selAllTodo);
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
