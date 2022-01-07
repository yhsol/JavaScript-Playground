import { PayloadAction } from "@reduxjs/toolkit";
import { WithRequired } from "../../../utils/types";
import { emptyTodo } from "../helpers/todo.template";
import { initialState, Todo, TodoState } from "../todo.slice";

export const createTodoReducer = (
  state: TodoState,
  action: PayloadAction<number>
): void => {
  const todoId = ++state.maxTodoId;
  state.todoList.push({
    ...emptyTodo,
    profileId: action.payload,
    todoId,
  });
};

export const deleteTodoReducer = (
  state: TodoState,
  action: PayloadAction<number>
): void => {
  const index = state.todoList.findIndex(
    (todo) => todo.todoId === action.payload
  );
  state.todoList.splice(index, 1);
};

export const updateTodoReducer = (
  state: TodoState,
  action: PayloadAction<WithRequired<Todo, "todoId">>
): void => {
  const todo = state.todoList.findIndex(
    (todo) => todo.todoId === action.payload.todoId
  );

  if (!todo) return;

  Object.assign(todo, action.payload);
};

export const setErrorMessageReducer = (
  state: TodoState,
  action: PayloadAction<string | undefined>
): void => {
  state.errorMessage = action.payload;
};

export const resetReducer = (
  _state: TodoState,
  _action: PayloadAction
): TodoState => initialState;
