import { store } from "../../../../app/store";
import { deleteTodo, updateTodo } from "../../todo.slice";

export const getIsCompleteOnChange =
  (todoId?: number) =>
  (isComplete: boolean): void => {
    if (!todoId) return;
    store.dispatch(updateTodo({ todoId, isComplete }));
  };

export const getDescriptionOnChange =
  (todoId?: number) =>
  (description: string): void => {
    if (!todoId) return;
    store.dispatch(updateTodo({ todoId, description }));
  };

export const getDeleteOnClick = (todoId?: number) => (): void => {
  if (!todoId) return;
  store.dispatch(deleteTodo(todoId));
};
