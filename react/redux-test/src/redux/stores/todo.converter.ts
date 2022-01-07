import { TodoDto } from "../models/todo.model";

export function toSettingTodo(src: TodoDto) {
  return {
    id: src.id,
    done: src.done,
    text: src.text,
  };
}
