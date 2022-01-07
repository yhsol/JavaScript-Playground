import { store } from "../../../../app/store";
import { createTodo, setErrorMessage } from "../../todo.slice";

export const getCreateOnClick = (profileId?: number) => (): void => {
  if (!profileId) {
    store.dispatch(setErrorMessage("Must select a profile first."));
    return;
  }
  store.dispatch(createTodo(profileId));
};

export const getErrorCloseOnClick = () => (): void => {
  store.dispatch(setErrorMessage());
};
