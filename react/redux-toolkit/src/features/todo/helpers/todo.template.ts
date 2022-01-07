import { WithOptional, WithRequired } from "../../../utils/types";
import { Todo } from "../todo.slice";

type TodoTemplateFields = "isComplete";

export type EmptyTodo = WithRequired<Todo, TodoTemplateFields>;

export const emptyTodo: EmptyTodo = {
  isComplete: false,
};

export type PartialTodo = WithOptional<
  Omit<Todo, "todoId">,
  TodoTemplateFields
>;
