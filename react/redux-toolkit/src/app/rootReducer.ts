import { combineReducers } from "redux";
import profileReducer from "../features/profile/profile.slice";
import todoReducer from "../features/todo/todo.slice";

const moduleStores = {
  profile: profileReducer,
  todo: todoReducer,
};

const rootReducer = combineReducers({
  ...moduleStores,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
