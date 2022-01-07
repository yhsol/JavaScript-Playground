import { createSlice } from "@reduxjs/toolkit";
import {
  createTodoReducer,
  deleteTodoReducer,
  resetReducer,
  setErrorMessageReducer,
  updateTodoReducer,
} from "./reducers/todo.reducer";

export interface Todo {
  todoId: number;
  description?: string;
  profileId: number;
  isComplete: boolean;
}

export interface TodoState {
  todoList: Todo[];
  maxTodoId: number;
  errorMessage?: string;
}

export const initialState: TodoState = {
  todoList: [
    { todoId: 1, profileId: 1, description: "eat tacos", isComplete: true },
    { todoId: 2, profileId: 1, description: "drink milk", isComplete: false },
    {
      todoId: 3,
      profileId: 1,
      description: "walk and chew gum",
      isComplete: false,
    },
  ],
  maxTodoId: 3,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: createTodoReducer,
    deleteTodo: deleteTodoReducer,
    updateTodo: updateTodoReducer,
    setErrorMessage: setErrorMessageReducer,
    reset: resetReducer,
  },
});

export const { createTodo, deleteTodo, updateTodo, setErrorMessage, reset } =
  todoSlice.actions;

const todoReducer = todoSlice.reducer;
export default todoReducer;
