import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../modules";

const selTodo = (state: RootState) => state.todos;

export const selAllTodo = createSelector(selTodo, (state) => state);
export const selDoneTodo = createSelector(selTodo, (state) =>
  state.filter((todo) => todo.done)
);
export const selUndoneTodo = createSelector(selTodo, (state) =>
  state.filter((todo) => !todo.done)
);
