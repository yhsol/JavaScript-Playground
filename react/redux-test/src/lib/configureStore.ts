import { createStore } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "../modules";

function configureStore(initialState?: RootState) {
  return createStore(rootReducer, initialState);
}

export default configureStore;
