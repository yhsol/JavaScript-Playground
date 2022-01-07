import { combineReducers } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import todos from "./todos";
import filter from "./filter";
import articles from "./articles";

const rootReducer = combineReducers({
  todos,
  filter,
  articles,
});

export type RootState = ReturnType<typeof rootReducer>;
type StateSelector<T> = (state: RootState) => T;
type EqualityFn<T> = (left: T, right: T) => boolean;

export function useRootState<T>(
  selector: StateSelector<T>,
  equaulityFn?: EqualityFn<T>
) {
  return useSelector(selector, equaulityFn);
}

export default rootReducer;
