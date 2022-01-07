import { RootState } from "../../../app/rootReducer";
import { Todo } from "../todo.slice";

export const todoListSelector = (state: RootState): Todo[] =>
  state.todo.todoList.filter(
    (todo) => todo.profileId === state.profile.activeProfileId
  );
