// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { RootState } from "../../modules";
// import { TodoDto } from "../models/todo.model";
// import { toSettingTodo } from "./todo.converter";
// import { fetchCards } from "./todo.repo";

// export const effSettingCardsFetchList = createAsyncThunk<
//   any,
//   void,
//   { state: RootState }
// >("SettingCardsFetchList", async (_, api) => {
//   try {
//     const cardsResult: TodoDto = await fetchCards("params");
//     return toSettingTodo(cardsResult);
//   } catch (error) {
//     api.rejectWithValue(error);
//   }
// });
export const todo = "todo";
